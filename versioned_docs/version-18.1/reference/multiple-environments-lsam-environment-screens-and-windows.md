---
sidebar_label: 'LSAM Environment Screens and Windows'
---
# LSAM Environment Screens and Windows

This section of the topic documents IBM i LSAM screen formats that are not documented in other sections of this documentation.

## LSAINIT LSAM Parameters Prompt Screen

When the LSAINIT command is executed to configure and align all controls for a cloned LSAM environment, new values must be provided that are unique to the new environment and not the same as used by any other LSAM environment within the same IBM i partition.

More detail about the configuration fields described below may be found in the Configuration topic of this documentation. There may be additional LSAM environment settings that should be changed, but these can be managed after the new LSAM environment has been properly initialized, using LSAM menu functions such as option 7 on the main LSAM menu: LSAM Parameters.

## LSAINITR1 - Initialize IBM i LSAM

#### Fields

For a detailed explanation of the fields appearing in these inquiry screens, please refer to the fields tables and following discussions in [IBM i LSAM Configuration](../configuration/configuration.md) of this documentation.

- **LSAM environment Name**: This is the name that was assigned to the new LSAM environment, also specified when the LSAINIT command was started. Normally, this field value should not be changed. It represents the LSAM environment library list that was defined for the new LSAM environment.
- **SMAGPL alternate library name**: This library name was already chosen when the alternate LSAM environment library list was defined in the setup steps of the previous section. Confirm that the name of the new SMAGPL library appears here, but if not, type in the correct name. Do not share the same SMAGPL library that is already used by a different LSAM environment.
- **LSAM environment tools library**: Normally, this will be the same name as the SMAGPL library, unless an alternate LSAM environment will have exclusive control over the LSAM utility commands that could be installed into the QGPL library.
- **LSAM subsystem name**: Confirm or change the subsystem name where the LSAM server jobs for this environment will be started.
- **LSAM (machine) name**: Confirm or change the LSAM Name, which must use all CAPITAL letters and must match exactly the OpCon machine name in the OpCon user interface.
- **Internet Address**: This can be the same IP address as used by another LSAM environment, since the port numbers below must be unique when the IP address is also used for other LSAM services. However, a different IP address can also be specified for this LSAM environment.
- **LSAM subsystem name**: The subsystem assigned to the source LSAM can be shared, but SMA recommends assigning a new, unique subsystem name that is dedicated to this LSAM environment. This approach makes controlling, testing and diagnosing errors much easier.
- **LSAM (machine) Name**: Type a name that represents this LSAM environment within this IBM i partition. The system serial number may already be assigned to the default LSAM environment. Pick a new name that can easily be recognized from the OpCon console. Take note of this name for adding a new machine definition to OpCon at the OpCon User Interface user interface.
- **Job Sched Comm Port**: Pick a unique number that is greater than the port number assigned to the default LSAM environment, which is usually port number 3100. If the test environment uses library SMAGPL1, perhaps the job scheduler communications port number could be 3101. Take note of this number for use when adding a machine definition to OpCon using the OpCon User Interface user interface.
- **JORS Port**: Specify a unique port number that is not already used by other LSAM functions or environments. The usual default value assigned to the SMADEFAULT environment is 3110, so test environment 1 (SMAGPL1) might assign 3111 to the JORS communication program. Record this number so that it can also be assigned to the OpCon machine record.
- **SMAFT Internet Address**: This can be the same IP address as the Job Scheduler IP address (parameter above), and it can be used by another LSAM environment, since the SMAFT port number below must be unique when the IP address is used for other services. However, a different IP address can also be specified for SMAFT in this LSAM environment.
- **SMAFT Server Port**: If the SMA File Transfer protocol will be used, assign a unique port number that will represent a connection to this LSAM environment. The default value of 3301 is typically assigned to the SMADEFAULT environment, so for a test environment using library SMAGPL1 perhaps a value of 3311 could be assigned to the SMAFT port.
- **Auto-start SMAFT?**: If the SMA File Transfer protocol will be used, set this flag to a value of "**Y**" so that the SMAFT server job will be started automatically whenever the other LSAM server jobs are started in the LSAM subsystem.
- **File Arrival Job desc**: Specify a different job description than the original default SMALSAJ00 job description if an alternate job description is needed to control the job logging of File Arrival jobs.
- **JOBD Library**:  The library location of the File Arrival Job description.

#### Functions

- **F3/F12=Quit**: Either of these function keys terminates the program, so that the LSAM initiation work will not be completed.
- **F4=Prompt**: This prompt function key may be used with either the LSAM Environment name field or with the Internet Address field to display a list of values from which one may be selected and returned to either field.
- **F5=Refresh**: This function key causes the display to be reloaded with the default values.
- **F9=View LIBL**: Use this convenience function key to view the library list that is currently in effect. This could be used to confirm that the correct LSAM environment is being initialized, and/or to remind the user about the naming conventions chosen for a test LSAM environment, so that the subsystem name and the LSAM machine name might be spelled in a way that matches the naming convention.
- **F21=SMALIBMGT**: Normally, the LSAM environment name and library list should already be defined before starting the LSAINIT command. However, this function key provides direct access to the SMALIBMGT command using the LSAM control files that are present in the job's current library list. This command could be used to revise the LSAM environment before completing the initialization process.
# Critical Settings 

The following settings are **critical** to the operation of the LSAM with OpCon. Before using the IBM i LSAM, verify these settings in the system. In order to update critical settings, start the configuration program and then follow the instructions below.

- LSAM Name: The LSAM and SMANetCom use this value for communication.
  - The LSAM Name setting must be all capital letters and/or numbers and it must match the setting on the Machines screen of the OpCon User Interface.
  - The SAM Server must be able to ping this name, unless the IBM i LSAM IP address will be used in the machine table in place of the LSAM server name.
    :::tip
    If using multiple environments, assign a unique name to each LSAM environment.
    :::
- Internet Address: This value is the IP Address of the IBM i system. Use the <**F4**> function key to view a list of valid IP addresses for this system.
- Max Concurrent Jobs: This value determines the maximum number of jobs the LSAM may process concurrently. This value should not exceed the maximum number of jobs that can be processed concurrently by the IBM i subsystems and job queues where OpCon can run jobs.
- Communication Port: The LSAM and SMANetCom use this value for communication.
  - The Communication Port setting must match the setting on the OpCon machine record. (The default port value is 3100.)
  - Also set the JORS port (default value 3110) and verify it matches the OpCon machine record.
  - This LSAM uses a separate port for SMA File Transfer. (Refer to [SMA File Transfer](../file-transfer/overview.md).)
- SMA Subsystem Name: This value should only be changed for multiple IBM i LSAM environments within the same IBM i partition (such as a Test LSAM versus the Production LSAM); otherwise, SMA recommends leaving it as the default value (SMASBS).
- Keep socket open (Y/N): For optimal LSAM performance, SMA recommends using the value Y (yes). This setting must match the setting on the OpCon machine record. For more information, refer to [Discussion of Keep Socket Open Parameter](extended-discussion#discussion-of-keep-socket-open-parameter).

:::tip
In the past, changing the value to N (no) was sometimes proposed as a solution when a site was experiencing unstable communication between the LSAM and SMANetCom, or if data was being lost. However, if either of these symptoms appear, please contact the Support team at SMA Technologies for assistance. SMA Technologies does not recommend trying to use this interface with the Keep socket open value set to N (no).
:::
- **Screen Title**: LSAM Configuration Parameters (3 Pages)
- **Screen ID**:
  - LSAPARR00-1
  - LSAPARR00-2
  - LSAPARR00-3

#### Function Keys

##### F4=IP Address List

When the cursor is in the Internet Address field, press <**F4**> to view a list of the IP addresses used by the system. Select the address that represents the communications path used between OpCon and the LSAM. From the IP Address List window, use the keyboard/mouse to highlight the appropriate IP address and press <**Enter**> to select it.

**IBM i LSAM Configuration Settings: IP Address Selection**
```
 .. IP Adr Selection ...
 :   111.22.33.4       :
 :   127.0.0.1         :
 :                     :
 :                     :
 :                     :
 :                     :
 :                     :
 :                     :
 :                     :
 :              Bottom :
 : F12=Cancel .........:
```
#### F9=View LIBL

From the LSAM Parameters display, press <**F9**> to view the library list in effect for this LSAM environment. This function is useful with multiple LSAM environments. An example of the default library list for the SMADEFAULT environment is shown below.

```
SMALIBD00-2                SMA Environment Management                    00/00/00   
USERNAME                     Environment: SMADEFAULT                     00:00:00

Press Enter or F12=Return to return.

Seq  Library      Type     Description
 10  QTEMP
 20  SMAGPL
 30  SMADTA       SMADTA
 40  SMAPTF       SMAPTF
 50  SMAPGM       SMAPGM
 60  QGPL

                                                                           Bottom
F3=Exit   F5=Refresh   F12=Return
```
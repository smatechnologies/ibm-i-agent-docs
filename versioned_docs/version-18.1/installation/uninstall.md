---
sidebar_label: 'Uninstalling the IBM i LSAM at Release 18.1'
---

# Uninstalling the IBM i LSAM at Release 18.1

If it becomes necessary to remove the IBM i LSAM, use this procedure as a guide to remove all of the objects that were installed in the IBM i partition.

## Stop the LSAM

:::tip
Be sure that any procedures under the control of OpCon have completed. Assure that any procedures formerly controlled by OpCon under IBM i are appropriately managed outside of the control of OpCon.
:::

1. Log in to each IBM i LSAM environment that has been installed under IBM i.
2. From the **LSAM Master Menu**, enter **6**.
3. From the **LSAM Management Menu**, enter **2** to end all LSAM operations. (Additionally, this option should terminate the IBM i subsystem that was assigned for use by the LSAM.)
4. It is also possible to stop the LSAM using a command line from outside of the LSAM menu environment, for example, from the iSeries Navigator. Enter the Stop LSAM System command and include the name of the LSAM environment (default name SMADEFAULT, or \*DEFAULT) as shown in this example:

## Back Up the LSAM libraries

1. *(Optional)* Back up IBM i LSAM libraries in order to be able to restore the existing configuration in the future. Use the SAVLIB command to perform a backup to the medium of your choice for each of these libraries:
    - Save the LSAM data library using the SAVLIB command for library SMADTA.

    ```
    SAVLIB LIB(SMADTA) DEV(<backup device>) PRECHK(*YES) ACCPTH(*YES)
    ```

    - Save the LSAM program objects library using the SAVLIB command for library SMAPGM.
    - Save the LSAM program patches library using the SAVLIB command for library SMAPTF.
    - Save the LSAM program patches library using the SAVLIB command for library SMAGPL.

## Uninstall the LSAM

Before attempting to uninstall the LSAM, make sure that the LSAM server jobs and subsystem have been stopped. It is also critical that the LSAM procedure for ending Job Tracking be performed, if Job Tracking had been started, so that the LSAM tools can correctly remove exit program entries from the IBM i exit program registration table.

1. Sign on to the IBM i operating system as QSECOFR, or as a user with security officer authority to complete these steps. Using the following command, delete the installation's save file and the LSAM installation library, if not already done during the last steps of the installation process:

  ```
  DLTF QGPL/LI181001 (or, a newer version of this file, perhaps named LI181006)
  DLTLIB LI181001 (or, a newer version of this library)
  ```

  The following steps 2) or 3) explain how to remove the LSAM utilities, if they were installed in the IBM i system library QGPL. Do not perform these steps if any LSAM environment will remain installed in this IBM i partition (LPAR). These steps 2) or 3) are also not necessary if the LSAM utilities were installed exclusively into the SMAGPL library and library QGPL was not being used by the LSAM.
  
2. ***EITHER***: Execute the SMA QGPL utilities removal command:

  ```
  SMAPGM/UNINSTQGPL
  ```

3. ***OR***: If the SMAPGM library was already deleted, or the UNINSTQGPL command fails for any reason, use the following manual instructions to remove every SMA utility object from the QGPL library. Do not be concerned if not every object is found in QGPL.
    - Delete the following commands from library QGPL:

      ```
      DLTCMD *Command Name*
      ```
      - CHKIBMLSAM
      - CPYTOMSGIN
      - ENDSMASVR
      - ENDSMASYS
      - LSAINIT
      - LSAMCMD
      - LSAMENU
      - LSASETENV
      - SMAADDLIBL
      - SMAJOBDTL
      - SMALIBINQ
      - SMALIBMGT
      - SMAAPYPTF
      - SMAPTFAPY
      - SMAPTFCUM
      - SMAPTFINS
      - SMAPTFRAP
      - SMAPTFRBK
      - SMAPTFREQ
      - SMARMVLIBL
      - SMASAVRSTB
      - SMASETLIBL
      - STRMLTJOB
      - STRSMA
      - STRSMAFT
      - STRSMASVR
      - STRSMASYS
      - USRMTX
      - WRKTRKJOB

    - Delete the following CL and RPG programs from library QGPL:

      *CLLE programs:*

      - CHKIBMLSAC
      - CLRPGMMSG
      - CPYTOMSGIC
      - ENDSMAFTC
      - ENDSMASVRC
      - ENDSMASYSC
      - LSAINITC
      - LSAMCMDC
      - LSAMENUC
      - LSASETENVC
      - SAVRSTC02
      - SAVRSTC03
      - SMAADDLIBC
      - SMADSTOBJC
      - SMADSTUTLC
      - SMADTAARAC
      - SMADUPOBJC
      - SMAJOBDTLC
      - SMALIBINQC
      - SMALIBMGTC
      - SMAMNGLOGC
      - SMAPTFAPYC
      - SMAPTFCUMC
      - SMAPTFFILC
      - SMAPTFINSC
      - SMAPTFINSO
      - SMAPTFRAPC
      - SMAPTFRBKC
      - SMAPTFREQC
      - SMAPTFREQE
      - SMARMVLIBC
      - SMASETLIBC
      - SMAMLTJOBC
      - STRSMAC
      - STRSMAC1
      - STRSMAFTC
      - STRSMASVRC
      - STRSMASYSC
      - USRMTXC00
      - WRKTRKJOBC

      *RPGLE programs:*

      - CRTIDXR00
      - CRTIDXR01
      - CRTIDXR02
      - CRTIDXR03
      - DLYJOBR
      - LSAINITR
      - LSAMCMDR
      - LSAMCMDR1
      - SMAJOBDTLR
      - SMALIBR00
      - SMALIBR01
      - SMAPTFFILR
      - SMAPTFREQF
      - SMAPTFREQR
      - USRMTXR00

    - Delete the following files from library QGPL:

      ```
      DLTF *<File Name>*
      ```

      *Display files*

      - LSAINITD
      - SMAJOBDTLD
      - SMALIBD00
      - SMAPTFREQD
      - STRSMAD
      - USRMTXR00

      *Database files*

      - SMALIBF01
      - SMALIBF00
      - SMALIBF11
      - SMALIBF10
      
    - Delete the following data areas from library QGPL:

      ```
      DLTDTAARA *<Data Area Name>*
      ```

      - PTF\*

        More than one data area (or none) may be found – the names will begin with three letters 'PTF' followed by 6 digits; these are SMA update control data areas, not IBM PTF controls. To list all of these that should be deleted, use this command: WRKOBJ QGPL/PTF\* \*DTAARA
      - RSTENVIRON
      - SMAXNBR

4. Using the following commands, delete each of the LSAM libraries. Different library names may have been used if an alternate LSAM environment was created instead of using the default LSAM environment.
    - **DLTLIB SMAGPL**
    - **DLTLIB SMAPTF**
    - **DLTLIB SMAPGM**
    - **DLTLIB SMADTA**
    - **DLTLIB SMABAK** (This work library will only be present if SMA File Transfer was used with an instruction to back up an existing data file before replacing it with a file transfer.)
    - **DLTLIB SMALOG** (This common library used for LSAM debug log file extracts is shared by all LSAM environments. There is only one copy of the SMALOG library.)
5. Repeat step 4) to remove the libraries that define any other, alternate LSAM environment that may have been created.
6. Using the following commands, delete the LSAM software user profiles after all LSAM environments have been removed from the system:
7. Be sure to remove any configuration and other data entry from the OpCon User Interface that pertain to the IBM i installation being disabled.
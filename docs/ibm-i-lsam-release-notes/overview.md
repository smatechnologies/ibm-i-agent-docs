---
sidebar_label: 'Overview & Reader Notes'
---

# Overview & Reader Notes

These release notes include all enhancements and fixed issues and for the IBM i LSAM, versions:

## Reader Notes
References in this online help to “LSAM PTFs” refer to software patches for the OpCon Agent for IBM i. These are separate from IBM's PTFs for the operating system, and they are not related. However, SMA Technologies recommends that users should keep their IBM i PTFs current, updating them at least every six months (IBM provides quarterly updates to their PTFs). The following instructions are not related in any way to IBM i PTFs.

The IBM i LSAM has been managed as a single version 04.00.03 for as many years as the Agent software has been compiled over IBM i version V5R4. Many of the final fixes and enhancements for this version are included in the last installation file that will be released with support for V5R4: install file name  LI040006, which includes LSAM PTFs through 403320. Additional fixes and enhancements can be added by installing the LSAM PTFs from either the full cumulative save file LSCUMPTF or the much smaller partial PTF save file LSCUMPTF.308-364.

All future fixes and enhancements for the IBM i LSAM will be offered only for the agent version 18.1. This version of the LSAM software is compiled over IBM i8.1.

:::tip
Any clients of SMA Technologies that might be using a version of the OpCon Agent (LSAM) for IBM i prior to 04.00.03 MUST use the IBM i Install file named LI040003 to upgrade to a more recent version of the agent. This is the only install file that is able to perform an upgrade from prior LSAM versions.

New installs of the IBM i LSAM should use the latest available install file, named LI181001 (or a newer version that includes pre-installed patches, such as LI181018). Previous patched install files were LI040004 and LI040005. However, when it is available, the install file named LI040006 should be used.
:::
SMA Technologies clients still using IBM i versions V5R4 or V6R1 (or V6R2) can only use the LSAM version 04.00.03, and they should use the latest version of the install file: LI04006 for new LSAM installations. However, SMA strongly recommends that these clients should upgrade their IBM i operating system to a version that IBM still supports. SMA provides the back-level 04.00.03 version of the IBM i LSAM on an as-is basis, since soon SMA Technologies will not be able to provide any more fixes for this version of the LSAM.

The following Enhancements and Fixes for the IBM i LSAM version 04.00.03 have been added since the previously released install file LI040006 (containing the equivalent of an LSAM version 04.00.03.320).

The list in this document is included in the latest 18.1 install file LI181001 (or a newer version with more patches included such as LI181018).

Clients performing LSAM PTF updates of existing IBM i LSAM installations should download and refer to the "IBM i LSAM Patch Readme" PDF document for special instructions about upgrading to the latest available PTF level.

Clients upgrading from version 04.00.03 to version 18.1, or new installations of the IBM i LSAM must use install file LI181001(or a newer version with more patches included such as LI181018). These clients will receive the following product Enhancements and Fixes automatically.

## Installing IBM i LSAM Patches

Please be careful to distinguish between SMA Technologies software patches for the two different versions of the IBM i LSAM. At SMA Technologies' secure ftp server there are two different sub-directories for all resources pertaining to one version or the other. Although the LSAM PTF file names are similar, they  are NOT interchangeable. These are the two different directories (both stored in the same root directory):

- /IBMiLSAMptf/04.00.03/
- /IBMiLSAMptf/18.1/

Using the wrong LSAM PTF files for a version will corrupt the LSAM software and require a restoration from the most recent backup of the LSAM libraries. SMA Technologies advises clients to always backup the LSAM libraries before attempting any patching or upgrading of the software.

Instructions for installing software patches (PTFs) to SMA Technologies' IBM i LSAM may be found in two places. There is a stand-alone Installation documentation that explains partially manual procedures that may be necessary after an initial installation or upgrade of the LSAM. There is also a topic in the **IBM i LSAM** documentation with detailed instructions and explanations.

:::tip
The term "LSAM" used in this documentation refers to "Local Schedule Activity Monitor." This is the SMA Technologies software that is installed under IBM i to enable OpCon automation of IBM i and any jobs executing under this operating system. SMA Technologies documentation also refers to this software as the OpCon "Agent" for the operating system.
:::

:::tip
PTF # 403364 marks the end of support for the IBM i LSAM version 04.00.03. There may be additional small or emergency patches past this level, but no product enhancements. LSAM version 04.00.03 remains available for a limited time on an as-is basis, IBM i versions V5R4 and V6R1 (i6.1), but all future enhancements will be compiled under i7.1 and included in the i7.1 version 18.1 of the IBM i LSAM.
:::

:::warning
PTF # 403170 changes the display file used by the STRSMA command. Therefore, you must NOT access the LSAM menu system using this command when you want to install the PTFs. Instead, use this command in order to prevent any error: SMAGPL/LSAMENU ENV (SMADEFAULT)

The ENV( ) parameter value should be changed if you are applying PTFs to an alternate LSAM
environment.

This Warning no longer applies if PTF # 403189 is already applied (before starting a new PTF
installation).
:::

:::tip
It may be necessary to change one of the system values for the IBM i operating system in order to permit the PTF installation program to restore program objects that use adopted authority. The IBM i LSAM software includes some programs that use adopted authority in order to enable required, specific system management functions to be completed by designated administrators without requiring that those system users have any special authorities. 

This is a common strategy, and IBM provides the following guidelines for managing the installation
of new software:

The Allow restore of security sensitive objects (QALWOBJRST) system value specifies whether
or not objects with security-sensitive attributes can be restored. It is important to set the value to
*ALL before performing the following system activities:
- Installing a new release of the operating system.
- Installing new licensed programs.
- Applying program temporary fixes (PTFs).
- Recovering your system.

These activities can fail if the value of QALWOBJRST is not set to *ALL. Use this procedure:
- Use the command DSPSYSVAL to view and record the current setting for the value
QALWOBJRST. Current value: ___________________ . If the value is already *ALL, skip
this procedure.
- If you have previously locked this system value, go to SST (system service tools) and
unlock it.
- Use the command CHGSYSVAL to set QALWOBJRST to a value of *ALL.
- Complete the software installation or upgrade.
- To ensure system security, return the QALWOBJRST value to your normal setting (recorded
above) after completing the software installation.
:::

## SMA IBM i LSAM 18.1 and 04.00.03 Patches

These release notes list the most recent batch of patches available for installation after the IBM i LSAM version 04.00.03.320 was released in the last LSAM version 04.00.03 install file, LI040006. LSAM version 04.00.03 is compatible with OpCon through version 18.3.1, but there is no assurance that it will  remain compatible with future versions of OpCon. Install or upgrade to LSAM version 18.1 to be fully compatible with many new features supported only in the most recent versions of OpCon.

LSAM PTF numbers are assigned within the LSAM Technical Product Manager's PTF control tools. Support incidents are generated and tracked within SMA Technologies' latest tracking systems, and the incident numbers are associated with the LSAM PTF numbers. There may be more than one support incident associated with a given PTF number. The PTF descriptions below may include a reference to the originating support incident ticket(s).

Instructions for downloading and installing LSAM PTFs are found in a simple form in PDF documents that are stored with the LSAM PTF save files (LSCTLDTA and LSCUMPTF – or a partial content cumulative save file such as LSCUMPTF.308-364). The instructions are stored in the same directories as listed above under **Installing IBM i LSAM Patches**. Clients should also read the **Patch Readme.pdf** document for the appropriate LSAM version for additional CAUTIONS and other important instructions that may be added when new software patches are developed.

**SMA Technologies Installers**: Please consult the SMA Technologies TPM for this LSAM about the latest resources available that can simplify PTF application after an initial installation of this LSAM.

## Compatibility
These versions of the IBM i LSAM are compatible with OpCon Release(s) 16.0 and higher.
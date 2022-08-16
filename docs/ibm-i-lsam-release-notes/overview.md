---
sidebar_label: 'Overview & Reader Notes'
---

# Overview & Reader Notes

These release notes include all enhancements and fixed issues and for the IBM i LSAM, versions:

- [Version 21.1 New Features](./version-21.1-new-features.md)
- [Version 21.1 Fixes](./version-21.1-fixes.md)

## Reader Notes

The term "LSAM" used in this documentation refers to "Local Schedule Activity Monitor." This is the SMA Technologies software that is installed under IBM i to enable OpCon automation of IBM i and any jobs executing under this operating system. SMA Technologies documentation also refers to this software as the OpCon "Agent" for the operating system.  The OpCon server application itself executes the SAM (Schedule Activity Monitor) that orchestrates scheduling and event response among many instances of Agents and Connectors.

References in this documentation to “LSAM PTFs” refer to software patches for the OpCon Agent for IBM i. These are separate from IBM's PTFs for the operating system, and they are not related. However, SMA Technologies recommends that users should keep their IBM i PTFs current, updating them at least every six months (IBM provides quarterly updates to their PTFs). The following instructions are not related in any way to IBM i PTFs.

The IBM i LSAM was managed as a single version 04.00.03 for as many years as the Agent software was compiled over IBM i version V5R4. This version of the Agent introduced many fixes and enhancements, but all of those software improvements were carried forward into the LSAM versions 18.1 and 21.1.  LSAM version 04.00.03 is no longer supported by SMA.  All clients of SMA must be using LSAM Version 18.1, 21.1 or newer.  Any clients who might still be using LSAM version 04.00.03 should contact SMA Support for special assistance to successfully upgrade to a newer version of the agent.  The minimum IBM i operating system level supported for version 18.1 of the agent is i7.1 (V7R1), and for version 21.1 it is i7.2 (V7R2).

As of the publication of this document version, the current version of the IBM i LSAM was agent version 21.1. This version of the LSAM software was compiled over IBM i7.2.  (IBM only supports i7.2 under custom, extended support contracts.) Version 21.1 of the agent has been certified to operate correctly on currently supported versions of the IBM i operating system, through i7.5.

:::tip
New installs of the IBM i LSAM should use the install file named LI211043A (or newer LI211* file) install file.
:::

Clients performing LSAM PTF updates of existing IBM i LSAM installations should download and refer to the "IBM i LSAM Patch Readme" PDF document for special instructions about upgrading to the latest available PTF level.  There is a different LSAM PTF README file for each different LSAM base version (e.g., 18.1 or 21.1).

## Installing IBM i LSAM Patches

Please be careful to distinguish between SMA Technologies software patches for different versions of the IBM i LSAM. At SMA Technologies' secure ftp server there are different sub-directories for all resources pertaining to each version. Although the LSAM PTF save file names are similar (LSCTLDTA and LSCUMPTF), they are NOT interchangeable.

Using the wrong LSAM PTF files for a version will corrupt the LSAM software and require a restoration from the most recent backup of the LSAM libraries. SMA Technologies advises clients to always backup the LSAM libraries before attempting any patching or upgrading of the software.

Instructions for installing software patches (PTFs) to SMA Technologies' IBM i LSAM may be found in two places. There is a stand-alone Installation documentation that explains partially manual procedures that may be necessary after an initial installation or upgrade of the LSAM. There is also a topic in this **IBM i LSAM** documentation with detailed instructions and explanations.

:::tip
It may be necessary to change one of the system values for the IBM i operating system in order to permit the PTF installation program to restore program objects that use adopted authority. The IBM i LSAM software includes some programs that use adopted authority in order to enable required, specific system management functions to be completed by designated administrators without requiring that those system users have any special authorities. 

This is a common strategy, and IBM provides the following guidelines for managing the installation
of new software:

The QALWOBJRST system value (Allow restore of security sensitive objects) specifies whether
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

## SMA IBM i LSAM 21.1 Patches

These release notes list the most recent batch of patches available for installation after the IBM i LSAM version 21.1. 

LSAM PTF numbers are assigned within the LSAM Technical Product Manager's PTF control tools. Support incidents are generated and tracked within SMA Technologies' latest tracking systems, and the incident numbers are associated with the LSAM PTF numbers. There may be more than one support incident associated with a given PTF number. The PTF descriptions below may include a reference to the originating support incident ticket(s).

Instructions for downloading and installing LSAM PTFs are found in a simple form in PDF documents that are stored with the LSAM PTF save files (LSCTLDTA and LSCUMPTF – or a partial content cumulative save file such as LSCUMPTF.044-nnn). The instructions are stored in the same directory named /IBMiLSALMptf/ under the LSAM version-specific subdirectory for /OpCon Releases/Agents/IBMi/(version number)/. Clients should read the **README - IBM i LSAM nn.n. Patch Instructions and List (version number).pdf** document for additional CAUTIONS and other important instructions that may be added when new software patches are developed.

## Compatibility
This LSAM version is generally compatible with all supported releases of the OpCon central server application.
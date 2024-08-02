---
sidebar_label: 'Overview & Reader Notes'
---

# Overview & Reader Notes

These release notes include all enhancements and fixed issues and for the IBM i LSAM, versions:

- [Version 23.1 New Features](./version-23.1-new-features)
- [Version 23.1 Fixes](./version-23.1-fixes)

## Reader Notes

The term "LSAM" used in this documentation refers to "Local Schedule Activity Monitor." This is the SMA Technologies software that is installed under IBM i to enable OpCon automation of IBM i and any jobs executing under this operating system. SMA Technologies documentation also refers to this software as the OpCon "Agent" for the operating system.  The OpCon server application itself executes the SAM (Schedule Activity Monitor) that orchestrates scheduling and event response among many instances of Agents and Connectors.

References in this documentation to “LSAM PTFs” refer to software patches for the OpCon Agent for IBM i. These are separate from IBM's PTFs for the operating system, and they are not related. However, SMA Technologies recommends that users should keep their IBM i PTFs current, updating them at least every six months (IBM provides quarterly updates to their PTFs). The following instructions are not related in any way to IBM i PTFs.

The IBM i LSAM was managed as a single version 04.00.03 for as many years as the Agent software was compiled over IBM i version V5R4. This version of the Agent introduced many fixes and enhancements, but all of those software improvements were carried forward into the LSAM versions 18.1 and 21.1.  LSAM version 04.00.03 is no longer supported by SMA.  All clients of SMA must be using LSAM Version 18.1, 21.1 or newer.  Any clients who might still be using LSAM version 04.00.03 should contact SMA Support for special assistance to successfully upgrade to a newer version of the agent.  The minimum IBM i operating system level supported for version 18.1 of the agent is i7.1 (V7R1), and for version 21.1 it is i7.2 (V7R2).

As of the publication of this document version, the current version of the IBM i LSAM was agent version 21.1. This version of the LSAM software was compiled over IBM i7.2.  (IBM only supports i7.2 under custom, extended support contracts.) Version 21.1 of the agent has been certified to operate correctly on currently supported versions of the IBM i operating system, through i7.5.

:::tip
New installs of the IBM i LSAM should use the install file named LI211043B (or newer LI211* file) install file.
:::

Clients performing LSAM PTF updates of existing IBM i LSAM installations should download and refer to the "IBM i LSAM Patch Readme" PDF document for special instructions about upgrading to the latest available PTF level.  There is a different LSAM PTF README file for each different LSAM base version (e.g., 18.1 or 21.1).

## SMA IBM i LSAM 21.1 Patches

Please be careful to distinguish between SMA Technologies software patches for different versions of the IBM i LSAM. At SMA Technologies' secure ftp server there are different sub-directories for all resources pertaining to each version. Although the LSAM PTF save file names are similar (LSCTLDTA and LSCUMPTF), they are NOT interchangeable.

Using the wrong LSAM PTF files for a version will corrupt the LSAM software and require a restoration from the most recent backup of the LSAM libraries. SMA Technologies advises clients to always backup the LSAM libraries before attempting any patching or upgrading of the software.

Instructions for installing software patches (PTFs) to SMA Technologies' IBM i LSAM may be found in two places. There is a stand-alone Installation documentation that explains partially manual procedures that may be necessary after an initial installation or upgrade of the LSAM. Detailed instructions and explanations are found in the link just below.

### Summary of LSAM Enhancements and Fixes

These release notes include lists of the most recent batch of enhancements and patches available for application after the installation of the IBM i LSAM version 23.1. 

LSAM PTF numbers are assigned within the SMA internal product management control tools. Support incidents are generated and tracked within SMA Technologies' latest tracking systems, and the incident numbers are associated with the LSAM PTF numbers. There may be more than one support incident associated with a given PTF number. The LSAM PTF numbers assigned to enhancements are associated with the SMA Development department's project tracking system.  The list of LSAM PTFs available from the LSAM menu system documents the connections with support incidents or product enhancement tasks via the detail records listed under each PTF master record.  Type option 7 next to any PTF master record to view the list of details, then notice the "Case ID" column at the far right of the list. 

### Link to Detailed Instructions for LSAM Patch Installation

Instructions for downloading and installing LSAM PTFs are found in a simple form in [Managing LSAM Software Enhancements](./lsam-ptf-readme#introduction-to-ibm-i-agent-software-patches), a topic below in this section. Clients should study the instructions under [Installing IBM i LSAM Patches](./lsam-ptf-readme#installing-ibm-i-lsam-patches) for additional CAUTIONS and other important instructions that may be added when new software patches are developed.

## Compatibility
This LSAM version is generally compatible with all supported releases of the OpCon central server application.
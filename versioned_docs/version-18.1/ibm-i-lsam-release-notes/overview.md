---
sidebar_label: 'Overview & Reader Notes'
---

# Overview & Reader Notes

These release notes include all enhancements and fixed issues and for the IBM i LSAM, versions:

- [Version 18.1 New Features](./version-18.1-new-features.md)
- [Version 18.1 Fixes](./version-18.1-fixes.md)

## Reader Notes

The term "LSAM" used in this documentation refers to "Local Schedule Activity Monitor." This is the SMA Technologies software that is installed under IBM i to enable OpCon automation of IBM i and any jobs executing under this operating system. SMA Technologies documentation also refers to this software as the OpCon "Agent" for the operating system.  The OpCon server application itself executes the SAM (Schedule Activity Monitor) that orchestrates scheduling and event response among many instances of Agents and Connectors.

References in this documentation to “LSAM PTFs” refer to software patches for the OpCon Agent for IBM i. These are separate from IBM's PTFs for the operating system, and they are not related. However, SMA Technologies recommends that users should keep their IBM i PTFs current, updating them at least every six months (IBM provides quarterly updates to their PTFs). The following instructions are not related in any way to IBM i PTFs.

The IBM i LSAM was managed as a single version 04.00.03 for as many years as the Agent software was compiled over IBM i version V5R4. This version of the Agent introduced many fixes and enhancements, but all of those software improvements were carried forward into the LSAM version 18.1.  LSAM version 04.00.03 is no longer supported by SMA.  All clients of SMA must be using LSAM Version 18.1 or newer.  Any clients who might still be using LSAM version 04.00.03 should contact SMA Support for special assistance to successfully upgrade to a newer version of the agent.  The minimum IBM i operating system level supported for a newer version of the agent is i7.1 (V7R1).

As of the publication of this documentation, the current version of the IBM i LSAM was agent version 18.1. This version of the LSAM software was compiled over IBM i7.1.  (IBM only supports i7.1 under custom, extended support contracts.)  A newer version 21.1 of the LSAM has been published.  LSAM version 21.1 was compiled over IBM i7.2.  (IBM now only supports i7.2 under custom, extended support contracts.)  Please use the newer version of this documentation when working with that newer version of the Agent.  Both versions of the agent have been certified to operate correctly on currently supported versions of the IBM i operating system, through i7.4.

:::tip
New installs of the IBM i LSAM could use the install file named LI181001 (or a newer version that includes pre-installed patches, such as LI181027U). However, SMA now recommends that new installations should install Agent version 21.1 utilizing the latest LI211043A (or newer LI211* file) install file.
:::

Clients performing LSAM PTF updates of existing IBM i LSAM installations should download and refer to the "IBM i LSAM Patch Readme" PDF document for special instructions about upgrading to the latest available PTF level.  There is a different LSAM PTF README file for each different LSAM base version (e.g., 18.1 or 21.1).

## Compatibility
This LSAM version is generally compatible with all supported releases of the OpCon central server application.
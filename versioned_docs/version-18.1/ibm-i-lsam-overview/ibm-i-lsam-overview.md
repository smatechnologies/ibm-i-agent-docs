---
sidebar_label: 'IBM i LSAM Overview'
---

# IBM i LSAM Overview

The IBM i LSAM is an OpCon agent that enables OpCon to schedule IBM i jobs within an IBM i environment and to receive and respond to events detected by the agent within the IBM i partition.

Information within this documentation collection corresponds to the IBM i Agent version 18.1.055, which refers to the Agent version 18.1 that has software patches applied to LSAM PTF level 055.

## Scope
This documentation provides basic and advanced, conceptual and procedural information for running the IBM i LSAM. Information on running the central OpCon components falls outside the scope of this document. For information on OpCon, refer to Getting Started with OpCon in the Concepts documentation.

## Audience
This documentation is written for users with a working knowledge of the IBM i interface and a basic understanding of automated job scheduling concepts.  The information is designed to support both system operators and staff with programming experience.

## IBM i LSAM Utility Library
During the installation of the LSAM, the program offers options for specifying where to store certain key LSAM commands, such as the command used to enter the LSAM menu system (STRSMA). The default installation option is to put all LSAM utilities into a dedicated library called SMAGPL. This library replaces the use of the IBM i QGPL library, as was done by prior versions of the LSAM. It is still possible to store the key LSAM operational commands in the QGPL Library, as before. However, this IBM i LSAM documentation assumes the default installation.

:::tip
SMA Technologies no longer recommends sharing either QGPL or SMAGPL with more than one IBM i LSAM environment. SMA Technologies also recommends against installing the LSAM utilities into the IBM library QGPL.  However, users may still choose to copy certain simple LSAM commands to QGPL from the SMAGPL library, for convenience.  Please refer to the topic about installing alternate LSAM environments, such as a test environment, for more information.
:::

Whenever an LSAM command appears qualified by the library name SMAGPL/, this library name must be left off of the command name if the installation has chosen to install to the QGPL library. It would also not be necessary to qualify the command names if the site would choose to include the SMAGPL library in the default user library list for all users of the LSAM software.

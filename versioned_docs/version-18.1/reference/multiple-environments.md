---
sidebar_label: 'Installing Multiple Environments'
---

# Installing Multiple Environments

## Introduction

The term environment is being used to designate a group of IBM i libraries that comprise a library list. Each IBM i LSAM environment has its own library list.

Normal operations of the IBM i LSAM require only one environment. As the Agent software is installed, the default library list (environment SMADEFAULT) is assumed unless it is specifically overridden in the SMASETUP command and during the installation configuration prompts. The only time it is necessary to add an extra environment with a different library list is when a developer or administrator needs to test LSAM operations off line from the live (production) environment. Whenever possible, SMA recommends using a separate IBM i partition for installing a test LSAM environment, since there are two functions (Job Tracking and Restricted Mode) that experience conflicts if two LSAM environments exist within the same IBM i partition.

Creating and using extra IBM i LSAM environments requires an understanding of OpCon and LSAM operations and knowledge about the IBM i operating system, including an understanding of library lists and work management. Also study the detailed explanation of the multiple environment commands in LSAM Environment Management: STRSMA, LSAMENU, SMASETLIBL, SMALIBMGT and SMALIBINQ, before attempting to use the following procedures for creating and starting an extra LSAM environment.

There are two approaches that SMA supports for installing an alternate LSAM environment:

- Install a new environment from the installation save file using the SMASETUP command (refer to [IBM i Agent 18.1 Installation/Upgrade Instructions](../installation/installation.md)).
- Use the IBM i CPYLIB command (or a similar method for duplicating libraries, such as Save/Restore) to clone an existing LSAM environment and adapt it to an alternate environment with a different library list.

Installing a new copy of the LSAM (especially using the LI181027U (or newer) installation save file) has the advantage of using the least amount of disk space for the alternate environment. However, the CPYLIB method offers the advantage of preserving existing automation strategies that may have already been configured in the source environment.

:::tip
When using the CPYLIB method, it is necessary to perform two operations in the source environment before beginning the copy process:

1. Be sure to install all the latest available PTFs from SMA. One or more of these are required for the CPYLIB procedure to work correctly.
2. The new environment library list must be predefined using the SMALIBMGT command in the source environment before the CPYLIB process is begun. It is difficult to manage the cloning process correctly without the new library list being defined in advance.
:::

For further details about creating an LSAM environment with the CPYLIB command see [Clone an Existing Environment](/reference/multiple-environments-how-to-add-an-lsam-environment#method-2-clone-an-existing-environment) which includes details about how to use the LSAINIT command that is required to complete alignment and configuration of a cloned LSAM environment.
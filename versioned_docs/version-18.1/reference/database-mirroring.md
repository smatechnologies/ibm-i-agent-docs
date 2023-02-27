---
sidebar_label: 'Managing Database Mirroring'
---

# Managing Database Mirroring
## Managing Database Mirroring

This topic provides general guidance about how to manage IBM i DB2 database mirroring applications before attempting to install, upgrade or update (with LSAM PTFs) the OpCon Agent for IBM i (also refered to as the IBM i LSAM).

## How Database Mirroring Affects LSAM PTFs and Installs or Upgrades

There are several strategies for high availability and disaster recovery that support IBM Power Processors, and specifically the IBM i operating system.  In general, the hardware-based solutions that manage copies of an IBM i partition are not known to interfere with the maintenance of the OpCon Agent for IBM i.  

However, database mirroring solutions that operate from within an IBM i partition typically impose locks on objects such as files, data areas and libraries during the moments when those objects are first created or when they are modified.  The locks are usually transient, that is, they persist for only seconds (or less).  But while the IBM i LSAM software is being installed or upgraded those locks can temporarily block steps of the LSAM maintenance process.

### Summary of Conflict Prevention and Recovery

The instructions below provide guidance about rules that can be added or modified within a database mirroring application to help prevent object locks that interfere with an IBM i LSAM software maintenance process. However, the guidance that SMA can offer is only general.  It may not address every possible lock conflict that could occur. Here are some of the reasons why the lock prevention strategy may vary:

- Database mirroring rules will vary depending on which mirroring application is being used.
- The strategies for mirroring will typically vary from site to site.
- The OpCon Agent for IBM i uses object names that vary according to LSAM version numbers and according to a sequence of software patches that must each have a unique identity.   

These variations imply that a client site might discover object lock conflicts that were not anticipated. When this happens, a client site can take actions to recover from a temporary lock and then possibly modify their database mirroring rules to avoid a similar lock conflict during future LSAM maintenance cycles.

Recovering from an object lock conflict that has interrupted an LSAM software maintenance process involves these steps:

- First, do not answer the error message before completing an examination of the job log.
- View the IBM i job log of the job where the LSAM maintenance process has stopped due to an error.
  - This is best done by using a second interactive workstation session to view the log of the job that has reported the error.
- Look at several messages in the job log that appear before the suspending error.
  - The goal is to find a message that says something like, "object in use by another process."
- If the error condition cannot be easily determined, SMA recommends leaving the job suspended while the site contacts SMA Support to request immediate assistance with a failed maintenance process.  It is better to get advice and then perform a reliable recovery action than to guess about what to do and accidentally create a complicated failure of the maintenance process that could require many recovery steps.
- In most cases, the IBM i Agent maintenance processes that are interrupted by object locks are IBM i Control Language programs, and for this type of error in CL programs it is usually appropriate to reply to the error message with an "R" (= Retry).  This would cause the failing CL program step to be repeated, and by this time the transient lock from database mirroring will usually be released so that a Retry action will succeed.

:::warning
SMA warns against guessing about how to reply to IBM i error messages.  Careful analysis by an experienced programmer or system analyst is important for avoiding a big mess that could be difficult to repair.  When managing error messages reported by SMA software, please contact SMA Support for assistance if the site does not have an experienced IBM i analyst available to evaluate problem situations with confidence.  SMA Support has access to team members who know the software well and who can provide effective recovery or restart procedures.

Remember that the repy of "R" = Retry does NOT work with RPG programs!  It is unfortunate that the Message Help Text from IBM i error messages suggests that R may be an appropriate response to many error messages.  While it is true that the error message offering this advice can accept a reply of "R", the problem is that the program where the error occurred might not be able to perform a Retry operation.  In modern programming, Control Language programs MAY be able to retry a previous CL command step.  But RPG programs are no longer written as they were many decades ago, and so they cannot properly manage a Retry request.
:::

## Identification of DB2 Objects that Might Be Locked by Mirroring

These general guidelines will need adapting, depending on the phase of an installation or upgrade process.  Please study these guidelines and prepare a plan in advance for managing a database mirroring application.

Just prior to a new installation or an upgrade of the OpCon Agent for IBM i, SMA recommends implementing filters in the mirroring software in advance to prevent unnecessary mirror operations as new LSAM libraries (some temporary) are being installed and manipulated, as new control data areas are created, and as database tables are renamed and replaced.

### Database Mirroring Filters for LSAM Installation or Version Upgrades

:::note
Except when specific library names are referenced in the following guidelines, the base names of the four LSAM libraries would be different when working with an LSAM Test environment.  The base library names are the ones distributed with the LSAM software product as part of the default LSAM environment named SMADEFAULT.
:::

- Disable all forms of mirroring (including library contents if there are separate mirroring rules at this level) for all four LSAM libraries that will be created during a new installation or recreated during an upgrade:
  - SMAGPL
  - SMADTA
  - SMAPTF
  - SMAPGM
- Similarly, if the LSAM environment cloning process will be used, register in advance filters that, when activated, will temporarily prevent mirroring of the intended new library names.
- During an upgrade, the following existing libraries will be renamed using a prefix appended to the time of the upgrade. Add mirror filter rules to temporarily prevent mirroring of the renamed libraries:
  - SMAGPL is renamed SMAG112233 (where 11:22:33 is a time stamp of the rename)
  - SMAPTF is renamed SMAT112233
  - SMAPGM is renamed SMAP112233
- Also during an upgrade, a temporary library that has a name beginning with the letters "LD" will be restored.  This library contains new database file structures that will be used to replace existing files in the SMADTA library.
  - For example, if the new release install library is named LI181027, then the temporary database library with new objects would be named LD181027.
  - If other libraries in the partition's database also begin with these letters, then the mirroring filter name can be extended with the LSAM release digits, so the partial name that matches the temporary database upgrade reference library for version 21.1 would be "LD181\*".

When upgrading an existing LSAM library set from LSAM version 04.00.03 to 18.1, disable the replication for the LSAM libraries just before starting the PTF installation process that is *required* to be used to catch up an existing LSAM environment version 04.00.03 to the latest LSAM PTF level. (**It is required to catch up the 04.00.03 version LSAM PTFs before upgrading to version 18.1.**) There is a potential conflict between an aggressive "mirror all" strategy and the repeated process of creating and updating PTF control data areas.  Review the details about managing datasbase mirroring during the LSAM PTF process under the next topic heading.

After an LSAM installation or upgrade is complete, remember to restart mirroring and de-active the temporary filter rules.  Upon restart, if all mirroring was stopped for the LSAM libraries, expect a short, high-volume replication of the LSAM software objects that were updated or replaced during LSAM PTF application.  Ensure that the libraries updated by PTFs (SMADTA, SMAGPL and SMAPGM) are fully replicated to the mirror site.  


:::important
In all cases, SMA recommends adding a permanent filter rule to the database mirroring software configuration, to NOT attempt to replicate the LSAM clones of the IBM i SBMJOB command, since they cannot be successfully saved and restored on the target system. (Replace the SMAPGM library name as necessary, for alternate LSAM environments.)

```
SMAPGM/SBMJOB

SMAPGM/SBMJOB2

SMAPGM/SMASBMJOB
```

These commands must be reproduced directly in the mirror database by executing the LSAM's LSAINIT command directly within the mirror target partition. See [Clone an Existing Environment](/reference/multiple-environments-how-to-add-an-lsam-environment#method-2-clone-an-existing-environment) for details about how to use the LSAINIT command that is required to complete alignment and configuration of a cloned LSAM environment.

SMA intends to eliminate these clones of IBM i commands in a future version of the LSAM.
:::

### Managing Database Mirroring During PTF Installation

If database replication (mirroring) is being used, disable the replication for the LSAM libraries during the PTF installation process.  There is a potential conflict between an aggressive “mirror all” strategy and the repeated process of creating and updating PTF control data areas.  Here are methods that can be used to prevent this recognized potential conflict:

- A general way to avoid conflicts with the IBM i LSAM PTF application process is to stop all mirroring for these four LSAM libraries (including library contents if there are separate mirroring rules at this level):  SMAGPL, SMADTA, SMAPTF, SMAPGM.

- As each LSAM PTF is applied, a temporary library is restored with a name beginning with the letters "LS".  If other libraries in the partition's database also begin with these letters, then the mirroring filter name can be extended with the LSAM release digits, so the partial name that matches every LSAM PTF for version 18.1 would be "LS181\*".

- If the site prefers (or needs) to attempt to block mirroring at the individual object level, some PTF conflicts can be avoided by establishing mirror filter rules to NOT replicate these objects:
  - Data areas (object type \*DTAARA) that have names starting with PTF\* from libraries SMAGPL and SMADTA
  - Save files in library SMAPTF with names starting with RBK\*.  (See further discussion in the NOTE, just below).

After the PTF installation is complete, remember to restart mirroring and de-active the temporary filter rules.  Upon restart, if all mirroring was stopped for the LSAM libraries, expect a short, high-volume replication of the LSAM software objects that were updated or replaced during LSAM PTF application.  Ensure that the libraries updated by PTFs (SMADTA, SMAGPL and SMAPGM) are fully replicated to the mirror site.  

:::note
The contents of library SMAPTF are not critical for daily operation of the LSAM services. This library contains only the rollback save files that can support removal of a recently applied LSAM PTF (if the PTF allows rollback).  However, no SMA client has had to use this feature, since it was created primarily for SMA internal use during development testing.  Therefore, it is not ever necessary to replicate the contents of library SMAPTF to the mirroring target partition.  Any rollback action performed on the source Production partition would be mirrored to the targets, so they would not need or use the rollback save files unless a Disaster Recovery partition would take over as the primary production machine.  In that case, the programs for applying LSAM PTFs will create new rollback save files as necessary during new PTF application.  If there were ever an extreme situation where it would be necessary to rollback a PTF from a mirroring target partition, please contact SMA Support for assistance.  SMA can provide appropriate replacement rollback save files after the situation is analyzed by SMA Support.
:::


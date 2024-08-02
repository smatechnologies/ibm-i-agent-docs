---
sidebar_label: 'Version 23.1 Fixes'
---

# Version 23.1 Fixes

This topic shows a combined list of the LSAM fixes and enhancements that have been added to the OpCon Agent for IBM i since LSAM version 23.1 was released.  The enhancements listed here are the ones that were added to the LSAM version after it was published.  They are included with the fixes to help evaluate the status of an installed LSAM.

## IBM i LSAM 23.0 PTFs

The PTF Level is the value that clients and SMA Support will use to confirm the software level of each LSAM installation.  View the PTF List display from LSAM menu 9, option 1, to identify the PTF Level of each PTF.  It may or may not be the same as the last three digits of the PTF Names shown in the following list, since the PTF level number is assigned separately from other PTF profile data and it will not always match the PTF Name assigned to any given software patch.

### LSAM DB LVL # 23.0.000

#### ENHANCEMENTS

**IBMI-271:** PTF230000  This Epic (collection of Stories and Tasks) represents the final solution for preventing confusion between duplicate IBM i Job IDs and their associated OpCon Jobs.  In high volume environments, the IBM i Agent daily purging of aged OpCon Job data was insufficient to prevent this confusion.  An interim solution that only protected the most critical active job management tasks, adding the OpCon Job Number to the key values identifying IBM i Jobs within the Agent's database allowed a default rule to fetch the most recent instance of any given IBM i Job ID (comprised of the IBM i Job Name, User Name and IBM i Job Number).

Release 23.1 represents a pervasive addition of an IBM i Job's Date plus the Job Entry Time (time when a job first gets assigned an IBM i Job Number, which is whenever a job first reaches a job queue, or when an interactive job is first initiated by a user logging on to a workstation).  
- The Job Entry Date is comprised of 8 digits:  CCYYMMDD (century, year, month, day)
- The Job Entry Time value is limited to 6 digits: HHmmSS  (hours, minutes, seconds)
    - NOTE:  In the future, super-high speed processing within an IBM i partition might require extending the Job Entry Time key value to include micro-seconds.  The current design will prevent confusion of duplicate IBM i Job IDs up to a rate of 1 million jobs per second.

#### FIXES

- Fixed: (# 2300nnn) The PTF range beginning with digits "230" will contain only software patches developed during beta site testing.

- Fixed: (# 231nnn) The PTF range beginning with digits "231" will contain software patches developed after the public release of the OpCon Agent for IBM i at version 23.1.




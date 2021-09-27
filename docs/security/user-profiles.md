---
sidebar_label: 'User Profiles'
---

# LSAM User Profiles

## IBM i LSAM Operator Authority

The IBM i LSAM Installation instructions and this **IBM i LSAM** online
help state that the standard IBM i system operator user profile,
QSYSOPR, should be able to operate the LSAM software, performing the
functions of starting and stopping the LSAM server jobs. An IBM i LSAM
user site may or may not wish to authorize the system operator to
perform other functions supported by the LSAM menu system. Most of the
LSAM menu functions are for configuration tasks or diagnostic purposes,
and these might be restricted to users who have been authorized,
according to the procedures described in this topic.

:::note
The QSYSOPR user profile is specifically enabled to start or stop the LSAM server subsystem and jobs as of LSAM version 03.31.03, with PTF \# 16318 applied. Prior versions of the LSAM may require manual security maintenance procedures to enable QSYSOPR to perform these functions.
:::

The strategy for an IBM i LSAM operator prevents the operator from
performing LSAM configuration or master file maintenance tasks. These
tasks must be performed by a user with LSAM administration authorities,
as described in a following section of this topic.

## How to Enable an LSAM Operator User Profile

The IBM i LSAM installation instructions and many places in this **IBM i
LSAM** online help describe how to operate the LSAM software using the
IBM i security officer profile (QSECOFR), or, using a user profile that
has \*ALLOBJ special authority.

The default installation of the IBM i LSAM software enables the IBM i
default system operator (QSYSOPR) to start or stop the LSAM server
programs, to view the status of the LSAM servers and to work with
tracked jobs. QSYSOPR is not granted any other authority to use LSAM
functions.

To enable another user-defined user profile (for example, SMAOPER) to
operate the LSAM software, that user profile must be granted the
authorities shown in the LSAM Object Authority table (LSAM menu 9,
option 8) that apply to QSYSOPR, also identified in the discussion of
the LSAM Operator Authorities, below. The IBM i command GRTOBJAUT can be
used to grant these authorities, but the LSAM Work with object authority
function includes a convenient option 1=apply that can be used on one or
more objects at a time to implement groups of object authority rules
associated with each object selected from the list.

Similarly, to disable QSYSOPR and prevent this system operator profile
from managing the LSAM environment, the same authorities shown for
QSYSOPR in the LSAM object authority table must be revoked, using the
RVKOBJAUT command. Again, after the LSAM Work with object authority
function has been used to configure the desired object authorities,
those authorities can be applied using the convenient option 1=apply
from the list of Special Object Authorities.

## IBM i LSAM Administrator Requirements

The default installation of the IBM i LSAM requires that there exist an
LSAM Administrator user profile that has \*ALLOBJ authority. QSECOFR may
be used for this purpose. Since the LSAM Operator is a user profile with
restricted privileges, the following rules apply:

- When the LSAM software is installed, it is required that the
    installation be performed by QSECOFR. A user profile with equivalent
    authority may be used, but during the installation process, a check
    is made of the required user profiles, so \*SECADM authority is
    required in addition to \*ALLOBJ authority.
- The LSAM Parameters must first be configured by an LSAM
    Administrator before the LSAM Operator will be allowed to start the
    LSAM server programs.
- Only an LSAM Administrator user profile may perform LSAM
    configuration functions.
- Only QSECOFR or an LSAM Administrator with \*ALLOBJ authority is
    allowed to maintain the User Management validation lists
    (function 1) on the LSAM Operator Replay menu (LSAM menu 4).
- Only QSECOFR or an LSAM Administrator with \*ALLOBJ authority is
    allowed to maintain the External Event Password (function 2) on the
    LSAM Events menu (LSAM menu 3).

It is possible to create a limited LSAM Administrator user profile, or
other categories of LSAM user profiles, that would not have \*ALLOBJ
authority. These categories of LSAM users might be useful for enabling
certain LSAM users to perform some kinds of LSAM master file maintenance
without having to make them super users with \*ALLOBJ authority.

Strategies for creating limited LSAM Administrator user profiles are
discussed in the following sections of this document.

### LSAM Administrator Use of \*ALLOBJ Authority

\*ALLOBJ authority is the easy way to enable the LSAM Administrator to
complete various pre-programmed tasks such as:

- Registering an Exit Program to IBM i (used by Job Tracking).
- Making it easier for the LSAM Administrator to update any of the
    LSAM control files in the SMADTA database library.
- Allowing the LSAM Administrator to perform the User Management
    function on the LSAM Operator Replay menu and the External Events
    Password function on the LSAM Events menu.

It is possible to create an LSAM Administrator user profile that does
not have \*ALLOBJ authority, as long as that user profile has \*USE
authority to all the LSAM Menu functions and sub-programs in the LSAM
program objects libraries (default names SMAGPL and SMAPGM), and
\*CHANGE authority to all the files in the LSAM database library
(default name SMADTA) plus certain files stored in SMAGPL. For example,
the LSAM User Management function requires that the LSAM Administrator
be granted \*CHANGE authority to the LSAM validation list object as well
as specific authority to \*USE the LSAM User Management function
programs.

The LSAM objects that must be authorized for each LSAM Menu function are
identified in the table of object authorities described later in this
topic.

The LSAM Administrator also requires access to some other normally
restricted IBM i commands and objects, such as managing IBM i exit
program entries. If this user profile does not have \*ALLOBJ authority,
then it is possible for some LSAM configuration procedures to fail, at
which time it will be necessary to debug the failure and to assign the
special authority required for the LSAM Administrator.

SMA has made an effort in this topic to provide general guidance about
the security and authorities required to operate the LSAM software.
However, not every detail of the LSAM software analysis is documented in
this topic, for reasons of system security and protection of proprietary
design information. LSAM user sites that need to implement high security
restrictions are advised to contact SMA Support for additional technical
information that may be available to the security officers of licensed
SMA software user sites.

### \*SECADM Authority is No Longer Needed

Previous documentation about the LSAM Administrator authorities
specified that \*SECADM (security administration) authority was required
for an LSAM Administrator to use some of the LSAM menu functions. This
authority should no longer be required. For example, the validation list
method of managing security for certain LSAM functions is controlled by
IBM i object authority, so special security administration authority is
not required to manage this feature. However, following a default
installation of the LSAM software, this feature is restricted for use
only by QSECOFR or an LSAM Administrator with \*ALLOBJ authority.

The only requirement for security administration authority would be when
the IBM i security officer might create user profiles, such as an
alternate SMAOPER user profile that is suggested as an option in this
topic. The configuration of the Restricted Mode special user profile
SMASAV is administered by specially compiled programs that can only be
executed by authorized LSAM Administrators, so this function also does
not require \*SECADM authority.

## Diagnosing LSAM User Profile Problems

If error messages arise when any restricted LSAM user profile tries to
use LSAM functions, it is very helpful to SMA Support if the following
information is provided whenever an error message is encountered:

1. Position the cursor over the error message and press the HELP key,
    or key sequence (typically ALT + F1, in the IBM iSeries Access
    workstation emulation program) in order to display the secondary
    message help text. Capture this text and report it.
2. While the secondary help text for a message is showing on the
    screen, look for the function key F9=Display message details. Press
    F9 when it is available and capture the information about the
    program that has reported the message.
3. If possible, created a job log report from the interactive job where
    the error occurred, or find the job log report from a batch job, and
    convert it to an ASCII text file that can be attached to the problem
    report submitted to SMA Support. Job log reports for interactive
    jobs can be obtained as the interactive session is ended using this
    command and parameters:

Be sure to note the ID of the job (number/user/job_name) before signing
off so that the job log report can easily be found after the job ends.

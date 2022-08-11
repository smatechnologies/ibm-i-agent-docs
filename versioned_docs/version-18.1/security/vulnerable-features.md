---
sidebar_label: 'Potentially Vulnerable LSAM Features'
---

# Potentially Vulnerable LSAM Features

SMA has made an effort to protect the default installation of the IBM i LSAM software from unauthorized users by careful attention to the authority of all objects included with the software. Wherever special authorities are absolutely required by the LSAM server programs or by certain maintenance functions found on the LSAM menus, the LSAM programs may have been compiled to include the required authority using a means that does not allow unauthorized users to somehow adopt that special
authority for any other purpose.

As explained in this topic, the LSAM server user profile SMANET is intended to be a user profile without a password. It should not be possible for a user to sign on or run jobs as the SMANET user. It is not necessary for any user to have authority to the SMANET user profile in order to successfully manage the operation of the LSAM servers. The SMANET user profile must not be added to the list of authorized users in the OpCon User Interface, so that no jobs can be submitted that
would run with the authority of SMANET.

This strategy presents a secure means to automate IBM i operations without making the system vulnerable to security breaches or unauthorized use.

However, the security of the LSAM software depends also on the careful administration of user profile security in the OpCon User Interface. Care must be taken that OpCon does not permit unauthorized users to submit jobs to the IBM i operating system. In general, the object authority of IBM i objects such as programs and files is protected and honored by the IBM i LSAM server programs. However, the LSAM servers cannot protect the system if OpCon authorizes a user profile that has extensive authority, such as *ALLOBJ or *SECADM authority, to run jobs.

It is just as important to carefully protect the role of the OpCon administrator as it is to protect access to the security officer authority of IBM i. No one without security officer authority must be permitted to submit jobs via OpCon of a type that could then be used to open security breaches within the IBM i operating system, breaches that could later be accessed directly from IBM i without using OpCon.

There are two optional features provided with the IBM i LSAM software that also require careful attention in order to protect the IBM i system. Both Operator Replay and Restricted Mode are based on script files. Without proper care, it could be possible for someone to enter a script that would perform an operation intended to open a security breach in the system.

## Operator Replay

The Operator Replay feature of the IBM i LSAM is based on the use of action scripts that are recorded in LSAM database files in its IBM i UDB DB2 database. Scripts could contain virtually any command or program call supported by IBM i. This feature can be protected against security breaches by the following practices:

- Always restrict who may have access to the Operator Replay script maintenance function.
- Always restrict who may have access to the Operator Replay script master file.
- Do not allow anyone except the IBM i security officer to perform the User Management function of the Operator Replay menu.
- Carefully control the user profiles entered into the User Management function of the Operator Replay menu. Keep in mind that this user registration is also used for functions such as the IBM i LSAM support for IBM i FTP jobs. This may mean that the Operator Replay script functions should not be configured with a user profile that  has been registered for the purpose of using FTP, because the authority required for FTP may be too extensive for use with a Replay script.
- Carefully control which user profiles are allowed to execute Operator Repay scripts from OpCon jobs.

In general, the IBM i LSAM Operator Replay function scripts are still controlled by IBM i object authority and user security. This is possible because the LSAM server that executes operator replay scripts actually only logs the user onto a virtual terminal. Once that step is completed, the script commands are submitted to the virtual terminal as if the replay user profile were typing them on a workstation keyboard. IBM i will reject any violation of user security or object authority rules, and this will cause the operator replay session to end abnormally.

## Restricted Mode

The IBM i LSAM support for Restricted Mode operations is based on the use of action scripts that are recorded in LSAM database files in its IBM i UDB DB2 database. Scripts could contain virtually any command or program call supported by IBM i, similar to the Operator Replay scripts. This feature can be protected against security breaches by the following practices:

- Always restrict who may have access to the Restricted Mode script maintenance function.
- Always restrict who may have access to the Restricted Mode script master file.
- Do not allow anyone except the IBM i security officer or an authorized LSAM Administrator to perform the Setup Environment function of the Operator Replay menu. The LSAM Administrator will be able to perform this function as long as the LSAM Administrator is a super user with \*ALLOBJ authority. This is generally acceptable, but it may be worthy of review in very high security environments.

In general, the IBM i LSAM Restricted Mode function scripts are still controlled by IBM i object authority and user security. This is possible because the LSAM server programs that execute operator replay scripts do not assume any authority that is not already granted to the special restricted mode user SMASAV. IBM i will reject any violation of user security or object authority rules, and this will cause the restricted mode session to end abnormally. However, by definition, the SMASAV user profile has some powerful authority in order to be used to perform restricted mode operations, so emphasis is placed on careful control of the LSAM Restricted Mode scripts maintenance and master file.

The Restricted Mode operation is also protected by the way the IBM i console job functions when the special user profile SMASAV has signed on. The console does not permit the SMASAV user to exit from control of the LSAM restricted mode driver program. It is not possible for anyone to gain access to general command entry from the SMASAV session on the IBM i console device.

## Multi-Step Job Script

The Multi-Step Job Script feature of the IBM i LSAM is based on the use of action scripts that are recorded in LSAM database files in its IBM i DB2 database. Scripts could contain virtually any command or program call supported by IBM i. This feature can be protected against security breaches by the following practices:

- Always restrict who may have access to the Multi-Step Job Script maintenance function.
- Always restrict who may have access to the Multi-Step Job Scripts - Steps master file.
- Carefully control which user profiles are allowed to execute Multi-Step Job Scripts from OpCon jobs.

The IBM i LSAM Multi-Step Job Scripts are still controlled by IBM i object authority and user security. However, this useful utility will typically require some user profile configuration and changes to the LSAM Object Authority (LSAM sub-menu 9, option 8), because the Job User defined in the OpCon job master record must have authority to use the LSAM command STRMLTJOB and the command driver program STRMLTJOBC. 

The script job user must also have authority to any commands and software applications (including their files) that will be utilized by a script. Therefore, if the job user profile does not already have authority to use objects owned by the LSAM server user profile SMANET, then the LSAM object authority function must be used to grant \*USE authority to the script job user profile for both the command and its driver program. In addition, the driver program STRMLTJOBC should be changed to run under the \*OWNER authority (where the owner can typically be left set to SMANET), so that the job user will not need separate authority for any of the files and sub-programs utilized by the LSAM Multi-Step Job Script feature. For additional questions and advice, please contact SMA Support.
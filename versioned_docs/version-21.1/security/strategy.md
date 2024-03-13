---
sidebar_label: 'LSAM Security and Object Authority'
---

# LSAM Security and Object Authority

The information contained in this topic is important for administrators of the IBM i LSAM software product and its server functions as an agent to OpCon.

Some of the information in this topic is critical for IBM i LSAM user sites that have implemented very high security restrictions in IBM i. In particular, the contents of this topic must be understood if the site intends to restrict the LSAM server user profile, SMANET, so that it does not operate with its default \*ALLOBJ (all object) authority.

This topic also highlights some of the IBM i LSAM features that could potentially be made vulnerable to security breaches. It explains the vulnerabilities and discusses possible strategies for protecting IBM i when these features are used.

Access to maintenance of LSAM object authority, should that be required, is available from the LSAM menu 9. PTF and Security Menu. This menu is explained in [LSAM Software Maintenance (PTFs)](../maintenance/ptf.md), but the function to Work with object authority is explained in this topic.

## LSAM Security Strategy

As a result of the default installation procedure, the IBM i LSAM server user profile SMANET is created with \*ALLOBJ authority. This authority makes it possible for the LSAM servers to accomplish any of their assigned tasks without requiring that the IBM i environment security or object authority be changed in any way. This broad authority makes it easy for SMA staff to accomplish full demonstrations of the product, and then quickly uninstall the demo product, with very little effort and no impact on the client's environment. It also makes it easier for new clients to explore the LSAM capabilities until they can be well understood. After the initial installation and testing is accomplished, a client site may wish to undertake the complex task of limiting the authority of the SMANET user profile.

The IBM i LSAM software and its supporting database are installed with the \*PUBLIC user restricted (generally, excluded). Other than the SMANET server user profile, only the Restricted Mode user profile SMASAV and the system operator user profile QSYSOPR have been granted certain specific authorities to the LSAM programs and database. This severe restriction of the LSAM software was implemented in order to accommodate SMA clients who have very strict security environments.

The restriction of access to the LSAM operations does not necessarily impede the function of the LSAM. Once the LSAM server jobs have been started, the LSAM's user profile SMANET is still able to process job start requests from OpCon. Details about the authorities required to run jobs for OpCon are provided in this topic and in the IBM i LSAM Installation instructions, under Install the LSAM, steps 23 - 26. These steps provide important information that must be read and understood. Please contact SMA Support with any questions about the installation steps.

:::tip
Technical support personnel might need to know that certain LSAM programs were created to run with the program owner's authority, rather than the program user's authority. This permits the LSAM server programs to complete some required internal maintenance as jobs are executed, without allowing unauthorized users access to the LSAM database files.
:::

The LSAM programs and database files are secured using IBM i object authority at the object level. The LSAM software libraries (SMAGPL, SMADTA, SMAPGM and SMAPTF) are distributed with the *PUBLIC user granted *USE authority (which includes *EXECUTE authority). However, almost all of the individual program and file objects are set to *EXCLUDE the *PUBLIC user.

It is theoretically possible to implement different user profiles that would be authorized to, or restricted from LSAM operations and configurations functions. The detailed analysis of the LSAM software required to implement this strategy can be performed using the tables of object authorities described later in this topic. An IBM i security officer could grant or revoke authority to each LSAM function in order to develop different Group or individual user profiles that would be restricted from some LSAM functions but authorized to others.

## The LSAM Server User Profile: SMANET

The IBM i LSAM default installation creates a user profile named SMANET that is used to execute the LSAM server jobs. The default installation assigns *ALLOBJ authority to user SMANET because this makes it easy to install and demonstrate the LSAM software. This strategy of assigning broad authority to user SMANET also makes it easy to install and use the LSAM as part of an OpCon network inside of a contained and secure computing environment that is already protected from intrusion or attack by means outside of IBM i. The default installation values would be appropriate in an environment where it is sufficient to protect the system by careful management of user profile passwords.

If the IBM i LSAM installation site does not require exceptionally high security, a great deal of administrative work can be saved and the correct operation of the LSAM server programs can best be assured by accepting the default installation values and allowing the LSAM server user profile SMANET to use *ALLOBJ authority. The following discussion may help to understand why this could be considered a safe strategy for many sites.

User profile SMANET does not have a password, so it is not possible for an IBM i user to log on as SMANET. No other user is allowed to use the SMANET user profile, except that the system operator (QSYSOPR) is provided with indirect authority sufficient to start and stop the LSAM server jobs. In many environments, this restriction makes it safe for SMANET to operate with \*ALLOBJ authority, as long as the OpCon security administrator does not configure SMANET as a user profile with an ability to submit jobs from an OpCon schedule. User SMANET requires extensive authority in order to enable the LSAM to perform any function of the IBM i operating system and also operate any third-party software that would typically be executed by an OpCon schedule.

Additional information about user profile SMANET is provided in the following sections of this topic. This information may prove helpful if it is necessary to apply high security restrictions to the LSAM software and its user profiles.
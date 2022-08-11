---
sidebar_label: 'LSAM Environment Management'
---

# LSAM Environment Management

The IBM i LSAM software is capable of supporting more than one LSAM environment within a single copy of the IBM i operating system (on a single operating system machine, or in the same LPAR of a machine with multiple logical partitions). There is normally no reason to install a second live LSAM environment within the same copy of IBM i, because the LSAM is meant to control the entire IBM i environment. However, a second LSAM environment might be useful for testing new procedures or new software.  Test LSAM environments should ideally be created in a separate IBM i partition, but it is possible to install more than one copy of the LSAM into a single environment using unique library lists, as long as the constraints are observed. There is also a purpose for creating an LSAM environment record without actually installing another copy of the LSAM.

The instructions for defining an LSAM environment are summarized below. There is a detailed explanation of how to actually install multiple environments and activate them successfully in [Installing Multiple Environments](../reference/multiple-environments.md). One case where a new environment name must be created without installing an LSAM environment is during configuration of Restricted Mode operations.

Following the basic instructions for defining an environment is an important explanation about how the LSAM utility library, SMAGPL, is used. The discussion includes an explanation about the option of using (or retaining) the IBM library QGPL for LSAM environment management.

:::tip
SMA no longer recommends sharing the SMAGPL library between more than one LSAM environment. Each LSAM environment should have its own SMAGPL library. This constraint prevents potential difficulties with managing software patches (PTFs).
:::

After the review of environment definition rules there are details about each of the IBM i LSAM commands that are used to manage multiple LSAM environments.

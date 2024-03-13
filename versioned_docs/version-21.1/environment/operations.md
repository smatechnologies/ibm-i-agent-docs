---
sidebar_label: 'Environment Management Operations'
---

# Environment Management Operations

## Create or Maintain an LSAM Environment Definition

These instructions refer to the process of building an LSAM environment definition.  This is a pre-requisite for performing the actual LSAM installation process, except when installing the LSAM software into an IBM i partition for the first time.

1. It is required to complete the Multiple Environment installation instructions before using a new environment that is created in the same IBM i partition.
:::tip
Refer to [Installing Multiple Environments](../reference/multiple-environments.md). It is not necessary to install a multiple environment just to set up a library list for use with Restricted Mode operations (or for any other utility use of LSAM library list management that might be useful). In this case, the environment name is just a label for the library list.
:::
2. In the command line, enter **SMAGPL/SMALIBMGT**. For more information, refer to [SMALIBMGT](./commands.md#smalibmgt).
3. To add a new environment: Type the name and information defining a new environment on one of the blank list lines, and then press <**Enter**> to record the changes.
4. To change an existing environment: Type any changes on the existing line where the environment is already defined and press <**Enter**> to record the changes.
5. Build or maintain the library list for the environment by entering **5** next to the environment name and pressing <**Enter**>.
6. Type new or changed library list information on the library list display, and then press <**Enter**> to edit the data.
:::tip
Be sure to specify the library Type symbols in the correct order. Refer to the
SMALIBMGT command for more information about library Types. Also, all LSAM environment
library lists must include the SMAGPL library (or equivalent) for the LSAM programs
to execute correctly.
:::
7. Press <**F14**> (Confirm) to record the library list changes to the control file.
8. Press <**F12**> (Return) to leave the library list display.
9. Press <**F3**> (Exit) to quit LSAM environment management and return to the command entry line.
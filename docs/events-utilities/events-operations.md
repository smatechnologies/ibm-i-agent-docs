---
sidebar_label: 'Events Operations'
---
# Events Operations

## Setting Up an Event User ID and Password

:::note
The wrapping of the syntax in this document does not indicate the location of a carriage return; the ↵ indicates the location of a carriage return.
:::

An LSAM screen now provides the user with the ability to easily send external events to the SAM-SS for processing. In order to allow the LSAM to send valid events to the SAM-SS, a valid user ID and password must be defined to the LSAM.

### Define a Valid User ID and Password

1. In the command line, enter **SMAGPL/STRSMA**. For more information on STRSMA command parameters, refer to the [STRSMA Command](../operations/lsam.md#the-strsma-command).
2. Enter **3** to choose the **Event management** menu in the SMA Main Menu.
3. Enter **2** to choose the **External Event Password** option in the Event Menu.
4. Enter a valid OpCon/xps user for **User Name** in the next menu.
5. <**Tab**\> to **Password** field and enter *a* valid external event password associated with the User Name above.
6. <**Tab**\> to second **Password** field and enter a valid external event password associated with the User Name above. This step confirms the password.
:::note
The User Name and Password fields have a 10-character limit.
:::
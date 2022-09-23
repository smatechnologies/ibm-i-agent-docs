---
sidebar_label: 'IBM i Function Keys'
---

# IBM i Function Keys

## Common Function Keys

The following list of common function key assignments reflects the way that SMA has typically assigned function keys in the IBM i LSAM software. A general attempt has been made to conform to the typical function key assignments found in many of the IBM i display formats. This gives a consistent look and feel within the LSAM software and between the LSAM software and applications from other vendors who have chosen to conform to the typical IBM assignments.

| Function Key  | Name                   | Description |
| :----------:  | :---:                  | ----------- |
|     F1        | Help                   | Shows help text, when it's available.|
|     F2        | Utility                | Access to supporting utility functions. |
|     F3        | Exit                   | Exits the current operation completely, returning to the menu or command entry line.|
|     F4        | Prompt                 | Where supported, F4 accesses the IBM i command prompt. Otherwise, displays a prompt window or list for options on the screen.|
|     F5        | Refresh                | Redraws the screen with updated information. During ADD/CREATE operations, resets the data entry display to blank or default values.|
|     F6        | Create                 | Creates or adds new records to a file.|
|     F7        | Show Previous; Show Details; Re-assign list sequence numbers; general purpose key | Show DynVar Schedule Instances. In Operator Replay: DSPLBLWU displays a cross reference to all Script Steps where a Step Label is used. Otherwise, assigned to special purpose functions.  |
|     F8        | Show Next; Prompt Dynamic Variables | Displays a window listing registered Dynamic Variables for selection and insertion into a data entry display.|
|     F9        | Prompt cursor commands; Print screen or list report. | In Operator Replay, F9 is used to display a list of cursor movement control sequences for insertion into the String to Send. Some programs support sending the displayed list to a printed report spool file.|
|     F10       | Branch to Data Capture Rules; Display in Hex mode | In LSAM features that use captured data, branches to Select/Maintain Data Capture Applications. On some displays, changes the display to show over/under hexadecimal characters corresponding to printable characters on the line above the hex code. Sometimes used to change the columns of data in a list display.|
|     F11       | Toggle list sort order, or list content | Switches the sort order of a list display.  Sometimes used to change details that are shown on a list display.|
|     F12       | Cancel                 | Cancels an operation, returns to previous screen.|
|     F13       | More+; special purpose | "More+" = On many data entry displays, F13 brances to a dedicated data display to show an entire very large data entry field.  Otherwise, used for special purpose function access.|
|     F14       | Confirm updates or deletes | Confirm updates, typically confirming delete record action.|
|     F15       | Subset                 | Limits the list on the screen to certain types.|
|     F16       | Search/Search next     | Either F16 or Enter may be used to start a search on list displays that show a Search content field. After a search finds the first result, F16 must be used to continue the search to the next record in the list that matches the search argument.|
|     F17       | Top                    | On list displays, move the display to the first record in the list. |
|     F18       | Bottom                 | On list displays, move the display to the last record in the list.|
|     F19       | Window left            | On lists with very long rows, shifts the display window to the left (towards the beginning of a row).|
|     F20       | Window right           | On lists with very long rows, shifts the display window to the right (towards the end of the row).|
|     F21       | WRKJOB; command entry  | Displays the IBM i Work with Job; access IBM i QCMD shell command entry.|
|     F22       | Access utility functions | Provides access to supporting utility functions.|
|     F23       | Prompt $VARs; utility functions | On displays that can use the $-System variable strings, shows a list of variables supported on that display.|
|     F24       | More Keys              | Displays more function keys if they are available.|
# Additional Information for OR Scripts

## Cursor Control Strings

+-----------------+---------------------------------------------------+
| String          | Description                                       |
+=================+===================================================+
| Backspace       | Moves the cursor one column to the left, erasing  |
|                 | a character (destructive backspace).              |
|                 |                                                   |
|                 |                                                   |
|                 |                                                   |
|                 | **Note:** Backspace must be contained within the  |
|                 | confines of a single input-capable field.         |
|                 | Attempting to use Backspace to move left from the |
|                 | first column of an input-capable field generates  |
|                 | an error (use Cursor Left to accomplish a move to |
|                 | the left outside of a field definition).          |
+-----------------+---------------------------------------------------+
| Cursor Down     | Moves the cursor down one row. When the cursor    |
|                 | starts from the lowest row of the screen size,    |
|                 | the cursor wraps to the same column position in   |
|                 | row 1.                                            |
+-----------------+---------------------------------------------------+
| Cursor Left     | Moves the cursor one column to the left (without  |
|                 | erasing a character like backspace would do).     |
|                 | When the cursor starts from column 1, it wraps to |
|                 | the last column of the previous row. From row 1,  |
|                 | column 1, the cursor wraps to the last column of  |
|                 | the lowest row.                                   |
+-----------------+---------------------------------------------------+
| Cursor Right    | Moves the cursor one column to the right. From    |
|                 | the highest column number on a row, the cursor    |
|                 | wraps to the first column of the next row. From   |
|                 | the last column of the last row, the cursor wraps |
|                 | to row 1, column 1.                               |
+-----------------+---------------------------------------------------+
| Cursor Up       | Moves the cursor up one row. When the cursor      |
|                 | starts from row 1, it wraps to the same column    |
|                 | position in the lowest row defined for the        |
|                 | screen.                                           |
+-----------------+---------------------------------------------------+
| Field Advance   | Causes the cursor to move to the first column of  |
|                 | the next input-capable field defined for a        |
|                 | screen.                                           |
+-----------------+---------------------------------------------------+
| Field Backspace | Causes the cursor to move to the first column of  |
|                 | the previous input-capable field defined for a    |
|                 | screen.                                           |
+-----------------+---------------------------------------------------+
| Field Exit      | Causes the cursor to move to the first column of  |
|                 | the next input-capable field defined for a        |
|                 | screen, while also clearing any data from the     |
|                 | cursor start position to the end of the           |
|                 | input-capable field that is being exited.         |
+-----------------+---------------------------------------------------+
| New Line        | Positions the cursor to the first column of the   |
|                 | first input-capable field on a row below the      |
|                 | starting location of the cursor. When the cursor  |
|                 | starts from the lowest row that has an            |
|                 | input-capable field, the cursor wraps to the      |
|                 | first column of the first input-capable field     |
|                 | from the top of the screen.                       |
+-----------------+---------------------------------------------------+

: Cursor Control Strings

## Functions to Send

+----------------------------------+----------------------------------+
| Functions                        | Description                      |
+==================================+==================================+
| ATTN                             | Sends an interrogative Attention |
|                                  | signal to the display manager    |
|                                  | program in IBM i, causing        |
|                                  | whatever response has been       |
|                                  | defined for the Attention key.   |
|                                  | The Attention key usually        |
|                                  | suspends the screen dialog that  |
|                                  | was in progress. It interrupts   |
|                                  | screen dialog by presenting      |
|                                  | another screen's format that    |
|                                  | would not have been part of the  |
|                                  | defined dialog. Attention keys   |
|                                  | have a default action provided   |
|                                  | by IBM i (typically presenting a |
|                                  | menu of options), but they may   |
|                                  | be changed using system control  |
|                                  | values and job attributes. They  |
|                                  | may also be overridden within a  |
|                                  | specific job by using the        |
|                                  | SETATNPGM command within that    |
|                                  | job.                             |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | **Note:** SETATNPGM only takes   |
|                                  | effect for programs at, or lower |
|                                  | in the invocation stack than the |
|                                  | level where the command is       |
|                                  | issued. If the program returns   |
|                                  | to a higher level in the         |
|                                  | invocation stack, the system or  |
|                                  | job default setting for the      |
|                                  | attention key takes effect and   |
|                                  | the setting performed by the     |
|                                  | SETATNPGM command is abandoned.  |
+----------------------------------+----------------------------------+
| ENTER                            | The default keyboard action that |
|                                  | causes the input buffer contents |
|                                  | to be returned to the IBM i      |
|                                  | program, usually without         |
|                                  | requesting any other special     |
|                                  | function.                        |
+----------------------------------+----------------------------------+
| **Note:** The action caused by   |                                  |
| the following function keys      |                                  |
| (F1-F24) may vary, depending on  |                                  |
| how the IBM i display format was |                                  |
| defined: User-created display    |                                  |
| formats can specify whether each |                                  |
| function key returns the input   |                                  |
| buffer contents along with the   |                                  |
| function key command, or just    |                                  |
| return the function key command  |                                  |
| without returning any data that  |                                  |
| might have been entered by the   |                                  |
| display user (or display user    |                                  |
| intercept program). Some typical |                                  |
| assignments that are made into   |                                  |
| function keys, such as by IBM i  |                                  |
| command entry/prompt screens,    |                                  |
| are listed in Function Keys.     |                                  |
+----------------------------------+----------------------------------+
| F1                               | Command/function key F1 (aid     |
|                                  | byte hexadecimal value '31')   |
+----------------------------------+----------------------------------+
| F2                               | Command/function key F2 (aid     |
|                                  | byte hexadecimal value '3C')   |
+----------------------------------+----------------------------------+
| F3                               | Command/function key F3 (aid     |
|                                  | byte hexadecimal value '31')   |
+----------------------------------+----------------------------------+
| F4                               | Command/function key F4 (aid     |
|                                  | byte hexadecimal value '32')   |
+----------------------------------+----------------------------------+
| F5                               | Command/function key F5 (aid     |
|                                  | byte hexadecimal value '33')   |
+----------------------------------+----------------------------------+
| F6                               | Command/function key F6 (aid     |
|                                  | byte hexadecimal value '34')   |
+----------------------------------+----------------------------------+
| F7                               | Command/function key F7 (aid     |
|                                  | byte hexadecimal value '35')   |
+----------------------------------+----------------------------------+
| F8                               | Command/function key F8 (aid     |
|                                  | byte hexadecimal value '36')   |
+----------------------------------+----------------------------------+
| F9                               | Command/function key F9 (aid     |
|                                  | byte hexadecimal value '37')   |
+----------------------------------+----------------------------------+
| F10                              | Command/function key F10 (aid    |
|                                  | byte hexadecimal value '38')   |
+----------------------------------+----------------------------------+
| F11                              | Command/function key F11 (aid    |
|                                  | byte hexadecimal value '39')   |
+----------------------------------+----------------------------------+
| F12                              | Command/function key F12 (aid    |
|                                  | byte hexadecimal value '3A')   |
+----------------------------------+----------------------------------+
| F13                              | Command/function key F13 (aid    |
|                                  | byte hexadecimal value '3B')   |
+----------------------------------+----------------------------------+
| F14                              | Command/function key F14 (aid    |
|                                  | byte hexadecimal value '3C')   |
+----------------------------------+----------------------------------+
| F15                              | Command/function key F15 (aid    |
|                                  | byte hexadecimal value 'B1')   |
+----------------------------------+----------------------------------+
| F16                              | Command/function key F16 (aid    |
|                                  | byte hexadecimal value 'B2')   |
+----------------------------------+----------------------------------+
| F17                              | Command/function key F17 (aid    |
|                                  | byte hexadecimal value 'B3')   |
+----------------------------------+----------------------------------+
| F18                              | Command/function key F18 (aid    |
|                                  | byte hexadecimal value 'B6')   |
+----------------------------------+----------------------------------+
| F19                              | Command/function key F19 (aid    |
|                                  | byte hexadecimal value 'B7')   |
+----------------------------------+----------------------------------+
| F20                              | Command/function key F20 (aid    |
|                                  | byte hexadecimal value 'B8')   |
+----------------------------------+----------------------------------+
| F21                              | Command/function key F21 (aid    |
|                                  | byte hexadecimal value 'B9')   |
+----------------------------------+----------------------------------+
| F22                              | Command/function key F22 (aid    |
|                                  | byte hexadecimal value 'BA')   |
+----------------------------------+----------------------------------+
| F23                              | Command/function key F23 (aid    |
|                                  | byte hexadecimal value 'BB')   |
+----------------------------------+----------------------------------+
| F24                              | Command/function key F24 (aid    |
|                                  | byte hexadecimal value 'BC')   |
+----------------------------------+----------------------------------+
| HOME                             | The Home function key may be     |
|                                  | user-assigned to a specific      |
|                                  | location on the screen, or it    |
|                                  | may return the cursor to the     |
|                                  | first column of the first        |
|                                  | input-capable field on the       |
|                                  | screen.                          |
+----------------------------------+----------------------------------+
| PAGEDN                           | Page Down (formerly known as     |
|                                  | Scroll Up) requests that the     |
|                                  | screen host program (or the      |
|                                  | system function that manages a   |
|                                  | display subfile) present the     |
|                                  | next available page of           |
|                                  | information available for a list |
|                                  | that is on the screen (aid byte  |
|                                  | hexadecimal value 'F5').       |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | **Note:** If Page Down is        |
|                                  | returned when the end of a list  |
|                                  | is already on the display, there |
|                                  | may be a non-fatal error message |
|                                  | returned.                        |
+----------------------------------+----------------------------------+
| PAGEUP                           | Page Up (formerly known as       |
|                                  | Scroll Down) requests that the   |
|                                  | screen host program (or the      |
|                                  | system function that manages a   |
|                                  | display subfile) present the     |
|                                  | previous available page of       |
|                                  | information available for a list |
|                                  | that is on the screen (aid byte  |
|                                  | hexadecimal value 'F4').       |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | **Note:** If Page Up is returned |
|                                  | when the beginning of a list is  |
|                                  | already on the display, there    |
|                                  | may be a non-fatal error message |
|                                  | returned.                        |
+----------------------------------+----------------------------------+
| RESET                            | This special function instructs  |
|                                  | the IBM i display manager to     |
|                                  | reset from an error condition    |
|                                  | that has previously set the      |
|                                  | input-inhibited indicator along  |
|                                  | with the screen error indicator  |
|                                  | (a low-level 5250 device status  |
|                                  | instruction). This function key  |
|                                  | has no effect and does not       |
|                                  | generate an error if the screen  |
|                                  | is not in a reset able           |
|                                  | condition. It should only be     |
|                                  | issued when the appropriate      |
|                                  | circumstances have been          |
|                                  | detected. Reset has no effect if |
|                                  | the input-inhibited indicator    |
|                                  | has been set during the wait     |
|                                  | period after \<**Enter**\> or    |
|                                  | another function key has been    |
|                                  | used to return control of the    |
|                                  | screen to the IBM i display      |
|                                  | manager (and/or the program that |
|                                  | presented the screen).           |
+----------------------------------+----------------------------------+

: Functions to Send

## Operator Replay Script Exit Codes

One of the codes in the following table will be displayed as part of the
completion information of an Operator Replay job in the OpCon/xps
Schedule view of the job status.

  Return Code   Description
  ------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
  SMA0100       Job completion successful
  SMA0101       Unable to find Telnet host
  SMA0102       Cannot open socket error
  SMA0103       Unable to connect to socket
  SMA0104       Failed to set socket attribute
  SMA0105       Error reset required (e.g., sent value is in error)
  SMA0106       Timeout (waiting for response from system)
  SMA0107       Comparison string error
  SMA0108       Invalid script name
  SMA0109       Script has no step records
  SMA010A       Operator Replay failed: Technical failure at startup, see driver job loG
  SMA010B       Operator Replay failed: STROPRRPY command incorrect DEVICE or IPADDR. Both must either specify a user-selected value, or both must be left set to '\*DEFAULT'.
  SMA010C       Operator Replay failed: OpCon job master not found
  SMA010D       Operator Replay failed: Script user not provided to driver program
  SMA010E       Operator Replay failed: Dynamic variable replacement error, see script log.
  SMA010F       Operator Replay failed: SMAFAILJOB command in response rules, or general failure - see program dump report and driver job log.

  : Operator Replay Script Exit Codes

---
sidebar_label: 'Application of Dynamic Variable Definition Fields'
---

# Application of Dynamic Variable Definition Fields

The purpose of this discussion is to explain how to control the value that will be delivered by the LSAM Dynamic Variable Value Fetch routine whenever a Dynamic Variable {TOKEN} is being replaced within an LSAM function.

## Testing Dynamic Variable Formatting with DSPDNYVAR

It is possible to create test Dynamic Variables and to experiment with the settings of the variable definition fields using the LSAM command DSPDYNVAR (described in Commands and Utilities). This command returns the value of the named Dynamic Variable as a completion message, so the command is best used from an IBM i interactive workstation session (such as provided by green screen workstation emulation programs on personal computers, for example). To set or change a variable definition, use either the maintenance screens, illustrated in the preceding section of this topic, or the SETDYNVAR command, illustrated in the Utility Commands section of this Dynamic Variables chapter, below.

The user is encouraged to experiment with setting different variable definitions until the DSPDYNVAR command returns a value in the format that is desired for the particular LSAM function where a {DVTOKEN} will be used. This experimentation is especially important when the variable will be defined as numeric. Remember that variables of type V must be used for this type of experiment, but that the variable values will work the same for type L variables that are used to change the LDA (local
data area) contents of IBM i jobs. 

## Trimming Character Values of Dynamic Variables

In older versions of the Agent software, the only way to cut out part of the value string from a Dynamic Variable would have been to store that value into an IBM i data area on disk, and then use a variable with a Function Code of *DTAARA to retrieve that value. Data Area Dynamic Variables originally supported specifying a start  position and length of the character string to retrieve from a data area in the DB2 database.

Currently, the former "LDA Start/Length" fields label has been extended to "Char trim/LDA Str,Len", implying that a non-numeric Dynamic Variable can have its value trimmed by a start position and Length in order to produce the actual value that will replace the variable's {TOKEN} at run time.

Character string trimming can only be used for Type-V Dynamic Variables, since the other Type-L Dynamic Variables already use the Start and Length fields to control which part of an IBM i Local Data Area should be updated by the Dynamic Variable's value.

If the Char Trim Start value is 3 and its Length is 5, then a Dynamic Variable VALUE of 'ABCDEFGHIJK' will be reported at run time as 'CDEFG'.

This capability becomes more obviously useful when nesting Dynamic Variable tokens.

### Controlling Space Character Trimming

Sometimes it is important to keep either leading or trailing space characters when a Dynamic Variable {TOKEN} is replaced by its value, as a character string. Type-V Dynamic Variables can manage the Character Trim Start and Length fields to control whether leading or trailing space characters are retained or trimmed from the actual value stored in the Dynamic Variable master record (or returned by a Function Code that the Dynamic Variable executes) at run time.

Use F1=Help from the Change Dynamic Variable maintenance display for a reminder about the following rules that explain how the Start and Length fields of Character Trimming can be used for this purpose.

The following list of options explains how managing zero or non-zero values in the Start and Length parameters controls whether leading or trailing spaces will be included when the variable value replaces its {TOKEN}. All Start and Length computations are limited by the maximum size of a Dynamic Variable value character string, which is 128. 

- Start=0, Length=0

The entire Dynamic Variable value will be returned, however, all leading and trailing spaces will be truncated.

- Start>0, Length=0

Any leading spaces, beginning at the Start location, will be included in the returned value, but trailing spaces will be truncated because there is no specific length indicated.

Use a Start location of 1 to include any characters, including spaces, starting with the very first position of the 128-character maximum value length. The last non-blank character will be the end of the value string used to replace the {TOKEN}.

- Start=0, Length>0

Any leading spaces will be trimmed, and the first non-blank character will be considered the beginning of the character string that will occupy the full Length of data inserted in place of the {TOKEN}.

Use a Length greater than zero to include any trailing spaces, up to the full Length of the returned value.

:::tip
If the default Start plus Length will exceed the limit of position 128 of the value string, then the {TOKEN} replacement will fail and the Agent general-purpose log file (LSALOGF30), plus any optional tool-specific log, will report the reason for the token replacement failure.
:::

- Start>0, Length>0

Specifying both a Start position and a Length will cause any space characters within that segment of the variable's current (or calculated) value to be included when the {TOKEN} is replaced. This applies to both leading spaces and trailing spaces.

:::tip
If the Start position and Length will exceed the limit of position 128 of the value string, then the {TOKEN} replacement will fail and the Agent general-purpose log file (LSALOGF30), plus any optional tool-specific log, will report the reason for the token replacement failure.
:::

## When to Use Character versus Numeric Variables

The basic function of a Dynamic Variable is to deliver a character string that will replace a Dynamic Variable {TOKEN}. These tokens may appear as the values for keywords defining a job that the LSAM is submitting to IBM i on behalf of OpCon, they may be used as field values within the configuration of certain LSAM features, such as Message Management and Operator Replay scripting, and they may also be used as comparison values for the SCANSPLF report scanning utility and the multi-purpose Captured Data Response Rules.

In any case where a token is replaced by a character string, it is important that the character string is formatted to match the purpose of that function. Sometimes the character string may represent a value that includes letters, numbers and maybe also special characters. However, sometimes the character string must appear to be a numeric value with specific formatting rules, such as the appearance of a decimal point. The value used by the LSAM to replace a token is still always a
character string, technically speaking, but when that string is formatted correctly, it can be interpreted as a numeric value by the target function.

When the LSAM delivers a Dynamic Variable value that is simply a character string, but not identified as a numeric value, and the Start and Length values for string trimming (explained above) are both zero, here are the default rules that govern the length of the variables value and also how value comparisons are managed: 

:::note Default Value Length Rules
The length of the character string is assumed to start with position 1 of the character string and to end with the last non-blank character. In other words, in this case it is not possible to specify that trailing blanks should be considered part of a token's value. However, the nature of typical IBM i programming makes this unimportant because wherever trailing spaces are important, the overall size of the field where a token value is placed is being managed by some rule or characteristic of the Agent function that is engaging a variable token. Therefore, the LSAM does not specify the length of the token value, but simply offers a field that is 128 bytes long, within which the token value is left-adjusted, and the space within this field that is not filled by specific characters is assumed to be filled with space characters (EBCDIC hexadecimal: X'40').
:::

If an LSAM function requires a numeric value to replace a Dynamic Variable token, then the Dynamic Variable must be carefully defined so that the character string it delivers will appear to be a number, possibly including special formatting characters such as a decimal point, a currency symbol and/or a positive or negative value sign (such as DR and CR, for accounting purposes, or + and -). The Dynamic Variable field that indicates the variable is numeric is the field called Numeric Field Size. If this field is set to zeros (the default), then the variable is assumed to be a simple character string and all of the numeric formatting fields are ignored.

When a Dynamic Variable has been defined with a numeric field size the number of decimal places (implied) may also be indicated. A total numeric field size may not exceed 63 digits. The number of decimal places must be included within the total numeric field size and that total number of digits may not exceed the maximum field size. When a Dynamic Variable is numeric, the LSAM stores only the digits of the current numeric value, including enough trailing digits (even if they are zeros) to represent the full number of decimal places, and a leading minus sign (-) if the numeric value was forced to negative. All of the other formatting that may be used to represent numeric values of different types is applied at the time when the numeric value is delivered by the LSAM Dynamic Variable read routine, including insertion of the specified decimalpoint character.

:::tip
A numeric Dynamic Variable will not accept characters that are not numeric digits.  Only a minus (-) or plus (+) sign are allowed, if necessary.  A decimal point is NOT allowed in the value sent for storage in a Dynamic Variable master record.  Decimal places are implied by the Number of Decimal Places field in the Dynamic Variable master record.  To satisfy this restriction, the SETDYNVAR command has an optional parameter that supports a request to "compress numeric," which means that the command processor program should remove all non-numeric data before submitting that data to be stored as a numeric value.  Any punctuation required for numeric values must be applied by the Dynamic Variable master record's numeric formatting rules.  This constraint makes it possible for the Agent's routines to execute mathematical operations and comparisons, when requested.
:::

When the SETDYNVAR command is used to change the value of a numeric Dynamic Variable, a minus (-) or plus (+) sign may optionally be included in the VALUE parameter of the command to indicate that a numeric value should be increased or decreased by the number included in the VALUE parameter. If no sign is provided, then the SETDYNVAR command will replace the current numeric value with the new numeric value provided in the VALUE parameter. Because of this rule, it is not possible to replace an existing numeric value with a negative value in a single operation. However, the same result can be accomplished by first replacing the numeric value with a zero (0) and then using a second SETDYNVAR command with a leading minus sign (-) in the VALUE parameter.

### Controlling the Format of Numeric Values

This section explains the fields of a Dynamic Variable that control how a numeric value will be presented by the LSAM Dynamic Variable read routine. There is an extreme number of possible variations for numeric formatting, so the user is encouraged to experiment with a test Dynamic Variable, using the DSPDYNVAR command to view the  results. This discussion presents some basic rules that will help to anticipate the result of numeric formatting.

### Using the LSAM Numeric Edit Fields

The master record that defines each Dynamic Variable supports the following different aspects of numeric field editing, whenever a variable has a Numeric Size that is greater than zero:

- Suppressing leading zeros
- Specifying the character that represents the decimal point
- Specifying the character used as a grouping separator
- Specifying the character and position of a symbol used to indicate a negative value
- Specifying the character and position of a symbol used to indicate a positive value
- Specifying a character and position of a symbol used as a currency sign

The choice of using none or any of these numeric editing fields depends on the application where a Dynamic Variable token will be replaced. To understand their effect, consider first the default behavior of the LSAM when only a numeric size of 7 has been specified (with zero decimal positions). The LSAM, by default, will produce a character string that represents the entire numeric field size:

- Value = 1234567
- Size = 9
- Output = 001234567

If the definition is changed to imply 2 decimal places, and the default value of a period (.) is assumed for the decimal place, then the output will appear as:

- Output = 0012345.67

To remove the leading zeros, change the value of Suppress Leading Zeros to a '1':

- Output = 12345.67

The value above would appear if there were no Grouping Separator code, or if the Grouping Separator code were set to 'B' (a special value used to mean "none"). To insert grouping separators of the whole numbers, set the Grouping Separator to a value such as the default value of a comma (,). Using a comma as the grouping separator would change the output to appear as:

- Output = 12,345.67

If the variable value is forced to a negative value, using the same accumulated rules as above, here is the internal and external representation of the value when the negative sign controls are left at their default values:

- Internal data = -1234567
- Output = -12,345.67

Notice that in the previous output, when the value was positive, there was no sign present because the default controls indicate to use no sign for a positive value. However, a positive value could be represented according to a report's standard accounting format using the following example rules:

- Positive value symbol = CR
- Positive symbol location = A (after)
- Positive symbol relative position = 2
- Output = 12,345.67 CR

In the example above, the relative position of 2 causes one space to be inserted between the last digit of the number and the beginning of the positive symbol. A relative position value of 1 would result in no spaces between the numbers and the symbol.

When adding a currency sign to this last example, there is a choice of how to position the currency sign. The currency sign will always be located before the number when LSAM rules are used. To put a currency sign after a number, choose an IBM RPG user-defined Edit Code and use the CRTEDTD command to build an edit definition that will place the currency sign after the number.

The default choice for using a currency sign is to Float the sign to the left of the most significant digit. The number of spaces between the most significant digit and the symbol may be specified.

- Currency symbol = $
- Currency symbol location = F
- Currency symbol relative position = 2
- Output = $12,345.67 CR

The currency symbol position of 2 imposes 1 space between the symbol and the most significant digit. Use a value of 1 if no space is desired.

On some financial reports the currency symbol is located in a fixed position relative to the decimal point of financial amounts, and the decimal point is also always located at a fixed position on the report. For example, if allowance must be made for a number in the millions (7 whole integers) plus one space, then the currency symbol's fixed position should be set to 9 (7 digits + 1 space + the character position which is always considered position 1). In the following example, the asterisk (*) character is used in the output illustration only to show the count of spaces between the currency symbol and the first digit; assume that the colon represents space characters:

- Currency symbol location = . (period)
- Currency symbol relative position = 12
- Output = $\*\*\*\*\*12,345.67 CR
```
(actual appearance = $     12,345.67 CR)
```

Notice that there are 5 asterisks representing 5 space characters. This result happens because there are already six positions to the left of the decimal point that are occupied by numeric digits and the Grouping Separator character.

### When to Use Numeric Editing Fields

In summary, choose the numeric formatting rules that will be required by the LSAM function where the Dynamic Variable token is being replaced.

For example, a data element might have been captured by an LSAM tool such as Operator Replay scripting, the SCANSPLF command or the Message Management message text capture. If the captured numeric value was controlled by setting the Compress Numeric flag on in the LSAM's data capture rule, then the numeric string would be stored internally in the LSAM Captured Data Log file as a series of numeric digits without any other characters. All signs, including decimal points, commas, negative value symbols or currency symbols, would have been removed, but any leading zeros would have been retained. In this case, to match an LSAM Dynamic Variable with the Captured Data element, it would be important to let the LSAM return its simplest default format for a numeric field, such as: 001234567.

However, if the numeric value of a Dynamic Variable will be used in a message sent to a human reader, then it will probably be important to apply the numeric field editing rules so that they produce a number in the format expected by the reader. Remember, though, that if a Dynamic Variable token is used in an OpCon External Event command that is formatted using the original CSV (comma separated values) syntax, commas are not allowed in the numeric editing because they would interfere with the Event Command parameter syntax.

:::tip
Commas can be removed from data that is captured by the Agent's Message Management Captured Data function, according to the LSAM Configuration function accessed by option 7 from the LSAM Message Management sub-menu.  However, the newer XML tag-formatting that is now available for OpCon External Event commands can tolerate commas within the Event command parameters.  So the XML formatted Event commands are typically more useful when preparing the $NOTIFY:EMAIL Event command, which is generated when using the Agent's IBM-style command called XNTYEMAIL.
:::

One other important use of Dynamic Variables is to store a counter that is being incremented in different steps. The counter may be compared to a threshold value, such as used with LSAM Message Management. In this case, it is not important whether there are leading zeros or no leading zeros because it is the actual numeric values that will be used in the threshold check routines. For thresholds there are no decimal places allowed, so it is important that zero decimal places are specified for the counter variable. Finally, the negative sign could be important, in case a counter is ever being decreased and could go lower than zero. In that case, it might be important that the default negative sign be presented by the LSAM Dynamic Variable read routine when retrieving the counter value, because a negative (-2) must never be considered equal to a positive threshold value of 2.

### Support for Special Numeric Editing: User-defined Variable Values

The master record that defines Dynamic Variables supports a flexible set of numeric edit codes, but there may be special formatting desired, such as engaging IBM's user-defined edit codes (values 5 - 9). In this case it would be necessary to specify a user-defined program, registered in the Dynamic Variable master record, to return the correctly formatted value.

### Controlling the Content of Character String Variables

This section explains the special edit codes that can be used to escape or eliminate problem characters that may be stored in the value of a Dynamic Variable. These codes do not work as specified here when the Dynamic Variable is marked as a numeric data type.

As described under the topic of [Captured Data Response Rules](../events-utilities/captured-data-response-rules), it is possible to capture single quotes and commas as part of a character string. However, these two characters can cause problems with other LSAM functions, as follows:

- **Single Quotes**: Single quotes included in captured data, such as message text, green screen workstation displays or reports, can prevent storage of captured data into Dynamic Variables. The single quote interferes with delimiting character strings in IBM i command parameter values. This problem may also occur in other functions that may replace a Dynamic Variable token with its character string value.
- **Commas**: If a comma is included in the value of a dynamic variable it can interfere with the syntax of OpCon Event commands that use the CSV syntax whenever that dynamic variable is included as one of the command parameter values. (To avoid commas being managed as reserved characters in OpCon Event commands, use the XML Event command syntax.)

### Preventing Special Character Errors

Single quotes and commas can be escaped or replaced by specifying one of the following reserved values in the COMMA parameter of the SETDYNVAR command, or in the "Group separator; chr ed" field of Dynamic Variable master record maintenance (which is the same field that is updated by the COMMA command parameter).

The values shown in this table refer to EBCDIC values. Most Latin character sets use the same hexadecimal values for the comma and the single quote. If a client site's IBM i partition uses a CCSID character set with different hex values, please contact SMA Support for assistance.

- **C**: replace any comma (,) X'6B' with a space (X'40')
- **Q**: replace any single quote (') X'7D' with a space (X'40')
- **D**: replace both a comma and a single quote with a space
- **E**: escape a single quote by inserting an extra single quote
- **F**: replace comma with space AND escape a single quote by doubling

The concept of "escaping" the single quote is supported by IBM command editors. When a character string is enclosed with a pair of single quotes, such as the VALUE( )  parameter of the SETDYNVAR command, any single quote that is included within the string would interrupt the string unless there are two single quote characters. If there are two single quotes, IBM command processing will replace them with just one single quote as the character string is being processed, and the characters that follow the doubled single quote will still be part of the character string.
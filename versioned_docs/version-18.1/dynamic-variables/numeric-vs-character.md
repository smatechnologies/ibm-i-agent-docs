---
sidebar_label: 'Numeric versus Character Dynamic Variables'
---
# Numeric versus Character Dynamic Variables

By default, when a new Dynamic Variable is added to the master table of the IBM i Agent's DB2 database, its name and {TOKEN} are considered to represent a simple character string of up to 128 characters in length. Also by default, the value that replaces a token is considered to occupy only the length from position 1 through the last non-blank character produced for the token value.

These default assumptions make it very easy to add and use Dynamic Variables as part of any automation configuration. For many cases, no special configuration effort is required to define a variable.

However, Dynamic Variables can be adapted to a broad array of applications by manually defining the Dynamic Variable master record master record in advance of its use. This can be best completed by using the Agent's green screen menu system and using the Work with Dynamic Variable function that appears on almost every Agent sub-menu.

The Dynamic Variable definition attributes (master record fields) can change the way a variable value will be processed. For example, designated numeric variables can be manipulated by, and used in mathematical computations and comparisons. The distinction between a character string variable and a numeric variable is important to observe because it can affect both how variable values are computed and then how the final resulting value string is edited or formatted, as it replaces a token. More detail about these interactions is provided under the following detailed information about variable functions and applications.

## Defining Numeric Dynamic Variables

To define a Dynamic Variable as numeric, set the NUMSIZ keyword of the SETDYNVAR command to a value greater than zero (which stores this formatting attribute in the Dynamic Variable master record). This Numeric Size attribute can also be set using the LSAM menu maintenance program to add or change a Dynamic Variable master record. The presence of a numeric size tells the LSAM to handle the current variable value as a number. This means that the LSAM will store both positive and negative values. The LSAM uses special rules when returning a numeric value to replace a Dynamic Variable Token.

A numeric variable supports using the SETDYNVAR command VALUE( ) keyword content to increase or decrease an existing value, instead of just replacing the value. To indicate a change in value, start the VALUE content with a plus (+) or a minus (-) sign. Additional implications and applications of using numeric variables and controlling numeric formatting are provided in the Dynamic Variable application examples, below.

## Using Numeric Compression with Dynamic Variables

The SETDYNVAR command supports a parameter labeled CMPNUM ("compress numeric") that tells the SETDYNVAR command program to store only numeric digits, or integers (0 - 9) that are contained in the VALUE parameter. This CMPNUM parameter is used only during the process of storing the VALUE that is provided as the SETDYNVAR command is executed. The setting of the CMPNUM parameter in this command is not a setting that is stored with the Dynamic Variable definition, although the actual value stored shows the effect of numeric compression.

It is the CMPNUM parameter of the SETDYNVAR command that is utilized by the LSAM's Captured Data Response Rules, that is, whenever a Dynamic Variable name was specified for the "Store to \--\>" field on a Response Rule master record. As the Response Rule is executing the process to store a captured value to the indicated Dynamic Variable, the LSAM routine checks for the Compress Numeric parameter on the Response Rule and then it sets the CMPNUM parameter of the SETDYNVAR to match.

The most important purpose of the Compress Numeric function is to store valid numeric values in a Dynamic Variable master record that is marked as a numeric variable (by specifying a non-zero Numeric Size). The Dynamic Variable value update routines will not accept non-numeric data as a valid value for updating this type of variable, except for the special +/- and Date or Time math operation codes used to increase or decrease a Dynamic Variable value.

When using numeric variables, keep in mind that although numeric compression prevents anything except numeric digits to be stored in the value field, this does not cause a Dynamic Variable to be defined as numeric. Compressed digits are only stored as a simple character string, just like any other Value content, unless the Dynamic Variable is separately defined as numeric.

Another principle to remember is that numeric variables store their digital values as a contiguous string of only the digits 0 -- 9. The value field does not store any formatting characters and it also does not store a separate character that represents the position of an optional decimal point. (Decimal positions are represented by a separate sub-field on the variable master record that is used primarily for formatting the way a numeric value is presented when it replaces a token.)

### Numeric Compression to Protect External Event Command Syntax

Another important purpose for supporting compression of numeric data is to eliminate the commas that are typically found in monetary amount values, such as when a financial report total has been captured from a report by the SCANSPLF command. OpCon Event commands using the pre-XML syntax do not allow the comma character to appear within any of the parameter values for the Event commands, since the comma is reserved to separate Event command parameters, so any commas in a monetary amount field must be eliminated before that value could be included in some message Event command that is sent to OpCon SAM for distribution.

Consider the example where the initial value of the Dynamic Variable is being set to a US$ monetary amount, as: $123,456.78. Numeric compression is used so that only the integers 12345678 are stored as the value of the Dynamic Variable. Thus, when the Dynamic Variable token is replaced during construction of an email notification about a monetary amount, there will be no commas in the number that would disable the OpCon Event command syntax.

Related to the compression of numeric data, consider that it would be difficult for the email reader to interpret what is the actual monetary value that appears in the email text. In this case, the Dynamic Variable master record parameters could be defined to re-edit the numeric value upon retrieval and insert only the $-sign and the decimal point, so that the final string returned to replace the Dynamic Variable token would look like this: $123456.78

In some countries, it would also make sense to insert a period (or other character allowed by OpCon Event commands) where the comma was previously located, so that the monetary amount would appear like this: $123.456.78
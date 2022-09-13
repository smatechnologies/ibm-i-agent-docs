---
sidebar_label: 'Utility Commands for Manipulating Dynamic Variables'
---
# Utility Commands for Manipulating Dynamic Variables

## SETDYNVAR: Set LSAM Dynamic Variable

The purpose and function of Dynamic Variables are presented in detail in the previous section, above. The IBM i LSAM utility command SETDYNVAR performs most of the same functions as the Maintain Dynamic Variables function 6 on LSAM menu 3 - Events and Utilities (documented in the Screens and Windows section of this topic, below). But the SETDYNVAR command performs additional functions beyond what the master file maintenance program can do. The command is also useful during live operations when used as:

- A prerun command in an IBM i job master record on an OpCon schedule.
- An action command in a Captured Data Response Rule (SCANSPLF, Operator Replay, Message data capture).
- A Message Management event command.
- Any command entry line where the LSAM library list is in effect.

### Using SETDYNVAR as an OpCon Job Prerun Command

The IBM i LSAM employs special procedures in its Job Scheduler server program when it detects that a SETDYNVAR command was submitted as a prerun command for an IBM i job. The LSAM Job Schedule server task will process the SETDYNVAR command immediately, in order to make it possible to use the results of this command within the syntax of the main job call command.

However, a more convenient and extendable way to preset Dynamic Variable values just before an OpCon-submitted job starts is to use the Variables tab of the OpCon job master record. Up to 99 Agent variable values can be set, relying on the same pre-execution logic of the Agent's Job Scheduler as when the prerun command line might specify the SETDYNVAR command.

### SETDYNVAR Command Syntax and General Capabilities

This command may be used to add a new Dynamic Variable to the LSAM table and to set its value, or it may be used to change the value of an existing Dynamic Variable. Making reference to the Dynamic Variable master file fields described below in the Maintain Dynamic Variables section of this topic, this description of the SETDYNVAR command parameters provides information about additional considerations when using the command.

:::tip
The VALUE keyword of the SETDYNVAR command cannot be used to set a dynamic variable value to blanks (all spaces). Instead of relying on spaces, such as when testing dynamic variable values, choose an initial value (perhaps 'INIT') and set the dynamic variable to this value before any other configured procedures might store a new result value.
:::

Consider the following examples of using the SETDYNVAR command wherever IBM i commands are supported by the LSAM:
**EXAMPLE:**
```
SETDYNVAR command with CMPNUM
SETDYNVAR VARNAM(VARNAME1) VALUE('$123,456.78') VARTYP(V)
USRPGM(PGMLIB/USRDFNPGM) CMPNUM(Y) DESC('my description')
```
The example above shows a command that will add a new Dynamic Variable named "VARNAME1" to the LSAM table, if there is not already a variable with this name. The type of variable is 'V' meaning a general-use variable. A user-defined program named (example provided is "USRDFNPGM") in the IBM i DB2 library PGMLIB will be called before the LSAM will replace the variable's {TOKEN} with an actual value.

As this example command is executed, an initial value is set. The example shows a value string enclosed in quotes that represents a monetary amount string of $US with six whole numbers (dollars) and two decimal places (cents). This string value might have been provided by an OpCon Property or by a different LSAM Dynamic Variable, depending on where this example command was actually being executed. But the value that will be stored as the initial value of the variable is only the eight digits, like this: 12345678 because the CMPNUM (compress numeric) parameter is set to 'Y' = Yes.

Refer to additional information above about how to create and use user-defined programs to calculate Dynamic Variable token values at run time. User-defined programs receive the Dynamic Variable name and the current variable value as input parameters.
:::info example
SETDYNVAR command increases a numeric value.
- Step 1: A numeric Dynamic Variable is added to the LSAM table:
```
SETDYNVAR VARNAM(VARNAME2) VALUE(0) 
VARTYP(V) NUMSIZ(7) NUMDEC(0)
POSSYM(B) DESC('Threshold counter')
```
- Step 2: A later procedures decides to increase the value by 1.
```
SETDYNVAR VARNAM(VARNAME2) VALUE('+1')
```
:::

The example 2 above illustrates the procedure for creating and using a Dynamic Variable as a numeric field that can later have its value change up or down by using a plus (+) or minus (-) sign in the first position of the VALUE keyword of the SETDYNVAR command. This is the technique that is used by LSAM programs to manage threshold counters for LSAM Message Management Parameters. Threshold counters stored in Dynamic Variables that are defined as numeric could also be used by the Compare Data fields of any Captured Data Response Rule (used by Operator Replay screen data capture, SCANSPLF report data capture and Message data capture) to control when a Response Command should be executed.

In the example above, Step 1 shows a command that will add a new Dynamic Variable named "VARNAME2" to the LSAM table, if there is not already a variable with this name. (If the variable did exist, it could have its attributes changed by this command.) The type of variable is 'V' meaning a general-use variable. The keyword NUMSIZ is set to 7, and that is what tells the LSAM that this variable should be handled as a numeric variable instead of just being a plain character string. Numeric variables may be increased or decreased in value as explained above, and the LSAM uses special rules when returning a value to replace the Dynamic Variable Token when the variable is defined as numeric. The NUMDEC keyword indicates that there are no decimal places, and this is the correct indication for creating a numeric value that will be used as a counter because counter or threshold fields should only contain whole numbers (integers) without any decimal places. The default for the POSSYM (positive symbol) keyword is 'B' = none, but that is shown here to illustrate that no positive sign should be returned by the LSAM when a numeric variable is being used as a threshold counter.

:::tip
Use the LSAM command DSPDYNVAR to display the value string that will be returned by the LSAM to replace a Dynamic Variable token. This tool is helpful for experimenting with different Dynamic Variable definitions to discover which definition will return the value string that is required for a given application.
:::

Example 2 continues with a second step that illustrates the syntax of the SETDYNVAR command that can be used whenever it is desired to increase the value of a threshold counter (or any other numeric Dynamic Variable). To decrease the value, use a minus sign (-) as the first character of the VALUE keyword. Remember, though, that values cannot be increased or decreased unless a Dynamic Variable has been defined as numeric, using the NUMSIZ keyword. If a VALUE keyword includes a plus or minus sign when the variable is not numeric, this will actually replace the variable's current value to include the sign character and any other characters, exactly as typed in the VALUE keyword.

### F4 = Prompted SETDYNVAR Command

When preparing a SETDYNVAR command line, it is useful to start at IBM i command entry and use the prompting function key <**F4**> to see all the command parameters. Most of the IBM i LSAM functions that support a response command also support prompting, although the function key may be different, depending on the LSAM feature being updated. Following are examples of the prompted command, with and without the command keywords. An explanation of the command parameter keywords appears in a table below the prompt screen figures.

#### Prompted SETDYNVAR Command - 1 of 2
```
                          Set/Add Dynamic Variable (SETDYNVAR)

Type choices, press Enter.

Name of new/existing variable  .   _______________ Variable name            
Value string, +n, -n . . . . . .   __________________________________________________
_______________________________________________________________________________________
_____
 Variable type  . . . . . . . . .   V             L=LDA change, V=general use                    
 Sequence for same LDA variable     0             Sequence number: 0 - 999
 Char trim/LDA: start position  .   0             LDA start position: 0-1024, Trim: 1-128              
 Char trim/LDA change: length . .   0             LDA change length: 0-1024, Trim: 1-128
 Value calc. pgm./function code .                 Name, *DB2, *DTAARA, *DATE...                      
   Library  . . . . . . . . . . .     *LIBL       Name,*LIBL,*CURLIB
 Unload command program at end  .   *YES
 Compress numeric value . . . . .   N             Y = yes, N = no
 Numeric field size . . . . . . .                 Zero = non-numeric                       
 Decimal places, if numeric . . .                 Zero = whole number
 Decimal point symbol . . . . . .   '.'           (.), other, B=change to none                
 Group separator; Comma/Quote ed    [',']           (,),alt,B=change to none;CQDEF
                                                                       More            ...
```

#### Prompted SETDYNVAR Command - 2 of 2
```
                    Set/Add Dynamic Variable (SETDYNVAR)

Type choices, press Enter.

Suppress numeric leading zeros     _             0 = no (DFT), 1 = yes        
Negative value symbol  . . . . .   __            B=none, -, CR, DR, other
Negative symbol before/after . .   _             B = before, A = after       
Negative symbol position . . . .   ___           Position: 1-9, 0=no change
Positive value symbol  . . . . .   __            B=none, +, DR, CR, other          
Positive symbol before/after . .   _             B = before, A = after
Positive symbol position . . . .   ___           Position: 1-9, 0=no change       
Currency symbol, if numeric  . .   _             $, other, B=change to none
Currency symbol position (L) . .   ____          Position: 1-99, 0=no change       
Currency symbol relative loc . .   __            F=float, (.)=fixed from dec

Variable description . . . . . .   ____________________________________________

                                                                      Bottom
```

#### Prompted SETDYNVAR Command - With Keywords - 1 of 2
```
                      Set/Add Dynamic Variable (SETDYNVAR)
                                                                       
Type choices, press Enter.
                                                                       
Name of new/existing variable  . VARNAM         _____________
Value string, +n, -n . . . . . . VALUE          _______________________________  

Variable type  . . . . . . . . . VARTYP         V                          
Sequence for same LDA variable   VARSEQ         0    
Char trim/LDA: start position  . LDASTR         0                              
Char trim/LDA change: length . . LDALEN         0     
Value calc. pgm./function code . USRPGM         __________                        
Library  . . . . . . . . . . .                  *LIBL     
Unload command program at end  . UNLOAD         *YES                            
Compress numeric value . . . . . CMPNUM         N
Numeric field size . . . . . . . NUMSIZ         ____                          
Decimal places, if numeric . . . NUMDEC         ____
Decimal point symbol . . . . . . DECSYM         '.'                          
Group separator; Comma/Quote ed  COMMA          ','
                                                                  More...
```

#### Prompted SETDYNVAR Command - With Keywords - 2 of 2
```
Set/Add Dynamic Variable (SETDYNVAR)

Type choices, press Enter.
                                                                      
Suppress numeric leading zeros   ZEROSUP        _                          
Decimal point symbol . . . . . . NUMSYM         _  
Negative value symbol  . . . . . NEGSYM         __                           
Negative symbol before/after . . NEGBA          _
Negative symbol position . . . . NEGPOS         __                           
Positive value symbol  . . . . . POSSYM         _
Positive symbol before/after . . POSBA          __                         
Positive symbol position . . . . POSPOS         ____
Currency symbol, if numeric  . . CURSYM         _                          
Currency symbol position (L) . . CUSPOS         ___
Currency symbol relative loc . . CURLOC         _     
Variable description . . . . . . DESC           _______________________________
__________________
                                                                  Bottom
```

### Command Parameter Keywords

| Keyword        | Values         | Default        | Description    |
| -------        | ------         | -------        | -----------    |
| VARNAM Variable name | Any characters |          | The key identifier of each variable. For records of type L, this name must be the Captured Job ID or the Job Name of a tracked or queued job. For records of type V, this may be any meaningful name that will be used to create a token ID. Job names are limited to 10 characters, but a Captured Job ID or token ID can use up to the 12 characters allowed for this field.  |
| VALUE Current value or numeric change amount | Any keyboard character; or signed digits for numeric value changes. **Note**: Blanks or spaces are not supported by this parameter. If the value is blank, the master record value will not be changed.   | - Blanks         | - To specify a fixed value for a dynamic variable, when a value calculate program is not being used, type in the value. If the required value cannot be typed on a workstation keyboard, then a value calculate program must be used to supply the value at run time.  If a value calculate program is specified, but the program cannot be found at run time, then any value specified in this field  will be used as the default. For type V tokens, a blank value will cause the token to be removed from the string where it was found and the string will be compressed to remove as many spaces as were occupied by the token. For type L variables, a final result of blanks for the variable will cause the LDA to be updated with space characters in the specified location/length. |
|                |                |                | - For Dynamic Variables defined as numeric, the VALUE keyword will accept a number that is preceded by a plus (+) or minus (-) sign as a request to increase or decrease an existing value by the amount in the VALUE  parameter. |
| VARTYP Variable type | L, V           | V              | The record type is L for a dynamic variable that will be used to update the LDA content of a job. Type V records are dynamic variable tokens that can be inserted into job parameters or the job's call command line.  |
| VARSEQ Sequence number | 000 -- 999     | 000            | This record sequence number should be zeros for records of type V because it has no meaning for this record type. For records of type L, this sequence number is used to created unique records keys when there is more than one dynamic variable assigned to the same Variable Name (there may be multiple updates specified for the LDA content of a single job).  |
| LDASTR Char trim/LDA: start position  | Char trim:  1 - 128 LDA: 0 – 1024 | 0000           | Required for record type L (LDA),  optional value string trim for type V. |
|                |                |                | **LDA**: This number specifies the cardinal position (1-1024) where substitution of the dynamic variable's value will begin in the image of the local data area (LDA) content for a job. |
|                |                |                | **Type-V**: This number specifies which position of the value string should be the first position of the value returned to replace a {TOKEN}. |
| LDALEN Char trim/LDA change: length | Char trim: 1 - 128 LDA: 0 – 1024 | 0000           | Required for record type L (LDA), optional value string trim for type V. |
|                |                |                | **LDA**: This number specifies how many characters in the LDA content image will be updated by the value of the dynamic variable. If the supplied variable value is longer than this length, the value will be truncated to this length. If the value is shorter than this length, the remaining length will be padded with space characters (blanks). |
|                |                |                | **Type-V**: This number specifies how many total characters will be returned from the currently stored or calculated value string, beginning with and including the Char Trim Start position. If the value string is shorter than this length, only the non-blank characters returned by the Agent will be used to replace the {TOKEN}. This length number cannot be used to force blanks (spaces) as part of the replacement value. |
| USRPGM Value calculator program | A valid IBM i name | Blanks         | The name of an optional IBM i program supplied by the user that will calculate the dynamic variable's value at the moment just before the actual substitution will take place. The LSAM supports any length character string up to 128 characters in length. The content of this character string is not limited, since a local data area may contain any hexadecimal value in any position. | 
|                |                |                | **Note**: The LSAM passes the current value of the variable to the program, but uses whatever value is returned by the program to replace a variable token at run time. There is also a second parameter of 12 characters passed to the program that contains the Variable Name. |
| UNLOAD Unload (end) program after this command | LSAM internal use only  | DO NOT USE     | This field is used by LSAM programs when they execute a direct call to the command driver program for the SETDYNVAR command. DO NOT USE OR CHANGE THIS KEYWORD VALUE. |
| CMPNUM Compress numeric value | Y, N           | N              | **N** = no, use VALUE character string as-is. |
|                               |                |                | **Y** = yes, compress and save only numeric digits. | 
|                               |                |                | This keyword tells the command processor program of the SETDYNVAR command to modify the character string presented in the VALUE keyword, removing all characters except for numeric digits. | 
|                               |                |                | **Note**: This flag field is not stored in the Dynamic Variable definition, it is only used during the execution of the SETDYNVAR command. Although only numeric digits will be stored as the  variable's current value, the variable will not be defined as a numeric value unless the NUMSIZ keyword is also specified with a value greater than zero. | 
| NUMSIZ Numeric field size | 0 - 63         | 0              | A value greater than zero in this field designates that the dynamic variable will always be handled as a numeric field, capable of numeric operations and also optionally subject to numeric edit codes to prepare the value for output when it is requested.  |
| NUMDEC Decimal positions of numeric variable | 0 - 63         | 0              | A non-zero value in this field specifies the number of digits (included in the total size value, above) that are handled as right of the decimal point, that is, part of the numeric value that is less than 1, such as tenths, hundredths, etc. This field only applies if the size field is also not zero. The number of  decimals cannot exceed the total numeric field size. |
| DECSYM Decimal point symbol | any            | . (period)     | When a numeric value is defined with 1 or more decimal places, this symbol will be inserted into the string of numbers from the current value of the dynamic variable. In some countries a comma (,) might be expected to indicate the start of decimal positions.   |
| COMMA Grouping separator; Character edit | any            | , (comma)      | **FOR NUMERIC VARIABLES**: The symbol used to separate whole numbers into groups of 3 digits each. A value of **B** means there will be no grouping of the whole number digits. |
|                |                |                | **FOR CHARACTER VARIABLES**: The following values can be used to escape or replace single quotes or commas contained in the variable value: **C** = replace any comma (,) X'6B' with a space (X'40'), **Q** = replace any single quote (') X'7D' with a space (X'40'), **D** = replace both a comma and a single quote with a space, **E** = escape a single quote by inserting an extra single quote, or **F** = replace comma with space AND escape a single quote by doubling | 
| ZEROSUP Suppress leading zeros | 0, 1           | 0              | **0** = no (default value) |
|                |                |               | **1** = yes |
|                |                |               | When this field is set to zero or is left blank, all the size positions of the full numeric size will be filled with zeros at positions higher than the greatest significant digit, such as: 00345.67. |
|                |                |               | When the value is 1, this same example value would be returned left-adjusted and without leading zeros, as: 345.67. |
| NEGSYM Negative value symbol | any            | B (= none)     | If this field is not blank or set to the special value of 'B', then the characters typed into this field will be inserted into the value that is returned whenever the dynamic variable value is requested, and the numeric value is negative. The location of these characters is controlled by the next two fields.  |
| NEGBA Negative symbol position (location) | B=before, A=after    | B              | When characters are specified for the negative value symbol, this field indicates whether the negative symbol should appear before or after the string of numbers. |
| NEGPOS Negative symbol position (relative distance) | 1 - 9          | 1              | When characters are specified for the negative value symbol, this field indicates how far the negative symbol should be from the first (before) or last (after) digit in the number. A value of 1 means that the symbol will appear immediately next to the number. |
| POSSYM Positive value symbol | any            | B (= none)     | If this field is not blank or set to the special value of 'B', then the characters typed into this field will be inserted into the value that is returned whenever the dynamic variable value is requested, and the numeric value is positive. The location of these characters is controlled by the next two fields. |
| POSBA Positive symbol position (location) | B=before, A=after | B              | When characters are specified for the positive value symbol, this field indicates whether the positive symbol should appear before or after the string of numbers. |
| POSPOS Positive symbol position (relative distance) | 1 - 9          | 1              | When characters are specified for the  positive value symbol, this field indicates how far the positive symbol should be from the first (before) or last (after) digit in the number. A value of 1 means that the symbol will appear immediately next to the number. |
| CURSYM Currency symbol | any            | $             | For numeric variables, a non-blank value in this field will be inserted before the edited number in a position specified by the next two fields. This currency symbol would appear before any negative or positive symbol, if that other symbol were specified to appear before the number itself.  |
| CCURPOS Currency symbol position (reference point) | F, (.)         | F              | When a currency symbol is specified for a numeric variable, this field indicates how the relative distance (in the next field) will be computed:  |
|                |                |                | **F = float**: The currency symbol will be positioned relative to the highest significant digit (or relative to the highest zero-fill character, if leading zeros are not suppressed). |
|                |                |                | **(.) = fixed**: A period character indicates that the currency symbol should appear a fixed number of positions to the left of the decimal point. If the number of digits returned for a value is greater than this  distance, the currency symbol will appear immediately next to the left-most digit of the number. The fixed position is useful when comparing a dynamic variable numeric value to a string that was extracted from a printed report where the currency symbol always appears in a fixed column of the report line. |
| CURLOC Currency symbol position (relative distance) | 1 - 99         | 1              | Combined with the reference point specified above, this value determines the number of positions to the left of the number string where the currency symbol will appear. A value of 1 means that the currency symbol will appear immediately to the left of the leftmost digit (or other character, if a positive/negative sign is used) in the numeric string.  |
| DESC Description | Any printable character text | IBM i job ID is inserted if this  keyword is not specified. | Any useful descriptive text. If the dynamic variable was created by the SETDYNVAR command, this field will contain the IBM i job ID (number/user/name) of the job that executed the SETDYNVAR command when the DESC keyword is not specified. When SETDYNVAR is used to update a value, any existing descriptive text will not be overlaid by the IBM i job ID.  |


## SETHEXDV: Set Dynamic Variable HEX value

This command has been replaced by the Dynamic Variable \*HEX Function Code.

Do not continue to use this command. Instead, the following instructions explain how to upgrade any existing Dynamic Variables that were previously created by SETHEXDV into the upgraded format of the \*HEX Function Code.

To convert a hexadecimal Dynamic Variable that was added using SETHEXDV, use the Work with Dynamic Variables option from any LSAM sub-menu. Find each hex variable by using the unique name that was assigned to it, such as "CR" for Carriage Return, where the actual stored value was X'0D'. Type option 2=Change next to each variable, one at a time, and on the maintenance display type "**\*HEX**" into the Function Code field.

:::tip
It will be necessary to retype the hexadecimal value, using the notation style of X'0D' (using Carriage Return as an example). If the Value Calculator Program Library fields shows a value of *LIBL, clear out that unnecessary value.
:::

Press Enter to update the Dynamic Variable record. Repeat this process for each variable that had been created using the old SETHEXDV command.

## WAITDYNVAR: Wait for Dynamic Variable Value

This command is useful for implementing coordination of rules, for example, between Operator Replay Scripts and the LSAM's Message
Management feature. The function of this command is to wait up to a maximum length of time, watching for a named Dynamic Variable to be set to one of the Values specified in the command parameters. The command reports its success or failure by setting the reserved Dynamic Variable named "WAITDYNVAR" to a value of either '**PASS**' or '**FAIL**'. The command returns '**PASS**' immediately upon discovering one of the values, otherwise it returns '**FAIL**' after the timed watch cycles expire. The command will also return '**FAIL**' if some other error occurs, such as the referenced Dynamic Variable not being found, in which case the command also generates a non-fatal completion message to report the error condition.

In summary, the results of the WAITDYNVAR should first be tested by comparing the dynamic variable named "WAITDYNVAR" for a value of '**FAIL**'. If the reserved-named dynamic variable returns a value of '**FAIL**', then the value of the specific application-specific dynamic variable cannot be used. However, if the value is 'PASS', that may be sufficient to control any logic that depends on the results of the WAITDYNVAR command. But if two values were specified in the command, then the application-specific dynamic variable can be tested to see which of the two values was returned. The two-value capability of the WAITDYNVAR command is often used to control branching of logic, for example, among two different control groups of Captured Data Response Rules, or for the branching logic of an Operator Replay script.

### Command Syntax

In the following example of the WAITDYNVAR command, the optional parameter for keyword VALUE2 can be left blank, if only one value is to be tested. The timing parameters demonstrate a maximum wait time of 60 minutes, that is, a DELAY time of 10 seconds multiplied by 360 loops (repeated checking of the named Dynamic Variable).

:::info example
```
WAITDYNVAR VARNAM(dyn_var_name) VALUE1('value_string')
VALUE2('value_string') DELAY(10) NBRLOOPS(360)
```
:::

**KEYWORD DESCRIPTIONS**:
- **VARNAM:** Dynamic Variable name (refer to Constraint below)*
  - The nameof an existing Dynamic Variable. If the Variable does not exist in the Dynamic Variable table file when the command executes it will return a '**FAIL**' result code.
- **VALUE1:** Required value string or number, up to 128 characters.
  - At least this first Value string must be specified. The value returned from the Dynamic Variable must match exactly. (Hint: Use the DSPDYNVAR command to see the length and format of a Dynamic Variable.) If a number is specified it must be enclosed within a pair of single quotes, such as: '**1234**'
- **VALUE2:** Optional additional value string or number, up to 128 characters
  - An optional second value string. Leave this parameter blank if a second value is not required.
- **DELAY**: 1 to 999
  - Used in the IBM i command DLYJOB, the number of seconds to wait between checks of the value of the Dynamic Variable.
- **NBRLOOPS**: 1 to 99999
  - The number of times to check the value of the Dynamic Variable, before each wait period, before the command will report 'FAIL' if the specified values are not found.

:::tip Constraint
The Variable used in the VARNAM parameter must be a type-V Dynamic Variable. Type-L variables (for LDA manipulation) cannot be used.
:::

## WAITDYNVAR Example Applications

This command could be used in any software running under IBM i, as long as the LSAM library list is in effect. Any program using this command must be able to retrieve and test the value of the reserved variable named "WAITDYNVAR" in order to determine if this command has returned a value of '**PASS**' (either Value string was found) or '**FAIL**' (neither Value string was found within the specified time limits).

### Methods Available for Retrieving Dynamic Variables

#### Specify a Dynamic Variable Token with Fields of a Response Rule

Perhaps the most obvious use of the WAITDYNVAR command is to execute it within a group of Captured Data Response Rules. In this case, the values of dynamic variables can be tested by specifying Dynamic Variable Tokens with fields such as Compare Reference or Compare Data.

This is the method illustrated in a WAITDYNVAR application example, below.

#### A User Program Executes the LSAM GETDYNVAR Command

A program can call the LSAM program GETDYNVARR (the command driver for the GETDYNVAR command) using the following syntax, where the value of the Dynamic Variable will be returned in the third parameter, or a non-blank error code may be returned in the first parameter. Consider the following example from a Control Language program:

**EXAMPLE:**
```
DCL VAR(&RETURN) TYPE(*CHAR) LEN(7)
DCL VAR(&DYNVAR) TYPE(*CHAR) LEN(12)
DCL VAR(&DYNVAL) TYPE(*CHAR) LEN(129)
DCL VAR(&TMESTP) TYPE(*CHAR) LEN(26)

DCL VAR(&CMPVAL) TYPE(*CHAR) LEN(129)

CALL PGM(GETDYNVARR) PARM(&RETURN &DYNVAR &DYNVAL &TMESTP)

IF COND(&RETURN *EQ ' ') THEN(DO)
  CHGVAR VAR(&CMPVAL) VALUE(%SST(&DYNVAL 1 128))
  CHGVAR VAR(%SST(&CMPVAL 129 1)) VALUE('X')
ENDDO
```

Notice in the example above that the &DYNVAL parameter is 129 characters long, although the maximum size of a Dynamic Variable is limited to 128 characters. Byte position 129 of this third program parameter is reserved for a non-blank character (such as 'X') in order to protect against the limitations of long character parameter passing to/from a Control Language program.

#### A User or Program Executes the LSAM Command DSPDYNVAR

This command may not be useful in many scripted applications, except it could be used by an Operator Replay script and then the results could become captured data for processing by response rules.

The LSAM command DSPDYNVAR can be used to return a completion message that includes the Dynamic Variable name, followed by a labeled value string and then the time stamp when the value was last updated, such as illustrated here:

:::info example
ACHCLTMAIL VALUE = YES Last updated: 2012-06-08-14.38.49.574000
:::

#### Database Queries or an SQL Statement

These can be used to fetch the field VTOKVAL from file SMADTA/LSAVARF00 where the field VTOKNAM is equal to the Dynamic Variable name. However, this method does not take advantage of the Dynamic Variable's ability to format numeric values.

### An Example Application

The ability to test the contents of a Dynamic Variable can be used to implement decision logic, where the two different values determine the program's logical progress forward. A good example is using this command to cause an Operator Replay script to wait for the results of a job that may be submitted during the Script execution, where the Script must know the results of the submitted job in order to choose which job steps to execute at the end of the Script.

Consider the case where an Operator Replay script executes a green screen menu option that causes a new job to be submitted. In this case, assume that the submitted job is not configured for monitoring by OpCon (that is, Job Tracking is not being used). Instead, the human operator would previously wait for a minute or two until the completion message of the submitted job was reported to the user's message queue, as either a successful job or a failed job.

Included in this Operator Replay script there must exist two labelled Script Steps, following the Step that executed the menu option, and these two Step labels must be located at strategic locations within the Script where green screen automation will continue based on whether (1) the submitted job succeeded or (2) the submitted job failed.  Separate blocks of Script Steps will begin at these two different locations in the Script.

To fully automate this process, the name of the submitted job must be known, and it is also important to know the user name assigned to the submitted job. In this example, we will assume that the Script user name is USER1. One way to automate this whole process would be to use the following tools and steps.

1. Register (create) an Dynamic Variable {TOKEN} that will be used as a variable Branch-To Label value. The example token name used here will be BTOLBL1. The initial value should be the name of the script label where the script should branch if the submitted job fails: Assume for this example that it will be 'SBMJOBFAIL'. 
:::tip Hint 
Set initial values of variables using Captured Data Response Rules that execute at or near the first steps of an Operator Replay script, in order to avoid any possible timing issues later in the script execution.
:::

  - Set the Dynamic Variable Token BTOLBL1 value to 'SBMJOBFAIL'
```
SETDYNVAR VARNAM(BTOLBL1) VALUE('SBMJOBFAIL')
```

2. Register an LSAM Dynamic Variable that will be used to store the pass/fail result of the submitted job. The example Dynamic Variable used here will be JOBSTS1. The initial value of this variable should be the negative result value: Assume for this example it will be '**JOBFAIL**'.

```
SETDYNVAR VARNAM(JOBSTS1) VALUE('JOBFAIL')
```

3. Add two IBM i LSAM Message Management Parameters (rules). These rules will both monitor the user message queue for the user that will submit the new job. In this example, that would be the user message queue USER1 located in library QUSRSYS. Also specify the submitted job name. There will be one Message Management Parameter record for each possible job completion message, and each Message Management Parameter will set the value of the Dynamic Variable named JOBSTS1 to either '**JOBPASS**' or '**JOBFAIL**'. Consider the following representation of these two Parameter configurations: 

    - For message ID CPF1240, respond with the command:
    ```
    SETDYNVAR VARNAM(JOBSTS1) VALUE('JOBFAIL')
    ```
    - For message ID CPF1241, respond with the command:
    ```
    For SETDYNVAR VARNAM(JOBSTS1) VALUE('JOBPASS')
    ```

4. Add a step to the Operator Replay script before the new job will be submitted where a command can be executed from an IBM i command entry line. Use the following command to turn off *BREAK delivery of messages to this user, not only simplifying the Operator Replay script but also making sure that Message Management will handle these messages:
  ```
  CHGMSGQ MSGQ(QUSRSYS/USER1) DLVRY(*HOLD)
  ```

5. Allow the Operator Replay script step to execute that will cause the new job to be submitted. Let's assume this will be at step # 140.

6. The next step (assume step # 150) of the Operator Replay script is assumed to handle the view of the menu screen from which the job start option was selected. Regardless of what command text or function key would be executed at this point, any associated Screen  Data Capture Rules will be executed first. This step # 150 will also perform the conditional script branching logic defined below, using an Operator Replay Token in the Branch-to Label field.

7. Linked to the post-submit job step # 150, create a Screen Capture Rule. It is not important what is captured from the screen, so just capture all 1920 bytes starting at row 1, column 1. This Screen Capture Rule is actually being used as a link to a series of Captured Data Response Rules that are all associated with the same Capture Rule, and therefore with the same Operator Replay Script Step. The sequence of these Captured Data Response Rules is important.

8. The first Captured Data Response Rule to create is the one that must wait for the job completion message. This wait function will be performed by the WAITDYNVAR command. For this example, the command should be specified similar to the following:
  ```
  WAITDYNVAR VARNAM(JOBSTS1) VALUE1('JOBPASS') VALUE2('JOBFAIL') DELAY(10) NBRLOOPS(360)
  ```
9. The next Captured Data Response Rule must test whether the WAITDYNVAR command itself may have failed, or more likely, if it is reporting a timeout, meaning that the submitted job must be stuck and no job completion message was ever detected. 

    - This Rule compares the reserved dynamic variable named WAITDYNVAR to a value of 'FAIL'. If that value is matched, the response command sets the Operator Replay token/variable to the value that will force the Script to end abnormally:
    ```
    SETDYNVAR VARNAM(BTOLBL1) VALUE('SBMJOBFAIL')
    ```

10. The next two Captured Data Response Rules will set the Operator Replay token/variable value, depending on the result returned by the WAITDYNVAR command via the Dynamic Variable named WAITDYNVAR. 

    - Note that each of these rules must include a second, separate  Rule record that will perform a test of the dynamic variable  named WAITDYNVAR to be sure it equals 'PASS'. Use the continuation field value of 'AND' to link this test to each of the following Rules records.

    - The second Response Rule compares the {JOBSTS1} token value to 'JOBPASS' and if so, it executes the command that sets the Operator Replay Branch-to Label token value to the Script Step label where logic continues if the submitted job completed normally: 
    ```
    SETDYNVAR VARNAM(BTOLBL1) VALUE('SBMJOBPASS')
    ```
    - The third Response Rule compares the {JOBSTS1} token value to 'JOBFAIL' and if so, it executes the command that sets the Operator Replay Branch-to Label token value to the Script Step label where logic continues if the submitted job failed.
    ```
    SETDYNVAR VARNAM(BTOLBL1) VALUE('SBMJOBFAIL')
    ```

11. Good "programming practice" suggests that one extra pair of Captured Data Response Rules is recommended to produce a controlled outcome in case the Dynamic Variable {JOBSTS1} does not contain either of the expected values. Use the Captured Data Response Rule Continue field value of 'AND' to combine these two rules in order to perform the following tests:
    ```
    IF {JOBSTS1} NE 'JOBPASS'

    AND {JOBSTS1} NE 'JOBFAIL'
    ```

    If these two conditions are met, then one of the two Rules records must contain the following Response command in order to force the
    Operator Replay Script to branch to the job failure steps. 
    ```
    SETDYNVAR VARNAM(BTOLBL1) VALUE('SBMJOBFAIL')
    ```

    Note that this Response Rule pair could also specify a third Branch-to Label, if the Script is designed to do something special in this case of unexpected failure, or, another Rules record using CMD in the continuation field could be used to specify a message generation command that would notify operations about this unexpected error condition.

12. Remember to add at least two steps to the Operator Replay Script that will include the two Branch-to Label values of SBMJOBFAIL and SBMJOBPASS. It might also be preferred to put either of these labels into separate Scripts, for example, if job failure logic is a reusable Script that can be shared by other primary Scripts.

At the SBMJOBFAIL labeled step, one technique that is helpful is to force the Operator Replay Script to fail, so that the job shows up as a failed job on the OpCon schedule. One way to do this is to define a TOP or BOTTOM condition on the SBMJOBFAIL step where the value string specified will never be found on the screen (for example, specify a control string value of "This will never match"), and set the option for handling the forced mismatch to 'F' = force script to fail.

An alternative way to force an Operator Replay Script to report a failure to the OpCon schedule and then abort the script, is to cause the LSAM utility command "SMAFAILJOB" to be executed whenever one or more Response Rules has detected any of the failure conditions discussed above.

## LOGDYNVAR: Log and Analyze Dynamic Variable Values

The LOGDYNVAR command and the table of values that it maintains (also called LOGDYNVAR in library SMADTA) were originally created to store a series of captured data values that would each be stored into the same Dynamic Variable. If this command is used to record a copy of the Value each time the Dynamic Variable is updated, then the series of values could later be queried to produce statistical results such as an average, for example, of system CPU or Disk utilization.

:::tip
Any text string value can be stored into the LOGDYNVAR file, so it can be used in the following methods.
:::

The LOGDYNVAR table adds value to the data store by automatically assigning a time stamp to each entry. This makes it possible to limit value surveys within any specified range of times. The table also supports a 12-character Key field (originally designed to match the longest possible Dynamic Variable name), a 20-character user-defined Code column (field) and a 32-character Description column. All three of these fields could contribute to isolation of data when SQL query techniques are used.

One goal of gathering a series of Values from one Dynamic Variable is to make it possible for another Dynamic Variable of type \*DB2 to use SQL SELECT statements to query that series of values. The new Dynamic Variable would, at run time, produce a single result that might be, for example, either a MAX value or an AVG (average) value, deduced from the series of values within a given range of dates/times. Values exceeding user-defined thresholds could trigger OpCon Events, including notification actions and possibly also automated remedial jobs executed by an OpCon Schedule.

### LOGDYNVAR User Instructions

Values captured from messages, reports and workstation displays can be easily stored into Dynamic Variables using the "Store CAPT to->" field of an LSAM Response Rule that can be associated with any Capture Rule. If the Response Rule also executes the new LOGDYNVAR command, then a series of values for the same Dynamic Variable name can be stored with a time stamp (and optional additional CODE and DESC values) by specifying the Dynamic Variable as a token for the DVVALUE parameter of the LOGDYNVAR command (as illustrated below).

Here is the layout of the LOGDYNVAR table:

| Field       |    Type     | Length   | Description
| ----------- | ----------- | -------- | -----------------------------------------------
| DVRECDATE   | TIMESTAMP   |  26      | Automatically assigned
| DVPRIMARY   | NUMERIC     |   9      | Automatically assigned
| DVNAME      | CHARACTER   |  12      | Dynamic Variable name or other name
| DVVALUE     | CHARACTER   | 128      | Current (or any) captured value
| DVCODE      | CHARACTER   |  20      | User-defined category, for SQL Select
| DVDESC      | HARACTER    |  32      | User-defined description, opt also for Select

Here is the syntax of the LOGDYNVAR command:
```
SMAPGM/LOGDYNVAR DVNAME(DVORKEYNAME1) +
VALUE('Any value string contained within a pair of single quotes.') +
CODE('MY-CODEA-CPU-UTIL') +
DESC('CPU utilization from DSPSYSSTS')
```

:::tip
Any value can be used for the DVNAME key value, but if it contains special characters or spaces, or it begins with a non-alpha character, then it must be contained within a pair of single quotes in the LOGDYNVAR DVNAME( ) keyword.
:::

After one or more values has been stored in association with the same key value (which could be the Dynamic Variable name), then another Dynamic Variable can be used to query the series of values by using the User Program special value of \*DB2. This allows a  predefined SQL SELECT statement to be executed whenever the new Dynamic Variable token will be replaced. Following is an example of the SQL syntax that can be used to produce a single average value for the new Dynamic Variable:

**EXAMPLE:**
```
SELECT 'CPU avg: ' CONCAT AVG(DEC(DVVALUE,4,1))
  FROM SMADTA/LOGDYNVAR
  WHERE DVNAME LIKE 'CPU%'
    AND DVRECDATE >= '2017-07-10-00.00.00.000'
    AND DVRECDATE <= '2017-07-12-23.59.59.000'

EXAMPLE RESULT:
CPU avg: 15.2
```

**EXAMPLE NOTES**:

1. The SQL statement above can be typed entirely into the WHERE field of a \*DB2 extension to a Dynamic Variable master record, if the "field/col" field is set to a value of "\*WHERE".
2. The example above assumes that the CPU utilization was captured from the DSPSYSSTS display on a screen format, and that its maximum value could be 999.9. The captured character string is converted to a Decimal value using the SQL DEC keyword and its associated numeric size parameters (4 digits, of which 1 is to the right of the decimal point).
3. The LOGDYNVAR command and table support two other user-defined fields (table columns):
4. The LSAM does not support any automatic purging of the LOGDYNVAR table. This is entirely up to the user. The table could be purged by using an SQL statement that deletes all records with timestamps older than a user-specified value.
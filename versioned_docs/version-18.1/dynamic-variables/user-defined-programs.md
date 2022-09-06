---
sidebar_label: 'User-defined Programs for Replacing Dynamic Variable Values'
---

# User-defined Programs for Replacing Dynamic Variable Values

When a program is specified for a Dynamic Variable, the LSAM will call that program at run time during the process of replacing the Dynamic Variable token with its actual value (or when preparing the string to use for updating a job's LDA (local data area)). Consider the various rules that affect how user-defined programs will be used, as described in the Fields table above under VALUE and also USRPGM. 

Following is the RPG program logic used by the LSAM to call a user-defined value calculator program for Dynamic Variables. Specify input (*ENTRY) parameters in the user-defined program to match:

```
Eval UsrLibPgm = %trim(VUSRLIB) + '/' + %trim(VUSRPGM)
Call UsrLibPgm
Parm          UsrValueX (129 characters)
Parm WkVarNam UsrVarNam (12 characters)
* UsrValueX is a concatenation of VTOKVAL (128) + trailing 'X'
```
A model CL program that conforms to these requirements is provided in an example box at the topic [Example of Parameter Passing for User-Defined Value Calculator Program](old-method.md#example-of-parameter-passing-for-user-defined-value-calculator-program).

The technical definition for developing a compatible user-defined program is simple: The program must be able to accept at least one non-constant parameter that is 128 characters in length, but best practice indicates that both parameters should be defined. The program interface may be described either as an ILE prototype procedure call or as an OPM external program call with parameters.

The first parameter is for the value of the Dynamic Variable. The LSAM will pass the existing value of the Dynamic Variable in this first parameter. The called program may choose to ignore the initial value, or it may be designed to manipulate the input value that was provided. Regardless of the input value, the LSAM will process whatever value is contained within this same parameter after the user-defined program ends. Remember the rules described for the VALUE field in the table above that apply if blanks are returned by the called program.

The second parameter (which should be specified as a constant input parameter) is 12 characters in length. This parameter will contain the name of the Dynamic Variable, useful in case a single program might serve multiple different Dynamic Variables of a similar content type.

Remember that when user-defined programs are called by the Dynamic Variable value calculation routines, the user-defined program could receive a raw numeric value as a string of integers, including any leading negative sign. The user-defined program may or may not need to read the LSAM master record that defines the Dynamic Variable to determine the number of implied decimal places included in a numeric string. However, to avoid dependencies on the LSAM file structure (which could change), it might be best to include control over the number of decimals places within the user-defined formatting program.

Consider also the topics above about managing numeric values, when it is necessary to store and retrieve numeric values to/from Dynamic Variables.
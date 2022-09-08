---
sidebar_label: 'Nested Dynamic Variable Tokens'
---

# Nested Dynamic Variable Tokens

Dynamic Variables can have their value defined by a Dynamic Variable {TOKEN} stored in the Value field. Dynamic Variable VALUE {TOKENS} can be nested to virtually any level. The LSAM value replacement module will simply continue to call itself over and over until an actual value is discovered that does not include another {TOKEN}. The only limit on the levels of nesting is whatever limit IBM i imposes on recursive calling of \*NEW Activation Groups (which is a programming concept).

A Dynamic Variable master record cannot be configured with a nested {TOKEN} using the SETDYNVAR command because any Dynamic Variable token appearing in the VALUE( ) parameter will be replaced by the SETDYNVAR command processing program, so that only the value of that token will be placed into the Variable master record and not the {TOKEN} itself. Instead, use the Dynamic Variable maintenance function available from multiple sub-menus of the LSAM green screen menu system.

:::tip
One or more Dynamic Variable {TOKENS} are now allowed in the VALUE field of numeric variables. Previously, there was strict enforcement allowing only actual numeric digits to be entered when creating, changing or copying Dynamic Variable master records with a data type of Numeric. Now {TOKENS} are allowed, and actual digits can be interspersed with one or more tokens, but non-numeric values are still not allowed outside of the token special characters.
:::

## Use Case for Nested Dynamic Variable Tokens

The goal of this example is to retrieve the current system date and then return just the Year and Month part of this date (as YYYYMM) for a date that is 3 months in the past (which might be used to compute a retention period for old IBM i objects). This Use Case relies on documentation about the Dynamic Variable Function Codes (FN) in another part of this section about Dynamic Variables.

First, a Dynamic Variable with a Function Code of \*SYSVAL will have its Function Code Secondary field set to the name of QDATE so that its token will return the IBM i partition's current system date.

:::tip
The IBM i system value of QDATETIME might be more useful for the application described in this Use Case. However, the system value of QDATE is used to illustrate some additional capabilities of Dynamic Variables and also the warning that the IBM i command DSPSYSVAL often returns value strings that are formatted differently than when the Agent's Dynamic Variable token replacement module is using IBM APIs to retrieve system values.
:::

Refer to the following discussion about how the IBM i system date must be managed, to understand the following settings for Dynamic Variable SYSQDATE, as used in this example use case:
```
Example variable name:  SYSQDATE

CHAR TRIM START = 2, LENGTH = 6

FN CODE = *SYSVAL, FN secondary value = QDATE
```
Next, a different Dynamic Variable will be defined with the following settings, maybe with a name of PURGEDATE:
```
CHAR TRIM START = 1, LENGTH = 6

FN CODE = *DATE

VALUE = {SYSQDATE}
```
On display page 2 of Dynamic Variable Maintenance for this \*DATE Variable type, the date FROM-format must be defined to match the format of the System Date that the IBM i partition will provide for the system value of QDATE. This date format will be different than what is shown when using the interactive command DSPSYSVAL to show the value for QDATE, because IBM adds the default date formatting characters to the interactive display, but it does not add the formatting characters when the LSAM program uses an IBM i API to request a system value.

To learn what your unique system settings will produce for the *SYSVAL of QDATE, use option 6=DSPDYNVAR to test the outcome of using the Dynamic Variable called SYSQDATE.

A common format for the system date in a US IBM i partition would be CYYMMDD, but for this example the QDATE variable trims the date to YYMMDD. This means that the PURGEDATE page 2 date formatting must be set with the FROM-format option 1 assigned to the \*YMD format Code, including specifying a 0 (zero) in the FMT0 column for the From Field.

To match this example use case, the TO-Format must be set by assigning option 2 to the *ISO format Code, and also specifying a 0 (zero) in the FMT0 column.

Using these page 2 definitions for the *DATE Dynamic Variable called PURGEDATE, if the system value returned is 171108 (November 8, 2017) then final result for the PURGEDATE Dynamic Variable will be 201711. 

The LSAM's DSPDYNVAR command (same as option 6=DSPDYNVAR from the list of Dynamic Variables) is an important tool to prove that nested tokens are producing expected results.
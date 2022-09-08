# Dynamic Variable Function Codes

## What is a "Function Code" for LSAM Dynamic Variables?

The "Value calc pgm" field of an LSAM Dynamic Variable master record is also used by the LSAM to support special values that govern how the value for a Dynamic Variable will be prepared when it will replace a Dynamic Variable {TOKEN}. The Value Calc Pgm field label shows its alternative purpose by this label: "/Fn Code." This means "Function Code," and it refers to the unique functions of Dynamic Variable value replacement whenever a special value beginning with an asterisk * is entered into this field.

:::tip
For most Function Codes the Value Calc program library field is ignored. But it is used by the Function Code "\*SYSVAL" to specify the name of the IBM i system value name whose current setting should be retrieved.
:::

The special function codes that can be entered into the Value Calc Pgm field include:

### Function Codes that use a second definition display

- **\*DTAARA**: The dynamic variable {TOKEN} will be replaced by the contents of a DB2 data area that is defined in page 2 of dynamic variable maintenance. The original value stored in the Value field of the dynamic variable master record is returned whenever the specified data area cannot be found at run time. Preset the dynamic variable Value field so that fetch errors can be detected at run time.
- **\*DB2** : The dynamic variable {TOKEN} will be replaced by the contents of a DB2 table column value that is defined in page 2 of dynamic variable maintenance, using SQL search criteria. The original value stored in the Value field of the dynamic variable master record is returned whenever the specified SQL query fails to fetch the specified DB2 value. Preset the dynamic variable Value field so that fetch errors can be detected at run time.
- **\*DATE**: The stored Value string will be formatted as a date value, using page 2 of Dynamic Variable maintenance. The value will also support date math (adding or subtracting years, months or days).

### Function Codes that do not use a second definition display

- **PGM (+ LIB) name**: This original use of the Value Calculator Program/Library fields is discussed in a separate section.
- **\*TIME**: The stored Value string will be managed as a time value (with or without time string edit characters), supporting optional time math (adding or substracting hours, minutes or seconds).
- **\*SYSVAL**: The dynamic variable name must match a valid IBM i system value, and the current system value will be used to replace the dynamic variable {TOKEN} at run time. The name of the system value to be retrieved must be entered into the Function Code Field 2, to the right of the Function Code value. (This is the field that is alternately used for the Library name of a user-defined Value Calculator Program.) The value returned by this special function is a program API value, not always formatted in the same way as displayed by the IBM i command DSPSYSVAL. Experimentation is required to adapt the API return value to an appropriate use. Use the LSAM command DSPDYNVAR to test how any system value will be presented when the {TOKEN} is replaced. 
:::tip 
In previous patch levels of the IBM i LSAM software, it was required that the Dynamic Variable name itself must match a valid system value name. However, that rule prevented the ability to apply varying formats to the same system value. Any existing Dynamic Variables that conformed to the original rule will still be supported, until the next time that Dynamic Variable Maintenance is used to change or copy these older variables, at which time the data entry edits will enforce the new rule. Dynamic Variable names may still match IBM i system value names, but now the value retrieval routines will ignore the name of the Dynamic Variable whenever the Function Code Field 2 is not blank for a \*SYSVAL Function Code.
:::
:::tip
The system values returned to the Dynamic Variable token replacement module, using an IBM i API, often differ in format from the values that appear on an inter-active workstation when using the DSPSYSVAL command. Use the LSAM DSPDYNVAR command (or option 6 in the list of Dynamic Variables) to test a \*SYSVAL Dynamic Variable before using it in production. Dynamic Variable reformatting, and/or nesting of the \*SYSVAL {TOKEN} can be used to trim and/or reformat the system values for use in LSAM automation functions.
:::
- **\*HEX**: This Function Code replaces a temporary LSAM utility command called SETHEXDV, for the purpose of storing and retrieving low-level hexadecimal characters. These are characters that are mostly those used for formatting text such as an email text message that needs to separate the content into paragraphs. The \*HEX Function Code controls how the Agent Dynamic Variable token replacement module manages the stored value characters. It also controls how the DSPDYNVAR value test command behaves, and how the Work with Dynamic Variables option 2=Change or option 5=Display will show the stored value.

## \*DATE Function Code with Reformatting

Dynamic Variables that store date values can be transformed into many different edited or unedited formats using the \*DATE option supportedby the Dynamic Variable master record field called [Value Calculator Program Name].

:::tip IMPORTANT
\*DATE reformatting can only be performed if a Dynamic Variable is defined in advance using green screen maintenance.
:::

### User Instructions

Type \*DATE into the Value Calculator Program Name field. After Enter is pressed, a second maintenance screen appears, offering a pre-defined selection of FROM and TO date formats. Type a 1 next to the format that describes the date value that was originally captured and stored into the Value of the Dynamic Variable. Optionally, type a 2 next to the format that the LSAM should return when it replaces the {TOKEN} of the Dynamic Variable.

There is also a (0) zero option column. Type a zero next to either or both of the 1=FROM and/or 2=TO selections, if either field does not include punctuation characters. For example, if a captured date represents May 4, 2017, the typical USA format of this date would be either 05/04/17 or 05/04/2017. But if the date was captured as 050417 or 05042017, then it is necessary to type the 0 next to the 1=FROM format, so that the LSAM knows there are no slash characters.

Similarly, if the replacement value provided for the token should NOT include punctuation characters, then type a 0 in the FMT0 column next to the 2=TO format.

A very common use for this feature is to translate a common date format, such as 05/04/2017 into an *ISO-0 format: 201790504. This is the format that is required if date values are going to be compared as GT, LT, GE or LE. When using EQ or NE, it is possible to use punctuated date character strings, but those cannot be used for Greater- or Less-Than Boolean comparisons.

### Date Format Usage Notes and Hints

- If a captured date was in punctuated ISO format (for example, 2017-05-04), then it is not necessary (nor possible) to use \*DATE reformatting. Instead, just specify the "compress numeric" option when storing the date value, either in the SETDYNVAR command or when configuring a Response Rule.
- The \*DATE reformatting cannot be specified for a numeric Dynamic Variable unless the 1=FROM format is also marked for FMT-0. This is prevented by the Dynamic Variable value update program, because a numeric Dynamic Variable will not allow a punctuated date character string to be stored as its Value. To use both the punctuated date and the all-numeric date, create two different Dynamic Variable master records. Store or capture the punctuated format of the date into a character-format Dynamic Variable. Then, store the punctuated date value into the *DATE numeric-format Dynamic Variable using one of two methods:
  - Use the SETDYNVAR command where the Value parameter will contain a Dynamic Variable {TOKEN} that names the character Dynamic Variable and be sure to specify CMPNUM(Y) in the SETDYNVAR command parameters.
  - If the original, punctuated date is captured data, use a Capture Data Response Rule to store the captured value into the numeric Dynamic Variable by specifying a value of "Y" in the Response Rule "CompNum" field.
- It is possible to specify only the 1=FROM value to indicate what is the format of the current date in the variable's VALUE field, and not use the 2=TO reformatting option. Using this configuration is a way to isolate the Dynamic Variable so that date math can (optionally) still be used on the VALUE as it was originally stored, and no other changes will be made at run time. For example, if the date of November 13, 2017, was originally stored in the *USA format of 11/13/17, date math can be performed on this value to change it to the same date in the previous month: 10/13/17, and then the changed value will be used to replace the variable {TOKEN} at run time, still in the mm/dd/yy format.
- Date formatting characters can be removed from a date value without being forced to change the order and size of the date elements. Instead of relying on the FMT0 option of the Dynamic Variable date conversion, use the "compress numeric" function of the SETDYNVAR command parameter, called CMPNUM. It is also possible to specify "compress numeric" in Captured Data Response Rules, which governs how a captured data element will be stored into a Dynamic Variable.
- Remember that the date math function depends on an accurate specification of the 1=FROM (current) date format for the VALUE stored in the Dynamic Variable table. If a date value was stored without formatting characters, then the 1=FROM date format must also be followed by a '0' typed under the 'FMT' column on page 2 of the Dynamic Variable Maintenance screen.
- Since Dynamic Variable date formatting rules can only be specified using the LSAM green screen maintenance program, it is necessary to define \*DATE Dynamic Variables using manual maintenance (or an LSAM data Export/Import action) before the variable can be used in automation rules.
  - The automatic creation of missing Dynamic Variable master records by the SETDYNVAR command does not support specification of formatting details for *DATE or any other special function codes. It only supports general formatting of numeric Dynamic Variables.
  - The automatic creation of missing Dynamic Variable master records by the Captured Data Response Rules supports no specification of any formatting -- it only adds a character-type Dynamic Variable and its Value. Therefore, if formatting of any kind is required, the Dynamic Variable used by a Captured Data Response Rule in the "Store CAPT to->" field must be defined in advance.
- It is common practice to store a single numeric or date value into more than one Dynamic Variable to support multiple formats for the same captured date value. One format might be used to include the date in an email notification message, while an unformatted date in *ISO0 format is often the best format to use for comparing date values (in Captured Data Response Rules, or in Step qualification rules within either Operator Replay Scripts or Multi-Step Job Scripts). Refer to the [Use Case for Nested Dynamic Variable Tokens](./nesting.md#use-case-for-nested-dynamic-variable-tokens) for additional perspective on the application of multiple date Dynamic Variables.

## \*TIME Function Code

A function code of \*TIME does not change how the recorded time Value for a Dynamic Variable will be offered as the Dynamic Variable {TOKEN} is replaced. However, using this Function Code makes it possible to perform Time Math, increasing or decreasing the time value by using the special Value operation codes described below.

When a Dynamic Variable is designated as a \*TIME variable, the LSAM programs recognize and preserve the value separators provided by the user in the Value field of the Dynamic Variable master record. The only supported \*TIME separators are:

- (.) = a period
- (,) = a comma
- (:) = a colon
- unformatted = 6 digits only

The LSAM always assumes that the time value is comprised of six digits: HHMMSS (unformatted), or for example: HH.MM.SS. Thus, a \*TIME value must be a formatted time value that uses separator characters and occupies exactly 8 bytes of the VALUE field, or else it must be an unformatted time value that occupies only 6 bytes of the VALUE field and all 6 bytes must be numeric digits (a leading zero is required for hour values less than 10).

## \*DATE and \*TIME math

Dynamic Variables support a simple plus (+) or minus (-) value for adjustments that can be used whenever the numeric field size is set. But simple math is usually not useful for managing calendar date values. For \*DATE or \*TIME type Dynamic Variables there are additional Value operation codes that can be used to perform DATE and TIME math operations, to advance or retard either a date or a time value. The Dynamic Variable must have a Function Code of either \*DATE or \*TIME for this type of math value setting to work.

For both \*DATE and \*TIME variables, the largest number that can be used to change any segment of the value is 4 digits. Values from 1 to 9999 can be valid, but the actual value used should take into consideration the dramatic effect on the date or time that will happen if an extremely large number is used. 

For \*DATE variables, the Date math operators are these:

+Y9999  or  -Y9999
+M9999      -M9999
+D9999      -D9999

...where Y=years, M=months and D=days.

For \*TIME variables, the Time math operators are these:

+H9999  or  -H9999
+M9999      -M9999
+S9999      -S9999

...where H=hours, M=minutes and S=seconds.

If a Date or Time value needs to be adjusted by a combination of its segments, such as 4 hours and 20 minutes, the adjustment can be made by either pre-calculating the total number of minutes, or by executing the SETDYNVAR command twice - once for each value to be changed.

```
SETDYNVAR   ...    VALUE('+M20')
```

Notice that the VALUE string must be enclosed in single quotes.

It is possible to use a Dynamic Variable {TOKEN} for any or all parts of a Data or Time math setting, for example:

```
SETDYNVAR ... VALUE('+M{NBROFMONTHS}'
```

## \*SYSVAL Function Code

A function code of \*SYSVAL indicates that the Dynamic Variable name is the actual name of an IBM i System Value that should be retrieved and presented in place of the {TOKEN}.

Examples of System Value names include QDATE (the current system date), which is often used to feed another Dynamic Variable with a Function Code of  \*DATE, so that the IBM i partition's system date can be reformatted.

Refer to the topic about nested Dynamic Variable tokens, below, for an example of using a System Value {TOKEN} as the Value of another Dynamic Variable.

:::tip
In previous patch levels of the IBM i LSAM software, it was required that the Dynamic Variable name itself must match a valid system value name. However, that rule prevented the ability to apply varying formats to the same system value. Any existing Dynamic Variables that conformed to the original rule will still be supported, until the next time that Dynamic Variable Maintenance is used to change or copy these older variables, at which time the data entry edits will enforce the new rule. Dynamic Variable names may still match IBM i system value names, but now the value retrieval routines will ignore the name of the Dynamic Variable whenever the Function Code Field 2 is not blank for a *SYSVAL Function Code.
:::

:::tip IMPORTANT
The system values returned to the Dynamic Variable token replacement module, using an IBM i API, often differ in format from the values that appear on an interactive workstation when using the DSPSYSVAL command. Use the LSAM DSPDYNVAR command (or option 6 in the list of Dynamic Variables) to test a \*SYSVAL Dynamic Variable before using it in production. Dynamic Variable reformatting, and/or nesting of the \*SYSVAL {TOKEN} can be used to trim and/or reformat the system values for use in LSAM automation functions.
:::

## \*HEX Function Code

This Function Code replaces a temporary LSAM utility command called SETHEXDV, for the purpose of storing and retrieving low-level 
hexadecimal characters. The documentation section below that describes the SETHEXDV command also explains how Dynamic Variables that were created with this command can be converted to conform to the upgraded \*HEX Function Code format.

The \*HEX Function Code controls how the Agent Dynamic Variable token replacement module manages the stored value characters. It also controls how the DSPDYNVAR value test command behaves, and how the Work with Dynamic Variables option 2=Change or option 5=Display will show the stored value.

\*HEX Dynamic Variables are used to insert non-display control characters into OpCon automation tools such as the External Event 
command for sending email. The Agent utility command CPYTOMSGIN may include a {TOKEN} that is replaced by the true hexadecimal value stored in the referenced Dynamic Variable with Function Code \*HEX.

For example, a Carriage Return character could be used to improve the appearance of email messages by adding blank lines between paragraphs of the email message text.

\*HEX Dynamic Variables are restricted to accept only new values specified in the format X'hh', where 'h' is a valid character used to represent a nibble (half byte) of a character in the computer data format of the hexadecimal numbering system.

Characters representing hex values are limited to '0 - 9' and/or 'A - F'. For example, the Carriage Return control character is represented in this EBCDIC data format: X'0D'.

## \*DTAARA Function Code

Before the official designation of multiple Function Codes for Dynamic Variables, there was a prototype method for fetching data from a DB2 data area that was based on users modifying a model program provided by SMA. With the new Function Code method it is much easier to define DB2 value fetch rules by using the second page of Dynamic Variable Maintenance to define the name, location and character string trimming rules that will fetch and format the Value returned for a \*DTAARA {TOKEN}.

### Trimming Data Area Values

When \*DTAARA is specified for the Dynamic Variable Function Code, the second display format will be format R7, with fields that can be used to name the data area and its library location. The only other values that can be defined for data areas are the trim control numbers. A starting location and a length value can be typed. If both fields are left at zero, the value returned for the Dynamic Variable token will be the first 128 characters of the data area.

If either of the Trim control fields is set to a non-zero value, the other field could be left set to zero with the following results:

- Start = 1, Length = 0: Up to 128 bytes from the start of the data area.
- Start = 0, Length = >0: The trim will start with byte 1, then include only as many characters as the Length specifies.

:::tip
To protect and retain blank characters in leading or trailing positions of the trimmed (or all) data retrieved from a data area, also set the Character Trim values in the main variable maintenance page. See F1=Help from the first maintenance page for more information about Character Trim values. 

It is important to understand that the Data Area Trim controls will be performed first, before the retrieved data area content is returned to the main Agent Dynamic Variable value calculation routines.  That value will then be subject to additional trimming, if specified in the primary Dynamic Variable Character Trim Start and Length fields.
:::

### Special Rules for the Local Data Area

The IBM i operating system automatically defines a "Local Data Area" (referred to as LDA, or in command parameters as \*LDA) which is like a one-record file with a record length of 1024 bytes, stored in the DB2 database.  Local data areas are only shared between jobs whenever one job submits another job (using the SBMJOB command, or a spawn() function).

Traditionally, many legacy software applications relied on the local data area to preset parameter values according to application requirements just before submitting a job.

The OpCon Agent of IBM i enables sharing of local data areas between jobs by supporting retrieval of the local data area contents and storing them into Agent Dynamic Variables that can be retrieved by any job.  This same technique may also be useful when automating support for restarting a job.

Retrieving data from a local data area is similar to working with any other data area, but with the following exceptions:
- The Data area name on page 2 of Dynamic Variable auxiliary fields must be set to the special name of "\*LDA".
- The Library location field is ignored whenever the name is \*LDA.
- Through Agent version 18.1, Agent Dynamic Variable values have a maximum length of 128 bytes.  Therefore, to store and later rebuild a local data area, it would be necessary to use 8 Dynamic Variables, each assigned to a different Data Area Trim Start position, with a length of 128 bytes each.  (Starting with Agent version 21.1 and newer, Dynamic Variable values can be up to 1024 bytes long.)
- It is important to remember the hint above about preserving any leading and trailing characters of data blocks that are retrieved from the LDA by specifying the Character Trim values on the first page of Dynamic Variable maintenance.  For example, when retrieving the first 128 bytes from the LDA use the values START(1), LENGTH(128) to keep all the LDA data in its exact position and prevent the Agent from trimming off leading or trailing blanks.

## \*DB2 Function Code

Before the official designation of multiple Function Codes for Dynamic Variables, there was a prototype DB2 method for fetching data from a DB2 database table that was based on users modify a model program provided by SMA. With the new Function Code method it is much easier to define DB2 value fetch rules by using the second page of Dynamic Variable Maintenance to define the SQL query components that will fetch the Value returned for a \*DB2 {TOKEN}.

:::tip
The old DB2 program-based method is still supported for any existing configurations, and the user instructions for the old method have been retained below, following the new method instructions.
:::

Following are instructions for configuring the \*DB2 SQL query definitions, including options for each field in page 2 of Dynamic Variable Maintenance and some important rules and hints that make this feature more flexible. There are also some important constraints.

### \*DB2 User Instructions and Hints

#### Logging of SQL Statements and Errors

When experimenting with the \*DB2 function code, view the contents of the LSAM general purpose log file LSALOGF30 to find images of SQL statements and any error messages that explain why an SQL statement did not work. The LSAM sub-menu 6, option 5, log viewer 4 can be used to view this log. Log entries marked "DQ:" will show the SQL statement that was constructed, and entries marked "DE:" show any error messages that will usually explain what was wrong with the SQL statement.

#### Management of Dynamic Variable Auxiliary Data

The \*DB2 and \*DTAARA function codes use a second page of Dynamic Variable Maintenance to define the data fetch rules. These optional extensions of the Dynamic Variable master record are stored in an auxiliary record master file.

Whenever a Dynamic Variable master record is deleted, any associated auxiliary record will be retained in the database. This function makes it possible to easily recover a complex SQL statement, because the link to the DB2 access definition will be restored whenever the same Dynamic Variable name (and matching Sequence number, for type-L) is added back to the master file using the Add or Copy functions.

#### Use of Dynamic Variable {TOKENS} in the \*DB2 Access Definitions

All the long character fields in the Dynamic Variable auxiliary table of \*DB2 Access Definitions can support translation of Dynamic Variable tokens. This works because the IBM i LSAM Dynamic Variable token replacement module is capable of handling nested tokens (where the value for one token could be another token).

This capability might make the DB2 Access Definitions more flexible, not only by allowing for replaceable tokens within the WHERE\... SQL clause(s), but also by allowing the field/col, library and file/table fields to be made variable.

Whenever Dynamic Variable tokens are used within a \*DB2 Access Definition record, it is critical that the programs or rule set (such as the LSAM Captured Data Response Rules) must have set values for those Dynamic Variables BEFORE the current Dynamic Variable (that has this *DB2 Access Definition) is used in a command or rule.

While maintaining \*DB2 Access Definitions, fields that support Dynamic Variable tokens will cause a list of registered Dynamic Variable names to appear in a pop-up window when the function key F8=DynVar is pressed while the cursor is located with the field. If F8 does not produce a selection window while the cursor is in a field (such as the Trim rules), then that field does not support translation of a Dynamic Variable {TOKEN}.

#### Adding a DB2 Table (File) Access Definition

When the Function Code \*DB2 is specified, the second display format for Dynamic Variable Maintenance will be format R6, with fields that can be used to identify the table data and also the SQL WHERE clause that will select the appropriate row from the table.

The combination of data entry fields used must result in a valid SQL statement. Some constraints of this rule are explained under each field description below. Be sure to notice instructions below for the alternate *WHERE data entry method that can be used to format complex SQL query.

Any SQL statement constructed must result in only a single value being fetched from the database table. The cause of this constraint is that the value will be placed into the single, 128-character Value field used to replace a Dynamic Variable {TOKEN}. This means, for example, that it is not possible to specify more than one column from a table, unless a complex SQL statement will concatenate the multiple values into a single string that is the data set returned from the SQL statement.

:::info
To fetch multiple columns as a single value, the SQL keyword CONCAT must be used in the SELECT field/col field to join more than one column (and/or character string) from the table(s) being queried. The CONCAT operator formats the final result of the query into a single string.
:::

Traditional DB2 database libraries, files and field names were limited to 10 characters. However, this display format allows for more data in case SQL naming rules are being used. The longer fields also allow for some SQL modifiers to be used with the column (field) name.

##### \*DB2 Display Field Descriptions

Refer to additional information about Work with Dynamic Variables in the Screens and Windows section towards the end of this Dynamic Variables chapter.

**SELECT field/col:**

This field on the screen can be used to name the column (field) of data from the table. SQL modifiers such as UPPER( ) can be used around the field name.

Since the SQL query result will be placed into a 128-character host program field, any selection of numeric, date or time values must be modified by the SQL CHAR( ) keyword, so that the non-character data can be placed into a character field. The LSAM maintenance  program puts the prompt of "CHAR(numeric/date/time)" into the field/col field when display format R6 is offered in its Create (Add) mode, as a reminder of this constraint.

**\*WHERE special value:**

The SELECT field/col field supports a special value of "\*WHERE" that tells the LSAM Dynamic Variable value calculators to ignore all the field/col, library and file/table values. This special value indicates that the \*DB2 SQL query will be entirely contained within the large WHERE... field in the lower half of the display. This means that the WHERE... field content must typically start with the SELECT keyword that begins an SQL query.

**FROM library:**

Except for \*WHERE rules, type the name of the IBM i library where the file/table is located. This field can be left blank, but that tells the SQL query engine to find the file/table in the library list of the current job. Keep in mind that frequently, the current job will be an LSAM server job, so that job's library list will be limited to the LSAM environment library list (plus the SYS library list values). So the best practice is to always specify a library name or a Dynamic Variable token in this field.

**FROM file/table:**

Except for \*WHERE rules, type the name of the IBM i table or file that will be queried for a value. This field supports use of a Dynamic Variable token instead of an actual file name, as long as that token will be replaced by a valid file name at run time.

**WHERE...:**

This is the field for typing in SQL clauses. If the special value of *WHERE is typed into the SELECT field/col field, then the entire SQL query statement must be typed into this field. Otherwise, the more common use might be to specify the field/col, library and file/table values, and in that case this WHERE... field would start with the SQL keyword "WHERE" in order to specify the selection rules that will isolate the specific row in a table that should produce the desired field/column value.

It is possible to include many different combinations of SQL clauses, either before or after the expected WHERE keyword. The only limits are these:

- The combination of pre-defined fields from the top of the display with the WHERE field content, must result in a valid SQL statement (after any Dynamic Variable tokens are replaced).
- The auxiliary master record can only hold up to 880 characters to define the WHERE clause (or a whole SQL statement). The maximum size of the SQL statement supported within the LSAM query program is 2048 bytes, which may help to support a longer statement after any Dynamic Variables are replaced.

The Trim Start and Length values work as described above, under the Data Area topic, except that for \*DB2 definitions, the rules apply to the final, possibly CONCATenated Value string that is fetched from the data base.

### \*DB2 Hints and Suggestions

#### Test DB2 Access Definitions Using the DSPDYNVAR Command

When listing Dynamic Variables from the LSAM menu options, the display option 6=DSPDYNVAR works the same as using the LSAM command DSPDYNVAR from an IBM i command line. The value that would result from replacing a token based on a given Dynamic Variable will be displayed in the message line at the bottom of the workstation display.

Whenever the desired value for a \*DB2 Access Definition does not produce the desired value, or it produces an error code, more  information about the SQL statement that was produced and any error messages can be easily displayed from the LSAM log file LSALOGF30, as described above. Log entries marked "DQ:" will show the SQL statement that was constructed, and entries marked "DE:" show any error messages that will usually explain what was wrong with the SQL statement.

#### Preset Dynamic Variable Values When Using \*DB2 Access Definitions

The Value field for a Dynamic Variable will not be updated whenever a user-defined value calculator program or any Function Code such as \*DB2 is used.

Instead, whenever a Dynamic Variable {TOKEN} is replaced, the actual results of the \*DB2 access will be provided as the replacement value, if the query was successful. When the query is not successful, the existing value that was previously stored in the Dynamic Variable master record will be provided instead.

This suggests that the best practice is to store an initializing value into the Dynamic Variable master record before the {TOKEN} of that variable will be replaced by some subsequent use of the token. A value such as "Not Found" or "SQL error" could be stored in the record, so that when there is a failure of the SQL query, the value used to replace the {TOKEN} will be the predefined error message which is easily recognized. The DSPDYNVAR test command can be used to demonstrate this result. For example, LSAM Captured Data Response Rules could test for the predetermined initialization value, and then they will recognize when the Dynamic Variable token was not correctly replaced. This could prevent an unfortunate operation during subsequent automated steps.

### How Numeric Compression Is Managed for \*DB2

The concept of "numeric compression" in the IBM i LSAM means that a value string will be cleared of all characters except for numeric digits, and then the digits will be compressed to remove blank space, so that the final result is a numeric string that can be used, for example, to update the value of a Dynamic Variable that has been marked as numeric (by having a non-zero numeric field size set in the Dynamic Variable master record).

For Dynamic Variables that are marked as numeric, the LSAM module that manages the SQL queries of \*DB2 Access Definitions will always perform the numeric compression subroutine before returning a value in place of that Variable's token. This protects the LSAM programs from failure to operate as expected when Dynamic Variables, and possibly Captured Data Response Rules are performing mathematical operations.

This characteristic of the \*DB2 Access Definitions processor resembles the effect of specifying CMPNUM(Y) in the SETDYNVAR command, or using the similar Compress Numeric function when a Captured Data Response Rule is storing captured data into a numeric Dynamic Variable.
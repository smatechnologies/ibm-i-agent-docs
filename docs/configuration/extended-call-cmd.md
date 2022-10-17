# Extending the IBM i Call Command with Special Parameters

## Job Parameters Separator Character

A special character can optionally be used to add more job definition parameters to the Call command line field of an OpCon job master record for IBM i jobs. The special character will be typed in the ASCII character set used by the machine where the OpCon User Interface is executing. Before the LSAM job scheduling server actually processes the special character it will be translated to EBCDIC according to the translation table specified above in the LSAM Parameters.

IBM i jobs can have additional Job Description attributes added, and various job management functions that are optionally provided by the IBM i LSAM can be engaged, as explained in the next sections.

## Adding Job Description Parameters to an IBM i Job in OpCon

After typing the separator character in the Call command line, additional IBM i job description parameters may be added to the job. Any parameters that are not already supported by specific fields of the OpCon job master record may be specified using the same keywords and syntax as is supported by the IBM i SBMJOB command. For example, in some environments it might be helpful to specify a unique character set as the default for the job, using the CCSID  parameter, as for the French EBCDIC character set: CCSID(297). Assuming the special character is the pipe character ( \| ) - however that may appear in this document - the Call command field might look like this:
```
WRKJOB JOB(*) OUTPUT(*PRINT) OPTION(*ALL)|CCSID(297)
```
## Using SCANSPLF to Evaluate an IBM i Job Completion Status

In addition to adding job parameters after the separator character, it is also allowed to type in a SCANSPLF command and its parameters that will be used to evaluate the job log report after a job finishes normally. This special use of the SCANSPLF command is specifically dedicated to the evaluation of the job log report produced only by each execution of the job where this command was added to the command line. 

When the SCANSPLF command is included in the job Call command line after the separator character, the IBM i LSAM will withhold a report to OpCon about the job completion status until after it completes the evaluation of the job log. This post-job log evaluation is only performed when the original Call command of the job has completed normally; it will not be performed for jobs that ended abnormally. (The job log of jobs that completed abnormally, if it is available, could be analyzed by a separate OpCon job that executes the SCANSPLF command using a dependency on the original job completion status.) For jobs that did complete normally, the final completion status of the job that is reported to the OpCon schedule will depend on the Scan Rules defined for this job name and the spool file QPJOBLOG, under the Application ID specified with the SCANSPLF command. Many Scan Rule options are available to control whether a job will be reported as completed normally or failed.

When the SCANSPLF command is used along with additional SBMJOB job parameters, the SCANSPLF command and its own parameters must follow any job description parameters. That is, the SCANSPLF command string must be the last string of non-blank characters in the Call information field, following the Job parameters separator character. Using the same example as in the previous section, the Call command line might look like this:
```
WRKJOB JOB(*) OUTPUT(*PRINT) OPTION(*ALL)|CCSID(297) SCANSPLF
APPKEY(123456789)
```
:::warning
The APP() keyword of the SCANSPLF command is no longer the primary key to reference a Scan Application ID.  It has been replaced by the APPKEY keyword which accepts from 1 to 9 digits.  The APPKEY is a permanent key to identify a Scan Application, whereas the APP keyword references the 30-character description that can now be changed at will without affecting the linkage between the Scan Rules and any Captured Data Response Rules.  Therefore, the APP text field is not a reliable value (not permanent) for specifying which Application to use, so it should not be used in the OpCon automation configurations such as this extension to the Call command line.
:::

Refer to the following Note to learn about ways to diagnose this special
use of the SCANSPLF utility included with a Call command.

:::tip
The details about the SCANSPLF command that was assigned to evaluate a job's completion status may be viewed from the IBM i LSAM log viewer for job status (LSAM menu 6, function 5, viewer 5; LSAM log viewer utilities are not documented in this documentation). When a job was assigned to use SCANSPLF the function key F23=SCANSPLF will appear on the LSAM Job Status Details screen. Press F23 to view the LSAM record of the SCANSPLF command.
:::

## Setting an IBM i Job's LDA Value

An additional option is available for extending the Call command line that supports building a job's local data area (LDA) by adding one or more **LDA()** keywords after the separator character. When used, this special keyword must follow any job description parameters, but it must precede the special use of the SCANSPLF command, as explained above.

Here are some rules for using one of the LDA keyword formats shown below:

1. More than one LDA() keyword may be included in the Call command line.
2. Blanks are not allowed, except within quoted strings.
3. Numeric values can be shorter than their full length, but not longer.
4. The length of 1024 for the value string may be constrained by the available length of the Call command field, that is, if the primary command string is very long.
5. Remember that the whole content of the LDA for the job will be replaced by these LDA() keywords. Therefore, it may be necessary to include more than one LDA() keyword to insert all of the required values for the LDA. However, format 2 of this LDA() keyword can be used so that a group of LSAM Dynamic Variables can be used to format the entire LDA, while only one LDA() keyword value is put into the OpCon job master call command line.

### Formats for the LDA() Keyword Parameters

Choose one of the following formats for the LDA keyword:

#### LDA() Keyword Format 1.a.

This format supports hard-coded value strings.  It could also contain one or more OpCon Property [[Tokens]] within the single quotes where the example value string is shown.  The OpCon server will replace OpCon Property tokens before the whole Call command line is sent to the Agent.
```
    LDA(start_nbr_4.0:length_nbr_4.0:'value string 1024.A')
```
:::info example
LDA(225:14:'14-char string')
:::

The maximum length supported for each parameter of the LDA() keyword is shown as part of the symbolic names, that is:

- Start Number = up to 4 digits locate the starting position within the LDA data area.
- Length = up to 4 digits specify how much of the LDA data area is updated by the string that follows.
- value string' = up to 1024 characters can be included to specify the entire LDA contents in one string. However, considering using OpCon properties or LSAM Dynamic Variables (shown below) to make construction of the LDA contents more flexible.

#### LDA() Keyword Format 1.b.

Format 1.b. replaces a hard-coded character string with one or more Dynamic Variable {TOKENS}.  The Agent's Job Scheduler replaces these tokens with their values before processing the LDA updates requested by this LDA() keyword.  Notice that this format does not use single quotes around the Dynamic Variable {TOKENS}.
```
    LDA(start_nbr_4.0:length_nbr_4.0:{DynVarNam1}{DynVarNam2}...)
```
:::info example
LDA(225:14:{DYNVARNAM1})
:::

Notice that the value string for the LDA would be comprised of the results of one or more Type-V (NOT Type-L) Dynamic Variables in this case. The Type-L Dynamic Variable is used only for variation 2., below. You cannot use both a single-quoted string and a Type-V Dynamic Variable together - choose one format or the other. However, since more than one LDA() keyword is supported, it's easy to see how quoted strings and Dynamic Variables of Type-V could be combined for one Call command.

:::tip
Starting with LSAM version 21.1, Dynamic Variable values can be up to 1024 characters in length.  Therefore, it is now possible for a single {TOKEN} to represent the entire content of a local data area.  Accordingly, using more than one Dynamic Variable token would only be useful if the local data area content must be updated in pieces by concatenating values that are collected from different sources.
:::
:::tip
The special characters that denote a Dynamic Variable token {} may be different on your system, depending on the native character sets used in your workstation and in your IBM i operating system. The appearance of the character may vary, but the hexadecimal value is what is important. This value is controlled by the LSAM Utilities Configuration (menu 3, option 7).
:::

:::danger
Do not change the special character that denotes a Dynamic Variable {TOKEN} without assistance from a technical support person. It cannot be changed once Dynamic Variables are defined, unless a custom data conversion procedure is used.
:::

#### LDA() Keyword Format 2

Format 2 does not require specifying the Start location or Length of data to be updated in a job's LDA.  Instead, this simple format for the LDA() keyword only needs the name of a Type-L Dynamic Variable.  The details about how to update the LDA are stored with the Agent's Type-L Dynamic Variable master record.

```
    LDA(DynVarName)
```
:::info example
LDA(DYNVARNAM2)
:::

When specifying the Type-L Dynamic Variable name do not enclose it in single quotes and do not include the Agent's curly brackets { } that denote a Dynamic Variable {TOKEN}.  However, as shown in the example, do use all CAPITAL letters for the variable name.

For this format, do not use more than one Dynamic Variable name.  Instead, when multiple different values may be required (and pre-loaded with partial LDA content), rely on the Sequence Number of the Dynamic Variable so that all the LDA updates will be stored under just one variable name that is intended to equal the IBM i Job Name.  For this Format 2 of the LDA() keyword, it is not required that the single variable name be equal to the IBM i Job Name (unlike the support provided for Job Tracking), but this is still recommended in order to facilitate research in case an automation strategy might fail.

### Example of Using the LDA() Keyword with Other Call Command Extensions

Here is an example of an OpCon job master record for an IBM i job, showing all three possible job definition extensions used at once.  This example is based on the Format 1.a. for the LDA() keyword.  It is required that the LDA() keyword must follow any other keywords that are intended as additions to the IBM i command SBMJOB, and the LDA() keyword must precede the SCANSPLF command - if it is included.

:::info example
```
CALL PROGRAM|CCSID(000297) LDA(215:9:'new value') SCANSPLF
APPKEY(123456789) DATE({CURDATE}) OPCONJOB(Y) FAILOPT(2)
```
:::

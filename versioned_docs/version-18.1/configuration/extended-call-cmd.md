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
APP(ChkJobLog1)
```
Remember that the APP() keyword of the SCANSPLF command is case-sensitive.

Refer to the following Note to learn about ways to diagnose this special
use of the SCANSPLF utility included with a Call command.

:::tip
The details about the SCANSPLF command that was assigned to evaluate a job's completion status may be viewed from the IBM i LSAM log viewer for job status (LSAM menu 6, function 5, viewer 5; LSAM log viewer utilities are not documented in this documentation). When a job was assigned to use SCANSPLF the function key F23=SCANSPLF will appear on the LSAM Job Status Details screen. Press F23 to view the LSAM record of the SCANSPLF command.
:::

## Setting an IBM i Job's LDA Value

A new option has been added to the IBM i LSAM job scheduler server program that supports building a job's local data area (LDA) by adding one or more **LDA()** keywords after the separator character. When used, this special keyword must follow any job description parameters, but it must precede the special use of the SCANSPLF command, as explained above.

Here are some rules for using one of the LDA keyword formats shown below:

1. More than one LDA() keyword may be included in the Call command line.
2. Blanks are not allowed, except within quoted strings.
3. Numeric values can be shorter than their full length, but not longer.
4. The length of 1024 for the value string may be constrained by the available length of the Call command field.
5. Remember that the whole content of the LDA for the job will be replaced by these LDA() keywords. Therefore, it may be necessary to include more than one LDA() keyword to insert all of the required values for the LDA. However, format 2 of this LDA() keyword can be used so that a group of LSAM Dynamic Variables can be used to format   the entire LDA, while only one LDA() keyword value is put into the OpCon job master call command line.

Choose one of the following formats for the LDA keyword:

**LDA(start_nbr_4.0:length_nbr_4.0:'value string 1024.A')**

:::info example
LDA(225:14:'14-char string')
:::

The maximum length supported for each parameter of the LDA() keyword is shown as part of the symbolic names, that is:

- Start Number = up to 4 digits locate the starting position within the LDA data area.
- Length = up to 4 digits specify how much of the LDA data area is updated by the string that follows.
- value string' = up to 1024 characters can be included to specify the entire LDA contents in one string. However, considering using OpCon properties or LSAM Dynamic Variables (shown below) to make construction of the LDA contents more flexible.

**LDA(start_nbr_4.0:length_nbr_4.0:{DynVarNam1}{DynVarNam2}...)**

:::info example
LDA(225:14:{DYNVARNAM1})
:::

:::tip
The special characters that denote a Dynamic Variable token {} may be different on your system, depending on the native character sets used in your workstation and in your IBM i operating system. The appearance of the character may vary, but the hexadecimal value is what is important. This value is controlled by the LSAM Job Tracking Configuration (menu 1, option 7).
:::

:::danger
Do not change this special character without assistance from a technical support person. It cannot be changed once Dynamic Variables are defined, unless a custom data conversion procedure is used.
:::

Notice that the value string for the LDA would be comprised of the results of one or more Type 'V' (NOT Type 'L') Dynamic Variables in this case. The Type 'L' Dynamic Variable is used only for variation 2., below. You cannot use both a single-quoted string and a Type 'V' Dynamic Variable together - choose one format or the other. However, since more than one LDA() keyword is supported, it's easy to see how quoted strings and Dynamic Variables of Type 'V' could be combined for one Call command.

**LDA(DynVarName)**

:::info example
LDA(DYNVARNAM2)
:::

Notice that this format for the LDA() keyword does not enclose DynVarName in the Special token characters (refer to above), because it will not be replaced, but will be used as the key value to fetch the LDA update instructions from all Type "L" dynamic variables that match the variable name. Since each Dynamic Variable can only return up to 128 characters, it would be necessary to define 8 sequence numbers for the Type L Dynamic Variable name in order to account for all 1024 positions of the LDA. Of course, more sequence numbers may be used, so that smaller LDA content pieces can be managed more easily.

When using the LDA() keyword in an OpCon IBM i job Call command line, remember that LSAM Dynamic Variables are able to call a user-defined program to calculate the value for each Dynamic Variable at run time. This might be a good way to fetch specialized LDA content from a third-party software  application and then feed that content (in 128-character pieces) to the LSAM so that the LDA content will be added to the job that OpCon is starting. 

### Example of Using the LDA() Keyword with Other Call Command Extensions

Here is an example of an OpCon job master record for an IBM i job, showing all three possible job definition extensions used at once:

:::info example
```
CALL PROGRAM|CCSID(000297) LDA(215:9:'new value') SCANSPLF
APP(APPID01) DATE({CURDATE}) OPCONJOB(Y) FAILOPT(2)
```
:::

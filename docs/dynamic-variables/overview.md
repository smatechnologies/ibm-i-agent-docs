---
sidebar_label: 'Dynamic Variable Concepts'
---
# Dynamic Variable Concepts
## Introduction to Dynamic Variables

The LSAM database includes a variable field definition table file with two variable types that can be used for many purposes. Dynamic variables of type L are used to update the stored LDA content for tracked, queued or captured jobs. Dynamic variables of type V are used to update the job parameters of any job submitted to the LSAM by OpCon. The type V variables are also supported by various fields of Spool File Scan Rules and of Captured Data Response Rules, as well as by other LSAM functions (documented within other topics of this documentation). Each of these variable field definitions has a token name to identify them, but the token name of type L variables must match either the job name of tracked and queued jobs or the captured job ID of captured jobs.

Dynamic variable values are always applied to a job at the last moment before the LSAM submits the job for execution. When the LSAM debug logging function is turned on, the submitted job log file (option 4 in the LSAM's log file viewer menu) will report on actions performed by dynamic variables. It is possible to see in that log file the updated LDA content and also the before- and after-versions of the SBMJOB command string.

Similarly, dynamic variables used with Captured Data Response Rules are interpreted at the time when data is captured, for example, as the SCANSPLF command is executing or as Operator Replay screen data or Message Management data is being captured. As each data element is being stored to the Captured Data log file, the system checks for Captured Data Response Rules to process. Dynamic variables may be part of the comparison rule that allows a Captured Data Response to be executed, and they can also comprise all or part of the command that is executed.

Regardless of the purpose of the dynamic variable, the value inserted to replace the LSAM's dynamic variable can be either a fixed value that is stored in the dynamic variables master file record or it can be a value produced by a user-defined program that has been registered in the dynamic variable's master record. When the fixed value approach is used, that fixed value may actually be updated at any time by the LSAM's SETDYNVAR or SETCAPVAR commands. These commands present some interesting possibilities.

It is possible, for example, to use a separately scheduled OpCon job or the pre-run command line of an OpCon job for IBM i to execute the SETDYNVAR command just before another job is executed that will depend on that dynamic variable. It is also possible to include OpCon property tokens in the VALUE parameter of the SETDYNVAR command so that a value calculated by OpCon can be passed along to the LSAM, and the final result is that a job executing under IBM i can have its behavior controlled by virtually any OpCon property.

### Recent Enhancements to Dynamic Variables

#### Dynamic Variable Values extended to 1024 characters

The previous maximum length of a value returned for a Dynamic Variable token was 128 characters.  Now the Agent supports up to 1024 characters for character string values.

One of the benefits of this extension is that a single Dynamic Variable token can contain the entire contents of an IBM i job's "Local Data Area" (\*LDA).

The long value string also better supports the Multi-Instance Dynamic Variable feature because a single variable value can contain the maximum supported string of key values in rare cases when the instance of a variable must be fully qualified with key values such as IBM i Job IDs and/or OpCon Schedule and Job names.

#### Separation of Character Trimming from LDA Value Trimming

Previously, trimming of Dynamic Variable values was implemented by re-using the Local Data Area Start and Length parameters.  Now a separate set of Character Start and Length parameters are used to specify how the stored (or produced) value from a Dynamic Variable should be trimmed as it is inserted in place of the variable’s {TOKEN}.  This makes it possible to do value trimming for type ‘L’ Dynamic Variables (see [Dynamic Variable Type Code](#dynamic-variable-type-code) below) that require the LDA Start/Length fields to identify which part of a job’s Local Data Area should be updated by the value.

#### Improved Separation of Numeric from Character Value Types

Previously, a Dynamic Variable was classified as having a numeric data type simply by having a non-zero value in the Numeric Size field.  Now there is a separate flag for each Dynamic Variable that indicates ‘C’ = character string or ‘N’ = numeric value.  The main purpose of introducing this flag was to support the recently extended multi-page display format that is used to build or maintain Dynamic Variable master records.

For OpCon sites that upgrade to LSAM version 21.1 or newer, from version 18.1 or older, the install/upgrade procedures will automatically convert existing Dynamic Variable master records to the new designation of Character or Numeric.

### Dynamic Variable Type Code

Separate from the value controls that apply to all dynamic variables, the dynamic variable type field determines how the value is applied to attributes of a job.

Dynamic variables of type L are used specifically for presetting the contents of the IBM i Local Data Area (LDA) as the IBM i Agent submits job start requests to the IBM i operating system.  These variables can be associated with tracked, queued or captured jobs.  They can also be used for any general IBM i batch job. The Operator Replay Script driver job itself does not make any special built-in use of the LDA.  But if its LDA has been updated, a Script Step might be configured to read data from the Script Driver job's LDA using a Dynamic Variable token that is configured with a Fuction Code of *DTAARA, and the special rules for fetching LDA content are used as explained on the display of Dynamic Variable *DTAARA function code maintenance. The {LDATOKEN} could be included in the Script Step record String to Send in order to execute a (virtual) workstation command (CHGDTAARA) that would transfer the Script driver job's LDA content to the LDA of the virtual workstation interactive job.

Type-L variables must use the IBM i Job Name that will be derived from the OpCon job name in the OpCon Job Master record.  A Tracked (or Queued) Job Name is preregistered in the Agent's Job Tracking Parameters.  The Agent's related Job Capture function can have a unique Capture ID that can be different from the IBM i job name (although best practice might be to let the Capture ID be the same as the IBM i Job Name), in which case any Type-L Dynamic Variables must use the Capture ID. There are Dynamic Variable master record fields used only for this type of variable that specify the location and length of the LDA content that should be updated. The other dynamic variable type V cannot be used to update LDA contents, and the start position and length fields cannot be used with type V variables.

Type-L Dynamic Variable tokens are not enclosed in the {TOKEN} curly brackets (see also the next topic, below).  They are only used within the IBM i Agent's server and other utility jobs.  The key to accessing these variables is that they use the IBM i Job Name (or an Agent Captured Job ID).  More information about Type-L Dynamic Variables is provided in Job Tracking and Queuing -> How LSAM Job Tracking Works -> [Local Data Area (LDA) Support](/job-tracking/details.md#local-data-area-lda-support).

Dynamic variables of type V can be used, among other purposes, to update any part of the total command string that the LSAM uses to submit jobs. This means that, depending on how and where a job is being defined (that is, by using OpCon job master records or by using the Capture Job function and maintenance), it is possible all command parameters may be optionally included, or just the values of single command parameters may be updated. It is also possible to modify the content of the submitted job's command line using type V dynamic variables.

To use type V dynamic variables, the Variable Name value is enclosed within a pair of designated control characters to form a token. This token is inserted anywhere in the submitted job's command line. At the point where the LSAM has assembled the total SBMJOB command, it performs a scan for any dynamic variable tokens and then replaces those tokens with the value produced by the dynamic variable. (The processing of dynamic variables used with Capture Data Response Rules is described in [Operator Replay Scripts](../operator-replay/overview.md), in [Message Management](../message-management/overview.md) , and elsewhere in this Events and Utilities menu in relation to the SCANSPLF command.)

### Dynamic Variable {TOKEN} Control Characters

The special characters used to make tokens out of type V dynamic variables are specified in the LSAM's Job Tracking configuration function, from the LSAM menu system. In most cases, it should not be necessary to modify these characters. A single pair of curly brackets {} have been chosen as the default control characters for dynamic variable tokens because this convention permits the dynamic variable token to pass transparently through the different property (variable, token) replacement logic used by OpCon. The LSAM Events and Utilities menu option 7: LSAM Utility configuration provides a means to change these characters in order to accommodate translation table conflicts that might arise in some countries where rules that work well for English or other Western language translation tables may not apply.

### Multi-Instance Dynamic Variables

Similar to the multi-instance Property support provided by the OpCon central server application, the Agent for IBM i can support true parallel processing as variable values are isolated to any of the following optional instances.

- **SI.** = OpCon Schedule Instance.  This scope matches the same scope used by the OpCon Job Scheduler, applied to any IBM i jobs started by OpCon.

- **JI.** = OpCon Job Instance.  Each IBM i job started (directly) by OpCon gets its own value for a Dynamic Variable, using the OpCon Job Name as the key to that value.

- **IJ.** = IBM i Job Instance.  Any IBM i job can use Dynamic Variable values isolated to just that job, without any reference to OpCon Schedules or Jobs.

- **IU.** = IBM i “Unit of Work”.  IBM jobs that are associated with each other by the use of the IBM i SBMJOB command can share a unique Dynamic Variable value.

Multi-instance Dynamic Variable capabilities are engaged simply by adding one of the prefixes above to the Dynamic Variable name, for example:  **{IJ.MYVARNAME}**

#### Using Simple Instance Qualification in Most Cases

It is normally very simple to engage variable instance isolation by simply adding a 3-character prefix to a Dynamic Variable token anywhere among the Agent’s automation features.

The Agent supports up to 435 characters for a Dynamic Variable {TOKEN} to allow for circumstances when a Dynamic Variable instance must be fully qualified by, for example, the complex string of parameters that identify an OpCon Job.  However, fully qualified variables are usually only used internally by the Agent software.  Special use cases where the LSAM Administrator might expect to need instance qualifying keys are explained in this documentation.

Detailed instructions for multi-instance Dynamic Variables and use cases are provided in the last part of this Dynamic Variables chapter.

### Maintaining Dynamic Variables

Dynamic Variables can be created during run time by using the LSAM utility command SETDYNVAR which is described at [SETDYNVAR: Set LSAM Dynamic Variable](./manipulation-commands.md#setdynvar-set-lsam-dynamic-variable).  

However, many advanced functions supported by Dynamic Variables can only be defined using the green screen workstation LSAM menu function "Maintain Dynamic Variables." The screens and windows for this type of maintenance are described under [Maintain Dynamic Variables](./maintaining.md#lsavarr1---work-with-dynamic-variables), which follows all of the background information that may be necessary to understand before attempting to build advance features for the variables.
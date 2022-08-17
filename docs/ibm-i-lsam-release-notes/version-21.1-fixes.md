---
sidebar_label: 'Version 21.1 Fixes'
---

# Version 21.1 Fixes

This list shows the LSAM fixes that have been added to the OpCon Agent for IBM i since LSAM version 21.1 was released.

| Project   | Fix ID | Description |
| :--------- | :------: | :----------- |
| IBMI-575   | |Fix daily purge of Job Master Auxiliary records when Master is deleted.|
| IBMI-623B  | 210019 |Fixes to conversion of Job Tracking ID from 6-alpha to 9-numeric.|
| IBMI-623C  | 210022 |Fix Job Scheduler scan for the INLASPGRP parameter of SBMJOB.|
| IBMI-629   |  |Fix LSAJOBF00 periodic file reorganization.|
| IBMI-631   |  |Correct math error in bytes received by SMA File Transfer.|
| IBMI-655   |  |SMA PTF apply fails on QDDSSRC procedure for display files.|       
| IBMI-656   | 210004, 210009 |Fixes to LSAM communications program files processing External Event command password/token.|
| IBMI-659   |  |Prevent SMA PTF install driver failure trying to execute an invalid command RMVLIBLE \*NOCHG.|
| IBMI-663   | 210012 |Improve SMA PTF all-in-one install command behavior, managing the Submit Job option when selected from the LSAM menu 9, option 2.|
| IBMI-664   | 210023 |Set Dynamic Variable master file to FRCRATIO(1), to support multi-instance variable values from the Variables tab of an OpCon job master.|
| IBMI-672   | 210027 |Prevent the SETDYNVAR command from failure when the VALUE parameter is blank.|
| IBMI-672B  | 210029 |Fix load of S1\* parameters feeding the call to CAPLOGF10: Display captured data debug log.|
| IBMI-678   | 210033 |The LSAM PTF re-apply program could fail with error CPF0001 in program SMAPTFRAPC; though PTF Rollback is usually only used by SMA Development and virtually never used by end user clients.|
| IBMI-689   | 	|The LSAM installation program must not assign a password to the SMASAV user profile that is designated for the Restricted Mode feature.|
| IBMI-696   | 210052 |The Agent’s File Arrival job type, and/or a batch job or script executing the CHKIFSFIL command, reported a not-found error when checking the IFS file systems (outside of the DB2 database) for a directory (object type \*DIR) that existed.|
| IBMI-711   | 211001 |Fix potential failure of Operator Replay when processing both Top and Bottom screen content comparison strings.|
| IBMI-725   | 211005 |Prevent duplicate list of an IBM i QPJOBLOG report in the View Job Output feature of the OpCon user interface.|
| IBMI-727   | 211006 |Prevent failure of a Numeric Dynamic Variable if its Value field is blank.  Show zeros for a blank Value field.|
| IBMI-763   | 211027 |Dynamic Variable tokens were not always being replaced in the first two Scan Rules of a SCANSPLF Application.|
| IBMI-752   | 211018 |Fixed failure of LSAM to purge debug log files during the daily (nightly) database maintenance activity, including purging the new Dynamic Variable instance history records.|
| IBMI-772   | 211036 |Fix record lock conflict among multiple JOBCMNSUB jobs for file LSAJORF13.|



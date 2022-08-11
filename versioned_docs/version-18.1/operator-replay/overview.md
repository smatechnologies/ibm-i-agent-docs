---
sidebar_label: 'Operator Replay Scripts'
---

# Operator Replay Scripts

Operator Replay automates an emulation of human interaction with the computer. Simply define Replay scripts using the interactive screen setup. When OpCon submits a Replay script job, a special Operator Replay session starts as the LSAM command STROPRRPY is executed. Operator Replay uses the script to mimic, keystroke for keystroke, the human interaction defined in the script. The Operator Replay log function displays the system output and the Replay script response in order to debug and refine scripts, or to review actions that took place during live operations. There is support for branching logic within a script or to another script. It is also possible to capture screen data and define responses to the captured data. These additional features, combined with script variables, make it possible for the script to be dynamically modified depending on the screen content.

The User Management feature associated with Operator Replay scripting optionally supports tight system security by complying with the system security officer's decision to (1) limit which virtual device descriptions can be used for Operator Replay workstation automation and (2) restrict access of workstation device descriptions to a specific user. This high security option eliminates dependency on IBM i automatic virtual device creation by providing a Telnet exit program that manages virtual display device assignment.

---
sidebar_label: 'Operation Tips and Techniques'
---

# Operation Tips and Techniques

This document section provides advice about ways to use OpCon and the IBM i Agent toolkit to automate IBM i operations. Details about how to use the IBM i toolkit components referenced in this section may be found in other topics of this document.

## Monitoring for IBM i Jobs in MSGW Status

IBM discontinued its Navigator Monitor support for Job Status monitoring as it began distribution of its all-new IBM Navigator for i.  The former solution proposed by SMA for interconnecting that type of Job Status monitor with the OpCon Agent for IBM i is no longer supported by IBM.

SMA has replaced the IBM solution with the Agent's own "Job Status Monitor" server job.  The LSAM server job name is JOBSTS.  This service is optional and it will only be started automatically if the LSAM Administrator sets the LSAM control that requests this service.


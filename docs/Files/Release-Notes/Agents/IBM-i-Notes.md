---
lang: en-us
title: IBM i LSAM Release Notes
viewport: width=device-width, initial-scale=1.0
---

+----------------------------------+----------------------------------+
| # []{                            |                                  | | #aanchor24} IBM i LSAM Release N |                                  |
| otes {#ibm-i-lsam-release-notes} |                                  |
+----------------------------------+----------------------------------+
| ::: {.MCDropDo                   |                                  |
| wn .MCDropDown_Closed .dropDown} |                                  |
| []{.MCDropDownHead               |                                  | | .dropDownHead}                   |                                  |
|                                  |                                  |
| ## [![Close                      |                                  | | d](../../../Skins/Default/Styles |                                  |
| heets/Images/transparent.gif){.M |                                  |
| CDropDown_Image_Icon width="16"  |                                  |
| height="11"}Overview & Reader No |                                  |
| tes](javascript:void(0)){.MCDrop |                                  |
| DownHotSpot .dropDownHotspot .MC |                                  |
| DropDownHotSpot_ .MCHotSpotImage |                                  |
| } {#closedoverview-reader-notes} |                                  |
|                                  |                                  |
| :::                              |                                  |
|  {.MCDropDownBody .dropDownBody} |                                  |
| These release notes include all  |                                  |
| enhancements and fixed issues    |                                  |
| and for the **IBM i LSAM**,      |                                  |
| **versions:**                    |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
| +-------------+-------------+    |                                  |
| | **Version   | **Version   |    |                                  |
| | 18.1**      | **04.00.03  |    |                                  |
| |             | (PTF Levels |    |                                  |
| | -   **[New  | 403317 --   |    |                                  | | |     Feat    | 403364)**** |    |                                  |
| | ures](#Vers |             |    |                                  |
| | ion18.1_New | -   **[New  |    |                                  | | | Features)** |             |    |                                  |
| |             |    Features |    |                                  |
| |             | ](#Version0 |    |                                  |
| |             | 4.00.03_New |    |                                  |
| |             | Features)** |    |                                  |
| |             | -   **      |    |                                  |
| |             | [Fixes](#Ve |    |                                  |
| |             | rsion04.00. |    |                                  |
| |             | 03_Fixes)** |    |                                  |
| +-------------+-------------+    |                                  |
|                                  |                                  |
| ::: {.MCDropDo                   |                                  |
| wn .MCDropDown_Closed .dropDown} |                                  |
| []{.MCDropDownHead               |                                  | | .dropDownHead}                   |                                  |
|                                  |                                  |
| ### [![Closed](../../../         |                                  |
| Skins/Default/Stylesheets/Images |                                  |
| /transparent.gif){.MCDropDown_Im |                                  |
| age_Icon width="16" height="11"} |                                  |
| Reader Notes](javascript:void(0) |                                  |
| ){.MCDropDownHotSpot .dropDownHo |                                  |
| tspot .MCDropDownHotSpot_ .MCHot |                                  |
| SpotImage} {#closedreader-notes} |                                  |
|                                  |                                  |
| :::                              |                                  |
|  {.MCDropDownBody .dropDownBody} |                                  |
| References in this online help   |                                  |
| to "LSAM PTFs" refer to software |                                  |
| patches for the OpCon Agent for  |                                  |
| IBM i. These are separate from   |                                  |
| IBM's PTFs for the operating     |                                  |
| system, and they are not         |                                  |
| related. However, SMA recommends |                                  |
| that users should keep their IBM |                                  |
| i PTFs current, updating them at |                                  |
| least every six months (IBM      |                                  |
| provides quarterly updates to    |                                  |
| their PTFs). The following       |                                  |
| instructions are not related in  |                                  |
| any way to IBM i PTFs.           |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
| The IBM i LSAM has been managed  |                                  |
| as a single version 04.00.03 for |                                  |
| as many years as the Agent       |                                  |
| software has been compiled over  |                                  |
| IBM i version V5R4. Many of the  |                                  |
| final fixes and enhancements for |                                  |
| this version are included in the |                                  |
| last installation file that will |                                  |
| be released with support for     |                                  |
| V5R4: install file name          |                                  |
| LI040006, which includes LSAM    |                                  |
| PTFs through 403320. Additional  |                                  |
| fixes and enhancements can be    |                                  |
| added by installing the LSAM     |                                  |
| PTFs from either the full        |                                  |
| cumulative save file LSCUMPTF or |                                  |
| the much smaller partial PTF     |                                  |
| save file LSCUMPTF.308-364.      |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
| All future fixes and             |                                  |
| enhancements for the IBM i Agent |                                  |
| will be offered only for the     |                                  |
| Agent version 18.1. This version |                                  |
| of the LSAM software is compiled |                                  |
| over IBM i8.1.                   |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
| +-------------+-------------+    |                                  |
| | ![White     | **NOTE:**   |    |                                  | | | p           | [Any        |    |                                  |
| | encil/paper | clients of  |    |                                  |
| | icon on     | SMA that    |    |                                  |
| | gray        | might be    |    |                                  |
| | circular    | using a     |    |                                  |
| | backgr      | version of  |    |                                  |
| | ound](../.. | the OpCon   |    |                                  |
| | /../Resourc | Agent       |    |                                  |
| | es/Images/n | (LSAM) for  |    |                                  |
| | ote-icon(48 | IBM i prior |    |                                  |
| | x48).png "N | to 04.00.03 |    |                                  |
| | ote icon"){ | MUST use    |    |                                  |
| | .statement} | the IBM i   |    |                                  |
| |             | Install     |    |                                  |
| |             | file named  |    |                                  |
| |             | LI040003 to |    |                                  |
| |             | upgrade to  |    |                                  |
| |             | a more      |    |                                  |
| |             | recent      |    |                                  |
| |             | version of  |    |                                  |
| |             | the agent.  |    |                                  |
| |             | This is the |    |                                  |
| |             | only        |    |                                  |
| |             | install     |    |                                  |
| |             | file that   |    |                                  |
| |             | is able to  |    |                                  |
| |             | perform an  |    |                                  |
| |             | upgrade     |    |                                  |
| |             | from prior  |    |                                  |
| |             | LSAM        |    |                                  |
| |             | versions.]{ |    |                                  |
| |             | .statement} |    |                                  |
| |             |             |    |                                  |
| |             |             |    |                                  |
| |             |             |    |                                  |
| |             | New         |    |                                  |
| |             | installs of |    |                                  |
| |             | the IBM i   |    |                                  |
| |             | LSAM should |    |                                  |
| |             | use the     |    |                                  |
| |             | latest      |    |                                  |
| |             | available   |    |                                  |
| |             | install     |    |                                  |
| |             | file,named  |    |                                  |
| |             | LI181001    |    |                                  |
| |             | (or a newer |    |                                  |
| |             | version     |    |                                  |
| |             | that        |    |                                  |
| |             | includes    |    |                                  |
| |             | pr          |    |                                  |
| |             | e-installed |    |                                  |
| |             | patches,    |    |                                  |
| |             | such as     |    |                                  |
| |             | LI181018).  |    |                                  |
| |             | Previous    |    |                                  |
| |             | patched     |    |                                  |
| |             | install     |    |                                  |
| |             | files were  |    |                                  |
| |             | LI040004    |    |                                  |
| |             | and         |    |                                  |
| |             | LI040005.   |    |                                  |
| |             | However,    |    |                                  |
| |             | when it is  |    |                                  |
| |             | available,  |    |                                  |
| |             | the install |    |                                  |
| |             | file named  |    |                                  |
| |             | LI040006    |    |                                  |
| |             | should be   |    |                                  |
| |             | used.       |    |                                  |
| +-------------+-------------+    |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
| SMA clients still using IBM i    |                                  |
| versions V5R4 or V6R1 (or V6R2)  |                                  |
| can only use the LSAM version    |                                  |
| 04.00.03, and they should use    |                                  |
| the latest version of the        |                                  |
| install file: LI04006 for new    |                                  |
| LSAM installations. However, SMA |                                  |
| strongly recommends that these   |                                  |
| clients should upgrade their IBM |                                  |
| i operating system to a version  |                                  |
| that IBM still supports. SMA     |                                  |
| provides the back-level 04.00.03 |                                  |
| version of the IBM i LSAM on an  |                                  |
| as-is basis, since soon SMA will |                                  |
| not be able to provide any more  |                                  |
| fixes for this version of the    |                                  |
| LSAM.                            |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
| The following Enhancements and   |                                  |
| Fixes for the IBM i LSAM version |                                  |
| 04.00.03 have been added since   |                                  |
| the previously released install  |                                  |
| file LI040006 (containing the    |                                  |
| equivalent of an LSAM version    |                                  |
| 04.00.03.320).                   |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
| The list in this document is     |                                  |
| included in the latest 18.1      |                                  |
| install file LI181001 (or a      |                                  |
| newer version with more patches  |                                  |
| included such as LI181018).      |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
| Clients performing LSAM PTF      |                                  |
| updates of existing IBM i LSAM   |                                  |
| installations should download    |                                  |
| and refer to the \"IBM i LSAM    |                                  |
| Patch Readme\" PDF document for  |                                  |
| special instructions about       |                                  |
| upgrading to the latest          |                                  |
| available PTF level.             |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
| Clients upgrading from version   |                                  |
| 04.00.03 to version 18.1, or new |                                  |
| installations of the IBM i LSAM  |                                  |
| must use install file            |                                  |
| LI181001(or a newer version with |                                  |
| more patches included such as    |                                  |
| LI181018). These clients will    |                                  |
| receive the following product    |                                  |
| Enhancements and Fixes           |                                  |
| automatically.                   |                                  |
| :::                              |                                  |
| :::                              |                                  |
|                                  |                                  |
| ::: {.MCDropDo                   |                                  |
| wn .MCDropDown_Closed .dropDown} |                                  |
| []{.MCDropDownHead               |                                  | | .dropDownHead}                   |                                  |
|                                  |                                  |
| ### [![Closed](../../../Sk       |                                  |
| ins/Default/Stylesheets/Images/t |                                  |
| ransparent.gif){.MCDropDown_Imag |                                  |
| e_Icon width="16" height="11"}In |                                  |
| stalling IBM i LSAM Patches](jav |                                  |
| ascript:void(0)){.MCDropDownHotS |                                  |
| pot .dropDownHotspot .MCDropDown |                                  |
| HotSpot_ .MCHotSpotImage} {#clos |                                  |
| edinstalling-ibm-i-lsam-patches} |                                  |
|                                  |                                  |
| :::                              |                                  |
|  {.MCDropDownBody .dropDownBody} |                                  |
| Please be careful to distinguish |                                  |
| between SMA software patches for |                                  |
| the two different versions of    |                                  |
| the IBM i LSAM. At SMA's secure  |                                  |
| ftp server there are two         |                                  |
| different sub-directories for    |                                  |
| all resources pertaining to one  |                                  |
| version or the other. Although   |                                  |
| the LSAM PTF file names are      |                                  |
| similar, they are NOT            |                                  |
| interchangeable. These are the   |                                  |
| two different directories (both  |                                  |
| stored in the same root          |                                  |
| directory):                      |                                  |
|                                  |                                  |
| -   /IBMiLSAMptf/04.00.03/       |                                  |
| -   /IBMiLSAMptf/18.1/           |                                  |
|                                  |                                  |
| Using the wrong LSAM PTF files   |                                  |
| for a version will corrupt the   |                                  |
| LSAM software and require a      |                                  |
| restoration from the most recent |                                  |
| backup of the LSAM libraries.    |                                  |
| SMA advises clients to always    |                                  |
| backup the LSAM libraries before |                                  |
| attempting any patching or       |                                  |
| upgrading of the software.       |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
| Instructions for installing      |                                  |
| software patches (PTFs) to       |                                  |
| SMA\'s IBM i LSAM may be found   |                                  |
| in two places. There is a        |                                  |
| stand-alone                      |                                  |
| **Installation** online help     |                                  |
| that explains partially manual   |                                  |
| procedures that may be necessary |                                  |
| after an initial installation or |                                  |
| upgrade of the LSAM. There is    |                                  |
| also a topic in the **IBM i      |                                  |
| LSAM** online help with detailed |                                  |
| instructions and explanations.   |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|   ---                            |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| ----------------------------- -- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
|   !                              |                                  |
| [White pencil/paper icon on gray |                                  | |  circular background](../../../R |                                  |
| esources/Images/note-icon(48x48) |                                  |
| .png "Note icon")    |                                  |
| **NOTE:** [The term \"LSAM\" use |                                  | | d in this online help refers to  |                                  |
| \"Local Schedule Activity Monito |                                  |
| r.\" This is the SMA software th |                                  |
| at is installed under IBM i to e |                                  |
| nable OpCon automation of IBM i  |                                  |
| and any jobs executing under thi |                                  |
| s operating system. SMA document |                                  |
| ation also refers to this softwa |                                  |
| re as the OpCon \"Agent\" for th |                                  |
| e operating system.] |                                  |
|   ---                            |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| ----------------------------- -- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|   -----------                    |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| --------------------- ---------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
|   ![White p                      |                                  | | encil/paper icon on gray circula |                                  |
| r background](../../../Resources |                                  |
| /Images/note-icon(48x48).png "No |                                  |
| te icon")   **NOTE:* |                                  |
| * [PTF \# 403364 marks the end o |                                  | | f support for the IBM i LSAM ver |                                  |
| sion 04.00.03. There may be addi |                                  |
| tional small or emergency patche |                                  |
| s past this level, but no produc |                                  |
| t enhancements. LSAM version 04. |                                  |
| 00.03 remains available for a li |                                  |
| mited time on an as-is basis, IB |                                  |
| M i versions V5R4 and V6R1 (i6.1 |                                  |
| ), but all future enhancements w |                                  |
| ill be compiled under i7.1 and i |                                  |
| ncluded in the i7.1 version 18.1 |                                  |
|  of the IBM i LSAM.] |                                  |
|   -----------                    |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| --------------------- ---------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
| +-------------+-------------+    |                                  |
| | ![White     | *           |    |                                  | | | \"X\" icon  | *WARNING:** |    |                                  |
| | on red      | PTF \#      |    |                                  |
| | circular    | 403170      |    |                                  |
| | b           | changes the |    |                                  |
| | ackground]( | display     |    |                                  |
| | ../../../Re | file used   |    |                                  |
| | sources/Ima | by the      |    |                                  |
| | ges/warning | STRSMA      |    |                                  |
| | -icon(48x48 | command.    |    |                                  |
| | ).png "Warn | Therefore,  |    |                                  |
| | ing icon"){ | you must    |    |                                  |
| | .statement} | NOT access  |    |                                  |
| |             | the LSAM    |    |                                  |
| |             | menu system |    |                                  |
| |             | using this  |    |                                  |
| |             | command     |    |                                  |
| |             | when you    |    |                                  |
| |             | want to     |    |                                  |
| |             | install the |    |                                  |
| |             | PTFs.       |    |                                  |
| |             | Instead,    |    |                                  |
| |             | use this    |    |                                  |
| |             | command in  |    |                                  |
| |             | order to    |    |                                  |
| |             | prevent any |    |                                  |
| |             | error:      |    |                                  |
| |             | SMA         |    |                                  |
| |             | GPL/LSAMENU |    |                                  |
| |             | ENV(        |    |                                  |
| |             | SMADEFAULT) |    |                                  |
| |             |             |    |                                  |
| |             |             |    |                                  |
| |             |             |    |                                  |
| |             | The ENV( )  |    |                                  |
| |             | parameter   |    |                                  |
| |             | value       |    |                                  |
| |             | should be   |    |                                  |
| |             | changed if  |    |                                  |
| |             | you are     |    |                                  |
| |             | applying    |    |                                  |
| |             | PTFs to an  |    |                                  |
| |             | alternate   |    |                                  |
| |             | LSAM        |    |                                  |
| |             | e           |    |                                  |
| |             | nvironment. |    |                                  |
| |             |             |    |                                  |
| |             |             |    |                                  |
| |             |             |    |                                  |
| |             | This        |    |                                  |
| |             | Warning no  |    |                                  |
| |             | longer      |    |                                  |
| |             | applies if  |    |                                  |
| |             | PTF \#      |    |                                  |
| |             | 403189 is   |    |                                  |
| |             | already     |    |                                  |
| |             | applied     |    |                                  |
| |             | (before     |    |                                  |
| |             | starting a  |    |                                  |
| |             | new PTF     |    |                                  |
| |             | ins         |    |                                  |
| |             | tallation). |    |                                  |
| +-------------+-------------+    |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
| +-------------+-------------+    |                                  |
| | ![White     | *           |    |                                  | | | triangle    | *CAUTION:** |    |                                  |
| | icon on     | It may be   |    |                                  |
| | yellow      | necessary   |    |                                  |
| | circlular   | to change   |    |                                  |
| | b           | one of the  |    |                                  |
| | ackground]( | system      |    |                                  |
| | ../../../Re | values for  |    |                                  |
| | sources/Ima | the IBM i   |    |                                  |
| | ges/caution | operating   |    |                                  |
| | -icon(48x48 | system in   |    |                                  |
| | ).png "Caut | order to    |    |                                  |
| | ion icon"){ | permit the  |    |                                  |
| | .statement} | PTF         |    |                                  |
| |             | i           |    |                                  |
| |             | nstallation |    |                                  |
| |             | program to  |    |                                  |
| |             | restore     |    |                                  |
| |             | program     |    |                                  |
| |             | objects     |    |                                  |
| |             | that use    |    |                                  |
| |             | adopted     |    |                                  |
| |             | authority.  |    |                                  |
| |             | The IBM i   |    |                                  |
| |             | LSAM        |    |                                  |
| |             | software    |    |                                  |
| |             | includes    |    |                                  |
| |             | some        |    |                                  |
| |             | programs    |    |                                  |
| |             | that use    |    |                                  |
| |             | adopted     |    |                                  |
| |             | authority   |    |                                  |
| |             | in order to |    |                                  |
| |             | enable      |    |                                  |
| |             | required,   |    |                                  |
| |             | specific    |    |                                  |
| |             | system      |    |                                  |
| |             | management  |    |                                  |
| |             | functions   |    |                                  |
| |             | to be       |    |                                  |
| |             | completed   |    |                                  |
| |             | by          |    |                                  |
| |             | designated  |    |                                  |
| |             | adm         |    |                                  |
| |             | inistrators |    |                                  |
| |             | without     |    |                                  |
| |             | requiring   |    |                                  |
| |             | that those  |    |                                  |
| |             | system      |    |                                  |
| |             | users have  |    |                                  |
| |             | any special |    |                                  |
| |             | a           |    |                                  |
| |             | uthorities. |    |                                  |
| |             |             |    |                                  |
| |             |             |    |                                  |
| |             |             |    |                                  |
| |             | This is a   |    |                                  |
| |             | common      |    |                                  |
| |             | strategy,   |    |                                  |
| |             | and IBM     |    |                                  |
| |             | provides    |    |                                  |
| |             | the         |    |                                  |
| |             | following   |    |                                  |
| |             | guidelines  |    |                                  |
| |             | for         |    |                                  |
| |             | managing    |    |                                  |
| |             | the         |    |                                  |
| |             | i           |    |                                  |
| |             | nstallation |    |                                  |
| |             | of new      |    |                                  |
| |             | software:   |    |                                  |
| |             |             |    |                                  |
| |             |             |    |                                  |
| |             |             |    |                                  |
| |             | The Allow   |    |                                  |
| |             | restore of  |    |                                  |
| |             | security    |    |                                  |
| |             | sensitive   |    |                                  |
| |             | objects     |    |                                  |
| |             | (           |    |                                  |
| |             | QALWOBJRST) |    |                                  |
| |             | system      |    |                                  |
| |             | value       |    |                                  |
| |             | specifies   |    |                                  |
| |             | whether or  |    |                                  |
| |             | not objects |    |                                  |
| |             | with        |    |                                  |
| |             | securit     |    |                                  |
| |             | y-sensitive |    |                                  |
| |             | attributes  |    |                                  |
| |             | can be      |    |                                  |
| |             | restored.   |    |                                  |
| |             | It is       |    |                                  |
| |             | important   |    |                                  |
| |             | to set the  |    |                                  |
| |             | value to    |    |                                  |
| |             | \*ALL       |    |                                  |
| |             | before      |    |                                  |
| |             | performing  |    |                                  |
| |             | the         |    |                                  |
| |             | following   |    |                                  |
| |             | system      |    |                                  |
| |             | activities: |    |                                  |
| |             |             |    |                                  |
| |             | -           |    |                                  |
| |             |  Installing |    |                                  |
| |             |     a new   |    |                                  |
| |             |     release |    |                                  |
| |             |     of the  |    |                                  |
| |             |             |    |                                  |
| |             |   operating |    |                                  |
| |             |     system. |    |                                  |
| |             | -           |    |                                  |
| |             |  Installing |    |                                  |
| |             |     new     |    |                                  |
| |             |             |    |                                  |
| |             |    licensed |    |                                  |
| |             |             |    |                                  |
| |             |   programs. |    |                                  |
| |             | -           |    |                                  |
| |             |    Applying |    |                                  |
| |             |     program |    |                                  |
| |             |             |    |                                  |
| |             |   temporary |    |                                  |
| |             |     fixes   |    |                                  |
| |             |     (PTFs). |    |                                  |
| |             | -           |    |                                  |
| |             |  Recovering |    |                                  |
| |             |     your    |    |                                  |
| |             |     system. |    |                                  |
| |             |             |    |                                  |
| |             | These       |    |                                  |
| |             | activities  |    |                                  |
| |             | can fail if |    |                                  |
| |             | the value   |    |                                  |
| |             | of          |    |                                  |
| |             | QALWOBJRST  |    |                                  |
| |             | is not set  |    |                                  |
| |             | to \*ALL.   |    |                                  |
| |             | Use this    |    |                                  |
| |             | procedure:  |    |                                  |
| |             |             |    |                                  |
| |             | -   Use the |    |                                  |
| |             |     command |    |                                  |
| |             |             |    |                                  |
| |             |   DSPSYSVAL |    |                                  |
| |             |     to view |    |                                  |
| |             |     and     |    |                                  |
| |             |     record  |    |                                  |
| |             |     the     |    |                                  |
| |             |     current |    |                                  |
| |             |     setting |    |                                  |
| |             |     for the |    |                                  |
| |             |     value   |    |                                  |
| |             |             |    |                                  |
| |             | QALWOBJRST. |    |                                  |
| |             |     Current |    |                                  |
| |             |     value:  |    |                                  |
| |             |     \_\_\   |    |                                  |
| |             | _\_\_\_\_\_ |    |                                  |
| |             | \_\_\_\_\_\ |    |                                  |
| |             | _\_\_\_\_\_ |    |                                  |
| |             |     . If    |    |                                  |
| |             |     the     |    |                                  |
| |             |     value   |    |                                  |
| |             |     is      |    |                                  |
| |             |     already |    |                                  |
| |             |     \*ALL,  |    |                                  |
| |             |     skip    |    |                                  |
| |             |     this    |    |                                  |
| |             |             |    |                                  |
| |             |  procedure. |    |                                  |
| |             | -   If you  |    |                                  |
| |             |     have    |    |                                  |
| |             |             |    |                                  |
| |             |  previously |    |                                  |
| |             |     locked  |    |                                  |
| |             |     this    |    |                                  |
| |             |     system  |    |                                  |
| |             |     value,  |    |                                  |
| |             |     go to   |    |                                  |
| |             |     SST     |    |                                  |
| |             |     (system |    |                                  |
| |             |     service |    |                                  |
| |             |     tools)  |    |                                  |
| |             |     and     |    |                                  |
| |             |     unlock  |    |                                  |
| |             |     it.     |    |                                  |
| |             | -   Use the |    |                                  |
| |             |     command |    |                                  |
| |             |             |    |                                  |
| |             |   CHGSYSVAL |    |                                  |
| |             |     to set  |    |                                  |
| |             |             |    |                                  |
| |             |  QALWOBJRST |    |                                  |
| |             |     to a    |    |                                  |
| |             |     value   |    |                                  |
| |             |     of      |    |                                  |
| |             |     \*ALL.  |    |                                  |
| |             | -           |    |                                  |
| |             |    Complete |    |                                  |
| |             |     the     |    |                                  |
| |             |             |    |                                  |
| |             |    software |    |                                  |
| |             |     i       |    |                                  |
| |             | nstallation |    |                                  |
| |             |     or      |    |                                  |
| |             |             |    |                                  |
| |             |    upgrade. |    |                                  |
| |             | -   To      |    |                                  |
| |             |     ensure  |    |                                  |
| |             |     system  |    |                                  |
| |             |             |    |                                  |
| |             |   security, |    |                                  |
| |             |     return  |    |                                  |
| |             |     the     |    |                                  |
| |             |             |    |                                  |
| |             |  QALWOBJRST |    |                                  |
| |             |     value   |    |                                  |
| |             |     to your |    |                                  |
| |             |     normal  |    |                                  |
| |             |     setting |    |                                  |
| |             |             |    |                                  |
| |             |   (recorded |    |                                  |
| |             |     above)  |    |                                  |
| |             |     after   |    |                                  |
| |             |             |    |                                  |
| |             |  completing |    |                                  |
| |             |     the     |    |                                  |
| |             |             |    |                                  |
| |             |    software |    |                                  |
| |             |     in      |    |                                  |
| |             | stallation. |    |                                  |
| +-------------+-------------+    |                                  |
| :::                              |                                  |
| :::                              |                                  |
|                                  |                                  |
| ::: {.MCDropDo                   |                                  |
| wn .MCDropDown_Closed .dropDown} |                                  |
| []{.MCDropDownHead               |                                  | | .dropDownHead}                   |                                  |
|                                  |                                  |
| ### [![Closed](.                 |                                  |
| ./../../Skins/Default/Stylesheet |                                  |
| s/Images/transparent.gif){.MCDro |                                  |
| pDown_Image_Icon width="16" heig |                                  |
| ht="11"}SMA IBM i LSAM 18.1 and  |                                  |
| 04.00.03 Patches](javascript:voi |                                  |
| d(0)){.MCDropDownHotSpot .dropDo |                                  |
| wnHotspot .MCDropDownHotSpot_ .M |                                  |
| CHotSpotImage} {#closedsma-ibm-i |                                  |
| -lsam-18.1-and-04.00.03-patches} |                                  |
|                                  |                                  |
| :::                              |                                  |
|  {.MCDropDownBody .dropDownBody} |                                  |
| These release notes list the     |                                  |
| most recent batch of patches     |                                  |
| available for installation after |                                  |
| the IBM i LSAM version           |                                  |
| 04.00.03.320 was released in the |                                  |
| last LSAM version 04.00.03       |                                  |
| install file, LI040006. LSAM     |                                  |
| version 04.00.03 is compatible   |                                  |
| with OpCon through version       |                                  |
| 18.3.1, but there is no          |                                  |
| assurance that it will remain    |                                  |
| compatible with future versions  |                                  |
| of OpCon. Install or upgrade to  |                                  |
| LSAM version 18.1 to be fully    |                                  |
| compatible with many new         |                                  |
| features supported only in the   |                                  |
| most recent versions of OpCon.   |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
| LSAM PTF numbers are assigned    |                                  |
| within the LSAM Technical        |                                  |
| Product Manager\'s PTF control   |                                  |
| tools. Support incidents are     |                                  |
| generated and tracked within     |                                  |
| SMA\'s latest tracking systems,  |                                  |
| and the incident numbers are     |                                  |
| associated with the LSAM PTF     |                                  |
| numbers. There may be more than  |                                  |
| one support incident associated  |                                  |
| with a given PTF number. The PTF |                                  |
| descriptions below may include a |                                  |
| reference to the originating     |                                  |
| support incident ticket(s).      |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
| Instructions for downloading and |                                  |
| installing LSAM PTFs are found   |                                  |
| in a simple form in PDF          |                                  |
| documents that are stored with   |                                  |
| the LSAM PTF save files          |                                  |
| (LSCTLDTA and LSCUMPTF -- or a   |                                  |
| partial content cumulative save  |                                  |
| file such as LSCUMPTF.308-364).  |                                  |
| The instructions are stored in   |                                  |
| the same directories as listed   |                                  |
| above under **Installing IBM i   |                                  |
| LSAM Patches**. Clients should   |                                  |
| also read the **Patch            |                                  |
| Readme.pdf** document for the    |                                  |
| appropriate LSAM version for     |                                  |
| additional CAUTIONS and other    |                                  |
| important instructions that may  |                                  |
| be added when new software       |                                  |
| patches are developed.           |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
| **SMA Installers**: Please       |                                  |
| consult the SMA TPM for this     |                                  |
| LSAM about the latest resources  |                                  |
| available that can simplify PTF  |                                  |
| application after an initial     |                                  |
| installation of this LSAM.       |                                  |
| :::                              |                                  |
| :::                              |                                  |
|                                  |                                  |
| ::: {.MCDropDo                   |                                  |
| wn .MCDropDown_Closed .dropDown} |                                  |
| []{.MCDropDownHead               |                                  | | .dropDownHead}                   |                                  |
|                                  |                                  |
| ### [![Closed](../../../Sk       |                                  |
| ins/Default/Stylesheets/Images/t |                                  |
| ransparent.gif){.MCDropDown_Imag |                                  |
| e_Icon width="16" height="11"}Co |                                  |
| mpatibility](javascript:void(0)) |                                  |
| {.MCDropDownHotSpot .dropDownHot |                                  |
| spot .MCDropDownHotSpot_ .MCHotS |                                  |
| potImage} {#closedcompatibility} |                                  |
|                                  |                                  |
| :::                              |                                  |
|  {.MCDropDownBody .dropDownBody} |                                  |
| These versions of the IBM i LSAM |                                  |
| are compatible with              |                                  |
| OpCon |                                  |
| Release(s) 16.0 and higher.      |                                  |
| :::                              |                                  |
| :::                              |                                  |
| :::                              |                                  |
| :::                              |                                  |
+----------------------------------+----------------------------------+
|                                  |                                  |
+----------------------------------+----------------------------------+
| ## []{#Version18.1_Ne            |                                  | | wFeatures}Version 18.1 New Featu |                                  |
| res {#version-18.1-new-features} |                                  |
+----------------------------------+----------------------------------+
| ### 2018 December {#december}    |                                  |
+----------------------------------+----------------------------------+
|   -------------                  |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| ------------------- ------------ |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
|   ![White pen                    |                                  | | cil/paper icon on gray circular  |                                  |
| background](../../../Resources/I |                                  |
| mages/note-icon(48x48).png "Note |                                  |
|  icon")   **NOTE:**  |                                  |
| [All IBM i LSAM software fixes a |                                  | | re listed under Version 04.00.03 |                                  |
| , and these are all included in  |                                  |
| LSAM version 18.1. This list sho |                                  |
| ws the enhancements that were ad |                                  |
| ded to the OpCon Agent for IBM i |                                  |
|  as LSAM version 18.1 was releas |                                  |
| ed, available only after upgradi |                                  |
| ng to version 18.1.] |                                  |
|   -------------                  |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| ------------------- ------------ |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
| -------------------------------- |                                  |
+----------------------------------+----------------------------------+
| ![Black text on blue             | (\# IBMI-41) The IBM i LSAM      | | backgroun                        | communication with the OpCon     |
| d](../../../Resources/Images/rn- | server and with other Agents can |
| enhancement.png "Enhancement ico | now be optionally encrypted with |
| n for release notes"){.relnotes} | TLS Security.                    |
+----------------------------------+----------------------------------+
| ![Black text on blue             | (\# IBMI-44, IBMI-316) The IBM i | | backgroun                        | LSAM Operator Replay green       |
| d](../../../Resources/Images/rn- | screen workstation robotic       |
| enhancement.png "Enhancement ico | automation feature now supports  |
| n for release notes"){.relnotes} | (1) user-defined selection of    |
|                                  | virtual display devices          |
|                                  | according to four different      |
|                                  | algorithms, and (2) more         |
|                                  | flexibility for designating the  |
|                                  | Operator Replay Script job User  |
|                                  | Profile, including relying on    |
|                                  | the OpCon Job Master User Name,  |
|                                  | just as for standard IBM i Batch |
|                                  | Jobs.                            |
+----------------------------------+----------------------------------+
| ![Black text on blue             | The IBM i LSAM communication     | | backgroun                        | with the OpCon server can now    |
| d](../../../Resources/Images/rn- | optionally filter connection     |
| enhancement.png "Enhancement ico | requests according to a          |
| n for release notes"){.relnotes} | user-defined list of one to four |
|                                  | allowed IP Addresses. In         |
|                                  | addition, any attempt by more    |
|                                  | than one OpCon server to connect |
|                                  | to the same LSAM will be         |
|                                  | rejected, while the incident     |
|                                  | will be reported to both the     |
|                                  | original OpCon SAM Log as well   |
|                                  | as to the IBM i partition's      |
|                                  | QSYSOPR message queue. When      |
|                                  | second connect attempts are      |
|                                  | rejected, the original OpCon     |
|                                  | server connection will be        |
|                                  | preserved active.                |
+----------------------------------+----------------------------------+
| ![Black text on blue             | (\# IBMI-292, IBMI-318) The IBM  | | backgroun                        | i LSAM reporting of Detail Job   |
| d](../../../Resources/Images/rn- | Messages to each OpCon job's     |
| enhancement.png "Enhancement ico | Information panels is further    |
| n for release notes"){.relnotes} | enhanced with more messages and  |
|                                  | more helpful information for     |
|                                  | diagnosing job failures without  |
|                                  | having to investigate the IBM i  |
|                                  | LSAM logs in every case. The     |
|                                  | LSAM command SMAJOBMSG is made   |
|                                  | more flexible with a JOB( )      |
|                                  | parameter, so that it can be     |
|                                  | used by features such as Message |
|                                  | Management.                      |
+----------------------------------+----------------------------------+
| ![Black text on blue             | (\# IBMI-330) The IBM i LSAM     | | backgroun                        | simple FTP Job sub-type among    |
| d](../../../Resources/Images/rn- | the OpCon job masters now        |
| enhancement.png "Enhancement ico | supports extensions to the       |
| n for release notes"){.relnotes} | Remote System Address field,     |
|                                  | allowing the parameters of the   |
|                                  | IBM i "FTP" command to be        |
|                                  | specified. This supports         |
|                                  | identifying non-standard FTP     |
|                                  | Port Numbers at the remote site, |
|                                  | and it may also possibly be used |
|                                  | to engage secured FTP            |
|                                  | connections (given that the user |
|                                  | is responsible for all system    |
|                                  | requirements of secured          |
|                                  | connections, such as digital     |
|                                  | certificate management and any   |
|                                  | other IBM i configuration        |
|                                  | options).                        |
+----------------------------------+----------------------------------+
| ![Black text on blue             | (\# IBMI-355) The IBM i LSAM     | | backgroun                        | implementation of SMA File       |
| d](../../../Resources/Images/rn- | Transfer now supports an LSAM    |
| enhancement.png "Enhancement ico | Network Address Translation      |
| n for release notes"){.relnotes} | table that enables using SMA     |
|                                  | File Transfer within a virtual   |
|                                  | IBM i partition (such as when a  |
|                                  | Client LPAR is served by the     |
|                                  | physical IP connections of a     |
|                                  | Host LPAR, and                   |
|                                  | address-forwarding services are  |
|                                  | configured between the Host and  |
|                                  | its Client LPARs).               |
+----------------------------------+----------------------------------+
| ![Black text on blue             | (\# IBMI-363) The IBM i LSAM     | | backgroun                        | Message Management Parameters    |
| d](../../../Resources/Images/rn- | definition now better supports   |
| enhancement.png "Enhancement ico | long Event (or IBM i) command    |
| n for release notes"){.relnotes} | lines.                           |
+----------------------------------+----------------------------------+
| ![Black text on blue             | (\# IBMI-366) The IBM i LSAM     | | backgroun                        | Dynamic Variables get another    |
| d](../../../Resources/Images/rn- | new Function Code called \*HEX,  |
| enhancement.png "Enhancement ico | used, for example, when          |
| n for release notes"){.relnotes} | inserting text formatting        |
|                                  | characters into OpCon Event      |
|                                  | commands such as email message   |
|                                  | texts. The Agent User Help is    |
|                                  | also greatly improved by the     |
|                                  | addition of a whole new chapter  |
|                                  | dedicated to all the features of |
|                                  | the Dynamic Variables. Parts of  |
|                                  | this tool were removed from      |
|                                  | everywhere else in the           |
|                                  | documentation and consolidated   |
|                                  | into one, easy to locate         |
|                                  | reference.                       |
+----------------------------------+----------------------------------+
| ![Black text on blue             | (\# IBMI-394) The IBM i LSAM PTF | | backgroun                        | (software patching) tools are    |
| d](../../../Resources/Images/rn- | enhanced with (1) a new "PTF     |
| enhancement.png "Enhancement ico | Level" that independently        |
| n for release notes"){.relnotes} | identifies the authoritative     |
|                                  | software level of the Agent,     |
|                                  | avoiding confusion among "PTF    |
|                                  | Names" that appear out of        |
|                                  | sequence because of their        |
|                                  | required "application Sequence   |
|                                  | Number"; and (2) a new "DB       |
|                                  | Level" (database level) that     |
|                                  | greatly relaxes the constraints  |
|                                  | between two different LSAM       |
|                                  | environments when the LSAM Data  |
|                                  | Export/Import tool is used to    |
|                                  | exchange automation tool         |
|                                  | configurations and scripts.      |
+----------------------------------+----------------------------------+
| ![Black text on blue             | (\# IBMI-397, IBMI-446) The IBM  | | backgroun                        | i LSAM communication programs    |
| d](../../../Resources/Images/rn- | have finally eliminated any      |
| enhancement.png "Enhancement ico | possibility of the occasional    |
| n for release notes"){.relnotes} | "address already in use" error.  |
+----------------------------------+----------------------------------+
| ![Black text on blue             | (\# IBMI-413) The IBM i LSAM     | | backgroun                        | Message Management feature now   |
| d](../../../Resources/Images/rn- | supports a user-selected option  |
| enhancement.png "Enhancement ico | for governing the order in which |
| n for release notes"){.relnotes} | Parameter records are executed.  |
|                                  | This improves the flexibility of |
|                                  | using multiple Parameter records |
|                                  | (each with a different Sequence  |
|                                  | Number) to implement more        |
|                                  | elaborate message response       |
|                                  | routines.                        |
+----------------------------------+----------------------------------+
| ![Black text on blue             | (\# IBMI-415, IBMI-459) The IBM  | | backgroun                        | i LSAM SCANSPLF utility, as well |
| d](../../../Resources/Images/rn- | as the Dynamic Variables, are    |
| enhancement.png "Enhancement ico | now enhanced with new            |
| n for release notes"){.relnotes} | capabilities for preserving and  |
|                                  | counting either leading or       |
|                                  | trailing spaces. The previous    |
|                                  | default method of always         |
|                                  | trimming spaces from a character |
|                                  | string can still be used, but    |
|                                  | new options allow for keeping    |
|                                  | either or both of any leading    |
|                                  | spaces or any trailing spaces.   |
|                                  | This prevents, for example,      |
|                                  | false matches when a short       |
|                                  | comparison string is found       |
|                                  | within a much longer string,     |
|                                  | just because the short string    |
|                                  | surrounding spaces were not      |
|                                  | being taken into consideration.  |
+----------------------------------+----------------------------------+
|                                  |                                  |
+----------------------------------+----------------------------------+
| #                                |                                  |
| # []{#Version04.00.03_NewFeature |                                  | | s}Version 04.00.03 New Features  |                                  |
| {#version-04.00.03-new-features} |                                  |
+----------------------------------+----------------------------------+
| ### 2017 December {#december-1}  |                                  |
+----------------------------------+----------------------------------+
| ![Black text on blue             | (\#403317)Two IBM i LSAM         | | backgroun                        | reference data files were        |
| d](../../../Resources/Images/rn- | refreshed as included with the   |
| enhancement.png "Enhancement ico | LI040006 install file. Existing  |
| n for release notes"){.relnotes} | installs can update the files    |
|                                  | SMALOOKUP (used to label fields  |
|                                  | in the LSAM log detail views)    |
|                                  | and PGMREF (used to support the  |
|                                  | technical analysis tools         |
|                                  | DSPOBJWU and REFFLOW) by         |
|                                  | installing this PTF. This PTF is |
|                                  | not required by new installs     |
|                                  | that used the LI040006 install   |
|                                  | file, however, if there should   |
|                                  | be additional emergency patches  |
|                                  | needed by all users, it does not |
|                                  | matter that this PTF will be     |
|                                  | applied to those new installs.   |
+----------------------------------+----------------------------------+
| ![Black text on blue             | (\#403318, 403319) Previous IBM  | | backgroun                        | i LSAM Dynamic Variable updates  |
| d](../../../Resources/Images/rn- | are implemented across all       |
| enhancement.png "Enhancement ico | dependent LSAM functions by      |
| n for release notes"){.relnotes} | additional program recompiles.   |
|                                  | These PTFs also introduce the    |
|                                  | following enhancements to the    |
|                                  | IBM i LSAM Dynamic Variables:    |
|                                  |                                  |
|                                  | 1.  Function Code \*DATE changes |
|                                  | 2.  Function Code \*TIME         |
|                                  | 3.  Function Code \*SYSVAL       |
|                                  | 4.  \*DATE and \*TIME math       |
|                                  | 5.  Trimming character values of |
|                                  |     Dynamic Variables            |
|                                  | 6.  Nested Dynamic Variables     |
|                                  |     tokens                       |
+----------------------------------+----------------------------------+
| ![Black text on blue             | (\#403343) The IBM i LSAM Object | | backgroun                        | Authority maintenance tools are  |
| d](../../../Resources/Images/rn- | enhanced to accept the names of  |
| enhancement.png "Enhancement ico | Authorization Lists for any User |
| n for release notes"){.relnotes} | 1 through 3 on an object         |
|                                  | authority master record.         |
|                                  | Entering a value of \*AUTL in    |
|                                  | the AUTH field tells the LSAM to |
|                                  | handle the User Name as the name |
|                                  | of an Authorization List.        |
|                                  | Maintenance of users assigned to |
|                                  | an authorization list is managed |
|                                  | by the LSAM Administrator using  |
|                                  | IBM i native commands. An        |
|                                  | Authorization List is a good     |
|                                  | strategy to use when configuring |
|                                  | a "power user" in OpCon, or a    |
|                                  | designated LSAM Administrator    |
|                                  | profile, that may need to        |
|                                  | execute LSAM utility commands    |
|                                  | that are not already authorized  |
|                                  | for \*PUBLIC \*USE.              |
+----------------------------------+----------------------------------+
| ![Black text on blue             | (\#403346) The IBM i LSAM Job    | | backgroun                        | Tracking function will no longer |
| d](../../../Resources/Images/rn- | leave copies of false error      |
| enhancement.png "Enhancement ico | message CPF1015 in every job log |
| n for release notes"){.relnotes} | when optional data areas         |
|                                  | (CAPJOBS, TRKJOBDBUG) are not    |
|                                  | found. This helps prevent        |
|                                  | confusion when diagnosing any    |
|                                  | real failure of the Job Tracking |
|                                  | function.                        |
+----------------------------------+----------------------------------+
| ![Black text on blue             | (\#403352) The IBM i LSAM        | | backgroun                        | utility command CMDEXE2 has been |
| d](../../../Resources/Images/rn- | enhanced to provide improved     |
| enhancement.png "Enhancement ico | support and error management for |
| n for release notes"){.relnotes} | QSHELL commands.                 |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | EXAMPLE, showing direct QSH      |
|                                  | command insertion and the new    |
|                                  | QSHCMD parameter:                |
|                                  |                                  |
|                                  | CMDEXE2 CMD(\'LS \> list.txt\')  |
|                                  | QSHCMD(\'Y\')                    |
|                                  |                                  |
|                                  | *- or -*                         |
|                                  |                                  |
|                                  | CMDEXE2 CMD(\'LS \> list.txt\')  |
|                                  | QSHCMD(\'1\')                    |
+----------------------------------+----------------------------------+
| ![Black text on blue             | (\#403359 - 403361) The IBM i    | | backgroun                        | LSAM File Arrival execution      |
| d](../../../Resources/Images/rn- | commands, CHKFILE and CHKIFSFIL, |
| enhancement.png "Enhancement ico | have been enhanced to support    |
| n for release notes"){.relnotes} | automatic allocation of the LSAM |
|                                  | environment library list, which  |
|                                  | simplifies the strategy for      |
|                                  | supporting File Arrival jobs.    |
|                                  | These PTFs also instate new      |
|                                  | adopted authority of the SMANET  |
|                                  | user for the commands and the    |
|                                  | command driver programs, so that |
|                                  | any IBM i user with authority to |
|                                  | use either command will          |
|                                  | automatically have all authority |
|                                  | necessary to use the LSAM files  |
|                                  | and other objects required by    |
|                                  | these File Arrival job commands. |
|                                  | There are no user-defined        |
|                                  | options included in this         |
|                                  | strategy. Instead, the new data  |
|                                  | area SMAENVREF that is now being |
|                                  | utilized by the File Arrival     |
|                                  | commands and programs in the     |
|                                  | SMAPGM program objects library   |
|                                  | can also be utilized by SMA      |
|                                  | programmers who need to enable   |
|                                  | other LSAM utility commands to   |
|                                  | allocate the LSAM library list   |
|                                  | without requiring that those     |
|                                  | commands be hosted by the        |
|                                  | wrapper command LSAMCMD. LSAM    |
|                                  | users do still have an ability   |
|                                  | to use the LSAMCMD wrapper       |
|                                  | command, for the purposes        |
|                                  | documented in the IBM i Agent    |
|                                  | User Help.                       |
+----------------------------------+----------------------------------+
| ![Black text on blue             | (\#403362) The IBM i LSAM        | | backgroun                        | LOGDYNVAR utility command is     |
| d](../../../Resources/Images/rn- | enhanced with new options for    |
| enhancement.png "Enhancement ico | the VALUE parameter: The special |
| n for release notes"){.relnotes} | value of \*DYNVAR points to the  |
|                                  | name of the Dynamic Variable     |
|                                  | specified in the command's first |
|                                  | parameter, so that the value     |
|                                  | being stored in the LOGDYNVAR    |
|                                  | table will be pulled from the    |
|                                  | named Dynamic Variable at run    |
|                                  | time. In addition, the VALUE,    |
|                                  | CODE and DESC keywords will now  |
|                                  | support one or more Dynamic      |
|                                  | Variable {TOKENS} with or        |
|                                  | without other text in those      |
|                                  | fields. The tokens will be       |
|                                  | replaced by their values as the  |
|                                  | LOGDYNVAR command is being       |
|                                  | executed. These enhancements     |
|                                  | make the LOGDYNVAR command       |
|                                  | useful outside of the LSAM       |
|                                  | Response Rules.                  |
+----------------------------------+----------------------------------+
|                                  |                                  |
+----------------------------------+----------------------------------+
| ## []{#Versio                    |                                  | | n04.00.03_Fixes}Version 04.00.03 |                                  |
|  Fixes {#version-04.00.03-fixes} |                                  |
+----------------------------------+----------------------------------+
| ### 2018 December {#december-2}  |                                  |
+----------------------------------+----------------------------------+
| ![Black text on green            | (\#403320) This is a CRITICAL    | | background](../../../Resource    | fix for the IBM i LSAM data      |
| s/Images/rn-fixed.png "Fixed ico | Export/Import tools. The LSAM    |
| n for release notes"){.relnotes} | Dynamic Variable Auxiliary file  |
|                                  | is added to the Export/Import    |
|                                  | programs. Previously, the new    |
|                                  | Dynamic Variable "Function Code" |
|                                  | features were added to the LSAM, |
|                                  | but the Export program was       |
|                                  | failing to include the Dynamic   |
|                                  | Variables Auxiliary table        |
|                                  | (LSAVARF10) in the export data.  |
+----------------------------------+----------------------------------+
| ![Black text on green            | (\#403321) The IBM i LSAM data   | | background](../../../Resource    | Export/Import tools were failing |
| s/Images/rn-fixed.png "Fixed ico | to submit an Export or Import    |
| n for release notes"){.relnotes} | process to a batch job. The      |
|                                  | programs were trying to use the  |
|                                  | Job Description name for the     |
|                                  | JOBQ parameter of the SBMJOB     |
|                                  | command. The work-around has     |
|                                  | been to run the process from the |
|                                  | interactive job. After this      |
|                                  | patch the option to submit an    |
|                                  | Export or Import process to a    |
|                                  | batch job will work. (PTF \#     |
|                                  | 403324 will perform a check and  |
|                                  | update for any Dynamic Variables |
|                                  | that were stored with names      |
|                                  | using lower-case letters. To     |
|                                  | properly support                 |
|                                  | case-insensitivity, Dynamic      |
|                                  | Variables must always be stored  |
|                                  | with all CAPITAL letters.)       |
+----------------------------------+----------------------------------+
| ![Black text on green            | (\#403322-403323) The IBM i LSAM | | background](../../../Resource    | Dynamic Variable processing gets |
| s/Images/rn-fixed.png "Fixed ico | the following fixes and          |
| n for release notes"){.relnotes} | improvements:                    |
|                                  |                                  |
|                                  | -   The TO-Format formula was    |
|                                  |     not always preserved for     |
|                                  |     variables using the \*DATE   |
|                                  |     Function Code when using     |
|                                  |     Change or Copy maintenance.  |
|                                  | -   The Character Trim feature   |
|                                  |     (Start/Length) is made more  |
|                                  |     flexible and predictable.    |
|                                  |     New edits in the Dynamic     |
|                                  |     Variable maintenance program |
|                                  |     help prevent errors and      |
|                                  |     explain how the definition   |
|                                  |     fields work.                 |
+----------------------------------+----------------------------------+
| ![Black text on green            | (\#403333) The IBM i LSAM        | | background](../../../Resource    | SCANSPLF (Scan Spool File)       |
| s/Images/rn-fixed.png "Fixed ico | utility was failing to preserve  |
| n for release notes"){.relnotes} | leading spaces in some           |
|                                  | comparison values and value      |
|                                  | search label fields. Only        |
|                                  | trailing spaces are typically    |
|                                  | trimmed from a character string, |
|                                  | and trailing spaces are only     |
|                                  | preserved if a value length is   |
|                                  | specified in a Scan Rule (or an  |
|                                  | associated Response Rule). In    |
|                                  | contrast, leading spaces are     |
|                                  | supposed to be preserved and not |
|                                  | trimmed. The incorrect trimming  |
|                                  | of leading spaces was causing    |
|                                  | some character string            |
|                                  | comparisons to fail when they    |
|                                  | should have passed.              |
+----------------------------------+----------------------------------+
| ![Black text on green            | (\#403334) The IBM i LSAM File   | | background](../../../Resource    | Arrival jobs and the CHKIFSFIL   |
| s/Images/rn-fixed.png "Fixed ico | command were failing to find     |
| n for release notes"){.relnotes} | more than one matching file in   |
|                                  | the /root file system when a     |
|                                  | generic\* name was used for the  |
|                                  | file.                            |
+----------------------------------+----------------------------------+
| ![Black text on green            | (\#403335, 403336, 403337) The   | | background](../../../Resource    | IBM i LSAM general purpose log   |
| s/Images/rn-fixed.png "Fixed ico | file (LSALOGF30) could cause a   |
| n for release notes"){.relnotes} | failure of the LSAM server jobs  |
|                                  | if the file content would exceed |
|                                  | 99,999,999 records. This would   |
|                                  | only happen in an unusual        |
|                                  | circumstance, but a user         |
|                                  | configuration error in a Message |
|                                  | Management Parameters record     |
|                                  | command line, such as trying to  |
|                                  | use nested Dynamic Variable      |
|                                  | tokens when the nested token     |
|                                  | does not exist, can cause a      |
|                                  | run-away generation of error     |
|                                  | messages. When the log file size |
|                                  | exceeded the number of decimal   |
|                                  | positions allowed for the file's |
|                                  | record ID number field, program  |
|                                  | error RNX0103 would cause the    |
|                                  | server jobs to fail. These PTFs  |
|                                  | implement the disabling of the   |
|                                  | useless file record number       |
|                                  | field, and that prevents the     |
|                                  | LSAM server programs from        |
|                                  | failing due to the former        |
|                                  | limitation of the file           |
|                                  | definition. PTF \# 403335 also   |
|                                  | forces the log file LSALOGF30 to |
|                                  | have a size limit instead of     |
|                                  | \*NOMAX, so that when a user     |
|                                  | configuration error might occur, |
|                                  | the system will not be lost due  |
|                                  | to zero available disk space.    |
|                                  | Now, if a user configuration     |
|                                  | error causes error message       |
|                                  | run-away, the LSAM server jobs   |
|                                  | will still be halted until (1)   |
|                                  | an administrator corrects the    |
|                                  | configuration error, and (2) an  |
|                                  | operator responds to the system  |
|                                  | message reporting that file      |
|                                  | LSALOGF30 is full. The log file  |
|                                  | can safely be cleared, if        |
|                                  | necessary, while the LSAM server |
|                                  | jobs are stopped. Otherwise, the |
|                                  | file LSALOGF30 can be extended   |
|                                  | to a larger size, until the LSAM |
|                                  | daily log purge program can      |
|                                  | remove aged records.             |
+----------------------------------+----------------------------------+
| ![Black text on green            | (\#403338) The IBM i LSAM Job    | | background](../../../Resource    | Tracking exit program TRKJOBR10  |
| s/Images/rn-fixed.png "Fixed ico | could issue error MCH1210        |
| n for release notes"){.relnotes} | (receiver too small to hold      |
|                                  | result) depending on variations  |
|                                  | in the original SMBJOB command   |
|                                  | parameter list. This would       |
|                                  | prevent the job from being       |
|                                  | submitted, whether it was being  |
|                                  | tracked or not. This symptom was |
|                                  | noted in JD Edwards software     |
|                                  | environments. Parsing of the     |
|                                  | SBMJOB parameters has been       |
|                                  | strengthened to prevent the      |
|                                  | failure.                         |
+----------------------------------+----------------------------------+
| ![Black text on green            | (\#403339) The IBM i LSAM Agent  | | background](../../../Resource    | for SMA File Transfer (SMAFT)    |
| s/Images/rn-fixed.png "Fixed ico | was failing to separate incoming |
| n for release notes"){.relnotes} | records as it was writing to the |
|                                  | destination file in the DB2      |
|                                  | database. This was happening     |
|                                  | when the source file was a       |
|                                  | stream file, for example, from a |
|                                  | Windows system, and the file did |
|                                  | contain record separators. The   |
|                                  | problem was introduced by a flaw |
|                                  | in the previous PTF \# 403332.   |
+----------------------------------+----------------------------------+
| ![Black text on green            | (\#403340) The IBM i LSAM        | | background](../../../Resource    | Multi-Step Job Script list       |
| s/Images/rn-fixed.png "Fixed ico | display (MLTJPBR10) did not stop |
| n for release notes"){.relnotes} | at the Bottom of the list when   |
|                                  | pressing PageDown, but would     |
|                                  | roll back over to the start of   |
|                                  | the list.                        |
+----------------------------------+----------------------------------+
| ![Black text on green            | (\#403341) The IBM i LSAM SMA    | | background](../../../Resource    | File Transfer programs are fixed |
| s/Images/rn-fixed.png "Fixed ico | to prevent dropping of           |
| n for release notes"){.relnotes} | characters whenever the UTF-8    |
|                                  | (UNICODE) character set was      |
|                                  | automatically chosen to          |
|                                  | transport the data. A common     |
|                                  | example of a transfer job that   |
|                                  | might drop characters was        |
|                                  | between two IFS /root file       |
|                                  | systems both in an IBM i         |
|                                  | partition. This problem was      |
|                                  | first reported after PTF \#      |
|                                  | 403332 was installed, but it was |
|                                  | always a theoretical weakness in |
|                                  | the SMA File Transfer programs   |
|                                  | of the IBM i LSAM.               |
+----------------------------------+----------------------------------+
| ![Black text on green            | (\#403342) The IBM i LSAM        | | background](../../../Resource    | Dynamic Variable Maintenance     |
| s/Images/rn-fixed.png "Fixed ico | program failed when using the    |
| n for release notes"){.relnotes} | Search function if it was used   |
|                                  | once, then Option-2=Change was   |
|                                  | used, and then Search was        |
|                                  | attempted again.                 |
+----------------------------------+----------------------------------+
| ![Black text on green            | (\#403344) The IBM i LSAM        | | background](../../../Resource    | SCANSPLF (Scan Spool File)       |
| s/Images/rn-fixed.png "Fixed ico | command and program were failing |
| n for release notes"){.relnotes} | whenever the SCANSPLF command    |
|                                  | was being used very frequently   |
|                                  | to evaluate OpCon job completion |
|                                  | status. The LSAJOR server job of |
|                                  | the LSAM was reporting an error  |
|                                  | "NoJobNm", indicating that no    |
|                                  | job name was found, when IBM i   |
|                                  | showed the job did still exist   |
|                                  | and did have a QPJOBLOG report   |
|                                  | to be analyzed. The cause of     |
|                                  | this error was that the          |
|                                  | SCANSPLFR program was not        |
|                                  | deleting the list of jobs from   |
|                                  | the previous searches, so the    |
|                                  | memory utilized by repeated      |
|                                  | calls to the list API was        |
|                                  | extended to its limit, and the   |
|                                  | system was refusing to list jobs |
|                                  | for new searches. Adding a call  |
|                                  | to the delete-list API removes   |
|                                  | old lists and frees the memory.  |
+----------------------------------+----------------------------------+
| ![Black text on green            | (\#403345) **WARNING! DO NOT USE | | background](../../../Resource    | THE STRSMA COMMAND TO ENTER THE  |
| s/Images/rn-fixed.png "Fixed ico | LSAM MENU SYSTEM WHEN INSTALLING |
| n for release notes"){.relnotes} | THIS PTF!** Use the command      |
|                                  | SMAGPL/LSAMENU instead.          |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | Using the STRSMA command might   |
|                                  | interfere with the replacement   |
|                                  | of the STRSMAD display file,     |
|                                  | depending on the level of the    |
|                                  | LSAM PTFs when the PTF install   |
|                                  | process started.                 |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | This PTF redistributes the       |
|                                  | STRSMA command, its two programs |
|                                  | and its display file. Clients    |
|                                  | who used an LSAM install file    |
|                                  | older than version LI040005 did  |
|                                  | not get the changes made to the  |
|                                  | STRSMA command display and       |
|                                  | drivers that were prepared and   |
|                                  | originally distributed only in   |
|                                  | the new install file LI040005    |
|                                  | (and/or LI040006). This PTF may  |
|                                  | be applied by all users, but its |
|                                  | purpose is to catch up older     |
|                                  | LSAM installs in order to        |
|                                  | prevent a CPF4131 level check    |
|                                  | error on display file STRSMAD    |
|                                  | from program STRSMAC1.           |
+----------------------------------+----------------------------------+
| ![Black text on green            | (\#403347) The IBM i LSAM data   | | background](../../../Resource    | Export/Import feature would fail |
| s/Images/rn-fixed.png "Fixed ico | to process the Import save file  |
| n for release notes"){.relnotes} | and library when attempting to   |
|                                  | import to a different LSAM       |
|                                  | environment within the same IBM  |
|                                  | i partition.                     |
+----------------------------------+----------------------------------+
| ![Black text on green            | (\#403348) The IBM i LSAM "Event | | background](../../../Resource    | Management" function (option 1   |
| s/Images/rn-fixed.png "Fixed ico | in LSAM menu 3) was failing when |
| n for release notes"){.relnotes} | attempting to display a prompted |
|                                  | template for longer OpCon Event  |
|                                  | Commands, including              |
|                                  | \$NOTIFY:EMAIL and several       |
|                                  | others. This PTF also adds two   |
|                                  | new optional parameters to the   |
|                                  | templates for the \$JOB:RESTART  |
|                                  | and \$JOB:RESTARTHLD Event       |
|                                  | commands.                        |
+----------------------------------+----------------------------------+
| ![Black text on green            | (\#403349) The IBM i LSAM data   | | background](../../../Resource    | Export/Import feature was not    |
| s/Images/rn-fixed.png "Fixed ico | supporting the displayed         |
| n for release notes"){.relnotes} | F12=Cancel function key when the |
|                                  | Delete Batch confirmation window |
|                                  | appeared, offering an option to  |
|                                  | also delete the temporary        |
|                                  | Export/Import library.           |
+----------------------------------+----------------------------------+
| ![Black text on green            | (\#403350, 403351) The IBM i     | | background](../../../Resource    | LSAM Agent for SMA File Transfer |
| s/Images/rn-fixed.png "Fixed ico | (SMAFT) was sometimes failing    |
| n for release notes"){.relnotes} | with this error message: "1099   |
|                                  | nbConnect error: 03420 Address   |
|                                  | already in use." This error      |
|                                  | would happen for some jobs when  |
|                                  | many File Transfer jobs were     |
|                                  | being started in the IBM i       |
|                                  | system all at once.              |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | **POST-INSTALL INSTRUCTIONS**:   |
|                                  | The Post-Install Instructions    |
|                                  | explain how to update the LSAM's |
|                                  | SMAFT Parameters using LSAM      |
|                                  | sub-menu 8, option 7, to change  |
|                                  | the "linger" values for both the |
|                                  | Agent and the Server jobs to '0' |
|                                  | (zero). This is important in     |
|                                  | environments with a high volume  |
|                                  | of file transfer jobs in order   |
|                                  | to prevent the "3420: Address    |
|                                  | already in use" error.           |
+----------------------------------+----------------------------------+
| ![Black text on green            | (\#403353) The IBM i LSAM audit  | | background](../../../Resource    | and align utility program        |
| s/Images/rn-fixed.png "Fixed ico | SMADTAARAC had an incorrect      |
| n for release notes"){.relnotes} | library location for the SMAPTF  |
|                                  | data area that resides in        |
|                                  | library SMAPTF. Program          |
|                                  | SMADTAARAC is executed by the    |
|                                  | LSAM utility command LSAINIT,    |
|                                  | commonly used to audit and align |
|                                  | a cloned set of LSAM environment |
|                                  | libraries.                       |
+----------------------------------+----------------------------------+
| ![Black text on green            | (\#403354) The IBM i LSAM SMA    | | background](../../../Resource    | File Transfer Server job was     |
| s/Images/rn-fixed.png "Fixed ico | sending a false error code       |
| n for release notes"){.relnotes} | 034265 to QSYSOPR when a normal  |
|                                  | remote system disconnect         |
|                                  | occurred. This symptom started   |
|                                  | after PTF \# 403351 was applied  |
|                                  | and the SMA File Transfer        |
|                                  | communications parameters were   |
|                                  | updated to use a Linger value of |
|                                  | 0.                               |
+----------------------------------+----------------------------------+
| ![Black text on green            | (\#403355) The IBM i LSAM        | | background](../../../Resource    | Parameters maintenance function  |
| s/Images/rn-fixed.png "Fixed ico | (LSAM main menu, option 7) was   |
| n for release notes"){.relnotes} | not updating changes to some of  |
|                                  | the File Arrival job parameters  |
|                                  | override fields, including the   |
|                                  | File Arrival Job Description     |
|                                  | Library name.                    |
+----------------------------------+----------------------------------+
| ![Black text on green            | (\#403356, 403357) The IBM i     | | background](../../../Resource    | LSAM utility command LSAINIT was |
| s/Images/rn-fixed.png "Fixed ico | not correctly setting the SMAUTL |
| n for release notes"){.relnotes} | data area in newly cloned (by    |
|                                  | library copy) environments.      |
|                                  | Additional changes were also     |
|                                  | made to enforce some rules for   |
|                                  | the PRDLIB of commands in the    |
|                                  | SMAGPL library.                  |
+----------------------------------+----------------------------------+
| ![Black text on green            | (\#403358) The IBM i LSAM        | | background](../../../Resource    | utility commands LSAINIT and     |
| s/Images/rn-fixed.png "Fixed ico | SMALIBMGT have their PRDLIB      |
| n for release notes"){.relnotes} | (Product Library) changed to     |
|                                  | \*NONE. This setting prevents    |
|                                  | likely problems when using the   |
|                                  | CPYLIB command to clone the four |
|                                  | LSAM libraries to a new set of   |
|                                  | libraries, forming a different   |
|                                  | LSAM environment.                |
+----------------------------------+----------------------------------+
| ![Black text on green            | (\#403363) The IBM i LSAM Job    | | background](../../../Resource    | Tracking feature was having its  |
| s/Images/rn-fixed.png "Fixed ico | \$JOB:TRACK and \$JOB:QUEUE      |
| n for release notes"){.relnotes} | Event commands rejected by OpCon |
|                                  | in non-US environments. The LSAM |
|                                  | was failing to fetch the         |
|                                  | user-specified Separator         |
|                                  | Character, as maintained by the  |
|                                  | LSAM sub-menu 1, option 7. This  |
|                                  | PTF also fixes a weakness in the |
|                                  | LSATBLTEST command driver        |
|                                  | program (LSATBLR), affecting the |
|                                  | choice of the EBCDIC character   |
|                                  | set when the utility is put into |
|                                  | CCSID mode.                      |
|                                  |                                  |
|                                  |                                  |
|                                  |                                  |
|                                  | After this PTF is applied, some  |
|                                  | non-US environments will need to |
|                                  | use the LSATBLTEST command to    |
|                                  | assure that the chosen Separator |
|                                  | Character will cause the LSAM to |
|                                  | send an ASCII character of X'7C' |
|                                  | to OpCon, as required by the     |
|                                  | OpCon Job Tracking process. The  |
|                                  | LSAM Job Track Configuration     |
|                                  | screen has been enhanced with a  |
|                                  | reminder about this requirement. |
+----------------------------------+----------------------------------+
| ![Black text on green            | (\#403364) The IBM i LSAM File   | | background](../../../Resource    | Arrival jobs were failing to     |
| s/Images/rn-fixed.png "Fixed ico | accept the special \$\@VARIABLES |
| n for release notes"){.relnotes} | from the OpCon job master record |
|                                  | in non-US environments. This was |
|                                  | caused by different translation  |
|                                  | tables or different CCSID        |
|                                  | character sets that could not    |
|                                  | process the default prefix       |
|                                  | characters of "\$@". Now the     |
|                                  | LSAM Utility Configuration       |
|                                  | function, option 7 in LSAM       |
|                                  | sub-menu 3, supports             |
|                                  | user-defined File Arrival        |
|                                  | Variable prefix characters. It   |
|                                  | is the user's responsibility to  |
|                                  | assure that the chosen EBCDIC    |
|                                  | characters will be produced for  |
|                                  | the LSAM after the OpCon ASCII   |
|                                  | characters sent with the Job     |
|                                  | Start request are translated     |
|                                  | from their ASCII character       |
|                                  | format. **\[SEE POST-INSTALL     | |                                  | INSTRUCTIONS.\]**                |
+----------------------------------+----------------------------------+
:::

 


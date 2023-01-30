---
sidebar_label: 'Operator Replay Menu'
---

# Operator Replay Menu

Operator Replay Menu
```
SYSTEMNAME                   OPERATOR REPLAY MENU                      00/00/00
USERNAME                                                               03:49:19 

    Select one of the following:

        1. User management         
        2. Operator Replay scripts
        3. Operator Replay logs         
        4. Operator Token/Variable management
        5. Work with Screen Capture definitions         
        6. Work with Captured Data Response Rules
        7. Operator Replay configuration          
        8. Display Captured Data log
        9. Display data capture debug log
       10. Maintain Dynamic Variables                      
       11. Client eMail Management menu                    
       12. Work with User Environment Matrix (if available)

   Selection or command
   ===> ________________________________________________________________________
  ______________________________________________________________________________
   F3=Exit   F4=Prompt   F9=Retrieve   F12=Cancel
   F13=Information Assistant   F16=System main menu

```

#### Menu Pathways

Main Menu > Operator replay menu (#4)

#### Field

Selection or command

#### Options

- 1=Operator Replay user
- 2=Operator Replay scripts
- 3=Operator Replay logs
- 4=Operator Token/Variable management
- 5=Work with Screen Capture definitions
- 6=Work with Captured Data Response Rules
- 7=Operator Replay configuration
- 8=Display Captured Data log
- 9=Display data capture debug log
- 10=Maintain Dynamic Variables - see [Introduction to Dynamic Variables](/dynamic-variables/overview#introduction-to-dynamic-variables)                     
- 11=Client eMail Management menu - see [Client eMail Management](/events-utilities/client-email#client-email-feature-replacement)                   
- 12=Work with User Environment Matrix (if available) - see NOTE below

The options displayed on this menu are explained in the following sections of this chapter, except as noted in the list above. Type an option number in the Selection or command line and press <**Enter**> to begin using any of the options. 

:::note
Menu option 12 is not normally active and available to all clients. This menu option marks access to a customizable utility that can be used to manage the IBM i database environment accessed by Operator Replay scripts when there are multiple different databases from which a choice must be made.  Please contact SMA Support, or your SMA Solutions Consultant for assistance from SMA if you believe you need this type of access control.  Documentation can be provided with instructions for adapting the available utility programs, including how to define the Operator Replay Script Steps that would be synchronized with the database environment selection process and, optionally, with different user profiles for each database.
:::

#### Functions

- **F3=Exit**: Returns to the master menu.
- **F4=Prompt**: Prompts for keywords for any command entered in the Select or command line.
- **F9=Retrieve**: Retrieves the previous command that was entered on the Select or the command line. If it is pressed multiple times, the system goes further and further back to previous commands.
- **F12=Cancel**: Returns to the master menu.
- **F13=Information Assistant**: Displays the IBM i general help screen.
- **F16=System main menu**: This is always shown on any system-generated menu screen. It branches to the general command entry menu for IBM i. Return to the previous menu by pressing
    <**F3**> or <**F12**>. This function is not commonly used and can be restricted for certain user profiles.

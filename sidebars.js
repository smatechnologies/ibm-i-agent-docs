module.exports = {
  mySidebar: [
    'index',
    {
      type: 'category', 
      label: 'IBM i LSAM Release Notes',
      collapsed: true,
      items: [
        'ibm-i-lsam-release-notes/overview',
        'ibm-i-lsam-release-notes/version-18.1-new-features',
        'ibm-i-lsam-release-notes/version-04.00.03-new-features',
        'ibm-i-lsam-release-notes/version-04.00.03-fixes',
      ], 
    },
    {
      type: 'category', 
      label: 'IBM i LSAM Overview',
      collapsed: true,
      items: [
        'ibm-i-lsam-overview/ibm-i-lsam-overview',
      ], 
    },    
    {
      type: 'category', 
      label: 'Install',
      collapsed: true,
      items: [
        'installation/installation',
        'installation/uninstall',
      ], 
    },
    {
      type: 'category', 
      label: 'IBM i LSAM Configuration',
      collapsed: true,
      items: [
        'configuration/configuration',
      ], 
    },
    {
      type: 'category', 
      label: 'IBM i Components and Operation',
      collapsed: true,
      items: [
        'operations/components',
        'operations/lsam',
        'operations/automation',
        'operations/tips',
      ], 
    },
    {
      type: 'category', 
      label: 'Log File and Database Management',
      collapsed: true,
      items: [
        'logs-database/overview',
        'logs-database/whats-new',
        'logs-database/procedures',
        'logs-database/locations',
        'logs-database/management',
        'logs-database/extracting',
        'logs-database/database-maintenance',
      ], 
    },
    {
      type: 'category', 
      label: 'Dynamic Variables',
      collapsed: true,
      items: [
        'dynamic-variables/overview',
        'dynamic-variables/rules',
        'dynamic-variables/using',
        'dynamic-variables/numeric-vs-character',
        'dynamic-variables/applying',
        'dynamic-variables/user-defined-programs',
        'dynamic-variables/function-codes',
        'dynamic-variables/old-method',
        'dynamic-variables/nesting',
        'dynamic-variables/manipulation-commands',
        'dynamic-variables/maintaining',
      ], 
    },
    {
      type: 'category', 
      label: 'Operator Replay Scripts',
      collapsed: true,
      items: [
        'operator-replay/overview',
        'operator-replay/menu',
        'operator-replay/operations',
        'operator-replay/user-management',
        'operator-replay/screens',
        'operator-replay/additional-info',
        'operator-replay/virtual-devices',
      ], 
    },
    {
      type: 'category', 
      label: 'Job Tracking and Queuing',
      collapsed: true,
      items: [
        'job-tracking/overview',
        'job-tracking/tracking-types',
        'job-tracking/using',
        'job-tracking/details',
        'job-tracking/screens',
      ], 
    },
    {
      type: 'category', 
      label: 'Message Management',
      collapsed: true,
      items: [
        'message-management/overview',
        'message-management/menu',
        'message-management/operations',        
        'message-management/details',
        'message-management/screens',
        'message-management/logs',
      ], 
    },
    {
      type: 'category', 
      label: 'Events and Utilities',
      collapsed: true,
      items: [
        'events-utilities/menu',
        'events-utilities/events-operations',
        'events-utilities/utilities-operations',
        'events-utilities/lsam-utilities',
        'events-utilities/events-screens',
        'events-utilities/utilities-screens',
        'events-utilities/email',
      ], 
    },
    {
      type: 'category', 
      label: 'Restricted Mode and Multi-Step Jobs',
      collapsed: true,
      items: [
        'restricted-mode/menu',
        'restricted-mode/operations',
        'restricted-mode/screens',
        'restricted-mode/multi-step-scripting',
        'restricted-mode/multi-step-screens',
      ], 
    },
    {
      type: 'category', 
      label: 'Commands and Utilities',
      collapsed: true,
      items: [
        'commands-utilities/commands',
        {
          type: 'category', 
          label: 'Utilities',
          collapsed: false,
          items: [
            'commands-utilities/events',
            'commands-utilities/lsam-operations',
            'commands-utilities/sbmdbfcmd',
            'commands-utilities/dynamic-variables',
            'commands-utilities/translation-tables',
            'commands-utilities/smargz',
            'commands-utilities/cmdexe',
            'commands-utilities/communicate-opcon',
            'commands-utilities/file-arrival',
          ], 
        },
      ], 
    },
    {
      type: 'category', 
      label: 'LSAM Environment Management',
      collapsed: true,
      items: [
        'environment/index',
        'environment/operations',
        'environment/smagpl',
        'environment/commands',
      ], 
    },
    {
      type: 'category', 
      label: 'SMA File Transfer',
      collapsed: true,
      items: [
        'file-transfer/overview',
        'file-transfer/operations',
        'file-transfer/menu',
        'file-transfer/screens',
      ], 
    },
    {
      type: 'category', 
      label: 'LSAM Security and Object Authority',
      collapsed: true,
      items: [
        'security/strategy',
        'security/work-management-authority',
        'security/user-profiles',
        'security/object-authority-matrix',
        'security/vulnerable-features',
        'security/screens',
      ], 
    },
    {
      type: 'category', 
      label: 'LSAM Software Maintenance (PTFs)',
      collapsed: true,
      items: [
        'maintenance/ptf',
        'maintenance/process',
        'maintenance/screens',
      ], 
    },
    {
      type: 'category', 
      label: 'IBM i LSAM Reference Information',
      collapsed: true,
      items: [
        'reference/machine-messages',
        'reference/function-keys',
        'reference/multiple-environments',
        'reference/multiple-environments-how-to-add-an-lsam-environment',
        'reference/multiple-environments-lsam-environment-screens-and-windows',
        'reference/lsam-programs-and-files',
        'reference/copying-files',
        'reference/performance',
        'reference/jors',
      ], 
    },
  ],
};

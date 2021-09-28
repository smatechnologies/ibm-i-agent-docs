module.exports = {
  mySidebar: [
    'index',
    {
      type: 'category', 
      label: 'Install',
      collapsed: false,
      items: [
        'installation/installation',
        'installation/uninstall',
      ], 
    },
    {
      type: 'category', 
      label: 'Configuration',
      collapsed: false,
      items: [
        'configuration/configuration',
      ], 
    },
    {
      type: 'category', 
      label: 'Operations',
      collapsed: false,
      items: [
        'operations/components',
        'operations/lsam',
        'operations/automation',
        'operations/tips',
      ], 
    },
    {
      type: 'category', 
      label: 'Commands and Utilities',
      collapsed: false,
      items: [
        'commands-utilities/commands',
        {
          type: 'category', 
          label: 'Utilities',
          collapsed: true,
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
      label: 'Environment Management',
      collapsed: false,
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
      collapsed: false,
      items: [
        'file-transfer/overview',
        'file-transfer/operations',
        'file-transfer/menu',
        'file-transfer/screens',
      ], 
    },
    {
      type: 'category', 
      label: 'Security and Object Authority',
      collapsed: false,
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
      label: 'Software Maintenance (PTFs)',
      collapsed: false,
      items: [
        'maintenance/ptf',
        'maintenance/process',
        'maintenance/screens',
      ], 
    },
    {
      type: 'category', 
      label: 'Reference',
      collapsed: true,
      items: [
        'reference/machine-messages',
        'reference/function-keys',
        'reference/multiple-environments',
        'reference/programs-files',
        'reference/copying-files',
        'reference/performance',
        'reference/jors',
      ], 
    },
  ],
};

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

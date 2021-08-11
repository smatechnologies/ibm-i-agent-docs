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
  ],
};

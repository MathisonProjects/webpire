enum SocketFuncs {
    GETDBSTORE                        = 'get dbstore',

    FACTORYRESETDYNAMICTABLECONTENT   = 'reset dynamicTableContent',
    FACTORYRESETDYNAMICTABLES         = 'reset dynamicTables',
    FACTORYRESETMENU                  = 'reset menu',
    FACTORYRESETPAGES                 = 'reset pages',
    FACTORYRESETPERMISSIONS           = 'reset permissions',
    FACTORYRESETROLES                 = 'reset roles',
    FACTORYRESETSETTINGS              = 'reset settings',
    FACTORYRESETTAGS                  = 'reset tags',

    SAVEDYNAMICTABLECONTENT           = 'save dynamicTableContent',
    SAVEDYNAMICTABLES                 = 'save dynamicTables',
    SAVEMENU                          = 'save menu',
    SAVEPAGES                         = 'save pages',
    SAVEPERMISSIONS                   = 'save permissions',
    SAVEROLES                         = 'save roles',
    SAVESETTINGS                      = 'save settings',
    SAVETAGS                          = 'save tags',

    DELETEDYNAMICTABLECONTENT         = 'delete dynamicTableContent',
    DELETEDYNAMICTABLES               = 'delete dynamicTables',
    DELETEMENU                        = 'delete menu',
    DELETEPAGES                       = 'delete pages',
    DELETEPERMISSIONS                 = 'delete permissions',
    DELETEROLES                       = 'delete roles',
    DELETESETTINGS                    = 'delete settings',
    DELETETAGS                        = 'delete tags',


    ACCOUNTREGISTER                   = 'account register',
    ACCOUNTLOGIN                      = 'account login',
    ACCOUNTFORGET                     = 'account forget',
}

enum SocketResponses {
    RETURNGETDBSTORE       = 'return get dbstore',
    CONNECTIONCONFIRMATION = 'connection confirmation',

    SAVEDYNAMICTABLECONTENT           = 'return save dynamicTableContent',
    SAVEDYNAMICTABLES                 = 'return save dynamicTables',
    SAVEMENU                          = 'return save menu',
    SAVEPAGES                         = 'return save pages',
    SAVEPERMISSIONS                   = 'return save permissions',
    SAVEROLES                         = 'return save roles',
    SAVESETTINGS                      = 'return save settings',
    SAVETAGS                          = 'return save tags',

    DELETEDYNAMICTABLECONTENT         = 'return delete dynamicTableContent',
    DELETEDYNAMICTABLES               = 'return delete dynamicTables',
    DELETEMENU                        = 'return delete menu',
    DELETEPAGES                       = 'return delete pages',
    DELETEPERMISSIONS                 = 'return delete permissions',
    DELETEROLES                       = 'return delete roles',
    DELETESETTINGS                    = 'return delete settings',
    DELETETAGS                        = 'return delete tags',

    ACCOUNTREGISTER       = 'return account register',
    ACCOUNTLOGIN          = 'return account login',
    ACCOUNTFORGET         = 'return account forget',
}

export {
    SocketFuncs,
    SocketResponses
}
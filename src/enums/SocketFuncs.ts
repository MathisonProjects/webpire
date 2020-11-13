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

    ACCOUNTREGISTER                   = 'account register',
    ACCOUNTLOGIN                      = 'account login',
    ACCOUNTFORGET                     = 'account forget',
}

enum SocketResponses {
    RETURNGETDBSTORE       = 'return get dbstore',
    CONNECTIONCONFIRMATION = 'connection confirmation',

    ACCOUNTREGISTER       = 'return account register',
    ACCOUNTLOGIN          = 'return account login',
    ACCOUNTFORGET         = 'return account forget',
}

export {
    SocketFuncs,
    SocketResponses
}
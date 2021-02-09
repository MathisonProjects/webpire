enum SocketFuncs {
    GETDBSTORE                        = 'get dbstore',

    FACTORYRESETDYNAMICTABLECONTENT   = 'reset dynamicTableContent',
    FACTORYRESETDYNAMICTABLES         = 'reset dynamicTables',
    FACTORYRESETMENU                  = 'reset menu',
    FACTORYRESETPERMISSIONS           = 'reset permissions',
    FACTORYRESETSETTINGS              = 'reset settings',
    FACTORYCREATETABLES               = 'create tables',

    SAVEDYNAMICTABLECONTENT           = 'save dynamicTableContent',
    SAVEDYNAMICTABLES                 = 'save dynamicTables',
    SAVEMENU                          = 'save menu',
    SAVEPAGES                         = 'save permissions',
    SAVESETTINGS                      = 'save settings',

    DELETEDYNAMICTABLECONTENT         = 'delete dynamicTableContent',
    DELETEDYNAMICTABLES               = 'delete dynamicTables',
    DELETEMENU                        = 'delete menu',
    DELETEPERMISSIONS                 = 'delete permissions',
    DELETESETTINGS                    = 'delete settings',

    ACCOUNTGETALLUSERS                = 'get all users',
    ACCOUNTREGISTER                   = 'account register',
    ACCOUNTLOGIN                      = 'account login',
    ACCOUNTFORGET                     = 'account forget',

    CHATGETCONVERSATIONS              = 'get conversations',
    CHATSETCONVERSATION               = 'set conversation',
    CHATGETMESSAGES                   = 'get messages',
    CHATSETMESSAGE                    = 'set message',

    UPLOADFILE                        = 'upload file'
}

enum SocketResponses {
    RETURNGETDBSTORE       = 'return get dbstore',
    CONNECTIONCONFIRMATION = 'connection confirmation',

    SAVEDYNAMICTABLECONTENT           = 'return save dynamicTableContent',
    SAVEDYNAMICTABLES                 = 'return save dynamicTables',
    SAVEMENU                          = 'return save menu',
    SAVEPERMISSIONS                   = 'return save permissions',
    SAVESETTINGS                      = 'return save settings',

    DELETEDYNAMICTABLECONTENT         = 'return delete dynamicTableContent',
    DELETEDYNAMICTABLES               = 'return delete dynamicTables',
    DELETEMENU                        = 'return delete menu',
    DELETEPERMISSIONS                 = 'return delete permissions',
    DELETESETTINGS                    = 'return delete settings',

    ACCOUNTGETALLUSERS                = 'return get all users',
    ACCOUNTREGISTER                   = 'return account register',
    ACCOUNTLOGIN                      = 'return account login',
    ACCOUNTFORGET                     = 'return account forget',

    CHATGETCONVERSATIONS              = 'return get conversations',
    CHATSETCONVERSATION               = 'return set conversation',
    CHATGETMESSAGES                   = 'return get messages',
    CHATSETMESSAGES                   = 'return set message',
}

export {
    SocketFuncs,
    SocketResponses
}
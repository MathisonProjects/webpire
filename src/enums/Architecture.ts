enum DynamoDbTables {
}

enum LanguageCodes {
    ENUS = 'EnUs',
    ESMX = "EsMx",
    RURU = "RuRu",
    FRFR = "FrFr",
    ZHCN = "ZhCn",
    VIVI = "ViVi",
    KOKO = "KoKo",
    JAJA = "JaJa",
    ARSA = "ArSa",
    DEDE = "DeDe"
}

enum ColorSets {
    PRIMARY = 'primary',
    DEFAULT = 'default',
    SUCCESS = 'success'
}

enum AdminMode {
    VIEW = "view",
    CREATE = "create",
    UPDATE = "update",
    COPY = "copy",
    DELETE = "delete",
    READ = "read"
}

enum AccessMode {
    REGISTER = 'register',
    LOGIN = 'login',
    FORGET = 'forget'
}

enum DisplayType {
    GRID = 'grid',
    LIST = 'list'
}

export {
    DynamoDbTables,
    LanguageCodes,
    ColorSets,
    AdminMode,
    AccessMode,
    DisplayType
}
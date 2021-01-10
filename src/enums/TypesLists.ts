enum FieldTypes {
    ADDRESS      = "address",
    BOOLEAN      = "boolean",
    CALCULATED   = "calculated",
    COLOR        = "color",
    EMAIL        = "email",
    FILE         = "file",
    HIDDENTEXT   = "hiddentext",
    TEXT         = "text",
    PHONE        = "phone",
    MULTILINE    = "multiline",
    STATE        = "state",
    COUNTRY      = "country",
    STATECOUNTRY = "stateCountry",
    SELECT       = "select",
    NUMBER       = "number",
    CURRENCY     = "currency",
    DATETIME     = "datetime",
    IMAGE        = "image",
    RECORDS      = "records",
    WYSIWYG      = "wysiwyg",
}

enum ComparisonList {
    EQUALS            = 'equals',
    NOTEQUALS         = 'not equals',
    CONTAINS          = 'contains',
    STARTSWITH        = 'starts with',
    ENDSWITH          = 'ends with',
    GREATERTHAN       = 'greater than',
    GREATERTHANEQUALS = 'greater than or equal to',
    LESSTHAN          = 'less than',
    LESSTHANEQUALS    = 'less than or equal to',
    WITHIN            = 'within',
    OUTSIDE           = 'outside'
}

export {
    FieldTypes,
    ComparisonList
}
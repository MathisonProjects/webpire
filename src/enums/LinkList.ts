enum LinkList {
	HOME = "/",
	REGISTER = "/register",
	LOGIN = "/login",
	APPHOME = "/app",
	SETTINGS = "/app/settings",
	LOGOUT = "/",
	ADMIN_HOME = "/admin",
	ADMIN_APPS = "/admin/apps",
	ADMIN_RECORDS = "/admin/records",
	ADMIN_PANELS = "/admin/panels"
}

enum LinkActions {
	CHANGELIGHTMODE = "changeLightMode",
	DROPDOWN = 'dropdown',
	CHANGELANGUAGE = "changeLanguage",
	REGISTER = "register",
	LOGIN = "login",
	LOGOUT = "logout",
	REFRESH = "refresh",
	NEXTSTEP = "nextStep",
	PREVSTEP = "prevStep",
	CHANGELOGINMODE = "changeLoginMode",
	CREATE = "create",
	SETRECORD = "setRecord",
	UPDATE = "update",
	BACK = "back",
	EDIT = "edit",
	DELETE = "delete",
	VIEW = "view"
}

enum AdminSectionPurpose {
	LIST = 'list',
	CREATE = 'create',
	VIEW = 'view',
	UPDATE = 'update',
	SAVE = 'save',
	DELETE = 'delete'
}

export {
  LinkList,
	LinkActions,
	AdminSectionPurpose
}

enum MenuType {
    MAIN = 'main',
    MEMBER = 'member',
    ADMIN = 'admin'
}
interface IMenuItem {
    type: MenuType
    oid: number
    key: string
    icon: string
    text: string
    page: string
    internal: boolean
}

interface IMenuList {
    mainMenu: IMenuItem[]
    memberMenu: IMenuItem[]
    adminMenu: IMenuItem[]
}

export default {
    state: {
        mainMenu: [],
        memberMenu: [],
        adminMenu: []
    },
    mutations: {
        SET_MAINMENU(state: IMenuList, payload: IMenuItem[]) {
            state.mainMenu = payload
        },
        SET_ADMINMENU(state: IMenuList, payload: IMenuItem[]) {
            state.adminMenu = payload
        },
        SET_MEMBERMENU(state: IMenuList, payload: IMenuItem[]) {
            state.memberMenu = payload
        }
    },
    actions: {
        setInit({ commit }: { commit: any }, payload: IMenuItem[] ) {
            commit('SET_MAINMENU', payload.filter( (item:IMenuItem) => { return item.type === MenuType.MAIN}))
            commit('SET_ADMINMENU', payload.filter( (item:IMenuItem) => { return item.type === MenuType.ADMIN}))
            commit('SET_MEMBERMENU', payload.filter( (item:IMenuItem) => { return item.type === MenuType.MEMBER}))
        }
    },
    getters: {}
}

enum MenuType {
    MAIN = 'main',
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
    adminMenu: IMenuItem[]
}

export default {
    state: {
        mainMenu: [],
        adminMenu: []
    },
    mutations: {
        SET_MAINMENU(state: IMenuList, payload: IMenuItem[]) {
            state.mainMenu = payload
        },
        SET_ADMINMENU(state: IMenuList, payload: IMenuItem[]) {
            state.adminMenu = payload
        }
    },
    actions: {
        setInit({ commit }: { commit: any }, payload: IMenuItem[] ) {
            commit('SET_MAINMENU', payload.filter( (item:IMenuItem) => { return item.type === MenuType.MAIN}))
            commit('SET_ADMINMENU', payload.filter( (item:IMenuItem) => { return item.type === MenuType.ADMIN}))
        }
    },
    getters: {}
}
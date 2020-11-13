
interface IPageFieldData {
    id: string
    key: string
    type: string
    content: string
}
interface IPage {
    id: string
    name: string
    key: string
    type: string
    preset: string
    fieldData: IPageFieldData[]
}

interface IPageList {
    pageList: IPage[]
}

export default {
    state: {
        pageList: []
    },
    mutations: {
        SET_PAGELIST(state: IPageList, payload: IPage[]) {
            state.pageList = payload
        }
    },
    actions: {
        setPageList({ commit }: { commit: any }, payload: IPage[]) {
            commit('SET_PAGELIST', payload)
        }
    },
    getters: {}
}
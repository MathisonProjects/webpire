
interface IContentItem {
    id: string
    created_at: Date
    updated_at: Date
    content: any[]
}

interface IContentList {
    contentList: IContentItem[]
}

export default {
    state: {
        contentList: []
    },
    mutations: {
        SET_CONTENTLIST(state: IContentList, payload: IContentItem[]) {
            state.contentList = payload
        }
    },
    actions: {
        setContentList({ commit }: { commit: any }, payload: IContentItem[] ) {
            commit('SET_CONTENTLIST', payload)
        }
    },
    getters: {}
}
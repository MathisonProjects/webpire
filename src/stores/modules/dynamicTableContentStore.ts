
interface IContentItem {
    id: string
    tid: string
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
    getters: {
        organizedByTable(state: IContentList) {
            var options = {}
            for(let i in state.contentList) {
                const item = state.contentList[i]
                if (options[item.tid] === undefined) options[item.tid] = {}
                options[item.tid][item.id] = item
            }
            return options
        }
    }
}
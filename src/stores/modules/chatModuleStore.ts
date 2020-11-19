
interface IConversation {
    id: string
    action: Date
}
interface IChatMessage {}

interface IChatModule {
    conversationList: IConversation[]
    chatMessageList: IChatMessage[]
}

export default {
    state: {
        conversationList: [],
        chatMessageList: [],
    },
    mutations: {
        SET_CONVERSATIONLIST(state: IChatModule, payload: IConversation[]) {
            state.conversationList = payload
        },
        SET_CHATMESSAGELIST(state: IChatModule, payload: IChatMessage[]) {
            state.chatMessageList = payload
        }
    },
    actions: {
        setConversationList({ commit }: { commit: any }, payload: IConversation[]) {
            commit('SET_CONVERSATIONLIST', payload)
        },
        setChatMessageList({ commit }: { commit: any }, payload: IChatMessage[]) {
            commit('SET_CHATMESSAGELIST', payload)
        },
    },
    getters: {
        sortedConversationList(state:IChatModule) {
            return state.conversationList.sort( (a,b) => {
                if (a.action < b.action) return 1;
                if (a.action > b.action) return -1;
                return 0;
            })
        }
    }
}
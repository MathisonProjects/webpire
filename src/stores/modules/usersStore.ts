
interface IUser {
    id: '',
    created_at: '',
    email: '',
    email_verified: '',
    enabled: '',
    status: '',
    sub: '',
    updated_at: '',
    username: ''
}

interface IUserList {
    userList: IUser[]
}

export default {
    state: {
        userList: []
    },
    mutations: {
        SET_USERLIST(state: IUserList, payload: IUser[]) {
            state.userList = payload
        }
    },
    actions: {
        setUserList({ commit }: { commit: any }, payload: IUser[]) {
            commit('SET_USERLIST', payload)
        }
    },
    getters: {
        usersList(state: IUserList) {
            return state.userList.map( item => {
                item.id = item.sub
                return item
            })
        }
    }
}
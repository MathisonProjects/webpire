
interface IUser {
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
    getters: {}
}
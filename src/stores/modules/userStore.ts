interface IUserStore {
    jwt: string
    username: string
    uid: string
    email: string
    sub: string
}

export default {
    state: {
        jwt: null,
        uid: null,
        username: null,
        email_verified: null,
        email: null
    },
    mutations: {
        SET_USERNAME(state: IUserStore, payload: string) {
            state.username = payload
        },
        SET_JWT(state: IUserStore, payload: string) {
            state.jwt = payload
        },
        SET_UID(state: IUserStore, payload: string) {
            state.uid = payload
        },
        SET_EMAIL(state: IUserStore, payload: string) {
            state.email = payload
        }
    },
    actions: {
        setLogin({commit} : { commit: any }, payload: IUserStore) {
            commit('SET_JWT', payload.jwt)
            commit('SET_USERNAME', payload.username)
            commit('SET_UID', payload.sub)
            commit('SET_EMAIL', payload.email)
        },
        logout({commit} : {commit: any}) {
            commit('SET_JWT', null)
            commit('SET_USERNAME', null)
            commit('SET_UID', null)
            commit('SET_EMAIL', null)
        }
    },
    getters: {
        userData(state: IUserStore) {
            return state
        }
    }
}
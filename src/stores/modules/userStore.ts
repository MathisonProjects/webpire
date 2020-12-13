import jwt from 'jsonwebtoken'

interface IUserStore {
    jwt: string
    username: string
    uid: string
    email: string
    sub: string
    email_verified: boolean
    settings: any
}

export default {
    state: {
        jwt: null,
        uid: null,
        sub: null, // uid & sub the same
        username: null,
        email_verified: null,
        email: null,
        settings: {}
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
            state.sub = payload
        },
        SET_EMAILVERIFIED(state: IUserStore, payload: boolean) {
            state.email_verified = payload
        },
        SET_EMAIL(state: IUserStore, payload: string) {
            state.email = payload
        },
        SET_SETTINGS(state: IUserStore, payload: any) {
            state.settings = payload
        }
    },
    actions: {
        setLogin({commit} : { commit: any }, payload: IUserStore) {
            const jwtParsed: any = jwt.decode(payload.jwt, {complete: true})
            commit('SET_USERNAME', jwtParsed.payload['cognito:username'])
            commit('SET_EMAILVERIFIED', jwtParsed.payload.email_verified)
            commit('SET_JWT', payload.jwt)
            commit('SET_UID', payload.sub)
            commit('SET_EMAIL', payload.email)
        },
        setSettings({commit} : {commit: any}, payload: any) {
            commit('SET_SETTINGS', payload)
        },
        logout({commit} : {commit: any}) {
            commit('SET_JWT', null)
            commit('SET_USERNAME', null)
            commit('SET_UID', null)
            commit('SET_EMAIL', null)
            commit('SET_SETTINGS', null)
        }
    },
    getters: {
        userData(state: IUserStore) {
            return state
        },
        userRole(state: IUserStore) {
            return state.settings.content.role
        }
    }
}
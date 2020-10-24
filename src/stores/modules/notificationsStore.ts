import { INotification } from '@/models'

export default {
    state: {
        notification: {
            type: 'success',
            display: false,
            text: ''
        }
    },
    mutations: {
        SET_NOTIFICATION(state: INotification, payload: INotification) {
            state.notification = payload.notification
        }
    },
    actions: {
        setNotification({ commit } : { commit: any }, payload: INotification) {
            commit('SET_NOTIFICATION', payload)
        }
    },
    getters: {}
}
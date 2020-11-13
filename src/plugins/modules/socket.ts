import io, { Socket } from 'socket.io-client'
import store from '@/stores'
import notifications from './notifications'
import { SocketFuncs, SocketResponses } from '@/enums'
const socket = io('http://localhost:8082')

export default {
    init() {
        socket.on(SocketResponses.CONNECTIONCONFIRMATION, (response: any) => {
            console.log(response.response)
        })

        socket.on(SocketResponses.RETURNGETDBSTORE, (response: any) => {
            store.dispatch('menuStore/setInit', response.menu.Items)
            store.dispatch('settingsStore/setInit', response.settings.Items)
        })

        socket.on(SocketResponses.ACCOUNTREGISTER, (response: any) => {
            console.log(response)
        })
        socket.on(SocketResponses.ACCOUNTLOGIN, (response: any) => {
            store.dispatch('userStore/setLogin', response)
            notifications.loginSuccessNotification()
        })

        socket.emit('get dbstore', {})
    },
    resetToFactorySettings(resetFunc: SocketFuncs) {
        socket.emit(resetFunc, {})
    },
    socketEmitFire(endpoint: SocketFuncs, payload: any) {
        socket.emit(endpoint, payload)
    }
}
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
            store.dispatch('pagesStore/setPageList', response.pages.Items)
            store.dispatch('jsonStore/reset')
        })

        socket.on(SocketResponses.ACCOUNTREGISTER, (response: any) => {
            console.log(response)
        })
        socket.on(SocketResponses.ACCOUNTLOGIN, (response: any) => {
            if (response.payload === null) {
                notifications.loginFailedNotification(response.err.message)
            } else {
                store.dispatch('userStore/setLogin', response)
                notifications.loginSuccessNotification()
            }
        })

        socket.on(SocketResponses.SAVEDYNAMICTABLECONTENT, (response: any) => {
            console.log(response)
        })
        socket.on(SocketResponses.SAVEDYNAMICTABLES, (response: any) => {
            console.log(response)
        })
        socket.on(SocketResponses.SAVEMENU, (response: any) => {
            store.dispatch('menuStore/setInit', response.menu.Items)
            notifications.menuSavedNotification()
        })
        socket.on(SocketResponses.SAVEPAGES, (response: any) => {
            store.dispatch('pagesStore/setPageList', response.pages.Items)
            notifications.pagesSavedNotification()
        })
        socket.on(SocketResponses.SAVEPERMISSIONS, (response: any) => {
            console.log(response)
        })
        socket.on(SocketResponses.SAVEROLES, (response: any) => {
            console.log(response)
        })
        socket.on(SocketResponses.SAVESETTINGS, (response: any) => {
            console.log(response)
        })
        socket.on(SocketResponses.SAVETAGS, (response: any) => {
            console.log(response)
        })
        socket.on(SocketResponses.DELETEDYNAMICTABLECONTENT, (response: any) => {
            console.log(response)
        })
        socket.on(SocketResponses.DELETEDYNAMICTABLES, (response: any) => {
            console.log(response)
        })
        socket.on(SocketResponses.DELETEMENU, (response: any) => {
            store.dispatch('menuStore/setInit', response.menu.Items)
            notifications.menuDeletedNotification()
        })
        socket.on(SocketResponses.DELETEPAGES, (response: any) => {
            store.dispatch('pagesStore/setPageList', response.pages.Items)
            notifications.pagesDeletedNotification()
        })
        socket.on(SocketResponses.DELETEPERMISSIONS, (response: any) => {
            console.log(response)
        })
        socket.on(SocketResponses.DELETEROLES, (response: any) => {
            console.log(response)
        })
        socket.on(SocketResponses.DELETESETTINGS, (response: any) => {
            console.log(response)
        })
        socket.on(SocketResponses.DELETETAGS, (response: any) => {
            console.log(response)
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
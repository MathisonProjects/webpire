import io, { Socket } from 'socket.io-client'
import store from '@/stores'
import notifications from './notifications'
import { SocketFuncs, SocketResponses } from '@/enums'
import { AnyNsRecord } from 'dns'
import standardFuncs from './standardFuncs'

// const nodeUrl: any = 'd3fik8r36xogiu.cloudfront.net'
const nodeUrl: any = process.env.NODE_URL + ':' + process.env.NODE_PORT
const socket = io(nodeUrl , {'reconnection': true, 'reconnectionDelay': 1000, reconnectionDelayMax: 5000, 'reconnectionAttempts': 3})

export default {
    init() {
        socket.on(SocketResponses.CONNECTIONCONFIRMATION, (response: any) => {
            console.log(response.response)
        })

        socket.on(SocketResponses.RETURNGETDBSTORE, (response: any) => {
            console.log(response)
            store.dispatch('menuStore/setInit', response.menu.Items)
            store.dispatch('settingsStore/setInit', response.settings.Items)
            store.dispatch('jsonStore/reset')
            store.dispatch('dynamicTableStore/setTables', response.dynamic_tables.Items)
            store.dispatch('dynamicTableContentStore/setContentList', response.dynamic_table_content.Items)
            if (store.state.userStore.sub !== null) standardFuncs.getUserSettings()
        })

        socket.on(SocketResponses.ACCOUNTREGISTER, (response: any) => {
            if (response.payload === null) {
                notifications.registerFailedNotification()
            } else {
                store.dispatch('userStore/setLogin', response)
                notifications.registerSuccessNotification()
                standardFuncs.getUserSettings()
            }
        })
        socket.on(SocketResponses.ACCOUNTLOGIN, (response: any) => {
            if (response.payload === null) {
                notifications.loginFailedNotification(response.err.message)
            } else {
                store.dispatch('userStore/setLogin', response)
                notifications.loginSuccessNotification()
                standardFuncs.getUserSettings()
            }
        })

        socket.on(SocketResponses.SAVEDYNAMICTABLECONTENT, (response: any) => {
            store.dispatch('dynamicTableContentStore/setContentList', response.dynamic_table_content.Items)
            notifications.dynamicTableContentSavedNotification()
            if (store.state.userStore.sub !== null) standardFuncs.getUserSettings()
        })
        socket.on(SocketResponses.SAVEDYNAMICTABLES, (response: any) => {
            store.dispatch('dynamicTableStore/setTables', response.dynamic_tables.Items) // Dinner Time!
            notifications.dynamicTableSavedNotification()
        })
        socket.on(SocketResponses.SAVEMENU, (response: any) => {
            store.dispatch('menuStore/setInit', response.menu.Items)
            notifications.menuSavedNotification()
        })
        socket.on(SocketResponses.SAVEPERMISSIONS, (response: any) => {
            console.log(response)
        })
        socket.on(SocketResponses.SAVESETTINGS, (response: any) => {
            store.dispatch('settingsStore/setInit', response.settings.Items)
            notifications.settingsSavedNotification()
        })
        socket.on(SocketResponses.DELETEDYNAMICTABLECONTENT, (response: any) => {
            console.log(response)
        })
        socket.on(SocketResponses.DELETEDYNAMICTABLES, (response: any) => {
            notifications.dynamicTableDeletedNotification()
        })
        socket.on(SocketResponses.DELETEMENU, (response: any) => {
            store.dispatch('menuStore/setInit', response.menu.Items)
            notifications.menuDeletedNotification()
        })
        socket.on(SocketResponses.DELETEPERMISSIONS, (response: any) => {
            console.log(response)
        })
        socket.on(SocketResponses.DELETESETTINGS, (response: any) => {
            console.log(response)
        })

        socket.on(SocketResponses.CHATGETCONVERSATIONS, (response: any) => {
            store.dispatch('chatModuleStore/setConversationList', response)
        })
        socket.on(SocketResponses.CHATSETCONVERSATION, (response: any) => {
            console.log(response)
        })
        socket.on(SocketResponses.CHATGETMESSAGES, (response: any) => {
            store.dispatch('chatModuleStore/setChatMessageList', response)
        })
        socket.on(SocketResponses.CHATSETMESSAGES, (response: any) => {
            console.log(response)
        })
        socket.on(SocketResponses.ACCOUNTGETALLUSERS, (response: any) => {
            let userMap = response.Users.map( (item:any) => {
                const user: any = {
                    username: item.Username,
                    enabled: item.Enabled,
                    created_at: item.UserCreateDate,
                    updated_at: item.UserLastModifiedDate,
                    status: item.UserStatus
                }
                for (let i in item.Attributes) {
                    user[item.Attributes[i].Name] = item.Attributes[i].Value
                }
                return user
            })
            store.dispatch('usersStore/setUserList', userMap)
        })

        socket.emit('get dbstore', {})
        socket.emit(SocketFuncs.ACCOUNTGETALLUSERS, {})
    },
    resetToFactorySettings(resetFunc: SocketFuncs) {
        socket.emit(resetFunc, {})
    },
    socketEmitFire(endpoint: SocketFuncs, payload: any) {
        socket.emit(endpoint, payload)
    }
}
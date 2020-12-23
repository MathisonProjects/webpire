import moment from 'moment'
import store from '@/stores'
import socket from './socket'
import { uuid } from 'uuidv4';
import { SocketFuncs } from '@/enums';

export default {
    standardizedTime(input: Date) {
        return moment(input).format('MMMM Do YYYY, h:mm:ss a')
    },
    shortTime(input: Date) {
        return moment(input).format('M/D/YYYY h:mma')
    },
    getUserSettings() {
        const dtUserSettingStore = store.getters['dynamicTableStore/getDynamicTableByKey']('user_settings')
        const dtcUserSettingsStore = store.getters['dynamicTableContentStore/getRecordsByTid'](dtUserSettingStore.id).find( item => item.content.user === store.state.userStore.uid )

        if (dtcUserSettingsStore !== undefined) {
            store.dispatch('userStore/setSettings', dtcUserSettingsStore)
        } else {
            const settingsContent = {
                id: uuid(),
                tid: dtUserSettingStore.id,
                created_at: Date.now(),
                content: {
                    name: store.state.userStore.username,
                    user: store.state.userStore.uid,
                    role: 'User',
                    created_at: Date.now(),
                    updated_at: Date.now(),
                    created_by: store.state.userStore.uid,
                    updated_by: store.state.userStore.uid
                }
            }

            socket.socketEmitFire(SocketFuncs.SAVEDYNAMICTABLECONTENT, settingsContent)
            store.dispatch('userStore/setSettings', settingsContent)
        }
    }
}
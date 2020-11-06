import io, { Socket } from 'socket.io-client'
import store from '@/stores'
import { SocketFuncs } from '@/enums'
const socket = io('http://localhost:8082')

export default {
    init() {
        socket.on('connection confirmation', (response: any) => {
            console.log(response.response)
        })
        socket.on('return get dbstore', (response: any) => {
            store.dispatch('menuStore/setInit', response.menu.Items)
            store.dispatch('settingsStore/setInit', response.settings.Items)
        })
        socket.emit('get dbstore', {})
    },
    resetToFactorySettings(resetFunc: SocketFuncs) {
        socket.emit(resetFunc, {})
    }
}
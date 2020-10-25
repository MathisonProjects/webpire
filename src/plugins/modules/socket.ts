import io from 'socket.io-client'
import store from '@/stores'

export default {
    init() {
        const socket = io('http://localhost:8082')
        socket.on('connection confirmation', (response: any) => {
            console.log(response.response)
        })
        socket.on('return get dbstore', (response: any) => {
            console.log(response)
            store.dispatch('menuStore/setInit', response.menu.Items)
            store.dispatch('settingsStore/setInit', response.settings.Items)
        })
        socket.emit('get dbstore', {})
    }
}
import Vue from 'vue'
import Vuetify from 'vuetify'
import router from './router'
import store from '@/stores'
import VueI18n from 'vue-i18n'
import messages from '@/lang'
import plugins from '@/plugins'
import CKEditor from '@ckeditor/ckeditor5-vue2'
import * as VueGoogleMaps from 'vue2-google-maps'
import VuetifyDataTableComponent from '@/components/shared/VuetifyDataTableComponent.vue'


Vue.component('VuetifyDataTableComponent',VuetifyDataTableComponent)


Vue.use(Vuetify)
Vue.use(VueI18n)
Vue.use(CKEditor)

Vue.use(VueGoogleMaps, {
    load: {
      key: process.env.GOOGLE_API_KEY,
      libraries: 'places', // This is required if you use the Autocomplete plugin
      // OR: libraries: 'places,drawing'
      // OR: libraries: 'places,drawing,visualization'
      // v: '3.26',
    },
    // autobindAllEvents: false,
    // installComponents: true,
})

Vue.prototype.$p = plugins

const i18n = new VueI18n({
	locale: 'EnUs',
	messages
})

export default new Vue({
    el: '#app',
    i18n,
    store,
    router,
    vuetify: new Vuetify({ theme: { dark: false } }),
    created() {
        plugins.socket.init()
    }
})
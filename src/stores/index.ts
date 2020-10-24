import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store: any = new Vuex.Store({
    modules : modules,
	plugins: [ createPersistedState() ]
})

export default store
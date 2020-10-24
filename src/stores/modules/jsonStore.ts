import JsonStore from '@/json';

interface IPayload {
	item : string,
	store: string[]
}

interface IState {
	[index: string]: string[]
}

export default {
	state: JsonStore,
	mutations: {
		DO_RESET(state: IState, payload: IState) {
			state = payload;
		},
		SET_STATE_ITEM(state: IState, payload: IPayload) {
			state[payload.item] = payload.store;
		}
	},
	actions: {
		reset({ commit } : { commit: any }): void {
			for (var i in JsonStore) {
				const data = {
					item : i,
					store: JsonStore[i]
				}
				commit('SET_STATE_ITEM', data);
			}
		}
	}
}
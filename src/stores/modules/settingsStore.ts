import { FieldTypes } from "@/enums";

interface IKeyedSettings {
    [key: string] : ISettings
}
interface ISettings {
    type: FieldTypes
    key: string
    label: string
    value: any
}

interface ISettingsList {
    settings: ISettings[]
}

export default {
    state: {
        settings: []
    },
    mutations: {
        SET_SETTINGS(state: ISettingsList, payload: ISettings[]) {
            state.settings = payload
        }
    },
    actions: {
        setInit({ commit }: { commit: any }, payload: ISettings[]) {
            commit('SET_SETTINGS', payload)
        }
    },
    getters: {
        keyedSettings(state: ISettingsList) {
            let keyed: IKeyedSettings = {}
            for (var i in state.settings) {
                keyed[state.settings[i].key] = state.settings[i]
            }
            return keyed
        }
    }
}
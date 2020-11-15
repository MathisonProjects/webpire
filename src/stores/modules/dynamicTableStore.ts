
interface IField {
    key: string
    name: string
    type: string
}

interface IDynamicTable {
    id: string
    name: string
    key: string
    description: string
    fields: IField[]
    displayFieldsLeft: IField[]
    displayFieldsRight: IField[]
    created_at: string
    updated_at: string
}

interface IDynamicTableList {
    tableList: IDynamicTable[]
}

export default {
    state: {
        tableList: []
    },
    mutations: {
        SET_TABLELIST(state: IDynamicTableList, payload: IDynamicTable[]) {
            state.tableList = payload
        }
    },
    actions: {
        setTables({ commit }: { commit: any }, payload: IDynamicTable[] ) {
            commit('SET_TABLELIST', payload)
        }
    },
    getters: {}
}
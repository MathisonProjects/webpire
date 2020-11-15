<template>
    <div>
        <div v-if='currentTable === null'>
            <h1><v-icon large>{{ mdiIconsList.TESTTUBEEMPTY }}</v-icon> No Table Here...</h1>
		    <p class='overline'>There are no tables here...</p>
        </div>
        <div v-if='currentTable !== null'>
            <div class='row'>
                <div class='col'>
                    <h1><v-icon large>{{ currentTable.icon }}</v-icon> {{ currentTable.name}}</h1>
                </div>
                <div class='col text-right'>
                    <v-btn color='primary' small @click='mode = adminModesList.VIEW' v-if='mode !== adminModesList.VIEW'><v-icon>{{ mdiIconsList.BACKBURGER }}</v-icon> Back</v-btn>
                    <v-btn color='primary' small @click='mode = adminModesList.CREATE' v-if='selected.length === 0 && mode !== adminModesList.CREATE'><v-icon>{{ mdiIconsList.PLUS }}</v-icon> Create</v-btn>
                    <v-btn color='warning' small @click='mode = adminModesList.UPDATE' v-if='selected.length === 1'><v-icon>{{ mdiIconsList.PENCIL }}</v-icon>Edit</v-btn>
                    <v-btn color='info' small @click='copyTable' v-if='selected.length === 1'><v-icon>{{ mdiIconsList.CONTENTCOPY }}</v-icon>Copy</v-btn>
                    <v-btn color='error' small @click='mode = adminModesList.DELETE' v-if='selected.length > 0 && mode !== adminModesList.DELETE'><v-icon>{{ mdiIconsList.TRASHCANOUTLINE }}</v-icon> Delete</v-btn>
                </div>
            </div>
		    <VuetifyDataTableComponent :headers='headers' :items='items' @tableUpdate='tableUpdate' :showSelect='true' v-if='mode === adminModesList.VIEW' />
            <v-card v-if='mode === adminModesList.CREATE || mode === adminModesList.UPDATE'>
                <v-card-title></v-card-title>
                <v-card-text>
                    <div class='row'>
                        <div class='col'>
                            <div class='row' v-for='(item,index) in currentTable.displayFieldsLeft' :key='index'>
                                <div class='col'>
                                    <v-text-field :label='item.name' :placeholder='"Enter information into " + item.name' v-model='formData[item.key]' dense />
                                </div>
                            </div>
                        </div>
                        <div class='col'>
                            <div class='row' v-for='(item,index) in currentTable.displayFieldsRight' :key='index'>
                                <div class='col' v-if='item.name !== "[ FILLER ]"'>
                                    <v-text-field :label='item.name' :placeholder='"Enter information into " + item.name' v-model='formData[item.key]' dense />
                                </div>
                            </div>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
    import { AdminMode, MdiIcons } from '@/enums'

    export default {
		name      : "admin-dynamic-table-view-component",
		props     : [],
		components: {},
		created()   {},
		computed  : {
            adminModesList() {
				return AdminMode
			},
			mdiIconsList() {
				return MdiIcons
            },
            tableList() {
                return this.$store.state.dynamicTableStore.tableList
            },
            tableKey() {
                return (this.$route.params.key !== undefined) ? this.$route.params.key : null
            },
            currentTable() {
                if (this.tableKey === null) {
                    return null
                } else {
                    const keyedTables = this.tableList.filter( (item) => {
                        return item.key === this.tableKey
                    })
                    if (keyedTables.length > 0) {
                        return keyedTables[0]
                    } else {
                        return null
                    }
                }
            },
            headers() {
                const visibleFields = ['id', 'name', 'description', 'created_at', 'updated_at']
				const pageHeaders = []

				for (let i in visibleFields) {
					let fixedText = visibleFields[i].replace('_', ' ')
					fixedText = fixedText.split(' ').map( item => { return item.charAt(0).toUpperCase() + item.slice(1)}).join(' ')
					pageHeaders.push({
						text: fixedText, value: visibleFields[i], align: 'middle', sortable: true
					})
				}
				return pageHeaders
            },
            items() {
                return []
            }
		},
		data()      {
            return {
                mode: AdminMode.VIEW,
                selected: [],
                formData: {}
            }
        },
		methods   : {
            tableUpdate(response) {
				this.selected = response
            }
        },
		watch     : {
            mode(newVal) {
				if (newVal === AdminMode.UPDATE) {
					this.dynamicTableForm = this.selected[0]
				}
			}
        }
    }
</script>

<style>

</style>
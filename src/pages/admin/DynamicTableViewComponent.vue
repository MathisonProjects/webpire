<template>
    <div>
        <div v-if='currentTable === null'>
            <h1><v-icon large>{{ mdiIconsList.TESTTUBEEMPTY }}</v-icon> No Table Here...</h1>
		    <p class='overline'>There are no tables here...</p>
        </div>
        <div v-if='currentTable !== null'>
            <div class='row'>
                <div class='col'>
                    <h1><v-icon large>{{ currentTable.icon }}</v-icon> {{ currentTable.name}} - {{ mode.toUpperCase() }}</h1>
                </div>
                <div class='col text-right'>
                    <v-btn color='primary' small @click='mode = adminModesList.VIEW' v-if='mode !== adminModesList.VIEW'><v-icon>{{ mdiIconsList.BACKBURGER }}</v-icon> Back</v-btn>
                    <v-btn color='primary' small @click='mode = adminModesList.CREATE' v-if='selected.length === 0 && mode !== adminModesList.CREATE'><v-icon>{{ mdiIconsList.PLUS }}</v-icon> Create</v-btn>
                    <v-btn color='warning' small @click='mode = adminModesList.UPDATE' v-if='selected.length === 1'><v-icon>{{ mdiIconsList.PENCIL }}</v-icon>Edit</v-btn>
                    <v-btn color='info' small @click='copyRecord' v-if='selected.length === 1'><v-icon>{{ mdiIconsList.CONTENTCOPY }}</v-icon>Copy</v-btn>
                    <v-btn color='error' small @click='mode = adminModesList.DELETE' v-if='selected.length > 0 && mode !== adminModesList.DELETE'><v-icon>{{ mdiIconsList.TRASHCANOUTLINE }}</v-icon> Delete</v-btn>
                </div>
            </div>
		    <VuetifyDataTableComponent :headers='headers' :items='itemsDisplayList' @tableUpdate='tableUpdate' :showSelect='true' v-if='mode === adminModesList.VIEW' />
            <v-card v-if='mode === adminModesList.CREATE || mode === adminModesList.UPDATE'>
                <v-card-title>
                    {{ currentTable.name }}
                    <v-spacer />
                    <v-btn color='success' small @click='saveTableViewRecord'><v-icon>{{ mdiIconsList.CONTENTSAVE }}</v-icon> Save</v-btn>
                </v-card-title>
                <v-card-text>
                    <div class='row'>
                        <div class='col'>
                            <div class='row' v-for='(item,index) in currentTable.displayFieldsLeft' :key='index'>
                                <div class='col' v-if='item.type !== "filler"'>
                                    <v-text-field :label='item.name' :placeholder='"Enter information into " + item.name' v-model='formData.content[item.key]' v-if='item.type === "text"' dense />
                                    <v-text-field :label='item.name' :placeholder='"Enter information into " + item.name' v-model='formData.content[item.key]' v-if='item.type === "datetime"' dense />
                                    <v-select :label='item.name' :placeholder='"Enter information into " + item.name' v-model='formData.content[item.key]' v-if='item.type === "dropdown"' dense :items='item.options.split(",")' />
                                </div>
                                <div class='col my-4' v-if='item.type === "filler"'><div class='mt-4'></div></div>
                            </div>
                        </div>
                        <div class='col'>
                            <div class='row' v-for='(item,index) in currentTable.displayFieldsRight' :key='index'>
                                <div class='col' v-if='item.type !== "filler"'>
                                    <v-text-field :label='item.name' :placeholder='"Enter information into " + item.name' v-model='formData.content[item.key]' v-if='item.type === "text"' dense />
                                    <v-text-field :label='item.name' :placeholder='"Enter information into " + item.name' v-model='formData.content[item.key]' v-if='item.type === "datetime"' dense />
                                    <v-select :label='item.name' :placeholder='"Enter information into " + item.name' v-model='formData.content[item.key]' v-if='item.type === "dropdown"' dense :items='item.options.split(",")' />
                                </div>
                                <div class='col my-4' v-if='item.type === "filler"'><div class='mt-4'></div></div>
                            </div>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
    import { AdminMode, MdiIcons, SocketFuncs } from '@/enums'
    import moment from 'moment'
    import { uuid } from 'uuidv4'

    export default {
		name      : "admin-dynamic-table-view-component",
		props     : [],
		components: {},
		created()   {
            if (this.routeMode !== null) {
                this.mode = this.routeMode
            }
        },
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
						text: fixedText, value: visibleFields[i], align: 'left', sortable: true
					})
				}
				return pageHeaders
            },
            items() {
                return this.$store.state.dynamicTableContentStore.contentList.filter( (item) => {
                    return item.tid === this.currentTable.id
                })
            },
            routeMode() {
                return (this.$route.params.mode !== undefined) ? this.$route.params.mode : null
            },
            routeId() {
                return (this.$route.params.id !== undefined) ? this.$route.params.id : null
            },
            itemsDisplayList() {
                return this.items.map( (item) => {
                    return {
                        id: item.id,
                        name: item.content.name,
                        description: item.content.description,
                        created_at: this.$p.standardFuncs.standardizedTime(item.created_at),
                        updated_at: this.$p.standardFuncs.standardizedTime(item.updated_at)
                    }
                })
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
            },
            saveTableViewRecord() {
                this.formData.updated_at = Date.now()
                this.formData.content.updated_at = Date.now()
                this.$p.socket.socketEmitFire(SocketFuncs.SAVEDYNAMICTABLECONTENT, this.formData)
                this.mode = AdminMode.VIEW
            },
            resetFormData() {
                this.formData = {
                    id: uuid(),
                    tid: this.currentTable.id,
                    content: {}
                }
                for (let i in this.currentTable.displayFieldsLeft) {
                    if (this.currentTable.displayFieldsLeft[i].key === null) continue
                    this.formData.content[this.currentTable.displayFieldsLeft[i].key] = null
                }
                for (let i in this.currentTable.displayFieldsRight) {
                    if (this.currentTable.displayFieldsRight[i].key === null) continue

                    this.formData.content[this.currentTable.displayFieldsRight[i].key] = null
                }
                for (let i in this.currentTable.fields) {
                    if (this.currentTable.fields[i].key === null) continue
                    this.formData.content[this.currentTable.fields[i].key] = null
                }
                this.formData.created_at = Date.now()
                this.formData.content.created_at = Date.now()
            },
            copyRecord() {
                this.formData = this.items.filter( item => {
                    return this.selected[0].id === item.id
                })[0]
                this.formData.id = uuid()
                this.formData.created_at = Date.now()
                this.formData.content.created_at = Date.now()
                this.formData.updated_at = Date.now()
                this.formData.content.updated_at = Date.now()
                this.$p.socket.socketEmitFire(SocketFuncs.SAVEDYNAMICTABLECONTENT, this.formData)
            }
        },
		watch     : {
            mode(newVal) {
				if (newVal === AdminMode.UPDATE) {
					this.formData = this.items.filter( item => {
                        return this.selected[0].id === item.id
                    })[0]
                }
                if (newVal === AdminMode.CREATE) {
                    this.resetFormData()
                }
			}
        }
    }
</script>

<style>

</style>
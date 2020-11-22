<template>
    <div>
        <div class='row'>
            <div class='col'>
                <h1><v-icon large>{{ mdiIconsList.TABLE }}</v-icon> Dynamic Tables</h1>
            </div>
            <div class='col text-right'>
				<v-btn color='primary' small @click='mode = adminModesList.VIEW' v-if='mode !== adminModesList.VIEW'><v-icon>{{ mdiIconsList.BACKBURGER }}</v-icon> Back</v-btn>
                <v-btn color='primary' small @click='mode = adminModesList.CREATE' v-if='selected.length === 0 && mode !== adminModesList.CREATE'><v-icon>{{ mdiIconsList.PLUS }}</v-icon> Create</v-btn>
				<v-btn color='warning' small @click='mode = adminModesList.UPDATE' v-if='selected.length === 1'><v-icon>{{ mdiIconsList.PENCIL }}</v-icon>Edit</v-btn>
				<v-btn color='info' small @click='copyTable' v-if='selected.length === 1'><v-icon>{{ mdiIconsList.CONTENTCOPY }}</v-icon>Copy</v-btn>
				<v-btn color='error' small @click='mode = adminModesList.DELETE' v-if='selected.length > 0 && mode !== adminModesList.DELETE'><v-icon>{{ mdiIconsList.TRASHCANOUTLINE }}</v-icon> Delete</v-btn>
            </div>
        </div>

        <VuetifyDataTableComponent :headers='dynamicTablesHeader' :items='items' @tableUpdate='tableUpdate' :showSelect='true' v-if='mode === adminModesList.VIEW' />

        <v-card v-if='mode === adminModesList.CREATE || mode === adminModesList.UPDATE'>
			<v-card-title v-if='mode === adminModesList.CREATE'>Create Dynamic Table</v-card-title>
			<v-card-title v-if='mode === adminModesList.UPDATE'>Update Dynamic Table</v-card-title>
            <v-card-text>
                <div class='row'>
                    <div class='col'>
						<v-text-field label='Table Name' dense placeholder="ex. Contacts" v-model='dynamicTableForm.name' clearable />
                    </div>
                    <div class='col'>
						<v-text-field label='Key' dense placeholder="ex. contacts" v-model='dynamicTableForm.key' clearable />
                    </div>
                </div>
                <div class='row'>
                    <div class='col'>
                        <v-autocomplete dense placeholder='Choose your table icon...' label='Icon' :items='iconList' v-model='dynamicTableForm.icon' />
                    </div>
                    <div class='col'>
						<v-text-field label='Description' dense placeholder="ex. Records of important contacts." v-model='dynamicTableForm.description' clearable />
                    </div>
                </div>
                <div class='row'>
                    <div class='col text-right'>
                        <v-btn color='primary' small @click='addField'><v-icon>{{ mdiIconsList.PLUS }}</v-icon> Add Field</v-btn>
                    </div>
                </div>

                <div class='row' v-for='(fieldItem, index) in dynamicTableForm.fields' :key='index'>
                    <div class='col'>
                        <v-text-field label='Name' dense placeholder='Display name of the field...' v-model='fieldItem.name' />
                    </div>
                    <div class='col'>
                        <v-select label='Type' dense placeholder='Type of Field' v-model='fieldItem.type' :items='fieldTypeList' />
                    </div>
                    <div class='col'>
                        <v-text-field label='Key' dense placeholder='DB Key of field' v-model='fieldItem.key' />
                    </div>
                    <div class='col text-center' v-if='fieldItem.type === "dropdown"'>
                        <v-text-field label='Dropdown Options' dense placeholder='Comma list of dropdown options' v-model='fieldItem.options' />
                    </div>
                    <div class='col-md-1 text-center'>
                        <v-btn color='error' small><v-icon>{{mdiIconsList.TRASHCANOUTLINE}}</v-icon></v-btn>
                    </div>
                </div>

                <hr />

                <div class='row'>
                    <div class='col text-center'>
                        <h4>Field Organization Left</h4>
                        <draggable group='fieldList' :list='dynamicTableForm.displayFieldsLeft'>
                            <div class='my-2' v-for='(fieldItem, index) in dynamicTableForm.displayFieldsLeft' :key='index'>
                                <v-chip>{{ fieldItem.name }}<span v-if='fieldItem.type !== null'> [{{fieldItem.type}}]</span></v-chip>
                            </div>
                        </draggable>
                    </div>
                    <div class='col text-center'>
                        <h4>Field Organization Right</h4>
                        <draggable group='fieldList' :list='dynamicTableForm.displayFieldsRight'>
                            <div class='my-2' v-for='(fieldItem, index) in dynamicTableForm.displayFieldsRight' :key='index'>
                                <v-chip>{{ fieldItem.name }}<span v-if='fieldItem.type !== null'> [{{fieldItem.type}}]</span></v-chip>
                            </div>
                        </draggable>
                    </div>
                    <div class='col-md-3 text-center'>
                        <h4>Fields to Display</h4>
                        <div class='overline' v-if='dynamicTableForm.fields.length === 0'>You are out of fields!</div>
                        <draggable group='fieldList' :list='dynamicTableForm.fields'>
                            <div class='my-2' v-for='(fieldItem, index) in dynamicTableForm.fields' :key='index'>
                                <v-chip>{{ fieldItem.name }}<span v-if='fieldItem.type !== null'> [{{fieldItem.type}}]</span></v-chip>
                            </div>
                        </draggable>
                    </div>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn class='success' small @click='saveTable'><v-icon>{{ mdiIconsList.CONTENTSAVE }}</v-icon> Save</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import { AdminMode, MdiIcons, SocketFuncs } from '@/enums'
    import { uuid } from 'uuidv4'
    import draggable from 'vuedraggable'

    export default {
		name      : "admin-dynamic-tables-component",
		props     : [],
		components: {
            draggable
        },
		created()   {},
		computed  : {
            adminModesList() {
				return AdminMode
			},
			mdiIconsList() {
				return MdiIcons
            },
            iconList() {
                return this.$store.state.jsonStore.materialistIconsList
            },
            fieldTypeList() {
                return [
                    'text',
                    'wysiwyg',
                    'number',
                    'dropdown',
                    'date',
                    'time',
                    'datetime',
                    'currency',
                    'computed',
                    'file',
                    'related to',
                    'filler'
                ]
            },
            dynamicTablesHeader() {
				const visibleFields = ['id', 'name', 'key', 'total_records', 'created_at', 'updated_at']
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
            tablesList() {
                return this.$store.state.dynamicTableStore.tableList
            },
            items() {
                return this.tablesList
            }
		},
		data()      {
            return {
                mode: AdminMode.VIEW,
                selected: [],
                dynamicTableForm: {
                    id  : '',
                    icon: '',
                    name: '',
                    key : '',
                    description: '',
                    fields: [
                        {
                            key: 'name',
                            name: 'Name',
                            type: 'text'
                        },
                        {
                            key: 'description',
                            name: 'Description',
                            type: 'text'
                        },
                        {
                            key: 'created_at',
                            name: 'Created At',
                            type: 'datetime'
                        },
                        {
                            key: 'updated_at',
                            name: 'Updated At',
                            type: 'datetime'
                        }
                    ],
                    displayFieldsLeft: [],
                    displayFieldsRight: [],
                    created_at: '',
                    updated_at: ''
                }
            }
        },
		methods   : {
            tableUpdate(response) {
				this.selected = response
            },
            addField() {
                this.dynamicTableForm.fields.push({
                    key: null,
                    name: null,
                    type: 'filler',
                    options: null
                })
            },
            saveTable() {
                if (this.dynamicTableForm.id === null || this.dynamicTableForm.id === '') {
					this.dynamicTableForm.id = uuid()
				}
				if (this.dynamicTableForm.created_at === null || this.dynamicTableForm.created_at === undefined || this.dynamicTableForm.created_at === '') {
					this.dynamicTableForm.created_at = Date.now()
				}

				this.dynamicTableForm.updated_at = Date.now()
                this.$p.socket.socketEmitFire(SocketFuncs.SAVEDYNAMICTABLES, this.dynamicTableForm)
                this.mode = AdminMode.VIEW
                this.selected = []
            },
            copyTable() {
                this.dynamicTableForm = this.selected[0]
				this.dynamicTableForm.id = uuid()
				this.dynamicTableForm.created_at = Date.now()
				this.dynamicTableForm.updated_at = Date.now()

				this.$p.socket.socketEmitFire(SocketFuncs.SAVEDYNAMICTABLES, this.dynamicTableForm)
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
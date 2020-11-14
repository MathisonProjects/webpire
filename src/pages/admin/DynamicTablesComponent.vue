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
				<v-btn color='info' small @click='copyPage' v-if='selected.length === 1'><v-icon>{{ mdiIconsList.CONTENTCOPY }}</v-icon>Copy</v-btn>
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
						<v-text-field label='Table Name' placeholder="ex. Contacts" v-model='dynamicTableForm.name' clearable />
                    </div>
                    <div class='col'>
						<v-text-field label='Key' placeholder="ex. contacts" v-model='dynamicTableForm.key' clearable />
                    </div>
                </div>
                <div class='row'>
                    <div class='col'>
						<v-text-field label='Description' placeholder="ex. Records of important contacts." v-model='dynamicTableForm.description' clearable />
                    </div>
                </div>
                <div class='row'>
                    <div class='col text-right'>
                        <v-btn color='primary' small @click='addField'><v-icon>{{ mdiIconsList.PLUS }}</v-icon> Add Field</v-btn>
                    </div>
                </div>

                <div class='row' v-for='(fieldItem, index) in dynamicTableForm.fields' :key='index'>
                    <div class='col-md-3'>
                        <v-text-field label='Name' placeholder='Display name of the field...' v-model='fieldItem.name' />
                    </div>
                    <div class='col-md-3'>
                        <v-select label='Type' placeholder='Type of Field' v-model='fieldItem.type' :items='[]' />
                    </div>
                    <div class='col-md-3'>
                        <v-text-field label='Key' placeholder='DB Key of field' v-model='fieldItem.key' />
                    </div>
                    <div class='col-md-3'>
                        <v-text-field label='Field Position' placeholder='Field Position...' v-model='fieldItem.position' />
                    </div>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import { AdminMode, MdiIcons } from '@/enums'
    import { uuid } from 'uuidv4'

    export default {
		name      : "dynamic-tables-component",
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
            dynamicTablesHeader() {
				const visibleFields = ['id', 'name', 'total_records', 'created_at', 'updated_at']
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
                dynamicTableForm: {
                    id  : uuid(),
                    name: '',
                    key : '',
                    description: '',
                    fields: [],
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
                    type: null,
                    position: [0,0]
                })
            }
        },
		watch     : {}
    }
</script>

<style>

</style>
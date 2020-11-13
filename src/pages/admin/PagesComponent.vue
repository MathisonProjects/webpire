<template>
    <div>
		<div class='row'>
			<div class='col'>
				<h1><v-icon large>{{ mdiIconsList.NEWSPAPER }}</v-icon> Pages</h1>
			</div>
			<div class='col text-right'>
				<v-btn color='primary' small @click='mode = adminModesList.VIEW' v-if='mode !== adminModesList.VIEW'><v-icon>{{ mdiIconsList.BACKBURGER }}</v-icon> Back</v-btn>
				<v-btn color='success' small @click='mode = adminModesList.READ' v-if='selected.length > 0'><v-icon>{{ mdiIconsList.EYE }}</v-icon>View</v-btn>
				<v-btn color='primary' small @click='mode = adminModesList.CREATE' v-if='selected.length === 0 && mode !== adminModesList.CREATE'><v-icon>{{ mdiIconsList.PLUS }}</v-icon> Create</v-btn>
				<v-btn color='warning' small @click='mode = adminModesList.UPDATE' v-if='selected.length === 1'><v-icon>{{ mdiIconsList.PENCIL }}</v-icon>Edit</v-btn>
				<v-btn color='info' small @click='copyPage' v-if='selected.length === 1'><v-icon>{{ mdiIconsList.CONTENTCOPY }}</v-icon>Copy</v-btn>
				<v-btn color='error' small @click='mode = adminModesList.DELETE' v-if='selected.length > 0 && mode !== adminModesList.DELETE'><v-icon>{{ mdiIconsList.TRASHCANOUTLINE }}</v-icon> Delete</v-btn>
			</div>
		</div>
		<VuetifyDataTableComponent :headers='pageHeaders' :items='items' @tableUpdate='tableUpdate' :showSelect='true' v-if='mode === adminModesList.VIEW' />

		<v-card v-if='mode === adminModesList.CREATE || mode === adminModesList.UPDATE'>
			<v-card-title v-if='mode === adminModesList.CREATE'>Create Page</v-card-title>
			<v-card-title v-if='mode === adminModesList.UPDATE'>Update Page</v-card-title>
			<v-card-text>
				<div class='row'>
					<div class='col'>
						<v-text-field label='Page Name' placeholder="ex. About Us" v-model='pageForm.name' clearable />
					</div>
					<div class='col'>
						<v-text-field label='URL Key' placeholder="ex. about-us" v-model='pageForm.key' clearable />
					</div>
				</div>
				<div class='row'>
					<div class='col'>
						<v-select v-model='pageForm.type' :items='typeOptions' placeholder='Pick Page Type...' label='Page Type' />
					</div>
					<div class='col' v-if='pageForm.type === "Preset"'>
						If Page Type Preset, select with presets
					</div>
				</div>
				<div class='row'>
					<div class='col text-right'>
						<v-btn color='primary' small @click='addField'><v-icon>{{ mdiIconsList.PLUS }}</v-icon> Add Field</v-btn>
					</div>
				</div>
				<div class='row' v-for='(fieldItem,index) in pageForm.fieldData' :key='index'>
					<div class='col'>
						<v-text-field label='Field Name' placeholder="ex. Headline" v-model='fieldItem.key' clearable />
					</div>
					<div class='col'>
						<v-select v-model='fieldItem.type' :items='fieldTypeOptions' placeholder='Pick Field Type...' label='Field Type' />
					</div>
					<div class='col-md-6' v-if='fieldItem.type !== null && fieldItem.type !== undefined'>
						<v-text-field v-model='fieldItem.content' placeholder='Place your content here...' label='Content' />
					</div>
					<div class='col-md-1'>
						<v-btn color='error' small @click='pageForm.fieldData.splice(index, 1)'><v-icon>{{ mdiIconsList.TRASHCANOUTLINE }}</v-icon></v-btn>
					</div>
				</div>
				<div class='row' v-if='pageForm.fieldData.length === 0'>
					<div class='col text-center overline'>No fields have been set yet...</div>
				</div>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn color='secondary' @click='resetRecord'><v-icon>{{ mdiIconsList.REFRESH }}</v-icon></v-btn>
				<v-btn color='success' @click='saveRecord'><v-icon>{{ mdiIconsList.CONTENTSAVE }}</v-icon></v-btn>
			</v-card-actions>
		</v-card>

		<v-card v-if='mode === adminModesList.DELETE'>
			<v-card-title>Are you sure you want to delete the following record(s)?</v-card-title>
			<v-card-text>
				<pre>
					{{ selected }}
				</pre>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn color='error' @click='confirmDeletion' small><v-icon>{{ mdiIconsList.TRASHCANOUTLINE }}</v-icon> Delete</v-btn>
			</v-card-actions>
		</v-card>

		<v-card v-if='mode === adminModesList.READ'>
			<v-card-title>Read Item</v-card-title>
			<v-card-text>
				<pre>{{ selected }}</pre>
			</v-card-text>
		</v-card>
    </div>
</template>

<script>
	import { MdiIcons, AdminMode, SocketFuncs } from '@/enums'
	import { uuid } from 'uuidv4'

    export default {
		name      : "admin-pages-component",
		props     : [],
		components: {},
		created()   {},
		computed  : {
			mdiIconsList() {
				return MdiIcons
			},
			adminModesList() {
				return AdminMode
			},
			typeOptions() {
				return [
					'Custom',
					'Preset'
				]
			},
			fieldTypeOptions() {
				return [
					'Currency',
					'File',
					'Image Link',
					'Json',
					'Number',
					'Object',
					'Text',
					'URL Link',
					'WYSIWYG',
				]
			},
			presetOptions() {
				return []
			},
			pageHeaders() {
				const visibleFields = ['id', 'name', 'created_at', 'updated_at']
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
				return this.$store.state.pagesStore.pageList
			}
		},
		data()      {
			return {
				selected: [],
				pageForm: {
					id: null,
					name: null,
					key: null,
					type: null,
					preset: null,
					fieldData: [],
					created_at: null,
					updated_at: null
				},
				mode: AdminMode.VIEW
			}
		},
		methods   : {
			tableUpdate(response) {
				this.selected = response
			},
			confirmDeletion() {
				this.mode = AdminMode.VIEW
				for (let i in this.selected) {
					this.$p.socket.socketEmitFire(SocketFuncs.DELETEPAGES, this.selected[i])
				}
				this.selected = []
			},
			copyPage() {
				this.pageForm = this.selected[0]
				this.pageForm.id = uuid()
				this.pageForm.created_at = Date.now()
				this.pageForm.updated_at = Date.now()

				this.$p.socket.socketEmitFire(SocketFuncs.SAVEPAGES, this.pageForm)
			},
			addField() {
				this.pageForm.fieldData.push({
					id: uuid(),
					key: null,
					type: null,
					content: null
				})
			},
			resetRecord() {
				this.pageForm = {
					id: null,
					name: null,
					key: null,
					type: null,
					preset: null,
					fieldData: [],
					created_at: null,
					updated_at: null
				}
			},
			saveRecord() {
				if (this.pageForm.id === null) {
					this.pageForm.id = uuid()
				}
				if (this.pageForm.created_at === null) {
					this.pageForm.created_at = Date.now()
				}

				this.pageForm.updated_at = Date.now()

				this.$p.socket.socketEmitFire(SocketFuncs.SAVEPAGES, this.pageForm)
			}
		},
		watch     : {
			mode(newVal) {
				if (newVal === AdminMode.UPDATE) {
					this.pageForm = this.selected[0]
				}
			}
		}
    }
</script>

<style>

</style>
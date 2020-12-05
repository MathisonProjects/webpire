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
                    <v-btn color='success' small @click='exportRecords' v-if='selected.length > 0 && mode === adminModesList.VIEW'><v-icon>{{ mdiIconsList.TRASHCANOUTLINE }}</v-icon> Export</v-btn>
                    <v-btn color='primary' small @click='mode = adminModesList.VIEW' v-if='mode !== adminModesList.VIEW'><v-icon>{{ mdiIconsList.BACKBURGER }}</v-icon> Back</v-btn>
                    <v-btn color='primary' small @click='mode = adminModesList.CREATE' v-if='selected.length === 0 && mode !== adminModesList.CREATE'><v-icon>{{ mdiIconsList.PLUS }}</v-icon> Create</v-btn>
                    <v-btn color='info' small @click='mode = adminModesList.READ' v-if='selected.length === 1'><v-icon>{{ mdiIconsList.EYE }}</v-icon>View</v-btn>
                    <v-btn color='warning' small @click='mode = adminModesList.UPDATE' v-if='selected.length === 1'><v-icon>{{ mdiIconsList.PENCIL }}</v-icon>Edit</v-btn>
                    <v-btn color='info' small @click='copyRecord' v-if='selected.length === 1'><v-icon>{{ mdiIconsList.CONTENTCOPY }}</v-icon>Copy</v-btn>
                    <v-btn color='error' small @click='mode = adminModesList.DELETE' v-if='selected.length > 0 && mode !== adminModesList.DELETE'><v-icon>{{ mdiIconsList.TRASHCANOUTLINE }}</v-icon> Delete</v-btn>
                </div>
            </div>
            <div class='row' v-if='mode === adminModesList.VIEW'>
                <div class='col-md-12'>
                    <v-select v-model='visibleFields' :items='allFields' item-text='name' item-value='key' label='Display fields' dense chips multiple />
                </div>
                <div class='col-md-12'>
                    <v-card>
                        <v-card-title>
                            Filters
                            <v-spacer />
                            <v-btn v-if='!showFilterOptions' color='primary' @click='showFilterOptions = !showFilterOptions' icon><v-icon>{{ mdiIconsList.PLUS }}</v-icon></v-btn>
                            <v-btn v-if='showFilterOptions' color='primary' @click='showFilterOptions = !showFilterOptions' icon><v-icon>{{ mdiIconsList.MINUS }}</v-icon></v-btn>
                        </v-card-title>
                        <v-card-text v-if='showFilterOptions'>
                            <div class='row'>
                                <div class='col-md-6'>
                                    <div class='row' v-for='(item,index) in currentTable.displayFieldsLeft' :key='index'>
                                        <div class='col' v-if='item.type !== "filler"'>
                                            <v-text-field v-model='filters[item.key]' :label='item.name + " Filter"' dense />
                                        </div>
                                        <div class='col my-5' v-if='item.type === "filler"'><div class='my-4'></div></div>
                                    </div>
                                </div>
                                <div class='col-md-6'>
                                    <div class='row' v-for='(item,index) in currentTable.displayFieldsRight' :key='index'>
                                        <div class='col' v-if='item.type !== "filler"'>
                                            <v-text-field v-model='filters[item.key]' :label='item.name + " Filter"' dense />
                                        </div>
                                        <div class='col my-5' v-if='item.type === "filler"'><div class='my-4'></div></div>
                                    </div>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </div>
            </div>
		    <VuetifyDataTableComponent :headers='headers' :items='itemsDisplayList' @tableUpdate='tableUpdate' :showSelect='true' v-if='mode === adminModesList.VIEW' />
            <v-card v-if='mode === adminModesList.READ'>
                <v-card-text>
                    <div class='row'>
                        <div class='col'>
                            <div class='row' v-for='(item,index) in currentTable.displayFieldsLeft' :key='index'>
                                <div class='col' v-if='item.type !== "filler"'>
                                    <label><b>{{item.name}}:</b></label>
                                    <div v-if="item.type !== 'related to'">{{ formData.content[item.key] }}</div>
                                    <div v-if="item.type === 'related to'">
                                        <div v-for='(relatedItem,index) in formData.content[item.key]' :key='index'>
                                            <v-btn text small>{{ relatedOptions[item.relatedId][relatedItem].content.name }}</v-btn>
                                        </div>
                                    </div>
                                </div>
                                <div class='col my-5' v-if='item.type === "filler"'><div class='my-4'></div></div>
                            </div>
                        </div>
                        <div class='col'>
                            <div class='row' v-for='(item,index) in currentTable.displayFieldsRight' :key='index'>
                                <div class='col' v-if='item.type !== "filler"'>
                                    <label><b>{{item.name}}:</b></label>
                                    <div v-if="item.type !== 'related to'">{{ formData.content[item.key] }}</div>
                                    <div v-if="item.type === 'related to'">
                                        <div v-for='(relatedItem,index) in formData.content[item.key]' :key='index'>
                                            <v-btn @click='viewRelated = relatedOptions[item.relatedId][relatedItem]' text small>{{ relatedOptions[item.relatedId][relatedItem].content.name }}</v-btn>
                                        </div>
                                    </div>
                                </div>
                                <div class='col my-5' v-if='item.type === "filler"'><div class='my-4'></div></div>
                            </div>
                        </div>
                    </div>
                </v-card-text>
            </v-card>

            <v-card class='mt-2' v-if='mode === adminModesList.READ && viewRelated !== null'>
                <v-card-title>{{ viewRelated.content.name }}<v-spacer /><v-btn @click='viewRelated = null' color='error' small text>x</v-btn></v-card-title>
                <v-card-text>
                    <div class='row'>
                        <div class='col-md-6' v-for='(item, index) in viewRelated.content' :key='index'>
                            <h4>{{ index.toUpperCase() }}</h4>
                            <div v-html='item'></div>
                        </div>
                    </div>
                </v-card-text>
            </v-card>

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
                                    <v-text-field :label='item.name' type='number' :placeholder='"Enter information into " + item.name' v-model='formData.content[item.key]' v-if='item.type === "number"' dense />
                                    <v-text-field prepend-icon="mdi-cash-usd-outline" :label='item.name' type='number' :placeholder='"Enter information into " + item.name' v-model='formData.content[item.key]' v-if='item.type === "currency"' dense />
                                    <label v-if='item.type === "wysiwyg"'>{{ item.name }}</label>
                                    <ckeditor v-model='formData.content[item.key]' v-if='item.type === "wysiwyg"' :editor="classicCkeditor" :config="{}" />
                                    <v-text-field :label='item.name' :placeholder='"Enter information into " + item.name' v-model='formData.content[item.key]' v-if='item.type === "datetime"' dense />
                                    <v-select :label='item.name' :placeholder='"Enter information into " + item.name' v-model='formData.content[item.key]' v-if='item.type === "dropdown"' dense :items='item.options.split(",")' />
                                    <v-select :label='item.name' :placeholder='"Enter information into " + item.name' v-model='formData.content[item.key]' v-if='item.type === "user"' dense :items='userList' item-text='username' item-value='sub' />
                                    <v-file-input :label='item.name' :placeholder='"Enter information into " + item.name' v-model='fileUpload[index]' v-if='item.type === "file"' @change='runUpload(index, item.key)' dense />
                                    <div v-if='formData.content[item.key] !== null && item.type === "file"' class='text-center'>
                                        <a :href='"https://upload.awsvuem.com/" + formData.content[item.key]' target='_BLANK'>Click to View File</a>
                                    </div>
                                    <v-select :label='item.name' :placeholder='"Enter information into " + item.name' v-model='formData.content[item.key]' v-if='item.type === "related to"' dense :items='Object.values(relatedOptions[item.relatedId])' item-text="content.name" item-value='id' :multiple='item.relationType === "one-to-many"' chips />

                                </div>
                                <div class='col my-4' v-if='item.type === "filler"'><div class='mt-4'></div></div>
                            </div>
                        </div>
                        <div class='col'>
                            <div class='row' v-for='(item,index) in currentTable.displayFieldsRight' :key='index'>
                                <div class='col' v-if='item.type !== "filler"'>
                                    <v-text-field :label='item.name' :placeholder='"Enter information into " + item.name' v-model='formData.content[item.key]' v-if='item.type === "text"' dense />
                                    <v-text-field :label='item.name' type='number' :placeholder='"Enter information into " + item.name' v-model='formData.content[item.key]' v-if='item.type === "text"' dense />
                                    <v-text-field prepend-icon="mdi-cash-usd-outline" :label='item.name' type='number' :placeholder='"Enter information into " + item.name' v-model='formData.content[item.key]' v-if='item.type === "currency"' dense />
                                    <label v-if='item.type === "wysiwyg"'>{{ item.name }}</label>
                                    <ckeditor v-model='formData.content[item.key]' v-if='item.type === "wysiwyg"' :editor="classicCkeditor" :config="{}" />
                                    <v-text-field :label='item.name' :placeholder='"Enter information into " + item.name' v-model='formData.content[item.key]' v-if='item.type === "datetime"' dense />
                                    <v-select :label='item.name' :placeholder='"Enter information into " + item.name' v-model='formData.content[item.key]' v-if='item.type === "dropdown"' dense :items='item.options.split(",")' />
                                    <v-select :label='item.name' :placeholder='"Enter information into " + item.name' v-model='formData.content[item.key]' v-if='item.type === "user"' dense :items='userList' item-text='username' item-value='sub' />
                                    <v-file-input :label='item.name' :placeholder='"Enter information into " + item.name' v-model='fileUpload[index]' v-if='item.type === "file"' @change='runUpload(index, item.key)' dense />
                                    <div v-if='formData.content[item.key] !== null && item.type === "file"' class='text-center'>
                                        <a :href='"https://upload.awsvuem.com/" + formData.content[item.key]' target='_BLANK'>Click to View File</a>
                                    </div>
                                    <v-select :label='item.name' :placeholder='"Enter information into " + item.name' v-model='formData.content[item.key]' v-if='item.type === "related to"' dense :items='Object.values(relatedOptions[item.relatedId])' item-text="content.name" item-value='id' :multiple='item.relationType === "one-to-many"' chips />
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
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
    import { AdminMode, MdiIcons, SocketFuncs } from '@/enums'
    import moment from 'moment'
    import { uuid } from 'uuidv4'
    const Papa = require('papaparse')

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
				const pageHeaders = []

				for (let i in this.visibleFields) {
					let fixedText = this.visibleFields[i].replace('_', ' ')
					fixedText = fixedText.split(' ').map( item => { return item.charAt(0).toUpperCase() + item.slice(1)}).join(' ')
					pageHeaders.push({
						text: fixedText, value: this.visibleFields[i], align: 'left', sortable: true
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
                    let returnItem = {
                        id: item.id,
                        created_at: this.$p.standardFuncs.standardizedTime(item.created_at),
                        updated_at: this.$p.standardFuncs.standardizedTime(item.updated_at)
                    }

                    for (let i in item.content) {
                        if (i === 'created_at' || i === 'updated_at') continue
                        returnItem[i] = item.content[i]
                    }

                    return returnItem
                }).filter( (item) => {
                    let returnItem = true
                    for (let i in this.filters) {
                        let curItem = item[i].toLowerCase()
                        if (!curItem.includes(this.filters[i].toLowerCase())) {
                            returnItem = false
                        }
                    }
                    if (returnItem) return item
                })
            },
            allFields() {
                return [
                    { key: 'id', name: 'Id', relatedTo: null },
                    ...this.currentTable.displayFieldsLeft.map( item => { return { key: item.key, name: item.name, relatedTo: (item.relatedId !== undefined && item.relatedId !== null) ? item.relatedId : null } }),
                    ...this.currentTable.displayFieldsRight.map( item => { return { key: item.key, name: item.name, relatedTo: (item.relatedId !== undefined && item.relatedId !== null) ? item.relatedId : null } }),
                ]
            },
            relatedOptions() {
                console.log(this.$store.getters['dynamicTableContentStore/organizedByTable'])
                return this.$store.getters['dynamicTableContentStore/organizedByTable']
            },
            userList() {
                return this.$store.state.usersStore.userList
            }
		},
		data()      {
            return {
                mode: AdminMode.VIEW,
                showFilterOptions: false,
                filters: {},
                visibleFields: ['id', 'name', 'description', 'created_at', 'updated_at'],
                selected: [],
                formData: {},
                fileUpload: [],
                classicCkeditor: ClassicEditor,
                viewRelated: null
            }
        },
		methods   : {
            runUpload(index, key) {
                this.$p.fileManagement.runSaveImage(this.fileUpload[index]).then( response => {
                    this.$p.socket.socketEmitFire(SocketFuncs.UPLOADFILE, response)
                    this.formData.content[key] = response.file_name
                })
            },
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
            },
            exportRecords() {
                let response = Papa.unparse(JSON.stringify(this.selected))
                var link = document.createElement('a');
                link.download = 'data.csv';
                var blob = new Blob([response], {type: 'text/plain'});
                link.href = window.URL.createObjectURL(blob);
                link.click()
            }
        },
		watch     : {
            mode(newVal) {
				if (newVal === AdminMode.UPDATE || newVal === AdminMode.READ) {
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

<style></style>
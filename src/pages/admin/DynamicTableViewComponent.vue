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
                                            <v-text-field v-model='filters[item.key]' :label='item.name + " Filter"' v-if='item.type === "text" || item.type === "wysiwyg"' dense />
                                            <div class='row' v-if='item.type === "number" || item.type === "currency"'>
                                                <div class='col'>
                                                    <v-text-field v-model='filters[item.key]["min"]' type='number' :label='"Minimum " + item.name' dense />
                                                </div>
                                                <div class='col'>
                                                    <v-text-field v-model='filters[item.key]["min"]' type='number' :label='"Maximum " + item.name'  dense />
                                                </div>
                                            </div>
                                            <v-select :label='item.name' :placeholder='"Enter information into " + item.name' v-model='filters[item.key]' v-if='item.type === "dropdown"' chips multiple dense :items='item.options.split(",")' />
                                            <v-select :label='item.name' :placeholder='"Enter information into " + item.name' v-model='filters[item.key]' v-if='item.type === "user"' dense chips :items='userList' item-text='username' item-value='sub' multiple />
                                            <v-select :label='item.name' :placeholder='"Enter information into " + item.name' v-model='filters[item.key]' v-if='item.type === "related to"' dense :items='(relatedOptions !== undefined) ? Object.values(relatedOptions) : []' item-text="content.name" item-value='id' multiple chips />
                                        </div>
                                        <div class='col my-5' v-if='item.type === "filler"'><div class='my-4'></div></div>
                                    </div>
                                </div>
                                <div class='col-md-6'>
                                    <div class='row' v-for='(item,index) in currentTable.displayFieldsRight' :key='index'>
                                        <div class='col' v-if='item.type !== "filler"'>
                                            <v-text-field v-model='filters[item.key]' :label='item.name + " Filter"' v-if='item.type === "text" || item.type === "wysiwyg"' dense />
                                            <div class='row' v-if='item.type === "number" || item.type === "currency"'>
                                                <div class='col'>
                                                    <v-text-field v-model='filters[item.key]["min"]' type='number' :label='"Minimum " + item.name' dense />
                                                </div>
                                                <div class='col'>
                                                    <v-text-field v-model='filters[item.key]["max"]' type='number' :label='"Maximum " + item.name' dense />
                                                </div>
                                            </div>
                                            <v-select :label='item.name' :placeholder='"Enter information into " + item.name' v-model='filters[item.key]' v-if='item.type === "dropdown"' chips multiple dense :items='item.options.split(",")' />
                                            <v-select :label='item.name' :placeholder='"Enter information into " + item.name' v-model='filters[item.key]' v-if='item.type === "user"' dense chips :items='userList' item-text='username' item-value='sub' multiple />
                                            <v-select :label='item.name' :placeholder='"Enter information into " + item.name' v-model='filters[item.key]' v-if='item.type === "related to"' dense :items='(relatedOptions !== undefined) ? Object.values(relatedOptions) : []' item-text="content.name" item-value='id' multiple chips />
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
                                            <v-btn text small>{{ relatedOptions[relatedItem].content.name }}</v-btn>
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
                                            <v-btn @click='viewRelated = relatedOptions[relatedItem]' text small>{{ relatedOptions[relatedItem].content.name }}</v-btn>
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

            <DynamicFormComponent v-model='formData' :currentTable='currentTable' v-if='mode === adminModesList.CREATE || mode === adminModesList.UPDATE' @saveTableViewRecord='saveTableViewRecord' />

            <v-card v-if='mode === adminModesList.DELETE'>
                <v-card-title>Are you sure you wish to delete the following record<span v-if='selected.length > 1'>s</span>?</v-card-title>
                <v-card-text>
                    <pre>{{ selected }}</pre>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color='error' @click='deleteRecords' small><v-icon>{{ mdiIconsList.TRASHCANOUTLINE }}</v-icon> Delete</v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<script>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
    import DynamicFormComponent from '@/components/site/admin/dynamic/DynamicFormComponent'
    import { AdminMode, MdiIcons, SocketFuncs } from '@/enums'
    import moment from 'moment'
    import { uuid } from 'uuidv4'
    const Papa = require('papaparse')

    export default {
		name      : "admin-dynamic-table-view-component",
		props     : [],
		components: {
            DynamicFormComponent
        },
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
                    return this.$store.getters['dynamicTableStore/getDynamicTableByKey'](this.tableKey)
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
                    this.filterReset()

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
                        let curItem = item[i]
                        if (this.filters[i].length === 0) continue
                        if (curItem === null && this.filters[i].length > 0) {
                            returnItem = false
                            break
                        }

                        if (typeof curItem === 'string') curItem = curItem.toLowerCase()
                        if (typeof curItem === 'object') curItem = curItem.map( item => { return item.toLowerCase() })


                        if (typeof this.filters[i] === 'string' && !curItem.includes(this.filters[i].toLowerCase())) {
                            returnItem = false
                            break
                        }

                        if (this.filters[i].min !== undefined) {
                            if (this.filters[i].min !== null && parseInt(this.filters[i].min) > parseInt( curItem )) returnItem = false
                            if (this.filters[i].max !== null && parseInt(this.filters[i].max) < parseInt( curItem )) returnItem = false
                            break
                        }

                        if (typeof this.filters[i] === 'object' && !this.filters[i].map( item => { return item.toLowerCase() }).includes(curItem)) {
                            returnItem = false
                            break
                        }
                    }
                    if (returnItem) return item
                })
            },
            allFields() {
                return [
                    { key: 'id', name: 'Id', relatedTo: null },
                    ...this.currentTable.displayFieldsLeft.map( item => { return { key: item.key, name: item.name, relatedTo: (item.relatedKey !== undefined && item.relatedKey !== null) ? item.relatedKey : null } }),
                    ...this.currentTable.displayFieldsRight.map( item => { return { key: item.key, name: item.name, relatedTo: (item.relatedKey !== undefined && item.relatedKey !== null) ? item.relatedKey : null } }),
                ]
            },
            relatedOptions() {
                const tableId = this.$store.getters['dynamicTableStore/getDynamicTableByKey'](this.item.relatedKey).id
                return this.$store.getters['dynamicTableContentStore/organizedByTable'][tableId]
            },
            userList() {
                return this.$store.state.usersStore.userList
            },
            user() {
                return this.$store.getters['userStore/userData']
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
                this.formData.content.updated_by = this.user.sub
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
                this.formData.content.created_by = this.user.sub
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
                this.formData.content.updated_by = this.user.sub
                this.$p.socket.socketEmitFire(SocketFuncs.SAVEDYNAMICTABLECONTENT, this.formData)
            },
            exportRecords() {
                let response = Papa.unparse(JSON.stringify(this.selected))
                var link = document.createElement('a');
                link.download = 'data.csv';
                var blob = new Blob([response], {type: 'text/plain'});
                link.href = window.URL.createObjectURL(blob);
                link.click()
            },
            deleteRecords() {
                for (let i in this.selected) {
                    const record = this.selected[i]
                    this.$p.socket.socketEmitFire(SocketFuncs.DELETEDYNAMICTABLECONTENT, record)
                }
                this.mode = AdminMode.VIEW
            },
            filterReset() {
                for (let i in this.currentTable.displayFieldsLeft) {
                    if (this.currentTable.displayFieldsLeft[i].type === 'number' || this.currentTable.displayFieldsLeft[i].type === 'currency') {
                        this.filters[this.currentTable.displayFieldsLeft[i].key] = { min: null, max: null }
                    } else {
                        this.filters[this.currentTable.displayFieldsLeft[i].key] = ''
                    }
                }
                for (let i in this.currentTable.displayFieldsRight) {
                    if (this.currentTable.displayFieldsRight[i].type === 'number' || this.currentTable.displayFieldsRight[i].type === 'currency') {
                        this.filters[this.currentTable.displayFieldsRight[i].key] = { min: null, max: null }
                    } else {
                        this.filters[this.currentTable.displayFieldsRight[i].key] = ''
                    }
                }
            }
        },
		watch     : {
            filters: {
                deep: true,
                handler() {
                    console.log(this.itemsDisplayList)
                }
            },
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
<template>
    <v-card>
        <v-card-title>
            {{ panel.title }}
            <v-spacer />
            <v-btn color='info' icon title='Edit Panel'><v-icon>{{ mdiIconsList.PENCIL }}</v-icon></v-btn>
            <v-btn color='error' icon title='Remove Panel'><v-icon>{{ mdiIconsList.TRASHCANOUTLINE }}</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
		    <VuetifyDataTableComponent :headers='panel.headers' :items='filteredItems' :showSelect='false' />
        </v-card-text>
    </v-card>
</template>

<script>
    import VuetifyDataTableComponent from '@/components/shared/VuetifyDataTableComponent'
	import { MdiIcons } from '@/enums'
	import jwt from 'jsonwebtoken'

    export default {
		name      : "dashboard-panel-component",
		props     : [],
		components: { VuetifyDataTableComponent },
		created()   {},
		computed  : {
			mdiIconsList() {
				return MdiIcons
			},
			user() {
				return this.$store.getters['userStore/userData']
            },
            parsedJwt() {
				if (this.user.jwt !== null) {
					return jwt.decode(this.user.jwt, {complete: true})
				} else {
					return null
				}
            },
            getDynamicTable() {
                return this.$store.getters['dynamicTableStore/getDynamicTableByKey'](this.panel.table_key)
            },
            getTableRecords() {
                return this.$store.getters['dynamicTableContentStore/getRecordsByTid'](this.getDynamicTable.id).map( (item) => { return { id: item.id, tid: item.tid, ...item.content } })
            },
            filteredItems() {
                return this.getTableRecords.filter( (item) => {
                    let passFilter = true
                    for (let i in this.panel.filters) {

                    }
                    if (passFilter) return item
                })
            },
            panel() {
                return {
                    title: 'User Settings',
                    headers: [
                        { text: 'ID', value: 'id', align: 'left', sortable: true },
                        { text: 'Name', value: 'name', align: 'left', sortable: true },
                        { text: 'Created By', value: 'created_by', align: 'left', sortable: true },
                        { text: 'Created At', value: 'created_at', align: 'left', sortable: true },
                        { text: 'Updated At', value: 'updated_at', align: 'left', sortable: true }
                    ],
                    items: [],
                    table_key: 'user_settings',
                    filters: []
                }
            }
		},
		data()      { return {} },
		methods   : {},
		watch     : {}
    }
</script>

<style>

</style>
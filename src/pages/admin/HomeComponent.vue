<template>
    <div>
		<div class='row'>
			<div class='col'>
        		<h1><v-icon>{{ mdiIconsList.VIEWDASHBOARD }}</v-icon> Admin Dashboard</h1>
			</div>
			<div class='col text-right'>
				<ManageDashboardDialogComponent />
			</div>
		</div>
		<p>This project will be your first step towards building out an impressive web based empire!</p>
		<div class='row' v-for='(rowManagement,index) in panelList' :key='index'>
			<div :class='"col-md-" + 12/rowManagement.length' v-for='(item,index2) in rowManagement' :key='index2'>
				<DashboardPanelComponent :panel='item' />
			</div>
		</div>
    </div>
</template>

<script>
	import DashboardPanelComponent from '@/components/shared/DashboardPanelComponent'
	import ManageDashboardDialogComponent from '@/components/dialog/ManageDashboardDialogComponent'
	import { FieldTypes, MdiIcons } from '@/enums'
    export default {
		name      : "dashboard-component",
		props     : [],
		components: { DashboardPanelComponent, ManageDashboardDialogComponent },
		created()   {},
		computed  : {
			mdiIconsList() {
				return MdiIcons
			},
			examplePanel() {
				return {
					title: 'User Settings',
                    headers: [
                        { text: 'ID', value: 'id', align: 'left', sortable: true },
                        { text: 'Name', value: 'name', align: 'left', sortable: true },
                        { text: 'Created By', value: 'created_by', align: 'left', sortable: true },
                        { text: 'Created At', value: 'created_at', align: 'left', sortable: true },
                        { text: 'Updated At', value: 'updated_at', align: 'left', sortable: true }
                    ],
                    table_key: 'user_settings',
                    filters: [
						{
							field: 'name',
							fieldType: FieldTypes.TEXT,
							type: '', // eq,not eq,contains,starts w/,ends w/,gt,lt,gte,lte,within,outside
							value: null,
							min: null,
							max: null,
						}
					]
				}
			},
			panelList() {
				return [
					[this.examplePanel,this.examplePanel],
					[this.examplePanel]
				]
			}
		},
		data()      { return {} },
		methods   : {},
		watch     : {}
    }
</script>

<style scoped>
</style>
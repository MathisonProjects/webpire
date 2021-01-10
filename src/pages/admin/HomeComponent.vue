<template>
    <div>
		<div class='row'>
			<div class='col'>
        		<h1><v-icon>{{ mdiIconsList.VIEWDASHBOARD }}</v-icon> Admin Dashboard</h1>
			</div>
			<div class='col text-right'>
				<v-btn color='primary' small><v-icon>{{ mdiIconsList.PLUS }}</v-icon> Add Panel</v-btn>
			</div>
		</div>
		<p>This project will be your first step towards building out an impressive web based empire!</p>
		<div class='row'>
			<div class='col-xs-12 col-sm-12 col-md-6'>
				<DashboardPanelComponent />
			</div>
		</div>
    </div>
</template>

<script>
	import DashboardPanelComponent from '@/components/shared/DashboardPanelComponent'
	import { MdiIcons } from '@/enums'
    export default {
		name      : "dashboard-component",
		props     : [],
		components: { DashboardPanelComponent },
		created()   {},
		computed  : {
			mdiIconsList() {
				return MdiIcons
			}
		},
		data()      { return {} },
		methods   : {},
		watch     : {}
    }
</script>

<style scoped>
</style>
<template>
    <div>
        <h1><v-icon>{{ mdiIconsList.FACTORY }}</v-icon> Admin Dashboard</h1>
		<p>This project will be your first step towards building out an impressive web based empire!</p>
    </div>
</template>

<script>
	import { MdiIcons } from '@/enums'
    export default {
		name      : "home-component",
		props     : [],
		components: {},
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
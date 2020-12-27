<template>
    <div>
        <h1><v-icon>{{ mdiIconsList.FACTORY }}</v-icon> Welcome to Total Politics</h1>
		<p>Updates are pending...</p>
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
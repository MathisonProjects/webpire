<template>
    <div>
        <h1><v-icon>{{ mdiIconsList.FACTORY }}</v-icon> Example Component</h1>
    </div>
</template>

<script>
	import { MdiIcons } from '@/enums'
    export default {
		name      : "example-component",
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
<template>
    <div>
        <h1><v-icon large>{{ mdiIconsList.TESTTUBEEMPTY }}</v-icon> Dashboard</h1>
		<p><b>AWS Vue Template</b> This is built off of a template.</p>
    </div>
</template>

<script>
    import { MdiIcons } from '@/enums'

    export default {
		name      : "template-component",
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

<style>

</style>
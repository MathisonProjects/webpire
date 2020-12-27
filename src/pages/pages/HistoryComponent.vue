<template>
    <div>
        <h1><v-icon large>{{ mdiIconsList.TESTTUBEEMPTY }}</v-icon> Total Politics History</h1>
		<p>The scribes are busy at work...</p>
    </div>
</template>

<script>
	import { MdiIcons } from '@/enums'
	import jwt from 'jsonwebtoken'

    export default {
		name      : "history-component",
		props     : [],
		components: {},
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
            }
		},
		data()      { return {} },
		methods   : {},
		watch     : {}
    }
</script>

<style>

</style>
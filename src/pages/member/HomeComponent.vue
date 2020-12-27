<template>
    <div>
        <h1><v-icon large>{{ mdiIconsList.VIEWDASHBOARD }}</v-icon> Dashboard</h1>
		<div class='row text-center'>
			<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2'>
				<v-btn color='primary' block x-large @click='$router.push("/m/user-search")'>
					<v-icon x-large>{{ mdiIconsList.ACCOUNTMULTIPLE }}</v-icon>
					Profile Search
				</v-btn>
			</div>
			<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2'>
				<v-btn color='primary' block x-large @click='$router.push("/m/chat")'>
					<v-icon x-large>{{ mdiIconsList.CHAT }}</v-icon>
					Messages
				</v-btn>
			</div>
			<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2'>
				<v-btn color='primary' block x-large @click='$router.push("/m/settings")'>
					<v-icon x-large>{{ mdiIconsList.COGS }}</v-icon>
					Settings
				</v-btn>
			</div>
			<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2'>
				<v-btn color='primary' block x-large>
					<v-icon x-large>{{ mdiIconsList.HELP }}</v-icon>
					COMING SOON...
				</v-btn>
			</div>
			<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2'>
				<v-btn color='primary' block x-large>
					<v-icon x-large>{{ mdiIconsList.HELP }}</v-icon>
					COMING SOON...
				</v-btn>
			</div>
			<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2'>
				<v-btn color='primary' block x-large>
					<v-icon x-large>{{ mdiIconsList.HELP }}</v-icon>
					COMING SOON...
				</v-btn>
			</div>
		</div>
    </div>
</template>

<script>
	import { MdiIcons } from '@/enums'
	import jwt from 'jsonwebtoken'

    export default {
		name      : "member-home-component",
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
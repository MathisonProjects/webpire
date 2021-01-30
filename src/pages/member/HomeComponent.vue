<template>
    <div>
        <h1><v-icon large>{{ mdiIconsList.VIEWDASHBOARD }}</v-icon> Dashboard</h1>
		<div class='row text-center'>
			<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2' v-for='(item,index) in menu' :key='index'>
				<v-btn color='primary' block x-large @click='$router.push(item.key)'><v-icon x-large>{{ item.icon }}</v-icon> {{ item.text }}</v-btn>
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
			},
			menu() {
				return this.$store.state.menuStore.memberMenu.sort( (a,b) => {
					if (a.oid > b.oid) return 0
					if (a.oid < b.oid) return -1
				})
			}
		},
		data()      { return {} },
		methods   : {},
		watch     : {}
    }
</script>

<style>

</style>
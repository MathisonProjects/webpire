<template>
    <div>
		<div class='row'>
			<div class='col'><h1><v-icon large>{{ mdiIconsList.ACCOUNT }}</v-icon> Users</h1></div>
			<div class='col text-right'>
				<v-btn color='primary' small @click='mode = adminModesList.VIEW' v-if='mode !== adminModesList.VIEW'><v-icon>{{ mdiIconsList.BACKBURGER }}</v-icon> Back</v-btn>
				<v-btn color='primary' small @click='mode = adminModesList.CREATE'><v-icon>{{ mdiIconsList.PLUS }}</v-icon> Create</v-btn>
				<v-btn color='success' small @click='validateUser' v-if='selected.length > 0'><v-icon>{{ mdiIconsList.CHECK }}</v-icon> Validate</v-btn>
				<v-btn color='warning' small v-if='selected.length === 1'><v-icon>{{ mdiIconsList.REFRESH }}</v-icon> Change Password</v-btn>
			</div>
		</div>

        <VuetifyDataTableComponent :headers='userHeaders' :items='usersList' @tableUpdate='tableUpdate' :showSelect='true' v-if='mode === adminModesList.VIEW' />

		<RegisterComponent v-if='mode === adminModesList.CREATE' />

    </div>
</template>

<script>
	import { AdminMode, MdiIcons } from '@/enums'
	import jwt from 'jsonwebtoken'
	import VuetifyDataTableComponent from '@/components/shared/VuetifyDataTableComponent'
	import RegisterComponent from '@/components/site/admin//landing/RegisterComponent'

    export default {
		name      : "users-component",
		props     : [],
		components: {
			VuetifyDataTableComponent,
			RegisterComponent
		},
		created()   {},
		computed  : {
			adminModesList() {
				return AdminMode
			},
			mdiIconsList() {
				return MdiIcons
			},
			user() {
				return this.$store.getters['userStore/userData']
			},
			usersList() {
				return this.$store.getters['usersStore/usersList']
			},
            parsedJwt() {
				if (this.user.jwt !== null) {
					return jwt.decode(this.user.jwt, {complete: true})
				} else {
					return null
				}
			},
			userHeaders() {
				const visibleFields = ['id', 'username', 'email', 'email_verified', 'enabled', 'status', 'created_at', 'updated_at']
				const pageHeaders = [ ]

				for (let i in visibleFields) {
					let fixedText = visibleFields[i].replace('_', ' ')
					fixedText = fixedText.split(' ').map( item => { return item.charAt(0).toUpperCase() + item.slice(1)}).join(' ')
					pageHeaders.push({
						text: fixedText, value: visibleFields[i], align: 'middle', sortable: true
					})
				}
				return pageHeaders
			}
		},
		data()      {
			return {
				mode: AdminMode.VIEW,
				selected: []
			}
		},
		methods   : {
			tableUpdate(response) {
				this.selected = response
			},
			validateUser() {
				for (let i in this.selected) {
					const user = this.selected[i]
					console.log(user)
				}
			}
		},
		watch     : {}
    }
</script>

<style>

</style>
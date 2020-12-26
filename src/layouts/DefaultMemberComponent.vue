<template>
    <v-app>
		<SnackbarNotificationComponent />
		<SubmitSupportTicket class='position-absolute' />
        <v-main v-if='loggedIn'>
			<v-container>
				<transition name='fade' mode='out-in'>
					<router-view />
				</transition>
			</v-container>
		</v-main>
    </v-app>
</template>

<script>
	import SnackbarNotificationComponent from '@/components/shared/SnackbarNotificationComponent'
	import SubmitSupportTicket from '@/components/shared/SubmitSupportTicket'
	import { MdiIcons } from '@/enums'
	import jwt from 'jsonwebtoken'

    export default {
		name      : "layout-member-component",
		props     : [],
		components: {
			SnackbarNotificationComponent,
			SubmitSupportTicket
		},
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
			loggedIn() {
				if (this.parsedJwt !== null) {
					const expirationTime = parseInt(this.parsedJwt.payload.exp + '000')
					const currentTime = Date.now()
					if (expirationTime > currentTime) {
						return true
					} else {
						this.$router.push('/access')
					}
				}
				this.$router.push('/access')
			}
		},
		data()      { return {} },
		methods   : {},
		watch     : {}
    }
</script>

<style>
</style>
<template>
    <v-app>
		<SnackbarNotificationComponent />
		<video autoplay muted loop id="myVideo" v-if='((loggedIn && !admin) || !loggedIn)'>
			<source src="/videos/webpire_admin.mp4" type="video/mp4">
		</video>

        <v-main v-if='!loggedIn'>
			<v-container fluid>
				<div class='row'>
					<div class='col-xs-12 col-sm-1 col-md-2 col-lg-3'></div>
					<div class='col-xs-12 col-sm-10 col-md-8 col-lg-6'>
						<RegisterComponent v-if='!loginMode' @callbackHandler='loginMode = !loginMode'  />
						<LoginComponent v-if='loginMode' @callbackHandler='loginMode = !loginMode' />
					</div>
				</div>
			</v-container>
        </v-main>

        <v-main v-if='loggedIn && admin'>
			<AdminLayoutComponent>
				<transition name='fade' mode='out-in'>
					<router-view />
				</transition>
			</AdminLayoutComponent>
		</v-main>

		<v-content v-if='!admin && loggedIn'>
			<v-container fluid>
				<v-card class="mx-auto">
					<v-card-text>
						<h3>Ack!</h3>
						<p>You have found the admin section. You do not have permission to be here.</p>	
						<iframe width="100%" height="550" src="https://www.youtube.com/embed/ItZloH0XLHc?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					</v-card-text>
				</v-card>
			</v-container>
		</v-content>
    </v-app>
</template>

<script>
	import RegisterComponent from '@/components/site/admin/landing/RegisterComponent'
	import LoginComponent from '@/components/site/admin/landing/LoginComponent'
    import SnackbarNotificationComponent from '@/components/shared/SnackbarNotificationComponent'
	import AdminLayoutComponent from '@/components/site/admin/AdminLayoutComponent'
	import jwt from 'jsonwebtoken'
    import { MdiIcons } from '@/enums'

    export default {
		name      : "admin-layout-component",
		props     : [],
		components: {
			RegisterComponent,
			LoginComponent,
            SnackbarNotificationComponent,
            AdminLayoutComponent
        },
		created()   {},
		computed  : {
			user() {
				return this.$store.getters['userStore/userData']
			},
			loggedIn() {
				if (this.parsedJwt !== null) {
					const expirationTime = parseInt(this.parsedJwt.payload.exp + '000')
					const currentTime = Date.now()
					if (expirationTime > currentTime) {
						return true
					} else {
						return false
					}
				}
				return false
			},
			admin() {
				return true
			},
			parsedJwt() {
				if (this.user.jwt !== null) {
					return jwt.decode(this.user.jwt, {complete: true})
				} else {
					return null
				}
			},
			mdiIconsList() {
				return MdiIcons
			}
		},
		data()      {
			return {
				loginMode: false
			}
		},
		methods   : {},
		watch     : {}
    }
</script>


<style scoped>
	#myVideo {
		position: fixed;
		right: 0;
		bottom: 0;
		min-width: 100%;
		min-height: 100%;
	}
</style>
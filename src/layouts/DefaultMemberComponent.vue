<template>
    <v-app>
		<SnackbarNotificationComponent />
        <v-main>
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
	import { MdiIcons } from '@/enums'
	import jwt from 'jsonwebtoken'

    export default {
		name      : "layout-member-component",
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
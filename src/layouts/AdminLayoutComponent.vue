<template>
    <v-app>
		<SnackbarNotificationComponent />
        <v-main>
			<AdminLayoutComponent>
				<transition name='fade' mode='out-in'>
					<router-view />
				</transition>
			</AdminLayoutComponent>
		</v-main>
    </v-app>
</template>

<script>
    import SnackbarNotificationComponent from '@/components/shared/SnackbarNotificationComponent'
    import AdminLayoutComponent from '@/components/site/admin/AdminLayoutComponent'
    import { MdiIcons } from '@/enums'

    export default {
		name      : "admin-layout-component",
		props     : [],
		components: {
            SnackbarNotificationComponent,
            AdminLayoutComponent
        },
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
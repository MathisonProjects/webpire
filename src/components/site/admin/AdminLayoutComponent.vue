<template>
    <div>
        <div class='row'>
            <div class='col-md-6'>
                <AdminDrawerComponent />
            </div>
            <div class='col-md-6 text-right'>
                <v-btn icon rounded @click="$router.push('/')"><v-icon small>{{ mdiIconsList.HOME }}</v-icon></v-btn>
                <v-btn icon rounded><v-icon small>{{ mdiIconsList.BELL }}</v-icon></v-btn>
                <v-btn icon rounded @click='logout'><v-icon small>{{ mdiIconsList.LOGOUT }}</v-icon></v-btn>
            </div>
        </div>
        <v-container>
            <slot>This is the default content if nothing gets specified to go here</slot>
        </v-container>
    </div>
</template>

<script>
    import AdminDrawerComponent from './AdminDrawerComponent'
    import {MdiIcons} from '@/enums'
    export default {
		name      : "admin-layout-component",
		props     : [],
		components: {
            AdminDrawerComponent
        },
		created()   {},
		computed  : {
            mdiIconsList() {
                return MdiIcons
            }
        },
		data()      {
            return {}
        },
		methods   : {
            logout() {
                this.$store.dispatch('userStore/logout')
                this.$p.notifications.logoutSuccessfulNotification()
            }
        },
		watch     : {}
    }
</script>

<style scoped>
</style>
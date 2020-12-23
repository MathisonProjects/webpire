<template>
    <div>
        <div class='row'>
            <div class='col-md-6'>
                <AdminDrawerComponent />
            </div>
            <div class='col-md-6 text-right'>
                <span class='overline' title='Session Remaining'>{{ expirationTime }} Seconds</span>
                <v-btn icon rounded @click="$router.push('/')"><v-icon small>{{ mdiIconsList.HOME }}</v-icon></v-btn>
                <v-btn icon rounded><v-icon small>{{ mdiIconsList.BELL }}</v-icon></v-btn>
                <v-btn icon rounded @click='refreshData'><v-icon small>{{ mdiIconsList.REFRESH }}</v-icon></v-btn>
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
	import jwt from 'jsonwebtoken'
    import {MdiIcons, SocketFuncs} from '@/enums'
    export default {
		name      : "admin-layout-component",
		props     : [],
		components: {
            AdminDrawerComponent
        },
		created()   {
            var self = this
            setInterval( () => {
                self.$data.dateNow = Date.now()
            }, 1000)
        },
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
			expirationTime() {
                let timeRemaining = Math.ceil((this.parsedJwt.payload.exp * 1000 - this.dateNow)/1000)
                if (timeRemaining < 0) {
                    this.$store.dispatch('userStore/logout')
                }
				return timeRemaining
			}
        },
		data()      {
            return {
                dateNow: Date.now()
            }
        },
		methods   : {
            refreshData() {
                this.$p.socket.socketEmitFire(SocketFuncs.GETDBSTORE, {})
            },
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
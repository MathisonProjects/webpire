<template>
    <div>
        <div v-if='!loggedIn'>
            <RegisterComponent v-if='accessModeList.REGISTER === accessMode' @callbackHandler='accessMode = accessModeList.LOGIN'  />
		    <LoginComponent v-if='accessModeList.LOGIN === accessMode' @callbackHandler='callbackHandler' />
        </div>
        <div v-if='loggedIn'>
            Logged in
        </div>
    </div>
</template>

<script>
    import RegisterComponent from '@/components/site/admin/landing/RegisterComponent'
	import LoginComponent from '@/components/site/admin/landing/LoginComponent'
    import { AccessMode, MdiIcons } from '@/enums'
	import jwt from 'jsonwebtoken'


    export default {
		name      : "access-component",
		props     : [],
		components: {
            RegisterComponent,
            LoginComponent
        },
		created()   {},
		computed  : {
			mdiIconsList() {
				return MdiIcons
            },
            accessModeList() {
                return AccessMode
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
                        this.$router.push('/m')
						return true
					} else {
						return false
					}
				}
				return false
			}
		},
		data()      {
            return {
                accessMode: AccessMode.REGISTER
            }
        },
		methods   : {
            callbackHandler(response) {
                console.log(response)
            }
        },
		watch     : {}
    }
</script>

<style>

</style>
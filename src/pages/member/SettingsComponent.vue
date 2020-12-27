<template>
    <div>
		<v-card>
			<v-card-title><h2><v-icon large>{{ mdiIconsList.COGS }}</v-icon> User Settings</h2></v-card-title>
			<v-card-text>
				<div class='row'>
					<div class='col'>
						<div class='row' v-for='(item,index) in userSettings.displayFieldsLeft' :key='index'>
							<div class='col'>
								<DynamicFieldComponent v-model='dataForm[item.key]' :item='item' :disabled='item.key === "name" || item.key === "created_at" || item.key === "updated_at" || item.key === "role"' />
							</div>
						</div>
					</div>
					<div class='col'>
						<div class='row' v-for='(item,index) in userSettings.displayFieldsRight' :key='index'>
							<div class='col'>
								<DynamicFieldComponent v-model='dataForm[item.key]' :item='item' :disabled='item.key === "name" || item.key === "created_at" || item.key === "updated_at" || item.key === "role"' />
							</div>
						</div>
					</div>
				</div>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn color='success' small @click='updateUserSettings'><v-icon>{{ mdiIconsList.CONTENTSAVE }}</v-icon> Update</v-btn>
			</v-card-actions>
		</v-card>
    </div>
</template>

<script>
	import DynamicFieldComponent from '@/components/site/admin/dynamic/DynamicFieldComponent'
	import { MdiIcons, SocketFuncs } from '@/enums'
	import jwt from 'jsonwebtoken'

    export default {
		name      : "member-settings-component",
		props     : [],
		components: {
			DynamicFieldComponent
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
			userSettings() {
				let userSettings = this.$store.getters['dynamicTableStore/getDynamicTableByKey']('user_settings')
				userSettings.displayFieldsLeft = userSettings.displayFieldsLeft.filter( item => item.key !== 'created_by' && item.key !== 'updated_by' && item.key !== 'user' && item.key !== 'chat_partners')
				userSettings.displayFieldsRight = userSettings.displayFieldsRight.filter( item => item.key !== 'created_by' && item.key !== 'updated_by' && item.key !== 'user' && item.key !== 'chat_partners')
				return userSettings
			}
		},
		data()      {
			return {
				dataForm: {
					...this.$store.getters['userStore/userData'].settings.content
				}
			}
		},
		methods   : {
			updateUserSettings() {
				const settings = this.user.settings
				settings.content = this.dataForm
				this.$p.socket.socketEmitFire(SocketFuncs.SAVEDYNAMICTABLECONTENT,settings)
			}
		},
		watch     : {}
    }
</script>

<style>

</style>
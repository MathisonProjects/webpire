<template>
    <div>
		<div class='row'>
			<div class='col-md-4'>
				<v-card v-if='loggedIn'>
					<v-card-text>
						<h4>What would you like to say to Total Politics...?</h4>
						<div class='row mt-3'>
							<div class='col-xs-12 col-md-12'>
								<v-file-input class='mt-4' label='Post Photo' placeholder='What photo would you like to upload?' v-model='fileUpload' @change='runUpload' dense />
							</div>
							<div class='col'>
								<v-textarea label='Post Content' placeholder='eg. Total Politics is a land of free speech and civility /s' />
							</div>
						</div>
					</v-card-text>
					<v-card-actions>
						<v-spacer />
						<v-btn color='primary'><v-icon>{{ mdiIconsList.SEND }}</v-icon> POST</v-btn>
					</v-card-actions>
				</v-card>
				<v-card v-if='!loggedIn'>
					<v-card-title>Please Login to Post</v-card-title>
				</v-card>
			</div>
			<div class='col'>
				<v-card v-for='(item,index) in posts' :key='index' class='my-3'>
					<v-card-title>
						By {{ userList[item.content.created_by].name }}
						<v-spacer />
						{{ $p.standardFuncs.standardizedTime(item.content.created_at) }}
					</v-card-title>
					<v-card-text>
						<div class='row'>
							<div class='col-xs-12 col-xs-6 col-md-3'>
								<img :src='"https://upload.awsvuem.com/" + item.content.display_photo' class='w-100 br-10' />
							</div>
							<div class='col'>
								{{ item.content.name }}
							</div>
						</div>
					</v-card-text>
				</v-card>
			</div>
		</div>
    </div>
</template>

<script>
	import { MdiIcons } from '@/enums'
	import jwt from 'jsonwebtoken'

    export default {
		name      : "template-component",
		props     : [],
		components: {},
		created()   {},
		computed  : {
			dynamicTableId() {
                return this.$store.getters['dynamicTableStore/getDynamicTableByKey']('user_posts').id
            },
            posts() {
                return this.$store.getters['dynamicTableContentStore/getRecordsByTid'](this.dynamicTableId).sort( (a, b) => {
					if (a.content.created_at > b.created_at) return 1
					if (a.created_at < b.created_at) return -1
					return 0
				}).reverse()
			},
			userList() {
				let userSettings = this.$store.getters['dynamicTableStore/getDynamicTableByKey']('user_settings').id
				let userList = this.$store.getters['dynamicTableContentStore/getRecordsByTid'](userSettings)
				const formattedUserList = {}
				for (let i in userList) {
					formattedUserList[userList[i].content.user] = userList[i].content
				}
				return formattedUserList
            },
			mdiIconsList() {
				return MdiIcons
			},
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
            parsedJwt() {
				if (this.user.jwt !== null) {
					return jwt.decode(this.user.jwt, {complete: true})
				} else {
					return null
				}
            }
		},
		data()      {
			return {
				fileUpload: null,
				fieldValue: null
			}
		},
		methods   : {
			runUpload() {
				this.$p.fileManagement.runSaveImage(this.fileUpload).then( response => {
                    this.$p.socket.socketEmitFire(SocketFuncs.UPLOADFILE, response)
                    this.fieldValue = response.file_name
                })
			}
		},
		watch     : {}
    }
</script>

<style>

</style>
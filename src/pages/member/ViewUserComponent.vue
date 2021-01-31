<template>
    <div>
        <h1>
            <v-icon large v-if='profileUser.content.role !== "Admin"' :title='profileUser.content.role'>{{ mdiIconsList.ACCOUNT }}</v-icon>
            <v-icon large v-if='profileUser.content.role === "Admin"' title='Admin'>{{ mdiIconsList.ACCOUNTKEY }}</v-icon>
            {{ profileUser.content.name }}</h1>
		<div class='row'>
            <div class='col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12'>
                <img src='/images/unknown_profile_image.jpg' class='w-100 br-10' v-if='profileUser.content.profile_photo === null || profileUser.content.profile_photo === undefined' />
                <img :src='"https://upload.awsvuem.com/" + profileUser.content.profile_photo' class='w-100 br-10' v-if='profileUser.content.profile_photo !== null && profileUser.content.profile_photo !== undefined' />
            </div>
            <div class='col'>
                <div class='row'>
                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center'>
                        <v-btn color='primary' icon title='Send Message'><v-icon>{{ mdiIconsList.CHAT }}</v-icon></v-btn>
                        <v-btn color='warning' icon title='Hide Profile'><v-icon>{{ mdiIconsList.EYEOFF }}</v-icon></v-btn>
                        <v-btn color='error' icon title='Report Profile'><v-icon>{{ mdiIconsList.BULLHORN }}</v-icon></v-btn>
                    </div>
                    <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                        <v-card>
                            <v-card-text>
                                <div class='row'>
                                    <div class='col'>
                                        <div class='row'>
                                            <div class='col-md-4'>Social Media</div>
                                            <div class='col'>
                                                <v-btn icon small color='primary' @click='openLink(profileUser.content.link_facebook)' v-if='profileUser.content.link_facebook !== undefined && profileUser.content.link_facebook !== null && profileUser.content.link_facebook !== ""'><v-icon>{{ mdiIconsList.FACEBOOK }}</v-icon></v-btn>
                                                <v-btn icon small color='info' @click='openLink(profileUser.content.link_twitter)' v-if='profileUser.content.link_twitter !== undefined && profileUser.content.link_twitter !== null && profileUser.content.link_twitter !== ""'><v-icon>{{ mdiIconsList.TWITTER }}</v-icon></v-btn>
                                                <v-btn icon small color='error' @click='openLink(profileUser.content.link_instagram)' v-if='profileUser.content.link_instagram !== undefined && profileUser.content.link_instagram !== null && profileUser.content.link_instagram !== ""'><v-icon>{{ mdiIconsList.INSTAGRAM }}</v-icon></v-btn>
                                                <v-btn icon small color='warning' @click='openLink(profileUser.content.link_snapchat)' v-if='profileUser.content.link_snapchat !== undefined && profileUser.content.link_snapchat !== null && profileUser.content.link_snapchat !== ""'><v-icon>{{ mdiIconsList.SNAPCHAT }}</v-icon></v-btn>
                                            </div>
                                        </div>
                                    </div>
                                    <div class='col'></div>
                                </div>
                            </v-card-text>
                        </v-card>
                    </div>
                    <div class='col' v-html='profileUser.content.bio' v-if='profileUser.content.bio !== undefined'></div>
                    <div class='col overline' v-if='profileUser.content.bio === undefined'>This user has not created their bio yet!</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import { MdiIcons } from '@/enums'
	import jwt from 'jsonwebtoken'

    export default {
		name      : "member-view-user-component",
		props     : [],
		components: {},
		created()   {},
		computed  : {
            userSettingsId() {
                return this.$store.getters['dynamicTableStore/getDynamicTableByKey']('user_settings').id
            },
            userList() {
				return this.$store.getters['dynamicTableContentStore/getRecordsByTid'](this.userSettingsId)
            },
            uid() {
                return this.$route.params.uid
            },
            profileUser() {
                return this.userList.filter( item => item.id === this.uid)[0]
            },
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
		methods   : {
            openLink(link) {
                window.open(link)
            }
        },
		watch     : {}
    }
</script>

<style>

</style>
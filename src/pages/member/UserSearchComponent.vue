<template>
    <div>
        <h1><v-icon large>{{ mdiIconsList.ACCOUNTSEARCH }}</v-icon> Profile Search</h1>
        <div class='row'>
            <div class='col'></div>
            <div class='col text-right'>
                <v-btn color='primary' icon @click='searchFormat = displayTypeList.GRID'><v-icon>{{ mdiIconsList.TABLE }}</v-icon></v-btn>
                <v-btn color='primary' icon @click='searchFormat = displayTypeList.LIST'><v-icon>{{ mdiIconsList.FORMATLISTNUMBERED }}</v-icon></v-btn>
            </div>
        </div>
        <div class='row'>
            <div class='col'>
                <v-card>
                    <v-card-title>
                        <v-icon>{{ mdiIconsList.FILTER }}</v-icon> Filters
                        <v-spacer />
                        <v-btn color='success' icon><v-icon>{{ mdiIconsList.REFRESH }}</v-icon></v-btn>
                    </v-card-title>
                    <v-card-text>
                        <div class='row'>
                            <div class='col'></div>
                            <div class='col'></div>
                        </div>
                    </v-card-text>
                </v-card>
            </div>
            <div class='col' v-if='profileSelected !== null'>
                <v-card>
                    <v-card-title>
                        {{ profileSelected.content.name }}
                        <v-spacer />
                        <v-btn color='primary' icon @click='profileSelected = null'><v-icon>{{ mdiIconsList.MINUS }}</v-icon></v-btn>
                    </v-card-title>
                    <v-card-text v-if='profileSelected.content.bio !== undefined'>
                        {{ profileSelected.content.bio }}
                    </v-card-text>
                    <v-card-text v-if='profileSelected.content.bio === undefined'>
                        This profile does not have a bio...
                    </v-card-text>
                    <v-card-action>
                        <v-spacer />
                        <v-btn color='success' icon title='View Profile' @click='$router.push("/m/user/"+profileSelected.id)'><v-icon>{{ mdiIconsList.COMMENTEYEOUTLINE }}</v-icon></v-btn>
                        <v-btn color='info' icon title='View Brief' @click='profileSelected = profileSelected.id'><v-icon>{{ mdiIconsList.EYE }}</v-icon></v-btn>
                        <v-btn color='warning' icon title='Hide Profile'><v-icon>{{ mdiIconsList.EYEOFF }}</v-icon></v-btn>
                        <v-btn color='error' icon title='Report Profile'><v-icon>{{ mdiIconsList.BULLHORN }}</v-icon></v-btn>
                    </v-card-action>
                </v-card>
            </div>
        </div>

        <div class='row' v-if='searchFormat === displayTypeList.GRID'>
            <div class='col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12' v-for='(item,index) in filteredUsers' :key='index'>
                <v-card>
                    <v-card-title>
                        <v-btn text @click='profileSelected = item'>{{ item.content.name }}</v-btn>
                        <v-spacer />
                        <v-btn color='success' icon title='View Profile' @click='$router.push("/m/user/"+item.id)'><v-icon>{{ mdiIconsList.COMMENTEYEOUTLINE }}</v-icon></v-btn>
                        <v-btn color='info' icon title='View Brief' @click='profileSelected = item.id'><v-icon>{{ mdiIconsList.EYE }}</v-icon></v-btn>
                        <v-btn color='warning' icon title='Hide Profile'><v-icon>{{ mdiIconsList.EYEOFF }}</v-icon></v-btn>
                        <v-btn color='error' icon title='Report Profile'><v-icon>{{ mdiIconsList.BULLHORN }}</v-icon></v-btn>
                    </v-card-title>
                    <v-card-text>
                        <div class='row'>
                            <div class='col-md-4' v-if='item.content.profile_photo !== null && item.content.profile_photo !== undefined'>
                                <img :src='"https://upload.awsvuem.com/" + item.content.profile_photo' class='w-100 br-10' />
                            </div>
                            <div class='col-md-4' v-if='item.content.profile_photo === null || item.content.profile_photo === undefined'>
                                <img src='/images/unknown_profile_image.jpg' class='w-100 br-10' />
                            </div>
                            <div class='col' v-html='item.content.bio'></div>
                        </div>
                    </v-card-text>
                </v-card>
            </div>
        </div>
        <div v-if='searchFormat === displayTypeList.LIST'>
            <div class='row' v-for='(item,index) in filteredUsers' :key='index'>
                <div class='col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1'>
                    <img :src='"https://upload.awsvuem.com/" + item.content.profile_photo' class='w-100 br-10' v-if='item.content.profile_photo !== null && item.content.profile_photo !== undefined' />
                    <img src='/images/unknown_profile_image.jpg' class='w-100 br-10' v-if='item.content.profile_photo === null || item.content.profile_photo === undefined' />
                </div>
                <div class='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3'>
                    <v-btn text @click='profileSelected = item'>{{ item.content.name }}</v-btn>
                </div>
                <div class='col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8 text-right'>
                    <v-btn color='success' icon title='View Profile' @click='$router.push("/m/user/"+item.id)'><v-icon>{{ mdiIconsList.COMMENTEYEOUTLINE }}</v-icon></v-btn>
                    <v-btn color='info' icon title='View Brief' @click='profileSelected = item.id'><v-icon>{{ mdiIconsList.EYE }}</v-icon></v-btn>
                    <v-btn color='warning' icon title='Hide Profile'><v-icon>{{ mdiIconsList.EYEOFF }}</v-icon></v-btn>
                    <v-btn color='error' icon title='Report Profile'><v-icon>{{ mdiIconsList.BULLHORN }}</v-icon></v-btn>
                </div>
                <div class='col-md-12'>
                    <hr />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import { DisplayType, MdiIcons } from '@/enums'
	import jwt from 'jsonwebtoken'

    export default {
		name      : "user-search-component",
		props     : [],
		components: {},
		created()   {},
		computed  : {
            displayTypeList() {
                return DisplayType
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
            },
            userSettingsId() {
                return this.$store.getters['dynamicTableStore/getDynamicTableByKey']('user_settings').id
            },
            userList() {
				return this.$store.getters['dynamicTableContentStore/getRecordsByTid'](this.userSettingsId)
            },
            filteredUsers() {
                return this.userList
            }
		},
		data()      {
            return {
                profileSelected: null,
                searchFormat: DisplayType.GRID
            }
        },
		methods   : {},
		watch     : {}
    }
</script>

<style>

</style>
<template>
    <div>
        <h1><v-icon large>{{ mdiIconsList.VOTE }}</v-icon> Election Candidates</h1>

        <h3>Candidates</h3>

        <v-card class='mt-3' v-for='(item,id) in candidates' :key='id'>
            <v-card-title>
                {{ item.content.name }} - {{ item.content.description }}
                <v-spacer />
                Running For:
                {{ item.content.running_for }}
            </v-card-title>
            <v-card-text>
                <div class='row'>
                    <div class='col-xs-12 col-sm-6 col-md-3'>
                        <v-img :src='"https://upload.awsvuem.com/" + item.content.picture' class='br-10' />
                    </div>
                    <div class='col-xs-12 col-sm-6 col-md-9' v-html='item.content.bio'></div>
                </div>
            </v-card-text>
        </v-card>
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
                return this.$store.getters['dynamicTableStore/getDynamicTableByKey']('election_candidates').id
            },
            candidates() {
                return this.$store.getters['dynamicTableContentStore/getRecordsByTid'](this.dynamicTableId)
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
		methods   : {},
		watch     : {}
    }
</script>

<style>

</style>
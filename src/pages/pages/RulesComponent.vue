<template>
    <div>
        <h1><v-icon large>{{ mdiIconsList.BOOK }}</v-icon> Rules</h1>

        <h3 class='mt-2'>Facebook Community Standards</h3>
        <h3 class='mt-2'>Group Core Rules</h3>
        <v-expansion-panels>
            <v-expansion-panel v-for="(item,i) in rulesList" :key="i">
                <v-expansion-panel-header>{{item.content.name}}</v-expansion-panel-header>
                <v-expansion-panel-content>{{item.content.description}}</v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        <h3 class='mt-2'>Constitutional Amendments</h3>
        <h3 class='mt-2'>Bylaws</h3>
    </div>
</template>

<script>
	import { MdiIcons } from '@/enums'
	import jwt from 'jsonwebtoken'

    export default {
		name      : "rules-component",
		props     : [],
		components: {},
		created()   {},
		computed  : {
            dynamicTableId() {
                return this.$store.getters['dynamicTableStore/getDynamicTableByKey']('group_rules').id
            },
            rulesList() {
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
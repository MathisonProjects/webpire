<template>
    <v-card>
        <v-card-title>
            {{ currentTable.name }} <v-spacer /> <v-btn color='success' small @click='saveTableViewRecord'><v-icon>{{ mdiIconsList.CONTENTSAVE }}</v-icon> Save</v-btn>
        </v-card-title>
        <v-card-text>
            <div class='row'>
                <div class='col'>
                    <div class='row' v-for='(item,index) in currentTable.displayFieldsLeft' :key='index'>
                        <div class='col' v-if='item.type !== "filler"'>
                            <DynamicFieldComponent v-model='$attrs.value.content[item.key]' :item='item' />
                        </div>
                        <div class='col my-4' v-if='item.type === "filler"'><div class='mt-4'></div></div>
                    </div>
                </div>
                <div class='col'>
                    <div class='row' v-for='(item,index) in currentTable.displayFieldsRight' :key='index'>
                        <div class='col' v-if='item.type !== "filler"'>
                            <DynamicFieldComponent v-model='$attrs.value.content[item.key]' :item='item' />
                        </div>
                        <div class='col my-4' v-if='item.type === "filler"'><div class='mt-4'></div></div>
                    </div>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    import DynamicFieldComponent from './DynamicFieldComponent'
	import { MdiIcons } from '@/enums'
	import jwt from 'jsonwebtoken'

    export default {
		name      : "dynamic-form-component",
		props     : [
            'currentTable'
        ],
        model: {
			event: 'formUpdate'
		},
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
            relatedOptions() {
                return this.$store.getters['dynamicTableContentStore/organizedByTable']
            },
            userList() {
                return this.$store.state.usersStore.userList
            }
		},
		data()      {
            return {
                fileUpload: []
            }
        },
		methods   : {
            saveTableViewRecord() {
                this.$emit('saveTableViewRecord')
            }
        },
		watch     : {}
    }
</script>

<style>

</style>
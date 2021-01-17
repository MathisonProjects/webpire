<template>
    <v-dialog>
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on"><v-icon>{{ mdiIconsList.PLUS }}</v-icon> Add Panel</v-btn>
        </template>

        <v-card>
            <v-card-title class="headline grey lighten-2">Privacy Policy</v-card-title>
            <v-card-text>
                <div class='row'>
                    <div class='col-md-4'>
                        <v-text-field v-model='dataForm.title' label='Dashpanel Title' placeholder='eg. User Settings Report' />
                    </div>
                    <div class='col-md-4'>
                        <v-select label='Reporting Table' placeholder='Select a table...' v-model='dataForm.table_key' :items='dynamicTablesList' item-value='key' item-text='name' />
                    </div>
                </div>
                <div class='row'>
                    <div class='col'>

                    </div>
                    <div class='col'></div>
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">I accept</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
	import { MdiIcons } from '@/enums'
	import jwt from 'jsonwebtoken'

    export default {
		name      : "manage-dashboard-dialog-component",
		props     : [],
		components: {},
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
            dynamicTablesList() {
                return this.$store.state.dynamicTableStore.tableList
            }
		},
		data()      {
            return {
                dialog: false,
                dataForm: {
                    title: null,
                    table_key: null,
                    fields: [],
                }
            }
        },
		methods   : {},
		watch     : {}
    }
</script>

<style>

</style>
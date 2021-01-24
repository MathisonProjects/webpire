<template>
    <div>
        <v-text-field :label='dynamicTableFieldsList.name' v-if='dynamicTableFieldsList.field_type === "text"' v-model='fieldValue' />
        <v-select :label='dynamicTableFieldsList.name' v-if='dynamicTableFieldsList.field_type === "dropdown"' v-model='fieldValue' :items='dynamicTableFieldsList.options.split(",")' />
    </div>
</template>

<script>
	import { MdiIcons } from '@/enums'
	import jwt from 'jsonwebtoken'

    export default {
		name      : "dynamic-form-field-component",
		props     : [
            'fieldId'
        ],
		components: {},
        model: {
			event: 'formUpdate'
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
            dynamicTableFields() {
                return this.$store.getters['dynamicTableStore/getDynamicTableByKey']('form_fields')
            },
            dynamicTableFieldsList() {
                return this.$store.getters['dynamicTableContentStore/getRecordsByTid'](this.dynamicTableFields.id).filter( item => {
                    return item.id === this.fieldId
                })[0].content
            }
		},
		data()      {
            return {
                fieldValue: null
            }
        },
		methods   : {},
		watch     : {
            fieldValue(newVal) {
                this.$emit('formUpdate',newVal)
            }
        }
    }
</script>

<style>

</style>
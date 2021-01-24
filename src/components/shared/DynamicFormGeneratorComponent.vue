<template>
    <v-card>
        <v-card-text>
            <div class='row'>
                <div class='col' v-if='dynamicTableContentForm.field_type_1 !== null'><DynamicFormFieldComponent :fieldId='dynamicTableContentForm.field_type_1' /></div>
                <div class='col' v-if='dynamicTableContentForm.field_type_2 !== null'><DynamicFormFieldComponent :fieldId='dynamicTableContentForm.field_type_2' /></div>
            </div>
            <div class='row'>
                <div class='col' v-if='dynamicTableContentForm.field_type_3 !== null'><DynamicFormFieldComponent :fieldId='dynamicTableContentForm.field_type_3' /></div>
                <div class='col' v-if='dynamicTableContentForm.field_type_4 !== null'><DynamicFormFieldComponent :fieldId='dynamicTableContentForm.field_type_4' /></div>
            </div>
            <div class='row'>
                <div class='col' v-if='dynamicTableContentForm.field_type_5 !== null'><DynamicFormFieldComponent :fieldId='dynamicTableContentForm.field_type_5' /></div>
                <div class='col' v-if='dynamicTableContentForm.field_type_6 !== null'><DynamicFormFieldComponent :fieldId='dynamicTableContentForm.field_type_6' /></div>
            </div>
            <div class='row'>
                <div class='col' v-if='dynamicTableContentForm.field_type_7 !== null'><DynamicFormFieldComponent :fieldId='dynamicTableContentForm.field_type_7' /></div>
                <div class='col' v-if='dynamicTableContentForm.field_type_8 !== null'><DynamicFormFieldComponent :fieldId='dynamicTableContentForm.field_type_8' /></div>
            </div>
            <div class='row'>
                <div class='col' v-if='dynamicTableContentForm.field_type_9 !== null'><DynamicFormFieldComponent :fieldId='dynamicTableContentForm.field_type_9' /></div>
                <div class='col' v-if='dynamicTableContentForm.field_type_10 !== null'><DynamicFormFieldComponent :fieldId='dynamicTableContentForm.field_type_10' /></div>
            </div>
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn color='primary' small @click='fireSubmit'>Submit</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import DynamicFormFieldComponent from './DynamicFormFieldComponent'
	import { MdiIcons } from '@/enums'
	import jwt from 'jsonwebtoken'

    export default {
		name      : "dynamic-form-generator-component",
		props     : [
            'formKey'
        ],
		components: {
            DynamicFormFieldComponent
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
            dynamicTableForm() {
                return this.$store.getters['dynamicTableStore/getDynamicTableByKey']('form_manager')
            },
            dynamicTableContentForm() {
                return this.$store.getters['dynamicTableContentStore/getRecordsByTid'](this.dynamicTableForm.id).filter( item => {
                    return item.content.key === this.formKey
                })[0].content
            }
		},
		data()      {
            return {
                formData: {},
                submittal: {}
            }
        },
		methods   : {
            fireSubmit() {
                if (this.dynamicTableContentForm.target === 'table') {
                    this.submittal.created_at = Date.now()
                    this.submittal.updated_at = Date.now()
                    this.submittal.created_by = this.user.sub
                    this.submittal.updated_by = this.user.sub
                    const formSubmittal = {
                        id: uuid(),
                        tid: this.dynamicTableForm.id,
                        created_at: Date.now(),
                        updated_at: Date.now(),
                        content: this.submittal
                    }
                    this.$p.socket.socketEmitFire(SocketFuncs.SAVEDYNAMICTABLECONTENT, formSubmittal)
                } else if (this.dynamicTableContentForm.target === 'socketio') {
                    this.$p.socket.socketEmitFire(this.dynamicTableContentForm.key, this.formData)
                } else if (this.dynamicTableContentForm.target === 'endpoint') {
                    axios.post(this.dynamicTableContent.key, this.formData).then( (response) => {
                        console.log(this.dynamicTableContent.success_notification)
                    }).catch((e) => {
                        console.log(this.dynamicTableContent.error_notification)
                    })
                }
                console.log(this.formData)
            }
        },
		watch     : {}
    }
</script>

<style>

</style>
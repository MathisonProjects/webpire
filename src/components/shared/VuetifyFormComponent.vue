<template>
    <v-card>
        <v-card-title><v-icon large v-if='form.cardIcon !== undefined'>{{ form.cardIcon }}</v-icon> {{ form.name }}</v-card-title>
        <v-card-text>
            <div class='row' v-for='(fieldRow, index) in form.fields' :key='index'>
                <div :class='setCol(field.md)' v-for='(field, index2) in fieldRow' :key='index2'>
                    <v-text-field :class='getClass(field)' :prepend-icon='field.icon !== undefined ? field.icon : null' v-model='$attrs.value[field.vmodel]' :label='field.label' v-if='field.type === fieldTypes.TEXT' @keydown.enter='$emit("callbackHandler", field.enterAction)' dense clearable />
                    <v-text-field :class='getClass(field)' :prepend-icon='field.icon !== undefined ? field.icon : null' v-model='$attrs.value[field.vmodel]' :label='field.label' v-if='field.type === fieldTypes.HIDDENTEXT' @keydown.enter='$emit("callbackHandler", field.enterAction)' type='password' dense clearable />

                    <v-textarea :class='getClass(field)' v-model='$attrs.value[field.vmodel]' :label='field.label' v-if='field.type === fieldTypes.MULTILINE' dense />

                    <label v-if='field.type === fieldTypes.WYSIWYG' style='field.label'>{{ field.label }}</label>
                    <TipTapVuetifyTextEditorComponent class='mt-2' v-model='$attrs.value[field.vmodel]' :content='$attrs.value[field.vmodel]' v-if='field.type === fieldTypes.WYSIWYG' />
                    <v-autocomplete :class='getClass(field)' v-model='$attrs.value[field.vmodel]' :items='field.options' :label='field.label' v-if='field.type === fieldTypes.SELECT' dense clearable />
                    <div v-if='field.type === fieldTypes.BOOLEAN'>
                        <v-radio-group v-model='$attrs.value[field.vmodel]' :label='field.label' dense>
                            <v-radio :value='truthyFalsy.TRUE' label='True' />
                            <v-radio :value='truthyFalsy.FALSE' label='False' />
                        </v-radio-group>
                    </div>
                    <label style='font-size: 90%;' v-if='field.type === fieldTypes.COLOR'>{{field.label}}</label>
                    <v-color-picker v-model='$attrs.value[field.vmodel]' v-if='field.type === fieldTypes.COLOR' />
                    <v-file-input :class='getClass(field)' v-model='$attrs.value[field.vmodel]' :label='field.label' v-if='field.type === fieldTypes.FILE' dense clearable></v-file-input>
                </div>
            </div>
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn :color="btn.color" v-for='(btn, index) in form.actions' :key='index' @click='$emit("callbackHandler", btn.action)' small>
                <v-icon>{{ btn.icon }}</v-icon> {{ btn.label }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import TipTapVuetifyTextEditorComponent from './TipTapVuetifyTextEditorComponent'
    import { FieldTypes, MdiIcons } from '@/enums'
    export default {
        name      : "vuetify-form-component",
		props     : [
			'form'
        ],
        model: {
			event: 'formUpdate'
		},
		components: {
            TipTapVuetifyTextEditorComponent
        },
		created()   {},
		data()      {
            return {
                truthyFalsy: {
                    TRUE: true,
                    FALSE: false
                },
                example: {
                    name: 'Excellent Form Name',
                    cardIcon: MdiIcons.TESTTUBEEMPTY,
                    fields: [
                        [
                            {
                                label: '',
                                type: '',
                                md: 0,
                                vmodel: '',
                                value: '',
                                class: '',
                                options: false
                            }
                        ]
                    ],
                    actions: [
                        {
                            label: '',
                            icon: '',
                            color: '',
                            action: ''
                        }
                    ]
                }
            }
        },
		computed  : {
            fieldTypes() {
                return FieldTypes
            }
        },
		methods   : {
            getClass(field) {
                if (field.class !== undefined) {
                    return field.class
                } else {
                    return ''
                }
            },
            setCol(size) {
                return 'col-md-' + size
            }
        },
		watch     : {}
    }
</script>

<style scoped>

</style>
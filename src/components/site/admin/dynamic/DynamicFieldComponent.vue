<template>
    <div>
        <v-text-field :label='item.name' :placeholder='"Enter information into " + item.name' v-model='fieldValue' v-if='item.type === "text"' dense :disabled='disabled' />
        <v-textarea :label='item.name' :placeholder='"Enter information into " + item.name' v-model='fieldValue' v-if='item.type === "json"' dense :disabled='disabled' />
        <v-text-field :label='item.name' type='number' :placeholder='"Enter information into " + item.name' v-model='fieldValue' v-if='item.type === "number"' dense :disabled='disabled' />
        <v-text-field prepend-icon="mdi-cash-usd-outline" :label='item.name' type='number' :placeholder='"Enter information into " + item.name' v-model='fieldValue' v-if='item.type === "currency"' dense :disabled='disabled' />
        <label v-if='item.type === "wysiwyg"'>{{ item.name }}</label>
        <ckeditor v-model='fieldValue' v-if='item.type === "wysiwyg"' :editor="classicCkeditor" :config="{}" :disabled='disabled' />
        <v-text-field :label='item.name' :placeholder='"Enter information into " + item.name' v-model='fieldValue' v-if='item.type === "datetime"' dense :disabled='disabled' />
        <v-select :label='item.name' :placeholder='"Enter information into " + item.name' v-model='fieldValue' v-if='item.type === "dropdown"' dense :items='item.options.split(",")' :disabled='disabled' />
        <v-select :label='item.name' :placeholder='"Enter information into " + item.name' v-model='fieldValue' v-if='item.type === "user"' dense :items='userList' item-text='username' item-value='sub' :disabled='disabled' />
        <v-file-input :label='item.name' :placeholder='"Enter information into " + item.name' v-model='fileUpload' v-if='item.type === "file"' @change='runUpload(item.key)' dense :disabled='disabled' />
        <div v-if='fieldValue !== null && fieldValue !== undefined && item.type === "file"' class='text-center'>
            <a :href='"https://upload.awsvuem.com/" + fieldValue' target='_BLANK'>Click to View File</a>
        </div>
        <v-select :label='item.name' :placeholder='"Enter information into " + item.name' v-model='fieldValue' v-if='item.type === "related to"' dense :items='(relatedOptions !== undefined) ? Object.values(relatedOptions) : []' item-text="content.name" item-value='id' :multiple='item.relationType === "one-to-many"' chips :disabled='disabled' />
    </div>
</template>

<script>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
	import { MdiIcons,SocketFuncs } from '@/enums'
	import jwt from 'jsonwebtoken'

    export default {
		name      : "dynamic-field-component",
		props     : {
            'item': {},
            'disabled':{
                default: false
            }
        },
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
            relatedOptions() {
                const tableId = this.$store.getters['dynamicTableStore/getDynamicTableByKey'](this.item.relatedKey).id
                return this.$store.getters['dynamicTableContentStore/organizedByTable'][tableId]
            },
            userList() {
                return this.$store.state.usersStore.userList
            }
		},
		data()      {
            return {
                fieldValue: this.$attrs.value,
                fileUpload: null,
                classicCkeditor: ClassicEditor
            }
        },
		methods   : {
            runUpload(key) {
                this.$p.fileManagement.runSaveImage(this.fileUpload).then( response => {
                    this.$p.socket.socketEmitFire(SocketFuncs.UPLOADFILE, response)
                    this.fieldValue = response.file_name
                })
            }
        },
		watch     : {
            fieldValue(newVal) {
                this.$emit('formUpdate',newVal)
            }
        }
    }
</script>

<style>

</style>
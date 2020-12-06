<template>
    <div>
        <v-text-field :label='item.name' :placeholder='"Enter information into " + item.name' v-model='$attrs.value' v-if='item.type === "text"' dense />
        <v-text-field :label='item.name' type='number' :placeholder='"Enter information into " + item.name' v-model='$attrs.value' v-if='item.type === "number"' dense />
        <v-text-field prepend-icon="mdi-cash-usd-outline" :label='item.name' type='number' :placeholder='"Enter information into " + item.name' v-model='$attrs.value' v-if='item.type === "currency"' dense />
        <label v-if='item.type === "wysiwyg"'>{{ item.name }}</label>
        <ckeditor v-model='$attrs.value' v-if='item.type === "wysiwyg"' :editor="classicCkeditor" :config="{}" />
        <v-text-field :label='item.name' :placeholder='"Enter information into " + item.name' v-model='$attrs.value' v-if='item.type === "datetime"' dense />
        <v-select :label='item.name' :placeholder='"Enter information into " + item.name' v-model='$attrs.value' v-if='item.type === "dropdown"' dense :items='item.options.split(",")' />
        <v-select :label='item.name' :placeholder='"Enter information into " + item.name' v-model='$attrs.value' v-if='item.type === "user"' dense :items='userList' item-text='username' item-value='sub' />
        <v-file-input :label='item.name' :placeholder='"Enter information into " + item.name' v-model='fileUpload' v-if='item.type === "file"' @change='runUpload(item.key)' dense />
        <div v-if='$attrs.value !== null && item.type === "file"' class='text-center'>
            <a :href='"https://upload.awsvuem.com/" + $attrs.value' target='_BLANK'>Click to View File</a>
        </div>
        <v-select :label='item.name' :placeholder='"Enter information into " + item.name' v-model='$attrs.value' v-if='item.type === "related to"' dense :items='(relatedOptions[item.relatedId] !== undefined) ? Object.values(relatedOptions[item.relatedId]) : []' item-text="content.name" item-value='id' :multiple='item.relationType === "one-to-many"' chips />
    </div>
</template>

<script>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
	import { MdiIcons } from '@/enums'
	import jwt from 'jsonwebtoken'

    export default {
		name      : "dynamic-field-component",
		props     : [
            'item'
        ],
        model: {
			event: 'formUpdate'
		},
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
            relatedOptions() {
                return this.$store.getters['dynamicTableContentStore/organizedByTable']
            },
            userList() {
                return this.$store.state.usersStore.userList
            }
		},
		data()      {
            return {
                fileUpload: null,
                classicCkeditor: ClassicEditor
            }
        },
		methods   : {
            runUpload(key) {
                this.$p.fileManagement.runSaveImage(this.fileUpload).then( response => {
                    this.$p.socket.socketEmitFire(SocketFuncs.UPLOADFILE, response)
                    this.formData.content[key] = response.file_name
                })
            }
        },
		watch     : {}
    }
</script>

<style>

</style>
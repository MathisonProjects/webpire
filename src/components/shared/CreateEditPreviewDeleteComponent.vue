<template>
  <div>
      <v-btn class='primary' small @click='$emit("callbackHandler", linkActionsList.BACK)'><v-icon>{{ mdiIconsList.BACKBURGER }}</v-icon> BACK</v-btn>
      <v-btn class='primary' small v-if='totalSelected === 0' @click='$emit("callbackHandler", linkActionsList.CREATE)'><v-icon>{{ mdiIconsList.PLUS }}</v-icon> Create</v-btn>
      <v-btn class='warning' small v-if='totalSelected === 1' @click='$emit("callbackHandler", linkActionsList.EDIT)'><v-icon>{{ mdiIconsList.PENCIL }}</v-icon> Edit</v-btn>
      <v-btn class='success' small v-if='totalSelected === 1' @click='$emit("callbackHandler", linkActionsList.VIEW)'><v-icon>{{ mdiIconsList.EYE }}</v-icon> Preview</v-btn>
      <v-btn class='error' small v-if='totalSelected > 0' @click='$emit("callbackHandler", linkActionsList.DELETE)'><v-icon>{{ mdiIconsList.TRASHCANOUTLINE }}</v-icon> Delete</v-btn>
  </div>
</template>

<script>
    import { MdiIcons, LinkActions } from '@/enums'

    export default {
		name      : "create-edit-preview-delete-component",
		props     : [
            'totalSelected'
        ],
		components: {},
		created()   {},
		computed  : {
            linkActionsList() {
                return LinkActions
            },
			mdiIconsList() {
				return MdiIcons
			}
		},
		data()      { return {} },
		methods   : {},
		watch     : {}
    }
</script>

<style scoped>

</style>
<template>
    <div>
		<v-row>
			<v-col>
				<h1><v-icon large><slot name='icon'></slot></v-icon> <slot name='section'></slot></h1>
			</v-col>
			<v-col class='text-right'>
				<CreateEditPreviewDeleteComponent @callbackHandler='callbackHandler' :totalSelected='totalSelected' />
			</v-col>
		</v-row>
		
        <v-card>
            <v-card-text>
                <slot name='sectionPurpose'></slot>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
	import CreateEditPreviewDeleteComponent from '@/components/shared/CreateEditPreviewDeleteComponent'
    import { MdiIcons } from '@/enums'

    export default {
		name      : "admin-section-component",
		props     : [
			'totalSelected'
		],
		components: {
			CreateEditPreviewDeleteComponent
		},
		created()   {},
		computed  : {
			mdiIconsList() {
				return MdiIcons
			}
		},
		data()      { return {} },
		methods   : {
			callbackHandler(action) {
				this.$emit('callbackHandler', action)
			}
		},
		watch     : {}
    }
</script>

<style>

</style>
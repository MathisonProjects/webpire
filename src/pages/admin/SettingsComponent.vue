<template>
    <div>
		<VuetifyFormComponent v-model='settingsData' :form='settingsForm' />
    </div>
</template>

<script>
    import { LinkActions, MdiIcons } from '@/enums'
    import VuetifyFormComponent from '@/components/shared/VuetifyFormComponent'

    export default {
		name      : "admin-settings-component",
		props     : [],
		components: {
            VuetifyFormComponent
        },
		created()   {
            this.getSettings()
        },
		computed  : {
            settings() {
                return this.$store.state.settingsStore.settings
            },
            settingsForm() {
                const fields = [this.settings.map( item => {
                        return {
                            label: item.label,
                            type: item.type,
                            md: 12,
                            vmodel: item.key,
                            value: '',
                            class: '',
                            options: false
                        }
                    })]
                return {
                    name: 'Settings',
                    cardIcon: MdiIcons.COGS,
                    fields: fields,
                    actions: [
                        {
                            label: 'Save',
                            icon: MdiIcons.CONTENTSAVE,
                            color: 'primary',
                            action: LinkActions.SAVE
                        }
                    ]
                }
            },
			mdiIconsList() {
				return MdiIcons
			}
		},
		data()      {
            return {
                settingsData: []
            }
        },
		methods   : {
            getSettings() {
                for (let i in this.settings) {
                    this.settingsData[this.settings[i].key] = this.settings[i].value
                }
            },
            saveForm() {
                console.log(saveForm)
            }
        },
		watch     : {
        }
    }
</script>

<style>

</style>
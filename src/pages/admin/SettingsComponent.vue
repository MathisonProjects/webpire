<template>
    <div>
		<VuetifyFormComponent v-model='settingsData' :form='settingsForm' @callbackHandler='callbackHandler' />
    </div>
</template>

<script>
    import { LinkActions, MdiIcons, SocketFuncs } from '@/enums'
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
                            md: 6,
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
                            label: 'Full App Reset',
                            icon: MdiIcons.REFRESH,
                            color: 'error',
                            action: LinkActions.REFRESH
                        },
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
                settingsData: {}
            }
        },
		methods   : {
            getSettings() {
                for (let i in this.settings) {
                    this.settingsData[this.settings[i].key] = this.settings[i].value
                }
            },
            callbackHandler(action) {
                if (action === LinkActions.SAVE) {
                    this.saveForm()
                } else if (action === LinkActions.REFRESH) {
                    this.$p.socket.socketEmitFire(SocketFuncs.FACTORYRESETDYNAMICTABLECONTENT)
                    this.$p.socket.socketEmitFire(SocketFuncs.FACTORYRESETDYNAMICTABLES)
                    this.$p.socket.socketEmitFire(SocketFuncs.FACTORYRESETMENU)
                    this.$p.socket.socketEmitFire(SocketFuncs.FACTORYRESETPERMISSIONS)
                    this.$p.socket.socketEmitFire(SocketFuncs.FACTORYRESETSETTINGS)
                }
            },
            saveForm() {
                for (let i in this.settings) {
                    let setting = this.settings[i]
                    setting.value = this.settingsData[setting.key]
                    this.$p.socket.socketEmitFire(SocketFuncs.SAVESETTINGS, setting)
                }
            }
        },
		watch     : {
        }
    }
</script>

<style>

</style>
<template>
    <VuetifyFormComponent :form='registerForm' v-model='formData' @callbackHandler='callbackHandler' />
</template>

<script>
    import VuetifyFormComponent from '@/components/shared/VuetifyFormComponent'
    import { FieldTypes, MdiIcons, LinkActions, ColorSets, SocketFuncs } from '@/enums'
    export default {
		name      : "login-component",
		props     : [],
		components: {
            VuetifyFormComponent
        },
		created()   {},
		computed  : {
            registerForm() {
                return {
                    cardIcon: MdiIcons.ACCOUNT,
                    name: this.$t('Site.section.admin.landing.loginTitle'),
                    fields: [
                        [
                            {
                                label: this.$t('Site.section.admin.landing.username'),
                                type: FieldTypes.TEXT,
                                md: 12,
                                vmodel: 'username',
                                value: '',
                                class: '',
                                options: false,
                                enterAction: LinkActions.LOGIN
                            },
                            {
                                label: this.$t('Site.section.admin.landing.password'),
                                type: FieldTypes.HIDDENTEXT,
                                md: 12,
                                vmodel: 'password',
                                value: '',
                                class: '',
                                options: false,
                                enterAction: LinkActions.LOGIN
                            }
                        ]
                    ],
                    actions: [
                        {
                            label: this.$t('Site.section.admin.landing.accountNotExist'),
                            icon: MdiIcons.ACCOUNT,
                            color: ColorSets.SUCCESS,
                            action: LinkActions.CHANGELOGINMODE
                        },
                        {
                            label: this.$t('Site.section.admin.landing.refresh'),
                            icon: MdiIcons.REFRESH,
                            color: ColorSets.DEFAULT,
                            action: LinkActions.REFRESH
                        },
                        {
                            label: this.$t('Site.section.admin.landing.submit'),
                            icon: MdiIcons.ACCOUNT,
                            color: ColorSets.PRIMARY,
                            action: LinkActions.LOGIN
                        }
                    ]
                }
            }
        },
		data()      {
            return {
                formData: {}
            }
        },
		methods   : {
            callbackHandler(action) {
                if (action === LinkActions.REFRESH) {
                    this.formData = {
                        username: '',
                        password: ''
                    }
                } else if (action === LinkActions.LOGIN) {
                    if (this.formData.password.length > 6) {
                        this.$p.socket.socketEmitFire(SocketFuncs.ACCOUNTLOGIN, this.formData)
                    } else {
                        this.$p.notifications.loginFailedNotification()
                    }
                } else if (action === LinkActions.CHANGELOGINMODE) {
                    this.$emit('callbackHandler')
                }
            }
        },
		watch     : {}
    }
</script>

<style scoped>
</style>
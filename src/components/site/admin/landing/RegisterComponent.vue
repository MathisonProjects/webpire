<template>
    <VuetifyFormComponent :form='registerForm' v-model='formData' @callbackHandler='callbackHandler' />
</template>

<script>
    import VuetifyFormComponent from '@/components/shared/VuetifyFormComponent'
    import { FieldTypes, MdiIcons, LinkActions, ColorSets, SocketFuncs } from '@/enums'
    export default {
		name      : "example-component",
		props     : [],
		components: {
            VuetifyFormComponent
        },
		created()   {},
		computed  : {
            registerForm() {
                return {
                    cardIcon: MdiIcons.ACCOUNT,
                    name: this.$t('Site.section.admin.landing.registerTitle'),
                    fields: [
                        [
                            {
                                label: this.$t('Site.section.admin.landing.email'),
                                type: FieldTypes.TEXT,
                                md: 12,
                                vmodel: 'email',
                                value: '',
                                class: '',
                                options: false,
                                enterAction: LinkActions.REGISTER
                            },
                            {
                                label: this.$t('Site.section.admin.landing.username'),
                                type: FieldTypes.TEXT,
                                md: 12,
                                vmodel: 'username',
                                value: '',
                                class: '',
                                options: false,
                                enterAction: LinkActions.REGISTER
                            },
                            {
                                label: this.$t('Site.section.admin.landing.password'),
                                type: FieldTypes.HIDDENTEXT,
                                md: 12,
                                vmodel: 'password',
                                value: '',
                                class: '',
                                options: false,
                                enterAction: LinkActions.REGISTER
                            },
                            {
                                label: this.$t('Site.section.admin.landing.repeat'),
                                type: FieldTypes.HIDDENTEXT,
                                md: 12,
                                vmodel: 'passwordRepeat',
                                value: '',
                                class: '',
                                options: false,
                                enterAction: LinkActions.REGISTER
                            }
                        ]
                    ],
                    actions: [
                        {
                            label: this.$t('Site.section.admin.landing.accountExist'),
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
                            action: LinkActions.REGISTER
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
                        email: '',
                        username: '',
                        password: '',
                        repeatPassword: ''
                    }
                } else if (action === LinkActions.REGISTER) {
                    if (this.formData.password === this.formData.passwordRepeat && this.formData.password.length > 6) {
                        this.$p.socket.socketEmitFire(SocketFuncs.ACCOUNTREGISTER, this.formData)
                    } else {
                        this.$p.notifications.registerFailedNotification()
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
<template>
    <div :class='(showSupport) ? "position-absolute support-panel-large" : "position-absolute support-panel-small"'>
        <v-btn v-if='!showSupport' color='warning' @click='updateShowSupport' class='orient-counter-clockwise' small><v-icon small>{{ mdiIconsList.HELP }}</v-icon> Support</v-btn>
        <VuetifyFormComponent v-model='supportForm' :form='supportFormStructure' v-if='showSupport' />
    </div>
</template>

<script>
    import VuetifyFormComponent from './VuetifyFormComponent'
	import { FieldTypes, MdiIcons } from '@/enums'
	import jwt from 'jsonwebtoken'

    export default {
		name      : "submit-support-ticket-component",
		props     : [],
		components: {
            VuetifyFormComponent
        },
		created()   {},
		computed  : {
            supportFormStructure() {
                return {
                    name: 'Submit Ticket',
                    cardIcon: MdiIcons.HELP,
                    fields: [
                        [
                            {
                                label: 'Title',
                                type: FieldTypes.TEXT,
                                md: 12,
                                vmodel: 'title',
                                value: '',
                                class: '',
                                options: false
                            }
                        ]
                    ],
                    actions: [
                        {
                            label: 'Hide',
                            icon: MdiIcons.MINUS,
                            color: '',
                            action: ''
                        },
                        {
                            label: 'Send',
                            icon: MdiIcons.SEND,
                            color: 'primary',
                            action: ''
                        }
                    ]
                }
            },
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
            }
		},
		data()      {
            return {
                showSupport: false,
                supportForm: {}
            }
        },
		methods   : {
            updateShowSupport() {
                console.log('fire')
                this.showSupport = !this.showSupport
            }
        },
		watch     : {}
    }
</script>

<style>
    .support-panel-small {
        right: 15px;
        width: 50px;
		bottom: 200px;
		z-index: 9999;
    }
    .support-panel-large {
        right: -5px;
        width: 300px;
        bottom: 200px;
		z-index: 9999;
    }
    .orient-counter-clockwise {
        transform: rotate(-90deg);
        -webkit-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
    }
</style>
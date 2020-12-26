<template>
    <div :class='(showSupport) ? "position-absolute support-panel-large" : "position-absolute support-panel-small"'>
        <v-btn v-if='!showSupport' color='warning' @click='updateShowSupport' class='orient-counter-clockwise' small><v-icon small>{{ mdiIconsList.HELP }}</v-icon> Support</v-btn>
        <VuetifyFormComponent v-model='supportForm' :form='supportFormStructure' v-if='showSupport' @callbackHandler='callbackHandler' />
    </div>
</template>

<script>
    import VuetifyFormComponent from './VuetifyFormComponent'
	import { FieldTypes, LinkActions, MdiIcons, SocketFuncs } from '@/enums'
	import jwt from 'jsonwebtoken'
import { uuid } from 'uuidv4'

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
                                vmodel: 'name',
                                value: '',
                                class: '',
                                options: false
                            },
                            {
                                label: 'Message',
                                type: FieldTypes.MULTILINE,
                                md: 12,
                                vmodel: 'description',
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
                            action: LinkActions.HIDE
                        },
                        {
                            label: 'Send',
                            icon: MdiIcons.SEND,
                            color: 'primary',
                            action: LinkActions.SUBMIT
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
            },
            supportTicketId() {
                return this.$store.getters['dynamicTableStore/getDynamicTableByKey']('support_tickets').id
            }
		},
		data()      {
            return {
                showSupport: false,
                supportForm: {}
            }
        },
		methods   : {
            callbackHandler(action) {
                if (action === LinkActions.HIDE) {
                    this.showSupport = false
                } else if (action === LinkActions.SUBMIT) {
                    this.supportForm.created_at = Date.now(),
                    this.supportForm.updated_at = Date.now(),
                    this.supportForm.created_by = this.user.sub,
                    this.supportForm.updated_by = this.user.sub,
                    this.supportForm.user       = this.user.sub
                    this.supportForm.status     = 'New'
                    const newSupportTicket = {
                        id: uuid(),
                        tid: this.supportTicketId,
                        created_at: Date.now(),
                        updated_at: Date.now(),
                        content: this.supportForm
                    }
                    this.$p.socket.socketEmitFire(SocketFuncs.SAVEDYNAMICTABLECONTENT, newSupportTicket)
                    this.showSupport = false
                }
            },
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
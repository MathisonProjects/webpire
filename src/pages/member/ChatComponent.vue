<template>
    <div>
        <div class='row'>
            <div class='col-md-3'>
                <div class='row'>
                    <div class='col'>
                        <v-card>
                            <v-card-text>
                                <div class='row'>
                                    <div class='col'></div>
                                    <div class='col text-right'><v-btn icon small><v-icon>{{ mdiIconsList.MENU }}</v-icon></v-btn></div>
                                </div>
                            </v-card-text>
                        </v-card>
                    </div>
                </div>

                <v-list two-line dense>
                    <v-list-item-group v-model="selected" active-class="blue--text">
                        <template v-for="(item, index) in conversations">
                            <v-list-item :key="item.id">
                                <template v-slot:default="{ active }">
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.title"></v-list-item-title>
                                        <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <v-list-item-action-text v-text="item.action"></v-list-item-action-text>
                                    </v-list-item-action>
                                </template>
                            </v-list-item>
                            <v-divider v-if="index < conversations.length - 1" :key="index"></v-divider>
                        </template>
                    </v-list-item-group>
                </v-list>
            </div>
            <div class='col-md-9'>
                <div class='row' v-if='selected > 0'>
                    <div class='col'>
                        <v-card>
                            <v-card-text>
                                <div class='row'>
                                    <div class='col'>
                                        <v-avatar color='primary'><span class="white--text headline">JM</span></v-avatar> Last Online: Nov 16, 2020 20:48 PM
                                    </div>
                                    <div class='col text-right'>
                                        <v-btn color='error' @click='deleteConversation' icon><v-icon>{{ mdiIconsList.TRASHCANOUTLINE }}</v-icon></v-btn>
                                    </div>
                                </div>
                            </v-card-text>
                        </v-card>
                    </div>
                </div>
                <div class='row'>
                    <div class='col'>
                        <v-card class='chatArea'>
                            <v-card-text v-if='selected === 0'>
                                <div class='row'>
                                    <div class='col'>
                                        <v-text-field label='User Search' placeholder='Username, Email, etc...' v-model='userInput' dense />
                                    </div>
                                </div>
                                <v-list dense>
                                    <v-list-item-group v-model="userNewChat" color="primary">
                                        <v-list-item v-for="(item, i) in userListFilter" :key="i">
                                            <v-list-item-content>
                                                <v-list-item-title v-text="item.username"></v-list-item-title>
                                            </v-list-item-content>
                                            <v-list-item-action>
                                                <v-btn color='primary' small icon @click='startChat(item)'><v-icon>{{ mdiIconsList.CHAT }}</v-icon></v-btn>
                                            </v-list-item-action>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-card-text>
                            <v-card-text v-if='selected !== null && selected > 0'>
                                <div v-for='(message,index) in messages' :key='index'>
                                    <div class='row my-1'>
                                        <div class='col-md-6 userReceived' v-if='message.from !== parsedJwt.payload.sub' :title='$p.standardFuncs.standardizedTime(message.timestamp)'>
                                            {{ message.message }}
                                        </div>
                                        <div class='col-md-6 offset-md-6 userSent' v-if='message.from === parsedJwt.payload.sub' :title='$p.standardFuncs.standardizedTime(message.timestamp)'>
                                            {{ message.message }}
                                        </div>
                                    </div>
                                </div>
                            </v-card-text>
                        </v-card>
                    </div>
                </div>
                <div class='row' v-if='selected !== null && selected > 0'>
                    <div class='col'>
                        <v-card>
                            <v-card-text>
                                <div class='row'>
                                    <div class='col-md-11'>
                                        <v-text-field label='Message' placeholder='What message do you want to send...' v-model='message' dense />
                                    </div>
                                    <div class='col'>
                                        <v-btn color='primary' @click='sendMessage' icon small><v-icon>{{ mdiIconsList.SEND }}</v-icon></v-btn>
                                    </div>
                                </div>
                            </v-card-text>
                        </v-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import { MdiIcons, SocketFuncs } from '@/enums'
	import jwt from 'jsonwebtoken'
    import { uuid } from 'uuidv4'

    export default {
		name      : "member-chat-component",
		props     : [],
        components: {},
        mounted() {
            this.$p.socket.socketEmitFire(SocketFuncs.CHATGETCONVERSATIONS, { uid: this.user.uid })
        },
		created()   {},
		computed  : {
			mdiIconsList() {
				return MdiIcons
			},
			user() {
				return this.$store.getters['userStore/userData']
            },
            userListFilter() {
                return this.$store.state.usersStore.userList.filter( item => {
                    return item.username.includes(this.userInput)
                })
            },
            parsedJwt() {
				if (this.user.jwt !== null) {
					return jwt.decode(this.user.jwt, {complete: true})
				} else {
					return null
				}
            },
            conversations() {
                return [
                    {
                        id: 'new-conversation',
                        action: 'Start Now',
                        headline: '',
                        subtitle: ``,
                        title: 'New Conversation',
                    },
                    ...this.$store.getters['chatModuleStore/sortedConversationList'].map( item => {
                        return {
                            id: item.id,
                            participants: item.participants,
                            action: this.$p.standardFuncs.shortTime(item.action),
                            headline: item.headline,
                            subtitle: item.subtitle,
                            title: item.title
                        }
                    })
                ]
            },
            messages() {
                return this.$store.state.chatModuleStore.chatMessageList
            }
		},
		data()      {
            return {
                selected: null,
                message: '',
                userInput: '',
                userNewChat: null
            }
        },
		methods   : {
            sendMessage() {
                const messageFormat = {
                    conversation: this.conversations[this.selected],
                    mid: uuid(),
                    from: this.parsedJwt.payload.sub,
                    seen: [this.parsedJwt.payload.sub],
                    message: this.message
                }
                this.$p.socket.socketEmitFire(SocketFuncs.CHATSETMESSAGE, messageFormat)
                this.message = ''
            },
            startChat(person) {
                const participants = (person.sub !== this.user.sub) ? [person, this.user] : [person]
                const newChat = {
                    "id": uuid(),
                    "participants": participants,
                    "uid": this.user.uid
                }
                this.$p.socket.socketEmitFire(SocketFuncs.CHATSETCONVERSATION, newChat)
            },
            deleteConversation() {
                console.log(this.conversations[this.selected])
            }
        },
		watch     : {
            selected(newValue) {
                if (newValue !== 0 && newValue !== undefined) {
                    const conversation = this.conversations[newValue]
                    const payload = {
                        id: conversation.id,
                        uid: this.user.uid
                    }
                    this.$p.socket.socketEmitFire(SocketFuncs.CHATGETMESSAGES, payload)
                }
            }
        }
    }
</script>

<style>
    .chatArea {
        min-height: 500px;
        max-height: 650px;
        overflow-y: scroll;
        border: black 1px solid !important;
    }
    .userReceived {
        background-color: #424242 !important;
        color: #fff;
        border: black 1px solid;
        border-radius: 0px 25px 25px 0px;
        padding-top: 5px !important;
        padding-bottom: 5px !important;
    }
    .userSent {
        background-color: #1976d2 !important;
        color: #fff;
        border: black 1px solid;
        border-radius: 25px 0px 0px 25px;
        padding-top: 5px !important;
        padding-bottom: 5px !important;
        text-align: right;
    }
</style>
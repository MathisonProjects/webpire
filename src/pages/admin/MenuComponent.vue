<template>
    <div>
        <div class='row'>
            <div class='col'>
                <h1><v-icon large>{{ mdiIconsList.MENU }}</v-icon> Menu</h1>
            </div>
            <div class='col text-center'>
                <v-select placeholder='Pick Menu to Modify...' label='Menu Type' :items='menuTypes' v-model='menuType' />
            </div>
            <div class='col text-right'>
                <v-btn color='primary' small @click='insertMenuItem'><v-icon>{{ mdiIconsList.PLUS }}</v-icon> Insert</v-btn>
                <v-btn color='success' small @click='saveMenu'><v-icon>{{ mdiIconsList.CONTENTSAVE }}</v-icon> Save</v-btn>
            </div>
        </div>

        <v-expansion-panels focusable>
            <v-expansion-panel v-for='(menuItem, index) in menuList' :key='menuItem.oid' >
                <v-expansion-panel-header><span><v-icon>{{ menuItem.icon }}</v-icon> {{ menuItem.text }}</span></v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-card>
                        <v-card-text>
                            <div class='row'>
                                <div class='col-md-3'>
                                    <v-autocomplete placeholder='Choose your menu icon...' label='Icon' :items='iconList' v-model='menuItem.icon' />
                                </div>
                                <div class='col-md-4'>
                                    <v-text-field placeholder='Display Text...' label='Text' v-model='menuItem.text' />
                                </div>
                                <div class='col-md-3'>
                                    <v-text-field placeholder='Page key...' label='Key' v-model='menuItem.key' />
                                </div>
                                <div class='col-md-2'>
                                    <v-select placeholder='Is the page internal?' label='Internal Page' :items='[true,false]' v-model='menuItem.internal' />
                                </div>
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn color='primary' small @click='copyMenuItem(menuItem)'><v-icon>{{ mdiIconsList.CONTENTCOPY }}</v-icon></v-btn>
                            <v-btn color='warning' small @click='changeOrderId(index, -1)'><v-icon>{{ mdiIconsList.ARROWUP }}</v-icon></v-btn>
                            <v-btn color='warning' small @click='changeOrderId(index, 1)'><v-icon>{{ mdiIconsList.ARROWDOWN }}</v-icon></v-btn>
                            <v-btn color='error' small @click='deleteMenu(menuItem, index)'><v-icon>{{ mdiIconsList.TRASHCANOUTLINE }}</v-icon></v-btn>
                        </v-card-actions>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>
    import { MdiIcons, SocketFuncs } from '@/enums'
    import { uuid } from 'uuidv4'

    export default {
		name      : "admin-menu-component",
		props     : [],
		components: {},
		created()   {
            this.menuType = 'main'
        },
		computed  : {
            menu() {
                const menu = this.$store.state.menuStore
                const reorganizedMenu = []
                for (let i in menu) {
                    for (let j in menu[i]) {
                        reorganizedMenu.push(menu[i][j])
                    }
                }
                this.menuList = reorganizedMenu.filter( item => {
                    return item.type === this.menuType
                })
                this.menuList = this.menuList.sort( (a, b) => {
					if (a.oid > b.oid) return 1
					if (a.oid < b.oid) return -1
					return 0
				})
                return this.menuList
            },
            iconList() {
                return this.$store.state.jsonStore.materialistIconsList
            },
            menuTypes() {
                return [
                    'admin',
                    'main'
                ]
            },
			mdiIconsList() {
				return MdiIcons
			}
		},
		data()      {
            return {
                menuList: [],
                menuType: ''
            }
        },
		methods   : {
            changeOrderId(index, change) {
                const index2 = index + change
                if (this.menuList[index2] !== undefined) {
                    this.menuList[index2].oid -= change
                }
                this.menuList[index].oid += change
                let forceComputedUpdate = this.menu
            },
            saveMenu() {
                for (let i in this.menuList) {
                    const menuItem = this.menuList[i]
                    this.$p.socket.socketEmitFire(SocketFuncs.SAVEMENU, menuItem)
                }
            },
            deleteMenu(menuItem,index) {
                this.$p.socket.socketEmitFire(SocketFuncs.DELETEMENU, menuItem)
                this.menuList.splice(index, 1)
            },
            copyMenuItem(menuItem) {
                let newItem = {
                    id: uuid(),
                    internal: menuItem.internal,
                    icon: menuItem.icon,
                    text: menuItem.text + ' COPY',
                    page: menuItem.page,
                    type: menuItem.type,
                    key: menuItem.key,
                    oid: this.menuList.length
                }

                this.menuList.push(newItem)
                this.$p.socket.socketEmitFire(SocketFuncs.SAVEMENU, newItem)
            },
            insertMenuItem() {
                const menuItem = {
                    id: uuid(),
                    internal: true,
                    icon: null,
                    text: 'New Menu Item',
                    page: null,
                    type: this.menuType,
                    key: null,
                    oid: this.menuList.length
                }
                this.menuList.push(menuItem)
                this.$p.socket.socketEmitFire(SocketFuncs.SAVEMENU, menuItem)
            }
        },
		watch     : {
            menuType(newVal) {
                const menu = this.$store.state.menuStore
                const reorganizedMenu = []
                for (let i in menu) {
                    for (let j in menu[i]) {
                        reorganizedMenu.push(menu[i][j])
                    }
                }
                this.menuList = reorganizedMenu.filter( item => {
                    return item.type === this.menuType
                }).sort( (a, b) => {
					if (a.oid > b.oid) return 1
					if (a.oid < b.oid) return -1
					return 0
				})
            }
        }
    }
</script>

<style>

</style>
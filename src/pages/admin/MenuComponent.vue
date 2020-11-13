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
                <v-btn color='success' small><v-icon>{{ mdiIconsList.CONTENTSAVE }}</v-icon> Save</v-btn>
            </div>
        </div>

        <v-expansion-panels focusable>
            <v-expansion-panel v-for='(menuItem, index) in menuList' :key='index' >
                <v-expansion-panel-header>{{ menuItem.text }}</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-card>
                        <v-card-text>
                            {{ menuItem }}
                            <div class='row'>
                                <div class='col-md-6'>
                                    <v-text-field placeholder='Display Text...' label='Text' v-model='menuItem.text' />
                                </div>
                                <div class='col-md-6'>
                                    <v-text-field placeholder='Display Text...' label='Text' v-model='menuItem.icon' />
                                </div>
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn color='warning' small><v-icon>{{ mdiIconsList.ARROWUP }}</v-icon></v-btn>
                            <v-btn color='warning' small><v-icon>{{ mdiIconsList.ARROWDOWN }}</v-icon></v-btn>
                            <v-btn color='error' small><v-icon>{{ mdiIconsList.TRASHCANOUTLINE }}</v-icon></v-btn>
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
		created()   { },
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
                return this.menuList
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
                menuType: 'main'
            }
        },
		methods   : {
            saveMenu() {},
            deleteMenu() {},
            copyMenuItem() {},
            insertMenuItem() {
                this.menuList.push({
                    id: uuid(),
                    internal: true,
                    icon: null,
                    text: 'New Menu Item',
                    page: null,
                    type: this.menuType,
                    key: null,
                    oid: this.menuList.length
                })
            }
        },
		watch     : {
        }
    }
</script>

<style>

</style>
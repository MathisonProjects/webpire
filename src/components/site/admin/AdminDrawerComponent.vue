<template>
    <div>
        <v-navigation-drawer v-model="showDrawer" absolute temporary>
            <v-list-item>
                <v-list-item-avatar>
                    JM
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>Jacob Mathison</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list dense>
                <v-list-item v-for="(menuItem,index) in menuList" :key="index" link @click='goToLink(menuItem)'>
                    <v-list-item-icon>
                        <v-icon>{{ menuItem.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ menuItem.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-btn @click='showDrawer = !showDrawer' icon small ><v-icon>{{ mdiIconsList.DOTSVERTICAL }}</v-icon></v-btn>
    </div>
</template>

<script>
    import {MdiIcons, LinkActions} from '@/enums'

    export default {
		name      : "admin-drawer-component",
		props     : [],
		components: {},
		created()   {},
		computed  : {
            menuList() {
				return this.$store.state.menuStore.adminMenu.sort( (a, b) => {
					if (a.oid > b.oid) return 1
					if (a.oid < b.oid) return -1
					return 0
				})
            },
            mdiIconsList() {
                return MdiIcons
            }
        },
		data()      {
            return {
                showDrawer: false
            }
        },
		methods   : {
            goToLink(item) {
				if (item.action === null || item.action === undefined) {
					this.$router.push(item.key)
				} else if (item.action === LinkActions.CHANGELIGHTMODE) {
					if (this.$vuetify.theme.dark) {
						this.$vuetify.theme.dark = false
					} else {
						this.$vuetify.theme.dark = true
					}
				} else if (item.action === LinkActions.LOGOUT) {
                    this.$store.dispatch('userStore/logout')
                }
			}
        },
		watch     : {}
    }
</script>

<style scoped>
</style>
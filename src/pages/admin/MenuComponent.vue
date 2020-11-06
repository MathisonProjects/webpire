<template>
    <div>
        <div class='row'>
            <div class='col'>
                <h1><v-icon large>{{ mdiIconsList.MENU }}</v-icon> Menu</h1>
            </div>
            <div class='col'>
                <v-btn color='error' @click='resetFactorySettings' small><v-icon>{{ mdiIconsList.REFRESH }}</v-icon>Reset to Factory Settings</v-btn>
            </div>
        </div>

		<div v-for='(menuItem, index) in menu' :key='index'>
            {{ menuItem }}
        </div>
    </div>
</template>

<script>
    import { MdiIcons, SocketFuncs } from '@/enums'

    export default {
		name      : "menu-component",
		props     : [],
		components: {},
		created()   {},
		computed  : {
            menu() {
                const menu = this.$store.state.menuStore
                const reorganizedMenu = []
                for (let i in menu) {
                    for (let j in menu[i]) {
                        reorganizedMenu.push(menu[i][j])
                    }
                }
                return reorganizedMenu
            },
			mdiIconsList() {
				return MdiIcons
			}
		},
		data()      { return {} },
		methods   : {
            resetFactorySettings() {
                this.$p.socket.resetToFactorySettings(SocketFuncs.FACTORYRESETMENU)
            }
        },
		watch     : {}
    }
</script>

<style>

</style>
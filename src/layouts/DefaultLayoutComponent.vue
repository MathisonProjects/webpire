<template>
    <v-app>
		<SnackbarNotificationComponent />

		<v-app-bar app dense>
			<v-toolbar-title v-if='settings.site_name === undefined'>{{ $t('Site.name') }}</v-toolbar-title>
			<v-toolbar-title v-if='settings.site_name !== undefined'>{{ settings.site_name.value }}</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<v-menu bottom left v-for='(menuItem, index) in menu' :key='index'>
					<template v-slot:activator="{ on }">
						<v-btn @click='goToLink(menuItem)' v-if='menuItem.action !== LinkActionsList.DROPDOWN' :aria-label='menuItem.icon'>
							<v-icon>{{ menuItem.icon }}</v-icon> {{ menuItem.text }}
						</v-btn>
						<v-btn v-on="on" v-if='menuItem.action === LinkActionsList.DROPDOWN' :aria-label='menuItem.icon'>
							<v-icon>{{ menuItem.icon }}</v-icon> {{ menuItem.text }}
						</v-btn>
					</template>
					<v-list v-if='menuItem.action === LinkActionsList.DROPDOWN'>
						<v-list-item v-for="(dropdownItem, index2) in menuItem.dropdown" :key="index2" @click='goToLink(dropdownItem)'>
							<v-list-item-title><v-icon>{{ dropdownItem.icon }}</v-icon> {{ dropdownItem.text }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-toolbar-items>
		</v-app-bar>
        <v-main>
			<v-container>
				<transition name='fade' mode='out-in'>
					<router-view />
				</transition>
			</v-container>
		</v-main>
		<v-footer dark padless :fixed='(settings.footer_fixed !== undefined) ? settings.footer_fixed.value : true'>
			<v-card class="flex" flat tile>
				<v-card-title class="dark">
					<strong class="subheading" v-if='settings.footer_text === undefined'>{{ $t('Site.footer.subheader') }}</strong>
					<strong class="subheading" v-if='settings.footer_text !== undefined'>{{ settings.footer_text.value }}</strong>
					<v-spacer></v-spacer>
					<v-btn v-for="(icon, index) in icons" :key="index" target='_BLANK' class="mx-1" :aria-label='icon' dark icon>
						<v-icon size="24px">{{ icon }}</v-icon>
					</v-btn>
				</v-card-title>

				<v-card-text class="py-2 white--text text-center">
					{{ new Date().getFullYear() }} - <strong>{{ $t('Site.name') }}</strong> {{ buildData }}
				</v-card-text>
			</v-card>
		</v-footer>
    </v-app>
</template>

<script>
	import SnackbarNotificationComponent from '@/components/shared/SnackbarNotificationComponent'

	import { MdiIcons, LinkActions, LanguageCodes } from '@/enums'
    export default {
		name      : "default-layout-component",
		props     : [],
		components: {
			SnackbarNotificationComponent
		},
		created()   {},
		computed  : {
			mdiIconsList() {
				return MdiIcons
			},
			LinkActionsList() {
				return LinkActions
			},
			icons() {
				return [
					'mdi-home',
					'mdi-email',
					'mdi-calendar',
					'mdi-delete'
				]
			},
			settings() {
				return this.$store.getters['settingsStore/keyedSettings']
			},
			menu() {
				let customMenu = [
					...this.$store.state.menuStore.mainMenu.sort( (a, b) => {
						if (a.oid > b.oid) return 1
						if (a.oid < b.oid) return -1
						return 0
					}),
					{ text: '', icon: MdiIcons.EARTH, internal: true, key: null, action: LinkActions.DROPDOWN, dropdown: [
						{ icon: MdiIcons.ALPHAEBOXOUTLINE, text: this.$t('Site.menu.lang.english'), key: null, action: LinkActions.CHANGELANGUAGE, payload: LanguageCodes.ENUS },
						{ icon: MdiIcons.ALPHASBOXOUTLINE, text: this.$t('Site.menu.lang.spanish'), key: null, action: LinkActions.CHANGELANGUAGE, payload: LanguageCodes.ESMX },
						{ icon: MdiIcons.ALPHARBOXOUTLINE, text: this.$t('Site.menu.lang.russian'), key: null, action: LinkActions.CHANGELANGUAGE, payload: LanguageCodes.RURU },
						{ icon: MdiIcons.ALPHAFBOXOUTLINE, text: this.$t('Site.menu.lang.french'), key: null, action: LinkActions.CHANGELANGUAGE, payload: LanguageCodes.FRFR },
						{ icon: MdiIcons.ALPHACBOXOUTLINE, text: this.$t('Site.menu.lang.mandarin'), key: null, action: LinkActions.CHANGELANGUAGE, payload: LanguageCodes.ZHCN },
						{ icon: MdiIcons.ALPHAVBOXOUTLINE, text: this.$t('Site.menu.lang.vietnamese'), key: null, action: LinkActions.CHANGELANGUAGE, payload: LanguageCodes.VIVI },
						{ icon: MdiIcons.ALPHAKBOXOUTLINE, text: this.$t('Site.menu.lang.korean'), key: null, action: LinkActions.CHANGELANGUAGE, payload: LanguageCodes.KOKO },
						{ icon: MdiIcons.ALPHAJBOXOUTLINE, text: this.$t('Site.menu.lang.japanese'), key: null, action: LinkActions.CHANGELANGUAGE, payload: LanguageCodes.JAJA },
						{ icon: MdiIcons.ALPHAABOXOUTLINE, text: this.$t('Site.menu.lang.arabic'), key: null, action: LinkActions.CHANGELANGUAGE, payload: LanguageCodes.ARSA },
						{ icon: MdiIcons.ALPHAGBOXOUTLINE, text: this.$t('Site.menu.lang.german'), key: null, action: LinkActions.CHANGELANGUAGE, payload: LanguageCodes.DEDE }
						]
					},
					{ text: '', icon: MdiIcons.MOONWANINGCRESCENT, internal: true, key: null, action: LinkActions.CHANGELIGHTMODE }
				]

				return customMenu
			},
			buildData() {
				const devVariables = this.$store.state.jsonStore.devVariables
				console.log(devVariables)
				return devVariables.majorRelease + '.' + devVariables.minorRelease + '.' + devVariables.iteration + '.' + devVariables.build
			}
		},
		data()      { return {} },
		methods   : {
			goToLink(item) {
				if (item.action === null || item.action === undefined) {
					if (this.$route.fullPath !== item.key) {
						this.$router.push(item.key)
					}
				} else if (item.action === LinkActions.CHANGELIGHTMODE) {
					this.$vuetify.theme.dark = !this.$vuetify.theme.dark
					this.$p.notifications.changeLightMode(this.$vuetify.theme.dark)
				} else if (item.action === LinkActions.CHANGELANGUAGE) {
					this.$this.$i18n.locale = item.payload
				}
			}
		},
		watch     : {}
    }
</script>

<style scoped>
</style>
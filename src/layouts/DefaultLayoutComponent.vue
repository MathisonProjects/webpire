<template>
    <v-app>
		<v-app-bar app dense>
			<v-toolbar-title>{{ $t('Site.name') }}</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items>
			</v-toolbar-items>
		</v-app-bar>
        <v-main>
			<v-container>
				<transition name='fade' mode='out-in'>
					<router-view />
				</transition>
			</v-container>
		</v-main>
		<v-footer dark padless>
			<v-card class="flex" flat tile>
				<v-card-title class="dark">
					<strong class="subheading">{{ $t('Site.footer.subheader') }}</strong>
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
	import { MdiIcons } from '@/enums'
    export default {
		name      : "default-layout-component",
		props     : [],
		components: {},
		created()   {},
		computed  : {
			mdiIconsList() {
				return MdiIcons
			},
			icons() {
				return [
					'mdi-home',
					'mdi-email',
					'mdi-calendar',
					'mdi-delete'
				]
			},
			buildData() {
				const devVariables = this.$store.state.jsonStore.devVariables
				return devVariables.majorRelease + '.' + devVariables.minorRelease + '.' + devVariables.iteration + '.' + devVariables.build
			}
		},
		data()      { return {} },
		methods   : {},
		watch     : {}
    }
</script>

<style scoped>
</style>
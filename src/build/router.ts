import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const layoutList = {
    DefaultLayout : require('@/layouts/DefaultLayoutComponent.vue').default,
    AdminLayout : require('@/layouts/AdminLayoutComponent.vue').default,
}
const componentList = {
    HomeComponent : require('@/pages/HomeComponent.vue').default,
    AdminHomeComponent : require('@/pages/admin/HomeComponent.vue').default,
    AdminMenuComponent : require('@/pages/admin/MenuComponent.vue').default,
	AdminIconsComponent : require('@/pages/admin/IconsComponent.vue').default,
	AdminSettingsComponent: require('@/pages/admin/SettingsComponent.vue').default
}

const routes = [
	{
		path: '/',
		component: layoutList.DefaultLayout,
		props: true,
		children: [
			{
				path: '/',
				name: 'default-home',
				component: componentList.HomeComponent,
				meta: {
					title: "Home"
				}
            }
        ]
	},
	{
		path: '/admin',
		component: layoutList.AdminLayout,
		props: true,
		children: [
			{
				path: '/',
				name: 'admin-home',
				component: componentList.AdminHomeComponent,
				meta: {
					title: "Dashboard"
				}
			},
			{
				path: 'menu',
				name: 'admin-home',
				component: componentList.AdminMenuComponent,
				meta: {
					title: "Menu"
				}
			},
			{
				path: 'icons',
				name: 'admin-home',
				component: componentList.AdminIconsComponent,
				meta: {
					title: "Icons"
				}
			},
			{
				path: 'settings',
				name: 'admin-settings',
				component: componentList.AdminSettingsComponent,
				meta: {
					title: "Settings"
				}
			}
        ]
	}
]

const router = new VueRouter({
	mode: 'history', // Something going on with apache or htaccess....
	routes: routes // short for `routes: routes`
});

const DEFAULT_TITLE = (process.env.SITE_NAME !== undefined) ? process.env.SITE_NAME : 'Webpire'

router.afterEach((to: any, from: any) => {
	Vue.nextTick(() => {
		document.title = DEFAULT_TITLE + ' | ' + to.meta.title || DEFAULT_TITLE
	})
})

export default router;
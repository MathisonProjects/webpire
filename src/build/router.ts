import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const layoutList = {
    DefaultLayout : require('@/layouts/DefaultLayoutComponent.vue').default,
    MemberLayout : require('@/layouts/DefaultMemberComponent.vue').default,
    AdminLayout : require('@/layouts/AdminLayoutComponent.vue').default,
}
const componentList = {
    HomeComponent : require('@/pages/HomeComponent.vue').default,
    AccessComponent : require('@/pages/AccessComponent.vue').default,
    MemberHomeComponent : require('@/pages/member/HomeComponent.vue').default,
    AdminHomeComponent : require('@/pages/admin/HomeComponent.vue').default,
    AdminMenuComponent : require('@/pages/admin/MenuComponent.vue').default,
    AdminDynamicTablesComponent : require('@/pages/admin/DynamicTablesComponent.vue').default,
    AdminDynamicTableViewComponent : require('@/pages/admin/DynamicTableViewComponent.vue').default,
	AdminIconsComponent : require('@/pages/admin/IconsComponent.vue').default,
	AdminPagesComponent : require('@/pages/admin/PagesComponent.vue').default,
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
			},
			{
				path: 'access',
				name: 'default-access',
				component: componentList.AccessComponent,
				meta: {
					title: "Access"
				}
			},
        ]
	},
	{
		path: '/m',
		component: layoutList.MemberLayout,
		props: true,
		children: [
			{
				path: '/',
				name: 'member-home',
				component: componentList.MemberHomeComponent,
				meta: {
					title: "User Dashboard"
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
				path: 'dynamic-tables',
				name: 'admin-dynamic-tables',
				component: componentList.AdminDynamicTablesComponent,
				meta: {
					title: "Dynamic Tables"
				}
			},
			{
				path: 'pages',
				name: 'admin-pages',
				component: componentList.AdminPagesComponent,
				meta: {
					title: "Pages"
				}
			},
			{
				path: 'settings',
				name: 'admin-settings',
				component: componentList.AdminSettingsComponent,
				meta: {
					title: "Settings"
				}
			},
			{
				path: 'dt',
				name: 'admin-dynamic-table-view',
				component: componentList.AdminDynamicTableViewComponent,
				meta: {
					title: "Dynamic Table View | Pick Table"
				}
			},
			{
				path: 'dt/:key',
				name: 'admin-dynamic-table-view',
				component: componentList.AdminDynamicTableViewComponent,
				meta: {
					title: "Dynamic Table View"
				}
			},
			{
				path: 'dt/:key/:mode',
				name: 'admin-dynamic-table-view',
				component: componentList.AdminDynamicTableViewComponent,
				meta: {
					title: "Dynamic Table View"
				}
			},
			{
				path: 'dt/:key/:mode/:id',
				name: 'admin-dynamic-table-view',
				component: componentList.AdminDynamicTableViewComponent,
				meta: {
					title: "Dynamic Table View"
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
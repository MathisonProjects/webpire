import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const layoutList = {
    DefaultLayout : require('@/layouts/DefaultLayoutComponent.vue').default,
    MemberLayout  : require('@/layouts/DefaultMemberComponent.vue').default,
    AdminLayout   : require('@/layouts/AdminLayoutComponent.vue').default,
}
const componentList = {
    HomeComponent                  : require('@/pages/HomeComponent.vue').default,
    AccessComponent                : require('@/pages/AccessComponent.vue').default,
    CompTestComponent              : require('@/pages/TestingComponent.vue').default,
    MemberHomeComponent            : require('@/pages/member/HomeComponent.vue').default,
    MemberUserSearchComponent      : require('@/pages/member/UserSearchComponent.vue').default,
    MemberViewUserComponent        : require('@/pages/member/ViewUserComponent.vue').default,
    MemberChatComponent            : require('@/pages/member/ChatComponent.vue').default,
    MemberSettingsComponent        : require('@/pages/member/SettingsComponent.vue').default,
    AdminHomeComponent             : require('@/pages/admin/HomeComponent.vue').default,
    AdminMenuComponent             : require('@/pages/admin/MenuComponent.vue').default,
    AdminDynamicTablesComponent    : require('@/pages/admin/DynamicTablesComponent.vue').default,
    AdminDynamicTableViewComponent : require('@/pages/admin/DynamicTableViewComponent.vue').default,
    AdminUsersComponent            : require('@/pages/admin/UsersComponent.vue').default,
	AdminIconsComponent            : require('@/pages/admin/IconsComponent.vue').default,
	AdminSettingsComponent         : require('@/pages/admin/SettingsComponent.vue').default
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
			{
				path: 'comptest',
				name: 'default-testing-component',
				component: componentList.CompTestComponent,
				meta: {
					title: "Testing Components..."
				}
			}
        ]
	},
	{
		path: '/m',
		component: layoutList.MemberLayout,
		props: true,
		children: [
			{
				path: '/',
				name: 'member-dashboard',
				component: componentList.MemberHomeComponent,
				meta: {
					title: "Dashboard"
				}
			},
			{
				path: 'user-search',
				name: 'member-user-search',
				component: componentList.MemberUserSearchComponent,
				meta: {
					title: "Profile Search"
				}
			},
			{
				path: 'user/:uid',
				name: 'member-view-user',
				component: componentList.MemberViewUserComponent,
				meta: {
					title: "View Profile"
				}
			},
			{
				path: 'chat',
				name: 'member-chat',
				component: componentList.MemberChatComponent,
				meta: {
					title: "Chat"
				}
			},
			{
				path: 'settings',
				name: 'member-settings',
				component: componentList.MemberSettingsComponent,
				meta: {
					title: "Settings"
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
				name: 'admin-dashboard',
				component: componentList.AdminHomeComponent,
				meta: {
					title: "Dashboard"
				}
			},
			{
				path: 'menu',
				name: 'admin-menu',
				component: componentList.AdminMenuComponent,
				meta: {
					title: "Menu"
				}
			},
			{
				path: 'icons',
				name: 'admin-icons',
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
				path: 'settings',
				name: 'admin-settings',
				component: componentList.AdminSettingsComponent,
				meta: {
					title: "Settings"
				}
			},
			{
				path: 'users',
				name: 'admin-users',
				component: componentList.AdminUsersComponent,
				meta: {
					title: "Users"
				}
			},
			{
				path: 'dt',
				name: 'admin-dynamic-table-view-pick-table',
				component: componentList.AdminDynamicTableViewComponent,
				meta: {
					title: "Dynamic Table View | Pick Table"
				}
			},
			{
				path: 'dt/:key',
				name: 'admin-dynamic-table-view-key',
				component: componentList.AdminDynamicTableViewComponent,
				meta: {
					title: "Dynamic Table View"
				}
			},
			{
				path: 'dt/:key/:mode',
				name: 'admin-dynamic-table-view-key-mode',
				component: componentList.AdminDynamicTableViewComponent,
				meta: {
					title: "Dynamic Table View"
				}
			},
			{
				path: 'dt/:key/:mode/:id',
				name: 'admin-dynamic-table-view-key-mode-id',
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
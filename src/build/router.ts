import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const layoutList = {
    DefaultLayout : require('@/layouts/DefaultLayoutComponent.vue').default
}
const componentList = {
    HomeComponent : require('@/pages/HomeComponent.vue').default
}

const routes = [
	{
		path: '/',
		component: layoutList.DefaultLayout,
		props: true,
		children: [
			{
				path: '/',
				name: 'home-home',
				component: componentList.HomeComponent,
				meta: {
					title: "Home"
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
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
//权限页面
const common = r => require.ensure([], () => r(require('@/components/common/Common')), 'Common')
const newOperate = r => require.ensure([], () => r(require('@/components/page/Operate')), 'newOperate')
const newDemand = r => require.ensure([], () => r(require('@/components/page/ProposeDemand')), 'newDemand')
const newAnalysts = r => require.ensure([], () => r(require('@/components/page/AnalystsList')), 'newAnalysts')
const analystsDetail = r => require.ensure([], () => r(require('@/components/page/AnalystsDetail')), 'analystsDetail')
const newModify = r => require.ensure([], () => r(require('@/components/page/ModifyList')), 'newModify')
const modifyDetail = r => require.ensure([], () => r(require('@/components/page/ModifyDetail')), 'modifyDetail')
const newTest = r => require.ensure([], () => r(require('@/components/page/TestList')), 'newTest')
const testDetail = r => require.ensure([], () => r(require('@/components/page/TestDetail')), 'testDetail')
const newEchart = r => require.ensure([], () => r(require('@/components/page/DataView')), 'newEchart')
const echartDetail = r => require.ensure([], () => r(require('@/components/page/ViewDetail')), 'echartDetail')
const home = r => require.ensure([], () => r(require('@/components/page/Home')), 'home')

//公共页面
const login = r => require.ensure([], () => r(require('@/components/common/Login')), 'login')
const failure = r => require.ensure([], () => r(require('@/components/common/404')), 'failure')
const limit =  r => require.ensure([], () => r(require('@/components/common/403')), 'limit')
//const customer = r => require.ensure([], () => r(require('@/components/common/Customer')), 'customer')

Vue.use(Router)

export const asyncRouterMap = [
    {
        path:'/common',
        meta:{ role:'*' },
        component:common,
        children: [
            {
                path:'demand',
                meta: { role: ['normal','admin','dt_engineer','dm_engineer'] },
                component:newDemand  
            },
            {
                path:'analist',
                meta: { role: ['assayer','at_enginner','admin'] },
                component:newAnalysts
            },
            {
                path:'adetail',
                meta: { role: ['assayer','at_enginner','admin'] },
                component:analystsDetail
            },
            {
                path:'modlist',
                meta: { role: ['modifies','dm_engineer','admin'] },
                component:newModify
            },
            {
                path:'mdetail',
                meta: { role: ['modifies','dm_engineer','admin'] },
                component:modifyDetail
            },
            {
                path:'tlist',
                meta: { role: ['testers','at_enginner','dt_engineer','admin'] },
                component:newTest
            },
            {
                path:'tdetail',
                meta: { role: ['testers','at_enginner','dt_engineer','admin'] },
                component:testDetail
            },
            {
                path:'operate',
                meta: { role: '*' },
                component:newOperate
            },
            {
                path:'echart',
                meta: { role: '*' },
                component:newEchart
            },
            {
                path:'viewDetail',
                meta: { role: '*' },
                component:echartDetail
            }
        ]
    },
    {
        path:'/home',
        name:'home',
        meta: { role: '*' },
        component:home,
    }
]


let routes = [
	/*{
		path:'/customer',
		name:'customer',
		meta:{ permission:false },
		component:customer,
	},*/
    {
        path: '/login',
        name: 'login',
        meta: { permission: false },
        component: login,
    },
    {
        path: '/403',
        name: '403',
        meta: { permission: false },
        component: limit,
    },
    {
        path: '*',
        name: '404',
        meta: { permission: false },
        component: failure ,
    }
]
let router = new Router({
    routes: routes,
    mode: 'history'
	
})
/*router.beforeEach((to,from,next)=>{
    if ( store.state.navList == '' && store.state.userInfo.client.role !== '' ){
        store.dispatch('permission', store.state.userInfo.client.role)
        console.dir(store.state.navList)
        router.addRoutes(store.state.navList)
        console.dir(router)
        next({ ...to })
    }else{
        next()
    }
})*/
/*router.beforeEach((to, from, next) => {
	let loginStatus = store.state.loginStatus
	let userRole = store.state.userInfo.client.role
	console.dir(userRole)
  	if ( to.meta.permission === false )
  	{
    	next()
	} else if ( to.meta.permission === true && loginStatus === 1 ) 
	{
		if ( to.meta.role.indexOf( userRole ) >= 0 )
		{
	    	next()
		}else
		{
	    	next('/403')
		}
	}else if ( loginStatus === 0 )
	{
	    next('/login')
	}
})*/


/*let whiteList = ['/404','/403','/login']

router.beforeEach((to, from, next) => {
    let info = store.getters.userInfo
    let loginStatus = store.getters.loginStatus === 1
    let white = whiteList.indexOf(to.fullPath)
    if ( loginStatus && ( white < 0 ) ) 
    {
        if ( store.getters.navList == '' && store.getters.userInfo.role !== '')
        {
            store.dispatch('permission', store.getters.userInfo.role)
            router.addRoutes([{
                path: '/home',
                name: 'home',
                component: home,
            }])
            console.dir(router.options.routes)
            next({ ...to, replace: true })
        }
        //next({ ...to, replace: true })
        //console.dir(store.getters.navList)
    } else {
      next()
    } 
})*/
/*router.beforeEach((to, from, next) => {
    let info = store.getters.userInfo
    let infoLength = Object.keys(info).length === 0
    let white = whiteList.indexOf(to.fullPath)
    if ( infoLength && ( white < 0 ) ) {
        store.dispatch('getUserInfo').then((response) => {
            if (response.status === '0') {
                store.dispatch('userLogin', response.data)
                store.dispatch('permission', response.data.userType).then(()=>{
                    router.addRoutes(store.getters.navList)
                    next({ ...to, replace: true })
                })
            }
        })
    }else if (response.status === '1'){
        next('/login')
    }else if (response.status === '2') {
        next()
        Message({
          message: '登录失效,请重新登录',
          type: 'error',
          duration: 2000,
          showClose: true,
          customClass: 'my-el-message',
          onClose: function () {
            next('/login')
          }
        })
    }



})*/








export default router

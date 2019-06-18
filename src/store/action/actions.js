import { asyncRouterMap } from '@/router/index'
const actions = {
	permission: ({commit}, role) => { 
		let routeArr = deepCopy(asyncRouterMap) 
		const navList = filterAsyncRouter(routeArr, role)
		commit('setNavList', navList)
	}
}
// 根据权限 筛选路由
function filterAsyncRouter (asyncRouterMap, roles) {
	const accessedRouters = asyncRouterMap.filter( route => {
		if( typeof(roles) === 'object'){
			for (var i = roles.length - 1; i >= 0; i--) {
				if( route.meta.role == '*' || route.meta.role.indexOf(roles[i]) >= 0 ){
					if( route.children && route.children.length){
						route.children = filterAsyncRouter( route.children,roles[i] )
					}
					return route
				}
			}
		}else{
			if( route.meta.role == '*' || route.meta.role.indexOf(roles) >= 0 ){
				return route
			}
		}
	})
		return accessedRouters
	}
function deepCopy (routeArr) {
	return routeArr.map((arr) => {
		arr = Object.assign({}, arr)
			return arr
	})
}

export default actions

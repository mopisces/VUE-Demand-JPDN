import { asyncRouterMap } from '@/router/index'
/**
 * [actions 根据权限获取权限路由]
 * @type {Object}
 */
const actions = {
	permission: ({commit}, role) => { 
		let routeArr = deepCopy(asyncRouterMap) 
		const navList = filterAsyncRouter(routeArr, role)
		commit('setNavList', navList)
	}
}
/**
 * [filterAsyncRouter 根据权限过滤并存储权限路由]
 * @param  {[array]} asyncRouterMap [权限路由]
 * @param  {[mix]} roles          [权限名称]
 * @return {[array]}                [有权限的路由集合]
 */
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
/**
 * [deepCopy 深度拷贝]
 * @param  {[array]} routeArr [要拷贝的数据]
 * @return {[array]}    arr      [拷贝完成的数据]
 */
function deepCopy (routeArr) {
	return routeArr.map((arr) => {
		arr = Object.assign({}, arr)
			return arr
	})
}

export default actions

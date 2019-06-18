const mutations = {
	/**
	 * [userLogin 设置用户端信息]
	 * @param {[vuex]} state [vuex.state对象]
	 * @param {[object]} userData  [客户端信息]
	 */
	userLogin (state, userData) {
		state.userInfo = Object.assign({},state.userInfo,userData) 
	},
	/**
	 * [setTimeRows 设置根据时间图表数据]
	 * @param {[vuex.state]} state [vuex.state对象]
	 * @param {[array]} rows  [对应数据]
	 */
	setTimeRows(state,rows){
		state.echart.timeChartRows = rows
	},
	/**
	 * [setCusRows 设置根据客户图表数据]
	 * @param {[vuex.state]} state [vuex.state对象]
	 * @param {[array]} rows  [对应数据]
	 */
	setCusRows(state,rows){
		state.echart.cusChartRows = rows
	},
	/**
	 * [setEchartCus 设置根据客户图表的过滤条件]
	 * @param {[vuex.state]} state [vuex.state对象]
	 * @param {[array]} data  [过滤数据]['排序方式','年份']
	 */
	setEchartCus(state,data){
		state.echart.cusFilterData = data
	},
	/**
	 * [setEchartTime 设置根据时间图表的过滤条件]
	 * @param {[vuex.state]} state [vuex.state对象]
	 * @param {[array]} data  [过滤数据]['年份']
	 */
	setEchartTime(state,data){
		state.echart.timeFilterData = data
	},
	/**
	 * [setFilterData 主页数据过滤条件]
	 * @param {[vuex.state]} state [vuex.state对象]
	 * @param {[object]} filterData [过滤条件]
	 */
	setFilterData(state,filterData){
		state.filterData = Object.assign({},state.filterData,filterData)
	},
	/**
	 * [setCustomerList 存储客户列表]
	 * @param {[vuex.state]} state [vuex.state对象]
	 * @param {[array]} list  [客户名称及ID数组]
	 */
	setCustomerList(state , list){
		state.customerList = list
	},	
	/**
	 * [setTitle 公共头部的标题]
	 * @param {[vuex.state]} state [vuex.state对象]
	 * @param {[string]} title [头部标题]
	 */
	setTitle(state, title){
		state.title = title
	},
	/**
	 * [setAuthUrl operate页的权限路由页面及Badge]
	 * @param {[vuex.state]} state [vuex.state对象]
	 * @param {[object]} authUrlMap [对应数据]
	 */
	setAuthUrl(state, authUrlMap){
		state.authUrl = Object.assign({},state.authUrl,authUrlMap)
	},
	/**
	 * [setAnalysts 分析页面跳转时记录对应index及ID]
	 * @param {[vuex.state]} state [vuex.state对象]
	 * @param {[object]} analystsData [对应index及ID]
	 */
	setAnalysts (state,analystsData) {
		state.analysts = Object.assign({},state.analysts,analystsData)
	},
	/**
	 * [setMod 修改页面跳转时记录对应index及ID]
	 * @param {[vuex.state]} state [vuex.state对象]
	 * @param {[object]} modData [对应index及ID]
	 */
	setMod (state,modData){
		state.mod = Object.assign({},state.mod,modData)
	},
	/**
	 * [setTest 测试页面跳转时记录对应index及ID]]
	 * @param {[vuex.state]} state [vuex.state对象]
	 * @param {[object]} testData [对应index及ID]
	 */
	setTest (state,testData){
		state.test = Object.assign({},state.test,testData)
	},
	/**
	 * [setLoginStatus 设置登录状态]
	 * @param {[vuex.state]} state [vuex.state对象]
	 * @param {[number]} status [登录状态] 0--未登录/1--已登录
	 */
	setLoginStatus (state, status) {
		state.loginStatus = status
	},
	/**
	 * [setNavList 设置权限路由]
	 * @param {[vuex.state]} state [vuex.state对象]
	 * @param {[array]} navList [符合vue-router的路由参数]
	 */
	setNavList (state, navList) {
		state.navList = navList
	},

}
export default mutations
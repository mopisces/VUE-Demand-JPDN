const mutations = {
	userLogin (state, userData) {
		state.userInfo = userData
	},
	setTimeRows(state,rows){
		state.echart.timeChartRows = Object.assign({},state.echart.timeChartRows,rows)
	},
	setCusRows(state,rows){
		state.echart.cusChartRows = Object.assign({},state.echart.cusChartRows,rows)
	},
	setEchartCus(state,data){
		state.echart.cusFilterData = data
	},
	setEchartTime(state,data){
		state.echart.timeFilterData = data
	},
	setFilterData(state,filterData){
		state.filterData = Object.assign({},state.filterData,filterData)
	},
	setCustomerList(state , list){
		state.customerList = list
	},	
	setTitle(state, title){
		state.title = title
	},
	setAuthUrl(state, authUrlMap){
		state.authUrl = authUrlMap
	},
	setAnalysts (state,analystsData) {
		state.analysts = Object.assign({},state.analysts,analystsData)
	},
	setMod (state,modData){
		state.mod = Object.assign({},state.mod,modData)
	},
	setTest (state,testData){
		state.test = Object.assign({},state.test,testData)
	},
	setToken (state,token){
		state.token.token = token
		state.token.alive =  (new Date()).getTime()
	},
	setTotalBadge (state,num) {
		state.userInfo.totalBadge = num
	},
	
	setLoginStatus (state, status) {
		state.loginStatus = status
	},
	setNavList (state, navList) {
		state.navList = navList
	},
	changeNetwork(state,status){
		state.changeNetwork = status;
 	}

}
export default mutations
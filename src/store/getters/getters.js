const getters = {
	userInfo: state =>{
		return state.userInfo
	},
	analysts: state => {
		return state.analysts.demand_id
	},
	mod: state => {
		return state.mod.demand_id
	},
	test: state => {
		return state.test.demand_id
	},
	token: state => {
		return state.userInfo.token
	},
	badge: state => {
		return state.badge
	},
	loginStatus: state => {
		return state.loginStatus
	},
	navList: state => {
		return state.navList
	}
}
export default getters
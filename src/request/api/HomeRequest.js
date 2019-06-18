import base from './base'
import axios from '../http'
import md5 from 'js-md5'
import store from '@/store/store'
import encrypt from '@/util/Rsa'

const homeRequest = {
	/**
	 * [getFilterData 获取数据]
	 * @param  {[object]} data [筛选参数]
	 * @return {[promise]}      [axios.post返回]
	 */
	getFilterData( data ){
		var params = new URLSearchParams()
		params.append('data',JSON.stringify(data))
		return axios.post(`${base.domain}backStage/getFilterData`,params)
	},
	/**
	 * [getCusName 获取客户名称及ID]
	 * @param  {String} cusName [客户名称中文]
	 * @return {[promise]}         [axios.post]
	 */
	getCusName( cusName = '' ){
		let params = new URLSearchParams()
		params.append('cusName', cusName)
		return axios.post(`${base.domain}backStage/bulidCustomer`, params)
	},
	/**
	 * [getToken 管理人员登录接口]
	 * @param  {[type]} data [登录账户及密码]
	 * @return {[promise]}      [axios.post]
	 */
	getToken( data ){
		let newParam = new URLSearchParams()
		let enData = encrypt.signEncrpt(data)
		newParam.append('data',enData)
		return axios.post(`${base.domain}staffToken`,newParam)
	},
	/**
	 * [getAuthUrl 用户权限路由]
	 * @return {[promise]}  [axios.post]
	 */
	getAuthUrl(){
		return axios.post(`${base.domain}backStage/getAuthUrl`)
	},
	/**
	 * [customerToken 客户登录接口]
	 * @param  {[type]} data [登录账户及密码]
	 * @return {[promise]}      [axios.post]
	 */
	customerToken( data ){
		let newParam = new URLSearchParams()
		let enData = encrypt.signEncrpt(data)
		newParam.append('data',enData) 	
		return axios.post(`${base.domain}customerToken`,newParam)
	},
	getNodeResponse(){
		return axios.post('http://127.0.0.1:3000')
	}
}
export default homeRequest

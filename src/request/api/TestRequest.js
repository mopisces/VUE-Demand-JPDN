import base from './base'
import axios from '../http'
import encrypt from '@/util/Rsa'
import store from '@/store/store'

const testRequest = {
	/**
	 * [testList 获取待测试列表及总记录数]
	 * @return {[promise]} [description]
	 */
	testList(){
		return axios.post(`${base.domain}backStage/testList`)
	},
	/**
	 * [saveTest description]
	 * @param  {[object]} data [测试数据]
	 * @return {[promise]}      [description]
	 */
	saveTest( data ){
		var params = new URLSearchParams()
		params.append('id',encrypt.strEncrpt(store.state.test.id))
		params.append('pass_test_time',data.pass_test_time)
		params.append('test_remark',data.test_remark)
		return axios.post(`${base.domain}backStage/testSave`,params)
	}
}
export default testRequest
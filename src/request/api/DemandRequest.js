import base from './base'; // 导入接口域名列表
import axios from '../http'; // 导入http中创建的axios实例

const demandRequest = {
	/**
	 * [getDemandID 获取需求ID]
	 * @return {[promise]} [axios.post]
	 */
	getDemandID(){
		return axios.post(`${base.domain}backStage/buildOrderNum`)
	},
	/**
	 * [saveDemand 保存需求信息]
	 * @param  {[object]} data [需求信息]
	 * @return {[promise]}      [axios.post]
	 */
	saveDemand( data ){
		var params = new URLSearchParams()
		params.append('demand_id', data.demand_id)
		params.append('demand_instru', data.demand_instru)
		params.append('expect_com_time', data.expect_com_time)
		params.append('propose_time', data.propose_time)
		params.append('customer_id',data.customer_id)
		return axios.post(`${base.domain}backStage/demandSave`,params)
	},
	/**
	 * [getCustomerList 获取用户pickList]
	 * @return {[promise]} [axios.post]
	 */
	getCustomerList(){
		return axios.post(`${base.domain}backStage/getCustomerList`)
	}
}
export default demandRequest
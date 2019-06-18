import base from './base'
import axios from '../http'
import encrypt from '@/util/Rsa'
import store from '@/store/store'

const analystsRequest = {
	/**
	 * [analystsList 获取待分析列表及总记录数]
	 * @return {[promise]} [description]
	 */
	analystsList(){
		return axios.post(`${base.domain}backStage/analystsList`)
	},
	/**
	 * [saveAnalysts 保存分析]
	 * @param  {[object]} data [结果数据]
	 * @return {[promise]}      [description]
	 */
	saveAnalysts( data ){
		var params = new URLSearchParams()
		params.append('id', encrypt.strEncrpt(store.state.analysts.id) )
		params.append('demand_id', data.demand_id)
		params.append('demand_type', data.demand_type)
		params.append('priority_level', data.priority_level)
		params.append('is_major_mod', data.is_major_mod)
		params.append('confirm_time', data.confirm_time)
		params.append('plan_com_time', data.plan_com_time)
		return axios.post(`${base.domain}backStage/analystsSave`,params)
	}
}
export default analystsRequest
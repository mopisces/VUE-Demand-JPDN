import base from './base'
import axios from '../http'
import encrypt from '@/util/Rsa'
import store from '@/store/store'

const modRequest = {
	/**
	 * [modList 获取待修改列表及总记录数]
	 * @return {[promise]} [description]
	 */
	modList(){
		return axios.post(`${base.domain}backStage/modList`)
	},
	/**
	 * [saveMod 保存修改]
	 * @param  {[object]} data [修改数据]
	 * @return {[promise]}      [axios.post]
	 */
	saveMod( data ){
		var params = new URLSearchParams()
		params.append('id', encrypt.strEncrpt(store.state.mod.id))
		params.append('mod_instru', data.mod_instru)
		params.append('complete_state', data.complete_state)
		params.append('complete_time', data.complete_time)
		params.append('demand_instru',data.demand_instru)
		return axios.post(`${base.domain}backStage/modSave`,params)
	}
}
export default modRequest
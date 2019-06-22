import base from './base'; 
import axios from '../http'; 
import encrypt from '@/util/Rsa'
import store from '@/store/store'
const echartRequest = {
	/**
	 * [echartData 获取图表信息]
	 * @param  {[array]} data 	[过滤条件]
	 * @return {[promise]}      [axios.post]
	 */
	echartData( data ){
		var params = new URLSearchParams()
		params.append('data',encrypt.strEncrpt(data.join('*')))
		return axios.post(`${base.domain}backStage/echartData`,params)
	},
	echartDetail(){
		var params = new URLSearchParams()
		params.append('data',encrypt.strEncrpt(JSON.stringify(store.state.echartDetail)))
		return axios.post(`${base.domain}backStage/ecahrtDetail`,params)
	}
}
export default echartRequest


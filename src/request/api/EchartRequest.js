import base from './base'; 
import axios from '../http'; 
import encrypt from '@/util/Rsa'

const echartRequest = {
	/**
	 * [cusEchartData 获取图表信息]
	 * @param  {[array]} data 	[过滤条件]
	 * @return {[promise]}      [axios.post]
	 */
	cusEchartData( data ){
		var params = new URLSearchParams()
		params.append('data',encrypt.strEncrpt(data.join('*')))
		return axios.post(`${base.domain}backStage/Rsa`,params)
	}
}
export default echartRequest


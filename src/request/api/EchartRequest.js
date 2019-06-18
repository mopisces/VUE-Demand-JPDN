import base from './base'; 
import axios from '../http'; 
import encrypt from '@/util/Rsa'

const echartRequest = {
	cusEchartData( data ){
/*		var params = new URLSearchParams()
		params.append('data',JSON.stringify(data))
		return axios.post(`${base.domain}backStage/getFilterData`,params)*/
		var params = new URLSearchParams()
		params.append('data',encrypt.strEncrpt(data.join('*')))
		return axios.post(`${base.domain}backStage/Rsa`,params)
		//return data
	}
}
export default echartRequest
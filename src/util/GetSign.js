import store from '@/store/store'

import md5 from 'js-md5'

export default {
	/**
	 * [sortByKey 生成sign签名]
	 */
	sortByKey(obj){
		obj['nonce'] = Math.ceil(Math.random()*10)
		obj['timestamp'] = parseInt((new Date().getTime())/ 1000)
		obj['appid'] = store.state.appid
		const newkey = Object.keys(obj).sort().reverse()
		let str = ''
		for (var i = newkey.length-1 ; i >= 0 ; i--) {
			str += newkey[i] + '=' + obj[newkey[i]] + '&'
		}
		str += 'key=' + store.state.appsercet
		obj['sign'] = md5(str).toLowerCase()
		return obj
	}
}
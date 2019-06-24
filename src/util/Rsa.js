import { JSEncrypt } from 'jsencrypt'
import sign from '@/util/GetSign'
var publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDPvemrJ9URwvHt8tiGqjZ/oEAtrqitwO6q2mihFdV1txM/phbRydwsrCXr/CmwVtfnbZQigr7Nl7GmHzrmQ9Us7z5Evd2v+1UcFQLt8FC3As4lvod1BLFwSm6RsgcUAJAhM4JtwwKyA06HlYmceenXbce1J9ne1F+2sP52GzO7FwIDAQAB'
const encrypt = new JSEncrypt()
encrypt.setPublicKey( publicKey )
export default {
	/**
	 * [signEncrpt sign签名生成并加密部分数据]
	 * @param  {[object]} obj [敏感数据]
	 * @return {[json]}     [签名并加密后的json字符串]
	 */
	signEncrpt( obj ){
		let data = sign.sortByKey( obj )
		let enData = {}
		enData['sign'] = data['sign']
		enData['nonce'] = data['nonce']
		if( data.staffPwd === undefined ){
			enData['phoneNum'] = data['phoneNum']
			delete data.phoneNum
		}else{
			enData['staffPwd'] = data['staffPwd']
			delete data.staffPwd
		}
		delete data.sign
		delete data.appid
		delete data.nonce
		let enStr = encrypt.encrypt(JSON.stringify(enData))
		return JSON.stringify({enStr:enStr,data:data})
	},
	/**
	 * [strEncrpt 对字符串RSA加密]
	 * @param  {[string]} str [需要加密的字符串]
	 * @return {[string]}     [加密后的字符串]
	 */
	strEncrpt( str ){
		return encrypt.encrypt(str)
	}
}

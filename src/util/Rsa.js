import { JSEncrypt } from 'jsencrypt'
import sign from '@/util/GetSign'
var publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDPvemrJ9URwvHt8tiGqjZ/oEAtrqitwO6q2mihFdV1txM/phbRydwsrCXr/CmwVtfnbZQigr7Nl7GmHzrmQ9Us7z5Evd2v+1UcFQLt8FC3As4lvod1BLFwSm6RsgcUAJAhM4JtwwKyA06HlYmceenXbce1J9ne1F+2sP52GzO7FwIDAQAB'
const encrypt = new JSEncrypt()
encrypt.setPublicKey( publicKey )
export default {
	signEncrpt( obj ){
		let data = sign.sortByKey( obj )
		let enData = {}
		enData['sign'] = data['sign']
		enData['nonce'] = data['nonce']
		//console.dir(data)
		if( data.staffPwd === undefined ){
			enData['phoneNum'] = data['phoneNum']
			delete data.phoneNum
		}else{
			enData['staffPwd'] = data['staffPwd']
			delete data.staffPwd
		}
		//console.dir(enData)
		delete data.sign
		delete data.appid
		delete data.nonce
		let enStr = encrypt.encrypt(JSON.stringify(enData))
		return JSON.stringify({enStr:enStr,data:data})
	},
	strEncrpt( str ){
		return encrypt.encrypt(str)
	}
}
//export default encrypt
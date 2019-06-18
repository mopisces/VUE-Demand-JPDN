import config from '../../../config/domain.js'
const urlMap = {
	'customer'       :`${config.domain}customerToken`,
	'staff'          :`${config.domain}staffToken`,
	'getAuthUrl'     :`${config.domain}backStage/getAuthUrl`,
	'getCusName'     :`${config.domain}backStage/bulidCustomer`,
	'getFilterData'  :`${config.domain}backStage/getFilterData`,
	'getDemandID'    :`${config.domain}backStage/buildOrderNum`,
	'getCustomerList':`${config.domain}backStage/getCustomerList`,
	'saveDemand'     :`${config.domain}backStage/demandSave`,
	'analystsList'   :`${config.domain}backStage/analystsList`,
	'saveAnalysts'   :`${config.domain}backStage/analystsSave`,
	'modList'        :`${config.domain}backStage/modList`,
	'saveMod'        :`${config.domain}backStage/modSave`,
	'testList'       :`${config.domain}backStage/testList`,
	'saveTest'       :`${config.domain}backStage/testSave`,

}
export default urlMap
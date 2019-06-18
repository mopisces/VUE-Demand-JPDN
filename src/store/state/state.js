const state = {
    /**
     * [appid 生成sign使用]
     * @type {String}
     */
    appid:'jpdn',
    /**
     * [appsercet 生成sign使用]
     * @type {String}
     */
    appsercet:'demand',
    /**
     * [userInfo 客户端信息]
     * @type {Object}
     */
    userInfo: {
        access_token:'',
        expires_time:'',
        refresh_token:'',
        refresh_expires_time:'',
        client:{
            role:'',
            name:'',
            brand:''
        }
    },  
    /**
     * [analysts 分析页面跳转记录对应index及ID]
     * @type {Object}
     */
    analysts:{
        id:'',
        deleteIndex: 0
    },
    /**
     * [mod 修改页面跳转记录对应index及ID]
     * @type {Object}
     */
    mod:{
        id:'',
        deleteIndex: 0
    },
    /**
     * [test 测试页面跳转记录对应index及ID]
     * @type {Object}
     */
    test:{
        id:'',
        deleteIndex:0
    },
    /**
     * [authUrl operate页面相关权限路由的显示及Badge]
     * @type {Object}
     */
    authUrl:{},
    /**
     * [loginStatus 登录状态]
     * @type {Number}
     */
    loginStatus: 1,
    /**
     * [navList 根据权限生成的权限路由]
     * @type {Array}
     */
    navList: [], 
    /**
     * [filterData 主页过滤数据条件]
     * @type {Object}
     */
	filterData:{
        cusName:'',
        demandStatus:['0','1'],
        isMajor:'2',
        demandType:['0','1','2','3'],
        priorityLevel:'2',
        curPage:1,
        keyWorld:'',
        keyType:['1']
	},
    /**
     * [title 公共页面头部]
     * @type {String}
     */
    title:'操作主页',
    /**
     * [customerList 客户信息列表]
     * @type {Array}
     */
    customerList:[],
    /**
     * [echart 图标页的数据]
     * @type {Object}
     */
    echart:{
        cusFilterData:['1','2019'],//客户图表过滤数据
        timeFilterData:['2019'],//时间图表过滤数据
        cusChartRows:[],//客户图表数据
        timeChartRows:[]//时间图表数据
    }
}

export default state
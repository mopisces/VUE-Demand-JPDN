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
        priorityLevel:['0','1','2','3'],
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
        timeChartRows:[],//时间图表数据
        cusStatus:{
            histogramShow:true,
        },
        timeStatus:{
            histogramShow:true
        },
        dataViewStatus:{
            tabViewIndex:'0'
        }
    },
    /**
     * [echartDetail 图表详细页参数]
     * @type {Object}
     */
    echartDetail:{
        time:'',
        cusName:''
    },
    /**
     * [analystsDetail 分析详细页状态]
     * @type {Object}
     */
    analystsDetail:{
        form:{},
        jumpDetail:{
            id:'',
            deleteIndex:null
        }
    },
    /**
     * [modifyDetail 修改详细页状态]
     * @type {Object}
     */
    modifyDetail:{
        form:{},
        jumpDetail:{
            id:'',
            deleteIndex:null
        }
    },
    /**
     * [testDetail 测试详细页状态]
     * @type {Object}
     */
    testDetail:{
        form:{},
        jumpDetail:{
            id:'',
            deleteIndex:null
        }
    }/*,
    cancel:{
        status:null
    }*/
}

export default state
const state = {
    appid:'jpdn',
    appsercet:'demand',
    userInfo: {
        totalBadge:'',
        access_token:'',
        expires_time:'',
        refresh_token:'',
        refresh_expires_time:'',
        client:{
            id:'',
            role:'',
            name:''
        }
    },  
    analysts:{
        id:'',
        deleteIndex: 0
    },
    mod:{
        id:'',
        deleteIndex: 0
    },
    test:{
        id:'',
        deleteIndex:0
    },
    authUrl:{},
    loginStatus: 1,
    navList: [], 
    loginSuccess:null,
    changeNetwork:true,
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
    title:'操作主页',
    customerList:[],
    echart:{
        cusFilterData:['1','2019'],
        timeFilterData:['2019'],
        cusChartRows:{

        },
        timeChartRows:{

        }
    }
}

export default state
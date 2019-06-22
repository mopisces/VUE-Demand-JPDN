export default {
	demandStatusList:[
		{key: '0',value:'分析中'},
		{key: '1',value:'修改中'},
		{key: '2',value:'测试中'},
		{key: '3',value:'已完成'}
	],
	isMajorList:[
		{key: 0,value:'否'},
		{key: 1,value:'是'},
		{key: 2,value:'全部'}
	],

	demandTypeList: [
		{key: '0', value: 'bug'}, 
		{key: '1', value: '内部优化'},
		{key: '2', value: '实施需求'},
		{key: '3', value: '一般需求'}
	],
	homePriorityLevelList:[
		{key: 0, value: '低'},
		{key: 1, value: '一般'},
		{key: 2, value: '高'},
		{key: 3, value: '长期'},
		{key: 4, value: '全部'}
	],
	completeStateList:[
		{key: '0', value: '已实现'},
		{key: '1', value: '已修改'}
	],
	testStateList:[
		{key: '0', value: '未测试'},	
		{key: '1', value: '已测试'}
	],
	keyTypeList:[[
		{name:'内容',value:'0'},
		{name:'时间',value:'1'},
		{name:'客户',value:'2'}
	]],
	timeEchart:[
		{name:'2019',value:'2019'}, {name:'2018',value:'2018'}, {name:'2017',value:'2017'}, {name:'2016',value:'2016'}, {name:'2015',value:'2015'}
	],
	customerEchart:[
		[{name:'TOP10',value:'1'}, {name:'LAST10',value:'2'}], 
		[{name:'2019',value:'2019'}, {name:'2018',value:'2018'}, {name:'2017',value:'2017'}, {name:'2016',value:'2016'}, {name:'2015',value:'2015'}]	
	],
	analystsPriorityLevelList:[
		{key: 0, value: '低'},
		{key: 1, value: '一般'},
		{key: 2, value: '高'},
		{key: 3, value: '长期'}
	]
}
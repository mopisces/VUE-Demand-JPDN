<template>
	<div>
		<group>
			<cell title="原需求编号" :value="demandId"></cell>
			<x-input title="需求编号" v-model="form.demand_id" placeholder="修改编号" text-align="right"></x-input>
			<cell title="需求提出时间" :value="analystsDetail.propose_time"></cell>
  			<cell title="期望完成日期" :value="analystsDetail.expect_com_time"></cell>
			<selector title="需求类型" direction="rtl" :options="list.demandTypeList" v-model="form.demand_type"></selector>
			<selector title="优先级" direction="rtl" :options="list.priorityLevelList" v-model="form.priority_level"></selector>
			<x-switch title="是否重大" :value-map="['0', '1']" v-model="form.is_major_mod"></x-switch>
			<datetime v-model="form.confirm_time" :start-date="startDate"  format="YYYY-MM-DD" title="需求确认时间"></datetime>
			<datetime v-model="form.plan_com_time" :start-date="startDate"  format="YYYY-MM-DD" title="计划完成时间"></datetime>
			<cell title="分析人员" :value="form.staff_name"></cell>
			<x-button type="primary" @click.native="showConfirm()" >提交</x-button>
		</group>
		<div v-transfer-dom>
			<confirm v-model="status.showConfirm" title="提交" @on-confirm="onConfirm()">
				<p style="text-align:center;">确认提交？</p>
			</confirm>
	    </div>
	    <toast v-model="returnMsg.show" is-show-mask :type="returnMsg.type" :time="2000" >{{ returnMsg.text }}</toast>
	</div>
</template>
<script>
	import {XTextarea,TransferDom, Group, Cell, XButton, Toast, Selector, XSwitch, Confirm, Datetime, XInput } from 'vux'

	import store from '@/store/store'
	import options from '@/util/Options'
	import startDate from '@/util/StartDate'

	export default {
		directives: {
			TransferDom
		},
		components: {
			Group,
			XTextarea,
			Cell,
			XButton,
			XTextarea,
			Toast,
			Selector,
			XSwitch ,
			Confirm ,
			Datetime,
			XInput 
		},
		data(){
			return {
				analystsDetail:{},
				demandId:'',
				form:{
					id:'',//demandtable id
					staff_name:'',
					demand_type:'3',
					priority_level:'0',
					is_major_mod:'0',
					confirm_time:'',
					plan_com_time:'',
					demand_id:''
				},
				list:{
					demandTypeList:[],
					priorityLevelList:[]
				},
				status:{
					showConfirm:false
				},
				returnMsg:{
					text:'',
					type:'',
					show:false
				},
				tipText:'',
				startDate:''
			}
		},
		created(){
			/*生产环境开启*/
			store.commit('setTitle','分析需求')
			this.setCreateData()
		},
		methods:{
			/*提取选中数据并设置默认值*/
			setCreateData(){
				this.form.id = store.state.analysts.id
				if( this.form.id === '' ){
					this.setToast('服务器异常，请稍后再试')
					setTimeout(()=>{
			             this.$router.push('/common/operate')
			        },2000)
					return 
				}
				this.list.demandTypeList = options.demandTypeList
				this.list.priorityLevelList = options.priorityLevelList
				this.form.confirm_time = startDate.setToday()
				this.form.plan_com_time = startDate.setToday()
				this.form.staff_name = store.state.userInfo.client.name
				let list = JSON.parse( sessionStorage.getItem( 'analystsList' ) )
				let index = store.state.analysts.deleteIndex
				this.form.id = list[index].id
				this.demandId = list[index].demand_id
				Object.assign(this.analystsDetail,list[index])
			},
			/*检查数据完整并显示confirm*/
			showConfirm(){
				if( this.form.demand_id == ''){
					this.form.demand_id = this.demandId
				}
				this.status.showConfirm = true
			},
			/*提交数据*/
			onConfirm(){
				let self = this
				store.commit('setUserInfoBadge','/analysts')
				this.$api.analystsRequest.saveAnalysts( self.form ).then((res)=>{
					if (res.data.code == 200){
						let array = JSON.parse( sessionStorage.getItem( 'analystsList' ) )
						array.splice(store.state.analysts.deleteIndex,1)
						sessionStorage.setItem('analystsList',JSON.stringify(array))
						store.commit('setUserInfoBadge','/analysts')
						this.setToast('数据提交成功','success')
						setTimeout(()=>{
			              this.$router.push('/common/operate')
			            },2000)
					}else{
						this.setToast('提交数据失败')
					}
				})
				
			},
			setToast( text, type='warn' ){
				this.returnMsg.type = type
				this.returnMsg.text = text
				this.returnMsg.show = true
			}
			/*,
			onHide(){
				this.router.push('/analysts')
			}*/
		}

	}
</script>
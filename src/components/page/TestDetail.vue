<template>
	<div>
		<group>
			<cell title="需求提出日期" :value="testDetail.propose_time"></cell>
			<cell title="期望完成日期" :value="testDetail.expect_com_time"></cell>
			<cell title="需求分析人员" :value="testDetail.analysts"></cell>
			<cell title="需求确认日期" :value="testDetail.confirm_time"></cell>
			<cell title="计划完成日期" :value="testDetail.plan_com_time"></cell>
			<cell title="完成日期" :value="testDetail.complete_time"></cell>
			<cell title="修改人员" :value="testDetail.modipersons"></cell>
			<datetime :start-date="startDate" v-model="form.pass_test_time" format="YYYY-MM-DD" title="完成时间(默认今天)"></datetime>
			<selector direction="rtl" title="测试状态" :options="list.testStateList" v-model="form.test_remark" :readonly="true" ></selector>
			<cell title="测试人员" :value="form.staff_name"></cell>
			<x-button type="primary" @click.native="showConfirm()">提交</x-button>
		</group>
		<div v-transfer-dom>
			<confirm v-model="status.showConfirm" title="确认提交" @on-confirm="onConfirm">
				<p style="text-align:center;">确认提交？</p>
			</confirm>
		</div>
		<toast v-model="returnMsg.show" :type="returnMsg.type" :time="2000">{{ returnMsg.text }}</toast>
	</div>
</template>
<script>
	import { TransferDom, Group, Cell, XButton, Selector, Datetime, Confirm, Toast } from 'vux'


	import startDate from '@/util/StartDate'
	import options from '@/util/Options'
	import store from '@/store/store'
	export default {
		directives: {
			TransferDom
		},
		components: {
			Group,
			Cell,
			XButton,
			Selector,
			Datetime,
			Confirm,
			Toast ,

		},
		data(){
			return {
				testDetail:{},
				form:{
					id:'',
					pass_test_time:'',
					test_remark:'1',
					staff_name:''
				},
				list:{
					testStateList:[]
				},
				status:{
					showConfirm:false
				},
				startDate:'',
				returnMsg:{
					text:'',
					type:'',
					show:false
				}
			}
		},
		created(){
			store.commit('setTitle','测试需求')
			this.setCreateData()
		},
		methods:{
			setCreateData(){
				this.form.id = store.state.test.id
				if( this.form.id === '' ){
					this.setToast('服务器异常，请稍后再试')
					setTimeout(()=>{
			             this.$router.push('/common/operate')
			        },2000)
					return
				}
				this.list.testStateList = options.testStateList
				this.form.pass_test_time = startDate.setToday()
				this.startDate = startDate.setToday()
				this.form.staff_name = store.state.userInfo.client.name
				let list = JSON.parse( sessionStorage.getItem( 'testList' ) ) 
				let index = store.state.test.deleteIndex
				Object.assign(this.testDetail,list[index])
			},
		    onConfirm(){
		    	this.$api.testRequest.saveTest(this.form).then((res)=>{
		    		if( res.data.code == 200){
		    			let array = JSON.parse( sessionStorage.getItem( 'testList' ) )
		    			array.splice(store.state.test.deleteIndex,1)
		    			sessionStorage.setItem('testList',JSON.stringify(array))
		    			this.setToast('数据提交成功','success')
		    			setTimeout(()=>{
			              this.$router.push('/common/operate')
			            },2000)
		    		}else{
						this.setToast('数据提交失败')
		    		}
		    	})
		    },
		    showConfirm(){
		    	this.status.showConfirm = true
		    },
			setToast( text, type='warn' ){
				this.returnMsg.type = type
				this.returnMsg.text = text
				this.returnMsg.show = true
			}
		}
	}
</script>
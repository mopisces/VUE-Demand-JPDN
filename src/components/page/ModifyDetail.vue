<template>
	<div>
		<group>
			<cell title="需求分析人员" :value="modDetail.analysts"></cell>
			<x-textarea v-model.trim="form.demand_instru" :max="5000" :rows="1" autosize title="添加需求说明" ></x-textarea>
			<cell title="需求提出日期" :value="modDetail.propose_time"></cell>
			<cell title="期望完成日期" :value="modDetail.expect_com_time"></cell>
			<cell title="需求确认日期" :value="modDetail.confirm_time"></cell>
			<cell title="计划完成日期" :value="modDetail.plan_com_time"></cell>
			<x-textarea v-model.trim="form.mod_instru" :max="5000" :rows="1" autosize title="添加修改说明" ></x-textarea>
			<selector title="完成状态" direction="rtl" :options="completeStateList" v-model="form.complete_state">
			</selector>
			<datetime v-model="form.complete_time" :start-date="startDate"  format="YYYY-MM-DD" title="完成时间(默认今天)"></datetime>
			<cell title="修改人员" :value="form.staff_name"></cell>
			<x-button type="primary" @click.native="showConfirm()">提交</x-button>
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
	import {TransferDom, XTextarea, Group, Cell, XButton, Selector, Datetime , Confirm, Toast, XInput } from 'vux'

	import store from '@/store/store'
	import startDate from '@/util/StartDate'
	import options from '@/util/Options'

	export default {
		directives: {
			TransferDom
		},
		components: {
			Group,
			XTextarea,
			Cell,
			XButton,
			Selector,
			Datetime ,
			Confirm,
			Toast ,
			XInput,
		},
		data(){
			return {
				modDetail:{},
				form:{
					mod_instru:'',
		            complete_state:'1',
		            complete_time:startDate.setToday(),
		            staff_name:'',
		            demand_instru:''
				},
				list:{
      				completeStateList:[]
      			},
      			status:{
      				showConfirm:false
      			},
      			tipText:'',
      			startDate:'',
      			returnMsg:{
      				type:'',
      				text:'',
      				show:false
      			}
			}
		},
		methods:{
			/**
			 * [setCreateData 创建页面时填充数据]
			 */
			setCreateData(){
				if( typeof(store.state.modifyDetail.jumpDetail.id) != 'string' ){
					this.setToast('非法路由访问')
					this.$router.push('/common/modlist')
				}
				this.form.staff_name = store.state.userInfo.client.name
				let list = JSON.parse( sessionStorage.getItem( 'modList' ) ) 
				let index = store.state.modifyDetail.jumpDetail.deleteIndex
				Object.assign(this.modDetail,list[index])
				this.form.demand_instru = this.modDetail.demand_instru
			},
			/**
			 * [showConfirm 检查数据完整并弹出确认框]
			 */
			showConfirm(){
				if( this.form.mod_instru === ''){
					this.setToast('请填写修改说明')
					return
				}
				this.status.showConfirm = true
			},
			/**
			 * [onConfirm 保存数据]
			 */
			onConfirm(){
				let self = this
				this.$api.modRequest.saveMod(this.form).then((res)=>{
					if ( res.data.code === 200 ){
						let array = JSON.parse( sessionStorage.getItem( 'modList' ) )
						array.splice(store.state.modifyDetail.jumpDetail.deleteIndex,1)
						sessionStorage.setItem('modList',JSON.stringify(array))
						this.setToast('数据提交成功','success')
						store.commit('setMod',{})
						setTimeout(()=>{
			              this.$router.push('/common/operate')
			            },2000)
					}else{
						this.setToast('数据提交失败')
					}
				})
			},
			/**
			 * [setToast 设置Toast]
			 * @param {[string]} text [Toast提示文字]
			 * @param {String} type [Toast类型]
			 */
			setToast( text, type='warn' ){
				this.returnMsg.type = type
				this.returnMsg.text = text
				this.returnMsg.show = true
			}
		},
		created(){
			store.commit('setTitle','修改需求') //修改vuex中标题值
			this.setCreateData()
		},
	  	computed:{
	  		completeStateList(){
	  			return options.completeStateList
	  		}
	  	}

	}
</script>
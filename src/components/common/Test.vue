<template>
	<div>
		{{response}}
	</div>
</template>
<script>
	export default {
		data(){
			return {
				response:''
			}
		},
		methods:{
			getNodeResponse(){
				this.$api.homeRequest.getNodeResponse().then((res)=>{
					this.response = res.data
				}).catch((err)=>{
					this.response = err
				})
			}
		},
		created(){
			this.getNodeResponse()
		}
	}
</script>
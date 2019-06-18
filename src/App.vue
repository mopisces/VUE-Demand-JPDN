<template>
	<div style="height:100%;">
    	<router-view></router-view>
	</div>
</template>
<script>
import store from '@/store/store'
export default {
	data(){
		return {
			name: 'app',
		}
	}
  	
}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';
body {
  background-color: #fbf9fe;
}
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
</style> 


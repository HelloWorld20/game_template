// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import sdk from './config/sdk';
import { isWeixinBrowser } from './config/utils';

require('@/assets/animate.css');

Vue.config.productionTip = false;

if (isWeixinBrowser()) {
  // 微信环境下配置微信权限 需要上到平台才能正常调试微信接口
	sdk.getWxSignPackage(sdk.configWx);
	sdk.setWxShare();
}

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App,
	},
});

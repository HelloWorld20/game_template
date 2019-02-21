import axios from 'axios';
import config from './config';

const sdk = {

	wxSignPackage: null,

	getWxSignPackage(callback) {
		axios.get('http://api.24.friendia.net/wechat/sdkConfig', {
			params: {
				url: location.href.split('#')[0],
			},
		}).then((res) => {
			sdk.wxSignPackage = res.data.payload;
			if (callback) callback();
		}, (err) => {
			console.warn('sdk.getWxSignPackage错误');
			console.log(JSON.stringify(err));
		});
	},

	configWx() {
		console.log('configWx', sdk.wxSignPackage);
		if (!sdk.wxSignPackage.appId || !sdk.wxSignPackage.timestamp
        || !sdk.wxSignPackage.nonceStr || !sdk.wxSignPackage.signature) {
			return false;
		}
            /* 微信接口 */
		wx.config({
			debug: false,
			appId: sdk.wxSignPackage.appId,
			timestamp: sdk.wxSignPackage.timestamp,
			nonceStr: sdk.wxSignPackage.nonceStr,
			signature: sdk.wxSignPackage.signature,
			jsApiList: [
                    // 所有要调用的 API 都要加到这个列表中
				'onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems',
                    // 录音相关
				'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'onVoicePlayEnd', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice',
			],
		});

		return this;
	},

	getUserOpenid(cb) {
		// $.ajax({
		// 	url: '/game/v1/userViewParams',
		// 	async: false,
		// 	dataType: 'json',
		// 	type: 'POST',
		// 	data: {
		// 		game_id: location.href.match(/game_id\/\d+/) ? location.href.match(/game_id\/\d+/)[0].split('/')[1] : -1,
		// 		isTest: 0,
		// 		key: '',
		// 	},
		// 	success(result) {
		// 		const data = result.data;
		// 		if (result.code == 0) {
		// 			cb(data.user_name);
		// 		}
		// 	},
		// 	error(err) {
		// 		console.log(err);
		// 	},
		// });
	},
	// 设置微信分享，通过传opts参数支持二次设置分享文案
	setWxShare: (opts, callback) => {
		const shareInfo = config.share;
		// 配置分享信息
		wx.ready(() => {
			console.log('wx.ready');
			// 分享朋友圈
			wx.onMenuShareTimeline({
				title: shareInfo.title, // 分享标题
				link: shareInfo.link || location.href.split('#')[0], // 分享链接
				imgUrl: shareInfo.imgUrl, // 分享图标
				success: () => {
					console.log('分享朋友圈成功');
					if (callback) callback();
				},
				cancel: () => { },
			});
			// 分享朋友
			wx.onMenuShareAppMessage({
				title: shareInfo.title, // 分享标题
				desc: shareInfo.desc, // 分享描述
				link: shareInfo.link || location.href.split('#')[0], // 分享链接
				imgUrl: shareInfo.imgUrl, // 分享图标
				type: 'link', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success: () => {
					console.log('分享朋友成功');
					if (callback) callback();
				},
				cancel: () => { },
			});
		});
	},
	//  * 微信分享回调
	//  * @method requestShare
	//  * @memberof HWSDK
	requestShare: () => {
		// const self = this;
		// 提交分享接口
		// $.ajax({
		// 	url: '/GameAjax/ShareGame',
		// 	data: {
		// 		game_id: window.game_id,
		// 	},
		// 	type: 'POST',
		// 	success: (data) => {
		// 		// data = JSON.parse(data);
		// 		// if (data['code'] == 0) {
		// 		//     self.requestShareCallback(data);
		// 		// }
		// 		// // debug模式
		// 		// if (self.debug) self.log("返回结果: ", data);
		// 	},
		// 	error: (xhr, errorType, error) => {
		// 		// modals.submitError.set("", "requestShare");
		// 		// // debug模式
		// 		// self.error("返回结果: ", xhr, errorType);
		// 	},
		// });
	},
};

export default sdk;

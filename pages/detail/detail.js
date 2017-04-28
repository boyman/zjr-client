var util = require("../../utils/util");
var config = require('../../config');
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');

Page({
	data : {
		event : null,
		loading : true,
		options : null
	},
	onLoad : function(options) {
		console.log(options);
		var that = this;
		qcloud.request({
			// 要请求的地址
			url : config.service.getEventUrl + '?id=' + options.id,
			// 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
			login : true,
			success (result) {
				console.log('request success', result);
				let event = result.data.event;
				that.setData({
					event : event,
					loading : false
				})
			},

			fail (error) {
				util.showModel('系统出错了', '请联系波哥赶紧修');
				console.log('request fail', error);
			},

			complete () {
				console.log('request complete');
			}
		});
	}
})
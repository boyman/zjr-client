var util = require("../../utils/util");
var config = require('../../config');
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');

Page({
    data: {
    	events : [],
    	loading : true,
        inputShowed: false,
        inputVal: ""
    },
    onLoad : function() {
		var that = this;
		qcloud.request({
			// 要请求的地址
			url : config.service.Url.allEvents,
			// 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
			login : true,
			success (result) {
				console.log('request success', result);
				let events = result.data.events;
				/*events.forEach(function(val, idx, rawarray){
					rawarray[idx].dateTime = val.dateTime.replace(/\-/g, '/').replace(/T/, ' ').replace(/:..\..+/, '')
				});*/
				that.setData({
					events : events
				})
			},

			fail (error) {
				util.showModel('系统出错了', '请联系波哥');
				console.log('request fail', error);
			},

			complete () {
				console.log('request complete');
			}
		});
	}
})

var util = require("../../utils/util");
var config = require('../../config');
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
var base64 = require("../images/base64");

Page({
	data: {
		events: [],
		participates : []
	},
	onLoad : function() {
		this.listReload()
	},
	onPullDownRefresh : function() {
		this.listReload()
	},
	listReload : function() {
		var that = this;
		qcloud.request({
			url : config.service.Url.getMyHostEvents,
			login : true,
			success (result) {
				util.showSuccess('请求成功完成');
				console.log('request success', result);
				let events = result.data.events;
				events.forEach(function(val, idx, rawarray){
					rawarray[idx].dateTime = val.dateTime.replace(/\-/g, '/').replace(/T/, ' ').replace(/\..+/, '')
				});
				that.setData({
					events : events
				})
			},

			fail (error) {
				util.showModel('请求失败', error);
				console.log('request fail', error);
			},

			complete () {
				console.log('request complete');
			}
		});
	}
});
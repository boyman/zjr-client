var util = require("../../utils/util");
var config = require('../../config');
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
var base64 = require("../images/base64");

Page({
	data: {
		loading: true,
		events: [],
		participates : []
	},
	onLoad : function() {
		this.listReload()
	},
	onPullDownRefresh : function() {
		console.log("refresh")
		this.listReload(function(){wx.stopPullDownRefresh()})
	},
	listReload : function(whenComplete) {
		var that = this;
		qcloud.request({
			url : config.service.Url.getMyHostEvents,
			login : true,
			success (result) {
				console.log('request success', result);
				let events = result.data.events;
				events.forEach(function(val, idx, rawarray){
					rawarray[idx].dateTime = val.dateTime.replace(/\-/g, '/').replace(/T/, ' ').replace(/:..\..+/, '')
				});
				that.setData({
					events : events,
					loading : false,
				})
			},

			fail (error) {
				util.showModel('系统出错了', '请联系波哥赶紧修');
				console.log('request fail', error);
			},

			complete () {
				console.log('request complete');
				if(whenComplete) whenComplete();
			}
		});
	}
});
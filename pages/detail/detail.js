var util = require("../../utils/util");
var config = require('../../config');
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');

Page({
	data : {
	    newEvent : false,
		event : null,
		loading : true,
		options : null,
		show : {
			register : false,
			unregister : false,
			watch : false,
			unwatch : false
		},
		showParticipate : false,
		loadingParticipate : false,
		showUnparticipate : false,
		loadingUnparticipate : false,
		showWatch : false,
		loadingWatch : false,
		showUnwatch : false,
		loadingUnwatch : false,
		options : null,
	},
	onLoad : function(options) {
		console.log(options);
		this.setData({options : options});
		this.loadEvent()
	},
	loadEvent : function() {
	    var options = this.data.options;
		var that = this;
		qcloud.request({
			// 要请求的地址
			url : config.service.getEventUrl + '?id=' + options.id,
			// 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
			login : true,
			success (result) {
				console.log('request success', result);
				let event = result.data.event;
				let app = getApp();
				event.dateTime = event.dateTime.replace(/\-/g, '/').replace(/T/, ' ').replace(/:..\..+/, '')
				that.setData({
				    newEvent : options.newEvent == 1,
					event : event,
					loading : false,
					showParticipate : !event.isMine && !event.participated && !event.pending,
					showUnparticipate : event.participated || event.pending,
					showWatch : !event.isMine && !event.participated && !event.pending && !event.watching,
					showUnwatch : !event.isMine && !event.participated && !event.pending && event.watching,
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
	},
	onShareAppMessage : function() {
		return {
			title : '邀请您参加' + this.data.event.name,
			// TODO: thumbnail page
			path : '/pages/detail/detail?id=' + this.data.event._id
		}
	},
	participate : function() {
		var that = this;
		this.setData({loadingParticipate : true})
		qcloud.request({
			// 要请求的地址
			url : config.service.Url.participate + '?id=' + this.data.event._id,
			// 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
			login : true,
			success (result) {
				console.log('request success', result);
				that.setData({
					loadingParticipate : false,
					showParticipate : false,
					showUnparticipate : true,
					showWatch : false,
					showUnwatch : false,
					event : result.data.savedEvent,
				});
				that.loadEvent()
			},

			fail (error) {
				util.showModel('系统出错了', '请联系波哥赶紧修');
				console.log('request fail', error);
			},

			complete () {
				console.log('request complete');
			}
		});
	},
	unparticipate : function() {
		var that = this;
		this.setData({loadingUnparticipate : true})
		qcloud.request({
			// 要请求的地址
			url : config.service.Url.unparticipate + '?id=' + this.data.event._id,
			// 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
			login : true,
			success (result) {
				console.log('request success', result);
				that.setData({
					loadingUnparticipate : false,
					showParticipate : true,
					showUnparticipate : false,
					showWatch : true,
					showUnwatch : false,
					event : result.data.savedEvent
				});
				that.loadEvent()
			},

			fail (error) {
				util.showModel('系统出错了', '请联系波哥赶紧修');
				console.log('request fail', error);
			},

			complete () {
				console.log('request complete');
			}
		});
	},
    backToIndex : function(e) {
        wx.switchTab({url : "../index/index"})
    }
})
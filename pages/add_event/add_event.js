var util = require("../../utils/util");
var config = require('../../config');
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');

Page({
	data : {
		nameRemain : 20,
		descRemain : 140,
		addressRemain : 80,
		date : null,
		time : '18:00',
		loading : false,
		valid: {
			name: true,
			desc: true,
			address: true
		}
	},
	onLoad : function() {
		var d = new Date(Date.now())
		this.setData({
			date : d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
		})
	},
	formSubmit : function(e) {
		console.log('form发生了submit事件，携带数据为：', e.detail.value)
		if(!this.validateParameters(e.detail.value)) {
			util.showModel("请检查输入", "" + (!this.data.valid.name?" 活动名 ":"") + (!this.data.valid.desc?" 活动简介 ":"") + 
					(!this.data.valid.address?" 地址 ":"") + "不能为空")
			return
		}
		this.setData({
			loading : true
		});
		this.doRequest(e.detail.value)
	},
	bindDateChange : function(e) {
		this.setData({
			date : e.detail.value
		})
	},
	bindTimeChange : function(e) {
		this.setData({
			time : e.detail.value
		})
	},
	/**
	 * 点击「请求」按钮，测试带会话请求的功能
     */
	doRequest : function(data) {
		util.showBusy('正在请求');
		var that = this;
		var uri = Object.keys(data).map((i) => i + '=' + encodeURI(data[i])).join('&');
		console.log(uri)

		// qcloud.request() 方法和 wx.request() 方法使用是一致的，不过如果用户已经登录的情况下，会把用户的会话信息带给服务器，服务器可以跟踪用户
		qcloud.request({
			// 要请求的地址
			url : config.service.Url.addEvent + '?' + uri,

			// 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
			login : true,

			success (result) {
				util.showSuccess('请求成功完成');
				console.log('request success', result);

				if (result && result.data && result.data.savedEvent) {
					wx.redirectTo({
						url : '../detail/detail?id=' + result.data.savedEvent._id + '&newEvent=1'
					})
				}
			},

			fail (error) {
				util.showModel('请求失败', error);
				console.log('request fail', error);
			},

			complete () {
				console.log('request complete');
				that.setData({
					loading : false
				})
			}
		});
	},
	validateParameters : function(params) {
		let valid = {};
		valid.name = params.name.length > 1
		valid.desc = params.description.length > 1
		valid.address = params.address.length > 0
		this.setData({valid: valid})
		return valid.name && valid.desc && valid.address;
	},
	nameChange : function(e) {
		this.setData({
			nameRemain : 20 - e.detail.value.length
		})
	},
	descChange : function(e) {
		this.setData({
			descRemain : 140 - e.detail.value.length
		})
	}
})
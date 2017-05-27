var util = require("../../utils/util");
var config = require('../../config');
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');

Page({
	data : {
		nameRemain : 20,
		descRemain : 140,
		addressRemain : 80,
		dateValue : '',
		dateDisplay : '',
		today : '',
		timeValue : '18:00',
		timeDisplay : '6:00:00 PM',
		loading : false,
		valid: {
			name: true,
			desc: true,
			address: true
		}
	},
	onLoad : function() {
		var d = util.datetime.ssLocalDatetimeFormat((new Date(Date.now())).toLocaleString())
		console.log(d.date.system)
		this.setData({
		    dateValue : d.date.system,
		    today : d.date.system,
            dateDisplay : d.date.display,
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
        var d = util.datetime.ssLocalDateFormat(e.detail.value)
        this.setData({
            dateValue : e.detail.value,
            dateDisplay : d.display,
        })
    },
    bindTimeChange : function(e) {
        var d = util.datetime.ssLocalTimeFormat(e.detail.value)
        this.setData({
            timeValue : e.detail.value,
            timeDisplay : d.display
        })
    },
	doRequest : function(data) {
		var that = this;
		data.utcTime = util.datetime.snLocalDatetimeToUtc(data.date + ' ' + data.time)
		qcloud.request({
			url : config.service.Url.addEvent,
			method : 'POST',
			data : data,
			login : true,
			success (result) {
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
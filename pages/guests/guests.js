var util = require("../../utils/util");
var config = require('../../config');
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');

Page({
	data : {
        total : 0,
		guests : [
            {
                name: "张三",
                openId: "123",
                image: "../../image/wechatHL.png",
                guests: []
            },
            {
                name: "李四",
                openId: "456",
                image: "../../image/wechat.png",
                guests: ["小孩", "表弟"]
            }
        ]
	},
	onLoad : function(options) {
        var total = 0;
        this.data.guests.forEach(function(g) {
            total += 1 + g.guests.length
        })
        this.setData({total : total})
	}
})
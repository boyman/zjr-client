var util = require("../../utils/util");
var config = require('../../config');
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');

Page({
    data : {
        total : 0,
        id : null,
        guests : [
            {
                name : "张三",
                openId : "123",
                image : "../../image/wechatHL.png",
                guests : []
            },
            {
                name : "李四",
                openId : "456",
                image : "../../image/wechat.png",
                guests : [ "小孩", "表弟" ]
            }
        ]
    },
    onLoad : function(options) {
        console.log(options)
        this.setData({
            id : options.id
        })
        var total = 0;
        this.data.guests.forEach(function(g) {
            total += 1 + g.guests.length
        })
        this.setData({
            total : total
        })
        qcloud.request({
            // 要请求的地址
            url : config.service.Url.guests + '?id=' + options.id,
            // 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
            login : true,
            success (result) {
                console.log('request success', result);
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
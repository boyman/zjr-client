var util = require("../../../utils/util");
var config = require('../../../config');
var qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index');

Page({
    data : {
        loading : true,
        total : 0,
        id : null,
        event : null
    },
    onLoad : function(options) {
        var that = this;
        console.log(options)
        this.setData({
            id : options.id
        })
        qcloud.request({
            // 要请求的地址
            url : config.service.Url.guests + '?id=' + options.id,
            // 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
            login : true,
            success (result) {
                console.log('request success', result);
                var event = result.data.guests[0]
                if (!event.guests[0].name)
                    event.guests = []
                that.setData({
                    event : event,
                    total : event.totalGuests,
                    loading : false,
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
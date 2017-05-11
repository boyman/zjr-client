var util = require("../../utils/util");
var config = require('../../config');
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
var base64 = require("../images/base64");

Page({
    data : {
        loading : true,
        events : null
    },
    onLoad : function() {
        this.loadForMe()
        //this.testLoad()
    },
    onPullDownRefresh : function() {
        console.log("refresh")
        this.loadForMe(function() {
            wx.stopPullDownRefresh()
        })
    },
    loadForMe : function(whenComplete) {
        var that = this;
        that.setData({
            loading : true
        })
        qcloud.request({
            url : config.service.Url.getEventsForMe,
            login : true,
            success (result) {
                console.log('request success', result);
                that.setData({
                    events : result.data.events,
                    loading : false,
                })
            },

            fail (error) {
                util.showModel('系统出错了', '请联系波哥赶紧修');
                console.log('request fail', error);
            },

            complete () {
                console.log('request complete');
                if (whenComplete) whenComplete();
            }
        });
    },
    testLoad : function() {
        qcloud.request({
            url : config.service.Url.test + '?id=5912a1438ee63864114f253e',
            login : true,
            success (result) {
                console.log('request success', result);
            },

            fail (error) {
                console.log('request fail', error);
            },

            complete () {
                console.log('request complete');
            }
        });
    }
});
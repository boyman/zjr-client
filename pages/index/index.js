var util = require("../../utils/util");
var config = require('../../config');
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
var base64 = require("../images/base64");

Page({
    data : {
        unauthorized : false,
        pageLoading : true,
        pulldownLoading : false,
        loadingAfterAuth : false,
        updatedTime : null,
        pageAge : '0秒',
        events : null
    },
    onLoad : function() {
        this.loadPage()
    //this.testLoad()
    },
    loadPage : function(completeCallback) {
        var that = this;
        qcloud.request({
            url : config.service.Url.getEventsForMe,
            login : true,
            success (result) {
                console.log('页面内容载入成功，渲染开始', result);
                that.setData({
                    events : result.data.events,
                    unauthorized : false,
                    updatedTime : Date.now(),
                })
            },
            fail (error) {
                console.log('页面内容载入失败', error);
                if (error.detail.errMsg == "getUserInfo:fail auth deny") {
                    console.log('用户拒绝授权，显示授权提示页面')
                    that.setData({
                        unauthorized : true,
                    })
                } else {
                    util.showModel('系统出错了', error.detail.errMsg);
                }
            },
            complete () {
                if (completeCallback) completeCallback();
                that.setData({
                    loadingAfterAuth : false,
                    pageLoading : false,
                    pulldownLoading : false,
                })
            }
        });
    },
    onPullDownRefresh : function() {        
        let updatedTime = this.data.updatedTime / 1000;
        let now = Date.now() / 1000;
        // 别瞎扯
        if(this.data.pageLoading || now - updatedTime < 3) {
            wx.stopPullDownRefresh();
            return
        }
        this.setData({
            pageAge : Math.round((now - updatedTime)/60) + '分' + Math.round((now - updatedTime)) % 60 + '秒',
            pulldownLoading : true,
        })
        this.loadPage(function() {
            wx.stopPullDownRefresh()
        })
    },
    // for testing API
    // TODO: remove
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
    },
    doAuthorize : function() {
        var that = this;
        wx.openSetting({
            success : (res) => {
                console.log('openSettings success: ', res)
                if(res.authSetting["scope.userInfo"]) {
                    that.setData({
                        unauthorized : false,
                        loadingAfterAuth : true
                    })
                    that.loadPage()
                }
            },
            fail : (err) => { // TODO: remove this
                console.log('openSetting failed: ', err)
            }
        })
    }
});
var util = require("../../utils/util");
var config = require('../../config');
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');

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
    onHide : function() {
        this.setData({
            hide : true,
        })
        clearTimeout(this.data.refreshTimeout);
    },
    onShow : function() {
        if (this.data.hide) {
            this.setData({
                refreshTimeout : setTimeout(this.loadPage, config.heartbeat.fast * 1000),
            })
        }
    },
    onLoad : function() {
        this.loadPage()
    },
    loadPage : function(completeCallback) {
        if (this.data.loading) {
            return;
        }
        var that = this;
        clearTimeout(this.data.refreshTimeout);
        this.setData({
            updatedTime : Date.now(),
            loading : true,
        })
        qcloud.request({
            url : config.service.Url.getEventsForMe,
            login : true,
            success (result) {
                console.log('页面内容载入成功，渲染开始', result);
                result.data.events.hosting.forEach(function(val, idx, rawarray) {
                    rawarray[idx].dateTime = util.datetime.nsUtcToLocalDatetime(val.dateTime).date.display
                });
                result.data.events.participating.forEach(function(val, idx, rawarray) {
                    rawarray[idx].dateTime = util.datetime.nsUtcToLocalDatetime(val.dateTime).date.display
                });
                result.data.events.pending.forEach(function(val, idx, rawarray) {
                    rawarray[idx].dateTime = util.datetime.nsUtcToLocalDatetime(val.dateTime).date.display
                });
                result.data.events.watching.forEach(function(val, idx, rawarray) {
                    rawarray[idx].dateTime = util.datetime.nsUtcToLocalDatetime(val.dateTime).date.display
                });
                that.setData({
                    events : result.data.events,
                    unauthorized : false,
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
                    loading : false,
                    loadingAfterAuth : false,
                    pageLoading : false,
                    pulldownLoading : false,
                    refreshTimeout : setTimeout(that.loadPage, config.heartbeat.medium * 1000),
                })
            }
        });
    },
    onPullDownRefresh : function() {
        let updatedTime = this.data.updatedTime / 1000;
        let now = Date.now() / 1000;
        // 别瞎扯
        if (this.data.pageLoading || now - updatedTime < 6) {
            wx.stopPullDownRefresh();
            return
        }
        this.setData({
            pageAge : Math.round((now - updatedTime) / 60) + '分' + Math.round((now - updatedTime)) % 60 + '秒',
            pulldownLoading : true,
        })
        this.loadPage(function() {
            wx.stopPullDownRefresh()
        })
    },
    doAuthorize : function() {
        var that = this;
        wx.openSetting({
            success : (res) => {
                console.log('openSettings success: ', res)
                if (res.authSetting["scope.userInfo"]) {
                    that.setData({
                        unauthorized : false,
                        loadingAfterAuth : true
                    })
                    that.loadPage()
                }
            }
        })
    }
});
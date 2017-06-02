var util = require("../../utils/util");
var config = require('../../config');
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');

Page({
    data : {
        loading : false,
        pageInvalid : false,
        newEvent : false,
        event : null,
        pageLoading : true,
        eventId : null,
        showParticipate : false,
        loadingParticipate : false,
        showUnparticipate : false,
        loadingUnparticipate : false,
        showWatch : false,
        loadingWatch : false,
        showUnwatch : false,
        loadingUnwatch : false,
        showGuestsLink : false,
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
    onLoad : function(options) {
        console.log(options);
        this.setData({
            eventId : options.id,
            newEvent : options.newEvent == 1,
            pageInvalid : options.id == null,
        });
        this.loadPage()
    },
    loadPage : function() {
        if(this.data.pageInvalid || this.data.loading) return;
        var that = this;
        clearTimeout(this.data.refreshTimeout);
        this.setData({
            updatedTime : Date.now(),
            loading : true,
        })
        qcloud.request({
            url : config.service.getEventUrl + '?id=' + that.data.eventId,
            login : true,
            success (result) {
                console.log('request success', result);
                var event = result.data.event[0];
                console.log(event.dateTime)
                var dt = util.datetime.nsUtcToLocalDatetime(event.dateTime);
                event.dateTime = dt.date.display + ' ' + dt.time.display
                that.setData({                    
                    event : event,
                    showParticipate : !event.isMine && !event.participating && !event.pending,
                    showUnparticipate : event.participating || event.pending,
                    showWatch : !event.isMine && !event.participating && !event.pending && !event.watching,
                    showUnwatch : event.watching,
                    showGuestsLink : (event.settings.guestsVisibility == 0
                            || (event.participating && event.settings.guestsVisibility == 1)
                            || event.isMine)
                })
            },
            fail (error) {
                console.log('request fail', error);
            },
            complete () {
                console.log('request complete');
                that.setData({
                    loading : false,
                    pageLoading : false,
                    refreshTimeout : setTimeout(that.loadPage, config.heartbeat.medium * 1000),
                })
            }
        });
    },
    onShareAppMessage : function() {
        return {
            title : '活动邀请',
            // TODO: thumbnail page
            path : '/pages/detail/detail?id=' + this.data.event._id
        }
    },
    watch : function() {
        var that = this;
        this.setData({
            loadingWatch : true
        })
        qcloud.request({
            url : config.service.Url.watch + '?id=' + this.data.event._id,
            login : true,
            success (result) {
                console.log('request success', result);
                that.setData({
                    loadingWatch : false,
                    showParticipate : true,
                    showUnparticipate : false,
                    showWatch : false,
                    showUnwatch : true
                });
                that.loadEvent()
            },
            fail (error) {
                console.log('request fail', error);
            },
            complete () {
                console.log('request complete');
            }
        });
    },
    unwatch : function() {
        var that = this;
        this.setData({
            loadingUnwatch : true
        })
        qcloud.request({
            // 要请求的地址
            url : config.service.Url.unwatch + '?id=' + this.data.event._id,
            // 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
            login : true,
            success (result) {
                console.log('request success', result);
                that.setData({
                    loadingUnwatch : false,
                    showParticipate : true,
                    showUnparticipate : false,
                    showWatch : true,
                    showUnwatch : false
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
    participate : function() {
        var that = this;
        this.setData({
            loadingParticipate : true
        })
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
                    showUnwatch : false
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
        this.setData({
            loadingUnparticipate : true
        })
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
                    showUnwatch : false
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
        wx.switchTab({
            url : "../index/index"
        })
    }
})
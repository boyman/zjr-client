var util = require("../../../utils/util");
var config = require('../../../config');
var qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index');

Page({
    data : {
        loading : false,
        event : null,
        pageLoading : true,
        eventId : null,
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
                refreshTimeout : setTimeout(this.loadPage, config.heartbeat.slow * 1000),
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
            url : config.service.Url.thumbnail + '?id=' + that.data.eventId,
            login : false,
            success (result) {
                console.log('request success', result);
                var event = result.data.event[0];
                console.log(event.dateTime)
                var dt = util.datetime.nsUtcToLocalDatetime(event.dateTime);
                event.dateTime = dt.date.display + ' ' + dt.time.display
                that.setData({                    
                    event : event,
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
                    refreshTimeout : setTimeout(that.loadPage, config.heartbeat.slow * 1000),
                })
            }
        });
    },
    backToIndex : function(e) {
        wx.switchTab({
            url : "../index/index"
        })
    }
})
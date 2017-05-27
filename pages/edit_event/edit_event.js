var util = require("../../utils/util");
var config = require('../../config');
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');

Page({
    data : {
        pageLoading : true,
        submitLoading : false,
        eventId : null,
        event : null,
        dateValue : '',
        dateDisplay : '',
        timeValue : '',
        timeDisplay : '',
    },
    onLoad : function(options) {
        this.setData({eventId : options.id})
        var that = this;
        qcloud.request({
            url : config.service.Url.thumbnail + '?id=' + that.data.eventId,
            login : true,
            success (result) {
                console.log('request success', result);
                var event = result.data.event[0];
                var d = util.datetime.nsUtcToLocalDatetime(event.dateTime);
                that.setData({
                    pageLoading : false,
                    event : event,
                    descRemain : 140 - event.description.length,
                    dateValue : d.date.system,
                    dateDisplay : d.date.display,
                    timeValue : d.time.system,
                    timeDisplay : d.time.display,
                })
            },
            fail (error) {
                console.log('request fail', error);
            },
            complete () {
                console.log('request complete');
            }
        });
    },
    formSubmit : function(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        var data = e.detail.value;
        data.id = this.data.eventId;
        data.utcTime = util.datetime.snLocalDatetimeToUtc(e.detail.value.date + ' ' + e.detail.value.time)
        var that = this
        this.setData({
            submitLoading : true
        })
        qcloud.request({
            url : config.service.Url.editEvent,
            login : true,
            method : 'POST',
            data : data,
            success (result) {
                console.log('request success', result);
                util.showSuccess('更新成功')
                wx.navigateBack()
            },
            fail (error) {
                console.log('request fail', error);
            },
            complete () {
                console.log('request complete');
            }
        });
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
    descChange : function(e) {
        this.setData({
            descRemain : 140 - e.detail.value.length
        })
    },
});
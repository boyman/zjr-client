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
                let event = result.data.event[0];
                let d = new Date(event.dateTime)
                that.setData({
                    pageLoading : false,
                    event : event,
                    descRemain : 140 - event.description.length,
                    dateValue : d.toLocaleDateString(),
                    dateDisplay : d.toDateString(),
                    timeValue : d.toLocaleTimeString(),
                    timeDisplay : d.toLocaleTimeString(),
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
        var d = new Date(e.detail.value)
        this.setData({
            dateValue : e.detail.value,
            dateDisplay : d.toDateString()
        })
    },
    bindTimeChange : function(e) {
        var d = new Date('2000-01-01 ' + e.detail.value)
        this.setData({
            timeValue : e.detail.value,
            timeDisplay : d.toLocaleTimeString()
        })
    },
    descChange : function(e) {
        this.setData({
            descRemain : 140 - e.detail.value.length
        })
    },
});
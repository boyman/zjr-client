var util = require("../../../utils/util");
var config = require('../../../config');
var qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index');

Page({
    data : {
        loading : true,
        updating : false,
        eventName : "",
        eventId : null,
        updated : false,
        guests : [],
        prevGuests : [],
    },
    onLoad : function(options) {
        console.log(options)
        this.setData({
            eventName : options.eventName,
            eventId : options.eventId,
        })
        this.loadGuests()
    },
    loadGuests : function() {
        var that = this;
        this.setData({
            loading : true
        })
        qcloud.request({
            // 要请求的地址
            url : config.service.Url.myGuests + '?id=' + that.data.eventId,
            // 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
            login : true,
            success (result) {
                console.log('request success', result);
                that.setData({
                    loading : false,
                    updated : false,
                    guests : result.data.event[0].guests,
                    prevGuests : result.data.event[0].guests,
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
    },
    nameChange : function(e) {
        var input = e.detail.value
        var lastChar = input.slice(-1)
        if (lastChar == ',' || lastChar == ' ' || lastChar == '，') {
            if (input.length > 1) {
                var guests = this.data.guests;
                guests.push(input.slice(0, -1));
                this.setData({
                    guests : guests,
                    updated : true
                });
            }
            return {
                value : ""
            }
        }
    },
    nameConfirm : function(e) {
        var input = e.detail.value
        if (input.length > 1) {
            var guests = this.data.guests;
            guests.push(input);
            this.setData({
                guests : guests,
                updated : true
            });
        }
        return {
            value : ""
        }
    },
    deleteGuest : function(e) {
        var guests = this.data.guests;
        guests.splice(e.target.dataset.index, 1);
        this.setData({
            guests : guests,
            updated : true
        });
    },
    updateGuests : function(e) {
        var that = this;
        var somethingNew = false;
        if (this.data.guests.length == this.data.prevGuests.length) {
            var cg = this.data.guests;
            var pg = this.data.prevGuests;
            cg.sort();
            pg.sort();
            var i;
            for (i = 0; i < cg.length; i++) {
                if (cg[i] != pg[i]) {
                    somethingNew = true;
                    break;
                }
            }
        } else {
            somethingNew = true;
        }
        if (somethingNew) {
            console.log("Should send update")
            that.setData({
                updating : true
            })
            qcloud.request({
                // 要请求的地址
                url : config.service.Url.bringGuests + '?id=' + that.data.eventId,
                data : {
                    guests : that.data.guests
                },
                method : 'POST',
                // 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
                login : true,
                success (result) {
                    console.log('request success', result);
                    that.setData({
                        updated : false
                    })
                    util.showSuccess('更新成功')
                },

                fail (error) {
                    util.showModel('系统出错了', '请联系波哥赶紧修');
                    console.log('request fail', error);
                },

                complete () {
                    console.log('request complete');
                }
            });
        } else {
            that.setData({
                updated : false
            })
        }
    }
});
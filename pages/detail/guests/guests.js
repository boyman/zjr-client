var util = require("../../../utils/util");
var config = require('../../../config');
var qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index');

Page({
    data : {
        pageLoading : true,
        eventId : null,
        event : null,
        openIdSlideLeft : -1,
        styleSlideLeft : "",
        widthSlideLeft : 0, // how many buttons
        btnWidth: 120 // width of one button（rpx）
    },
    updatePageContent : function(event) {
        if (!event.guests[0].openId) // TODO: when no guest, first guest is empty, skip all
            event.guests = []
        if (!event.pendingGuests[0].openId) // TODO: when no guest, first guest is empty, skip all
            event.pendingGuests = []
        this.setData({
            event : event
        })
    },
    loadPageContent : function() {
        var that = this;
        qcloud.request({
            url : config.service.Url.guests + '?id=' + that.data.eventId,
            login : true,
            success (result) {
                console.log('request success', result);
                that.updatePageContent(result.data.guests[0]);
                that.setData({
                    pageLoading : false,
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
    onLoad : function(options) {
        var that = this;
        console.log(options)
        this.setData({
            eventId : options.id
        })
        this.loadPageContent();
    },
    deleteGuest:function(e) {
    	console.log('Delete:', e.currentTarget.dataset.openId)
    	var that = this;
    	qcloud.request({
    	    url : config.service.Url.deleteGuest + '?id=' + that.data.eventId + '&guest=' + e.currentTarget.dataset.openId,
    	    login : true,
    	    success (result) {
    	        console.log('request success', result)
    	        if(result.data.message == 'ok') {
    	            var event = that.data.event;
    	            event.totalGuests = event.totalGuests - 1 - e.currentTarget.dataset.numGuests;
    	            console.log('totalGuests', event.totalGuests)
    	            console.log('numGuests', e.currentTarget.dataset.numGuests)
    	            event.guests.splice(e.currentTarget.dataset.index, 1);
    	            that.setData({
    	                event : event
    	            })
    	        }
    	    }
    	})
    },
    deletePendingGuest:function(e) {
        console.log('Delete:', e.currentTarget.dataset.openId)
        var that = this;
        qcloud.request({
            url : config.service.Url.deletePendingGuest + '?id=' + that.data.eventId + '&guest=' + e.currentTarget.dataset.openId,
            login : true,
            success (result) {
                console.log('request success', result)
                if(result.data.message == 'ok') {
                    var event = that.data.event;
                    event.pendingGuests.splice(e.currentTarget.dataset.index, 1);
                    that.setData({
                        event : event
                    })
                }
            }
        })
    },
    approveGuest:function(e) {
    	console.log('Approve:', e.currentTarget.dataset.openId)
    	var that = this;
        qcloud.request({
            url : config.service.Url.approveGuest + '?id=' + that.data.eventId + '&guest=' + e.currentTarget.dataset.openId,
            login : true,
            success (result) {
                console.log('request success', result)
                if(result.data.message == 'ok') {
                    var event = that.data.event;
                    var guest = event.pendingGuests[e.currentTarget.dataset.index];                    
                    event.totalGuests = event.totalGuests + 1;
                    event.guests.push({
                        openId : guest.openId,
                        name : guest.name,
                        image : guest.image,
                        guests : []
                    });
                    event.pendingGuests.splice(e.currentTarget.dataset.index, 1);
                    that.setData({
                        event : event
                    })
                }
            }
        })
    },
    touchS:function(e) {
        console.log('Index:', e.currentTarget.dataset.index)
    	if(e.touches.length==1){
    		this.setData({
    			openIdSlideLeft : e.currentTarget.dataset.openId,
    			widthSlideLeft : e.currentTarget.dataset.width, 
    			styleSlideLeft : "",
    			//设置触摸起始点水平方向位置
    			startX:e.touches[0].clientX
    		});
        }
    },
    touchM:function(e){
    	if(e.touches.length==1){
    		//手指移动时水平方向位置
    		var moveX = e.touches[0].clientX;
    		//手指起始点位置与移动期间的差值
    		var disX = this.data.startX - moveX;
    		var btnWidth = this.data.btnWidth * this.data.widthSlideLeft;
    		var txtStyle = "";
    		if(disX == 0 || disX < 0){
    			//如果移动距离小于等于0，文本层位置不变
    			txtStyle = "left:0rpx";
    		} else if(disX > 0 ){
    			//移动距离大于0，文本层left值等于手指移动距离
    			txtStyle = "left:-"+disX+"rpx";
    			if(disX>=btnWidth){
    				//控制手指移动距离最大值为删除按钮的宽度
    				txtStyle = "left:-"+btnWidth+"rpx";
    			}
    		}
    		//更新列表的状态
    		this.setData({
    			styleSlideLeft: txtStyle
    		});
    	}
    },
    touchE:function(e){
    	if(e.changedTouches.length==1){
    		//手指移动结束后水平位置
    		var endX = e.changedTouches[0].clientX;
    		//触摸开始与结束，手指移动的距离
    		var disX = this.data.startX - endX;
    		var btnWidth = this.data.btnWidth * this.data.widthSlideLeft;
    		//如果距离小于删除按钮的1/2，不显示删除按钮
    		var txtStyle = disX > btnWidth/2 ? "left:-"+btnWidth+"rpx":"left:0rpx";
    		//更新列表的状态
    		this.setData({
    			styleSlideLeft: txtStyle
    		});
    	}
    },
})
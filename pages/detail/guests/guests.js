var util = require("../../../utils/util");
var config = require('../../../config');
var qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index');

Page({
    data : {
        loading : true,
        total : 0,
        id : null,
        event : null,
        indexSlideLeft : -1,
        styleSlideLeft : "",
        delBtnWidth: 240//删除按钮宽度单位（rpx）
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
    },
    deleteGuest:function(e) {
    	console.log('Delete:', e.currentTarget.dataset.openId)
    },
    approveGuest:function(e) {
    	console.log('Approve:', e.currentTarget.dataset.openId)
    },
    touchS:function(e) {
    	if(e.touches.length==1){
    		this.setData({
    			indexSlideLeft : e.currentTarget.dataset.index,
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
    		var delBtnWidth = this.data.delBtnWidth;
    		var txtStyle = "";
    		if(disX == 0 || disX < 0){
    			//如果移动距离小于等于0，文本层位置不变
    			txtStyle = "left:0rpx";
    		} else if(disX > 0 ){
    			//移动距离大于0，文本层left值等于手指移动距离
    			txtStyle = "left:-"+disX+"rpx";
    			if(disX>=delBtnWidth){
    				//控制手指移动距离最大值为删除按钮的宽度
    				txtStyle = "left:-"+delBtnWidth+"rpx";
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
    		var delBtnWidth = this.data.delBtnWidth;
    		//如果距离小于删除按钮的1/2，不显示删除按钮
    		var txtStyle = disX > delBtnWidth/2 ? "left:-"+delBtnWidth+"rpx":"left:0rpx";
    		//更新列表的状态
    		this.setData({
    			styleSlideLeft: txtStyle
    		});
    	}
    },
})
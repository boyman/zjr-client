var util = require("../../utils/util");
var config = require('../../config');
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');

Page({
  data: {
    modalHidden: true,
    userInfo: null,
    event: {
      "owner": "1234567890",
      "id": "25818101",
	    "guest_count": 47,
	    "watcher_count": 39,
	    "date_time": null,
      "images": "https://img3.doubanio.com\/view\/movie_poster_cover\/spst\/public\/p2453176400.jpg",
	    "name": "某某中学07级十年同学聚会",
      "address": "黄山北路聚福大酒楼三楼包厢",
      "tags": [
        "晚餐",
        "同学会",
        "唱歌",
        "喝酒"
      ],
	    "special_guests": ["张老师", "李老师", "魏老师"],
	    "summary": "亲爱的同学： 同窗三载，温馨如昨，悲欢岁月，依稀如梦。 光阴易逝，一晃三十五载，几多坎坷，几多磨难。遥想当年青春年少，风 华正茂，意气方遒，如今是年华已逝，霜雪满头。但我们相信：无论你事业辉 煌，还是暂时失意；无论你身居要职，还是平民百姓；无论你十分悠闲，还是 多么忙碌。但是，同窗之情不变。你不会忘记琳山夜月、教堂夕阳，你不会忘 记那特殊的年份：锄头、扁担、斗笠；劳动、学习、开会。 往事如烟，多少回梦里相聚。我们想约你，约你重续昨日旧梦，听听久违 的声音，看看熟悉的面孔，诉诉离别的思绪。让你我抛开尘世的喧嚣、摆脱身 边的烦恼，让心栖息，忘却忧愁；说说心里话，聊聊同学情。 在五月，这个马兰芳香的季节，我们商定在美丽的古城相会，希望你能来 重温那段甜美而浪漫的回忆。",
	    "hosts": ["某某中学校友会", "07级班委"],
      "guests": [
        {
          "image": "https://img3.doubanio.com\/view\/movie_poster_cover\/spst\/public\/p2453176400.jpg",
          "name": "张三"
        },
        {
          "image": "../../image/general-guest.png",
          "name": "李四"
        },
        {
          "image": "http://wx.qlogo.cn/mmhead/00GYaClAoOoDiaLmcia2wlbIpkwG8NV1Daa2le20rfprYOjkWI6O5aKg/132",
          "name": "曾永波",
          "approved": true
        },
        {
          "image": "../../image/general-guest.png",
          "name": "客人"
        }
      ]
},
    showLoading: true,
    options: null
  },
  onLoad: function (options) {
    console.log(options);
    var that = this;
    
    qcloud.request({
			// 要请求的地址
			url : config.service.getEventUrl + '?id=59002996d2b229325044fdcc',

			// 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
			login : true,

			success (result) {
				util.showSuccess('请求成功完成');
				console.log('request success', result);
        let event = result.data.event;
        let old_event = that.data.event;
        old_event.date_time = event.dateTime;
        old_event.name = event.name;
        old_event.address = event.address;
        old_event.summary = event.description;
        old_event.hosts = [event.createdBy];
        that.setData({
          event: old_event
        })
			},

			fail (error) {
				util.showModel('请求失败', error);
				console.log('request fail', error);
			},

			complete () {
				console.log('request complete');
			}
		});
  },
  checkGuest: function(e) {
    console.log("accept guest")
    console.log(e.currentTarget.dataset)
  },
  clearGuest: function(e) {
    console.log("remove guest")
    console.log(e.currentTarget.dataset)
  }
})
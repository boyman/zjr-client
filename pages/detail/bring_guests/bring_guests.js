var util = require("../../../utils/util");
var config = require('../../../config');
var qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index');

Page({
	data : {
		eventName : "",
		updated : false,
		guests : ["One"],
		prevGuests : ["One"],
	},
	onLoad : function(options) {
		console.log(options)
		this.setData({
			eventName : options.eventName,
		})
	},
	nameChange : function(e) {
		var input = e.detail.value
		var lastChar = input.slice(-1)
		if( lastChar == ',' || lastChar == ' ' || lastChar == '，' ) {
			if(input.length > 1) {
				var guests = this.data.guests;
				guests.push(input.slice(0, -1));
				this.setData({ guests : guests, updated : true });
			}
			return { value : "" }
		}
	},
	deleteGuest : function(e) {
		var guests = this.data.guests;
		guests.splice(e.target.dataset.index, 1);
		this.setData({ guests : guests, updated : true });
	},
	updateGuests : function(e) {
		var somethingNew = false;
		if(this.data.guests.length == this.data.prevGuests.length) {
			var cg = this.data.guests;
			var pg = this.data.prevGuests;
			cg.sort();
			pg.sort();
			var i;
			for(i=0; i<cg.length; i++) {
				if(cg[i] != pg[i]) {
					somethingNew = true;
					break;
				}
			}
		} else {
			somethingNew = true;
		}
		if(somethingNew) console.log("Should send update")
		else console.log("Shouldn't send update")
		console.log(this.data.guests.join(','))
		wx.navigateBack()
	}
});
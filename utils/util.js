
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const _d = new Date();
const _timezoneOffset = _d.getTimezoneOffset()
const timezone = 'GMT' + (_timezoneOffset<=0?'+':'-') + formatNumber(Math.abs(-_timezoneOffset/60)) + '';

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  showBusy: text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
  }),
  showSuccess: text => wx.showToast({
    title: text,
    icon: 'success'
  }),
  showModel: (title, content) => {
    wx.hideToast();
    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    });
  },
  datetime : {
	  /*
	   * @param: str: local time string w/o timezone, e.g. '2017-05-26 14:00:00'
	   * @output: UNIX epoch
	   */
	  snLocalDatetimeToUtc : str => {
		  var d = new Date(str.replace(/-/g, '/') + ' ' + timezone);
		  return Math.floor(d.getTime() / 1000);
	  },
	  nsUtcToLocalDatetime : utc => {
		  var d = new Date(utc * 1000);
		  var year = d.getFullYear();
          var month = d.getMonth();
          var day = d.getDate();
          var dow = d.getDay();
          var hour = d.getHours();
          var minute = d.getMinutes();          
          return {
        	  date : {
        		  display : weekDays[dow] + ' ' + monthNames[month] + ' ' + day + ' ' + year,
        		  system : year + '-' + formatNumber(month+1) + '-' + formatNumber(day),
        	  },
        	  time : {
        		  display : formatNumber(hour) + ':' + formatNumber(minute),
        		  system : formatNumber(hour) + ':' + formatNumber(minute),
        	  }
          }
	  },
	  ssLocalDatetimeFormat : str => {
		  console.log(str)
		  console.log(timezone)
		  var d = new Date(str.replace(/-/g, '/') + ' ' + timezone);
		  console.log(d)
		  var year = d.getFullYear();
          var month = d.getMonth();
          var day = d.getDate();
          var dow = d.getDay();
          var hour = d.getHours();
          var minute = d.getMinutes();          
          return {
        	  date : {
        		  display : weekDays[dow] + ' ' + monthNames[month] + ' ' + formatNumber(day) + ' ' + year,
        		  system : year + '-' + formatNumber(month+1) + '-' + formatNumber(day),
        	  },
        	  time : {
        		  display : formatNumber(hour) + ':' + formatNumber(minute),
        		  system : formatNumber(hour) + ':' + formatNumber(minute),
        	  }
          }
	  },
	  ssLocalTimeFormat : str => {
		  console.log(str)
		  var hms = str.split(':')
		  console.log(hms)
		  return {
			  system : hms[0] + ':' + hms[1],
			  display : formatNumber((hms[0]==12 ? 12 : (hms[0] % 12))) + ':' + hms[1] + ':00 ' + (hms[0]>11 ? 'PM':'AM'),
		  }
	  }
  }
}

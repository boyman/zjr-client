
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const _d = new Date();
const _timezoneOffset = _d.getTimezoneOffset()
const timezone = 'GMT' + (_timezoneOffset<=0?'+':'-') + formatNumber(Math.abs(-_timezoneOffset/60)) + '';

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatHMS(h, m, s) {
	return [formatNumber((h==12 ? 12 : (h % 12))), formatNumber(m), formatNumber(s), h>11?'PM':'AM']
}

module.exports = {
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
          var hms = formatHMS(hour, minute, 0);
          return {
        	  date : {
        		  display : weekDays[dow] + ' ' + monthNames[month] + ' ' + day + ' ' + year,
        		  system : year + '-' + formatNumber(month+1) + '-' + formatNumber(day),
        	  },
        	  time : {
        		  system : hms[0] + ':' + hms[1],
    			  display : hms[0] + ':' + hms[1] + ' ' + hms[3],
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
          var hms = formatHMS(hour, minute, 0);
          return {
        	  date : {
        		  display : weekDays[dow] + ' ' + monthNames[month] + ' ' + formatNumber(day) + ' ' + year,
        		  system : year + '-' + formatNumber(month+1) + '-' + formatNumber(day),
        	  },
        	  time : {
        		  system : hms[0] + ':' + hms[1],
    			  display : hms[0] + ':' + hms[1] + ' ' + hms[3],
        	  }
          }
	  },
	  ssLocalDateFormat : str => {
		  console.log(str)
		  console.log(timezone)
		  var d = new Date(str.replace(/-/g, '/') + ' 03:00:00 ' + timezone);
		  console.log(d)
		  var year = d.getFullYear();
          var month = d.getMonth();
          var day = d.getDate();
          var dow = d.getDay();
          var hour = d.getHours();
          var minute = d.getMinutes();          
          return {
        	  display : weekDays[dow] + ' ' + monthNames[month] + ' ' + formatNumber(day) + ' ' + year,
        	  system : year + '-' + formatNumber(month+1) + '-' + formatNumber(day),
          }
	  },
	  ssLocalTimeFormat : str => {
		  console.log(str)
		  var hms = str.split(':')
		  console.log(hms)
		  hms = formatHMS(hms[0], hms[1], 0)
		  return {
			  system : hms[0] + ':' + hms[1],
			  display : hms[0] + ':' + hms[1] + ' ' + hms[3],
		  }
	  }
  }
}

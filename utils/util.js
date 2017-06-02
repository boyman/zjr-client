
const weekDays = ['七', '一', '二', '三', '四', '五', '六'];
const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
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
        		  display : (year%100) + '年' + monthNames[month] + day + '日•' + weekDays[dow],
        		  system : year + '-' + formatNumber(month+1) + '-' + formatNumber(day),
        	  },
        	  time : {
        		  system : hms[0] + ':' + hms[1],
    			  display : hms[0] + ':' + hms[1] + ' ' + hms[3],
        	  }
          }
	  },
	  ssLocalDatetimeFormat : str => {
		  var d = new Date(str.replace(/-/g, '/') + ' ' + timezone);
		  var year = d.getFullYear();
          var month = d.getMonth();
          var day = d.getDate();
          var dow = d.getDay();
          var hour = d.getHours();
          var minute = d.getMinutes();
          var hms = formatHMS(hour, minute, 0);
          return {
        	  date : {
        		  display : (year%100) + '年' + monthNames[month] + day + '日•' + weekDays[dow],
        		  system : year + '-' + formatNumber(month+1) + '-' + formatNumber(day),
        	  },
        	  time : {
        		  system : hms[0] + ':' + hms[1],
    			  display : hms[0] + ':' + hms[1] + ' ' + hms[3],
        	  }
          }
	  },
	  ssLocalDateFormat : str => {
		  var d = new Date(str.replace(/-/g, '/') + ' 03:00:00 ' + timezone);
		  var year = d.getFullYear();
          var month = d.getMonth();
          var day = d.getDate();
          var dow = d.getDay();
          var hour = d.getHours();
          var minute = d.getMinutes();          
          return {
        	  display : (year%100) + '年' + monthNames[month] + day + '日•' + weekDays[dow],
        	  system : year + '-' + formatNumber(month+1) + '-' + formatNumber(day),
          }
	  },
	  ssLocalTimeFormat : str => {
		  var hms = str.split(':')
		  hms = formatHMS(hms[0], hms[1], 0)
		  return {
			  system : hms[0] + ':' + hms[1],
			  display : hms[0] + ':' + hms[1] + ' ' + hms[3],
		  }
	  }
  }
}

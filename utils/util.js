
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const _d = new Date();
const _timezoneOffset = _d.getTimezoneOffset()
const timezone = 'GMT' + (_timezoneOffset<=0?'+':'') + (-_timezoneOffset/60)

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
      // default locale timezone
      stringToDate : str => {
          return new Date(str.replace(/-/g, '/') + ' ' + timezone)
      },
      stringToUTCString : str => {
          var d = this.stringToDate(str)
          return d.toISOString()
      },
      UTCStringToDate : utcStr => {
          return new Date(utcStr.replace(/-/g, '/').replace(/T/, ' ').replace(/\.000Z/, ''))
      }
  },
  formatDate : dateStr => {
      console.log(dateStr)
      var d = new Date(dateStr);
      var year = d.getFullYear()
      var month = d.getMonth()
      var day = d.getDate()
      var dow = d.getDay()
      console.log(day)

      return weekDays[dow] + ' ' + monthNames[month] + ' ' + day + ' ' + year;
  },
  dateTimeToStrings : dateTime => {
      var d = new Date(dateTime);
      var year = d.getFullYear()
      var month = d.getMonth() + 1
      var day = d.getDate()
      var dow = d.getDay()

      var hour = d.getHours()
      var minute = d.getMinutes()
      var second = d.getSeconds()
      return {
          dateDisplay : weekDays[dow] + ' ' + monthNames[month-1] + ' ' + day + ' ' + year,
          dateStd : year + '-' + month + '-' + day,
          timeDisplay : hour + ':' + minute,
      }
  }
}

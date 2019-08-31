Date.prototype.yyyymmddhhmmss = function() {
    var month = this.getMonth() + 1;
    var day = this.getDate();
    var ymd = [this.getFullYear(),
               (month>9 ? '' : '0') + month,
               (day>9 ? '' : '0') + day
              ].join('');

    var hour = this.getHours();
    var minute = this.getMinutes();
    var second = this.getSeconds();
  
    var hms = [( hour >9 ? '' : '0') + hour,
               (minute>9 ? '' : '0') + minute,
               (second>9 ? '' : '0') + second,
              ].join('');

    return ymd+hms;
};
  
  var date = new Date();
  console.log(date.yyyymmddhhmmss());
Getdate = function() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var ymd = [date.getFullYear(),
               (month>9 ? '' : '0') + month,
               (day>9 ? '' : '0') + day
              ].join('');

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
  
    var hms = [( hour >9 ? '' : '0') + hour,
               (minute>9 ? '' : '0') + minute,
               (second>9 ? '' : '0') + second,
              ].join('');

    return ymd+hms;
};

console.log(parseInt(Getdate()));
module.exports = {
    getdate: Getdate
}
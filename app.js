var createError = require('http-errors');
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var path = require('path');
var logger = require('morgan');
var io = require('socket.io')(http);

var indexRouter = require('./routes/index');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const admin = require('firebase-admin');
const serviceAccount = require('./HeyStop.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://trafficjamjam-3e477.firebaseio.com"
});
var db = admin.database();
var ref = db.ref("AllData/GwangJu");

// 데이터 검색
ref.once("value", function (snapshot) {
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
  res.send('error');
});

var gps = require('./package/gps');
var user = require('./package/user');

var room_num = 0;
var room_list = [];
var user_list = [];
var check_list = [];


io.on('connection', (socket) => {

  room_list.push = [`${room_num}`];
  user_list.push(new user(room_num));
  socket.emit('give_room_num', room_num);
  socket.join(room_list[room_num]);

  check_list.push(setInterval((room_num) => {
    if (Date.now() - user_list[room_num].last_update >= 60 * 1000) {
      user_list[room_num] = undefined;
      room_list[room_num] = undefined;

      clearInterval(check_list[room_num]);

    }
  }, 70 * 1000, room_num));

  room_num++;

  socket.on('now coordinate', (room_num, data) => {

    console.log('room_num : ', room_num);

    user_list[room_num].update_position([String(data[0]) + '°', String(data[1]) + '°']);
    console.log(user_list[room_num].coordinate[0], ' ', user_list[room_num].coordinate[1]);

    var distance = gps.calculate_distance(user_list[room_num].coordinate[0], user_list[room_num].coordinate[1]);
    console.log(distance);
    var speed = parseInt(gps.calculate_speed(user_list[room_num].coordinate[0], user_list[room_num].coordinate[1]));
    console.log(speed);
    var direction = gps.calculate_direction(user_list[room_num].coordinate[0], user_list[room_num].coordinate[1])
    console.log(direction);

    var lat = gps.m_to_lat(distance) * 10, lon = gps.m_to_lon(distance) * 10; // 반경 구하기
    var now_lat = parseFloat(user_list[room_num].coordinate[1][0].substring(0, user_list[room_num].coordinate[1][0].length)),
      now_lon = parseFloat(user_list[room_num].coordinate[1][1].substring(0, user_list[room_num].coordinate[1][1].length)); // 현재 위경도
    console.log(lat, lon);
    console.log(now_lat, now_lon);

    var temp = gps.search(direction, lat, lon, now_lat, now_lon);

    var x = temp[0], y = temp[1];

    console.log(x);
    console.log(y);

    io.emit('status', {
      speed: speed,
      direction: direction
    });
  });
});

app.listen(8080, '0.0.0.0');

module.exports = app;

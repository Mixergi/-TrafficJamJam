// function roop () {
//     console.log("dsad");
    
// }

// setInterval(roop, 1000)\
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const logger = require('morgan');
const favicon = require('serve-favicon');
const io = require('socket.io')(http);

// WEB 세팅
app.use(logger('dev')); // 로깅처리
app.set('view engine', 'ejs');  //템플릿 엔진 세팅
app.set('views', './views');    //ejs 파일이 저장된 디렉토리
app.use(express.static(__dirname + '/public')); // 정적 파일 처리
app.use(favicon(__dirname + '/public/image/favicon.ico')); // 파비콘 세팅

// DB 세팅
const admin = require('firebase-admin');
const serviceAccount = require('./trafficjamjam-3e477-firebase-adminsdk-xbjf1-6c03c55dec.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL : "https://trafficjamjam-3e477.firebaseio.com"
});
var db = admin.database();
var ref = db.ref("AllData/GwangJu");

// 데이터 검색
ref.once("value", function(snapshot) {
    console.log(snapshot.val());
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
    res.send('error');
});

// 라우팅 처리
app.get('/', (req, res) => {
    res.render('./test', {title: 'test'});
});

// 소켓 통신
var TJJ = require('./TJJ/gps');

io.on('connection', (socket) => {
    var coordinate = [['0.00000°', '0.00000°'], ['0.00000°', '0.00000°']]; // [0]은 이전 좌표, [1]은 현재 좌표
    console.log('user connected');
    socket.on('now coordinate', (data) => {
        console.log('(', data[0], ', ', data[1], ')');
        coordinate[0] = coordinate[1];
        coordinate[1] = [String(data[0])+'°', String(data[1])+'°']
        console.log(coordinate);

        var distance = TJJ.calculate_distance(coordinate[0], coordinate[1]);
        console.log(distance);
        var speed = parseInt(TJJ.calculate_speed(coordinate[0], coordinate[1]));
        console.log(speed);
        var direction = TJJ.calculate_direction(coordinate[0], coordinate[1])
        console.log(direction);

        io.emit('warning', [String(distance), String(speed), String(direction)].join(', '));
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(8080, () => {
    console.log('8080 서버에서 대기중');
});
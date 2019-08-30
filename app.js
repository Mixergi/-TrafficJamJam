// function roop () {
//     console.log("dsad");
    
// }

// setInterval(roop, 1000)\

const app = require('express')();
const http = require('http').createServer(app);
const logger = require('morgan');

// WEB 세팅
app.use(logger('dev')); // 로깅처리
app.set('view engine', 'ejs');  //템플릿 엔진 세팅
app.set('views', './views');    //ejs 파일이 저장된 디렉토리

// DB 세팅
const admin = require('firebase-admin');
const serviceAccount = require('./trafficjamjam-3e477-firebase-adminsdk-xbjf1-6c03c55dec.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL : "https://trafficjamjam-3e477.firebaseio.com"
});
var db = admin.database();
var ref = db.ref("AllData/GwangJu");

// ref.once("value", function(snapshot) {
//     console.log(snapshot.val());
// });

ref.on("value", function(snapshot) {
        console.log(snapshot.val());
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    }
);



app.get('/', (req, res) => {
    res.render('./test', {title: 'test'});
});

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('chat message', (msg) => {
//         console.log(msg);
//         io.emit('chat message', msg);
//     });
//     socket.on('disconnect', () => {
//     console.log('user disconnected');
//     });
// });

app.listen(8080, () => {
    console.log('8080 서버에서 대기중')
});
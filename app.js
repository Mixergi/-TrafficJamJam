// function roop () {
//     console.log("dsad");
    
// }

// setInterval(roop, 1000)\

const admin = require('firebase-admin');
const serviceAccount = require('./trafficjamjam-3e477-firebase-adminsdk-xbjf1-6c03c55dec.json');
const app = require('express')();
const http = require('http').createServer(app);
// const io = require('socket.io')(http);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL : "https://trafficjamjam-3e477.firebaseio.com"
});
var db = admin.database();
var ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
    console.log(snapshot.val());
});

app.get('/', (req, res) => {
    res.sendfile('./test.html');
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
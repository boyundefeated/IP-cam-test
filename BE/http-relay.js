const app = require('express')(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    rtsp = require('rtsp-ffmpeg');
server.listen(6147);
console.log('listen on 6147');
console.log('listen on 8081');
var uri = 'rtsp://192.168.1.122:554/',
    stream = new rtsp.FFMpeg({ input: uri });



var pipeStream = function (data) {
    console.log("Ondata -> write data to all client");
    _lsHandler.forEach(function (handler, index) {
        handler.write(data, function () {
            console.log('write data to ', index);
        });
    });
};

var http = require('http');
var fs = require('fs');
var mjpegServer = require('mjpeg-server');
var _lsHandler = [];

http.createServer(function (req, res) {
    console.log("Got request");

    var mjpegReqHandler = mjpegServer.createReqHandler(req, res);
    _lsHandler.push(mjpegReqHandler);
    // need to close mjpegReqHandler when user close connection


    // var i = 0;
    // var timer = setInterval(updateJPG, 500);

    // function updateJPG() {
    //     fs.readFile(__dirname + '/resources/' + i + '.jpg', sendJPGData);
    //     i++;
    // }

    // function sendJPGData(err, data) {
    //     mjpegReqHandler.write(data, function () {
    //         console.log('write data');
    //         // checkIfFinished();
    //     });
    // }

    // function checkIfFinished() {
    //     if (i > 100) {
    //         clearInterval(timer);
    //         mjpegReqHandler.close();
    //         console.log('End Request');
    //     }
    // }
}).listen(8081);











stream.on('data', pipeStream);


// io.on('connection', function (socket) {
//     console.log("new connection");
//     // var pipeStream = function (data) {
//     //     console.log("Ondata");
//     //     // socket.emit('data', data.toString('base64'));
//     // };
// socket.on('disconnect', function () {
//     console.log("disconnect");
//     // stream.removeListener('data', pipeStream);
// });
// });
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});



var WebSocketServer = require('ws').Server;    

var port = 8092;
var wss = new WebSocketServer({port:port});

console.log('Listening on');
wss.on('connection', function(ws) {
    console.log('someone connected');
    ws.on('message', function(msg) {
        console.log('got message');
        ws.send(msg);
    });
});
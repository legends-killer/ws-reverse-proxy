
const ws_mod = require('ws');


// Create a WebSocket server
const wss = new ws_mod.WebSocketServer({ port: 9001 });



wss.on('connection', function connection(ws, request) {
  console.log('Client connected');

  ws.on('message', message => {
    console.log('Received: %s', message);
  });

});

console.log("WebSocket server is running on port 9001");

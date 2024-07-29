/*
 * @Author: legends-killer
 * @Date: 2024-07-29 21:17:17
 * @LastEditors: legends-killer
 * @LastEditTime: 2024-07-29 21:46:13
 * @Description: 
 */
const WebSocket = require('ws');

// Connect to the WebSocket proxy server
const ws = new WebSocket('ws://localhost:9000');

ws.on('open', function open() {
  console.log('Connected to the WebSocket server');

  // Send a message to the server
  ws.send('Hand Shake!');
  console.log(ws.readyState, '-',  WebSocket.OPEN)

  setTimeout(() => {
    ws.send('Hello, server!');
  }, 1000)
});

ws.on('message', function incoming(message) {
  console.log('Received:', message);
});

ws.on('close', function close() {
  console.log('Disconnected from the WebSocket server');
});

ws.on('error', function error(err) {
  console.error('WebSocket error:', err);
});
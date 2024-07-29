/*
 * @Author: legends-killer
 * @Date: 2024-07-29 21:17:17
 * @LastEditors: legends-killer
 * @LastEditTime: 2024-07-29 21:19:28
 * @Description: 
 */
const ws_mod = require('ws');

const target = "ws://localhost:9000";
const ws_proxy = new ws_mod.WebSocket(target);

// send message to backend
ws_proxy.on("open", function open() {
  ws_proxy.send("Hello, backend!");
});
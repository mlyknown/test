var request = require("../../node_modules/request");
var dateFormat = require("../../node_modules/dateformat");
var WebSocket = require("../../node_modules/sws"),
    WebSocketServer = WebSocket.Server,
    wss = new WebSocketServer({
        port: 8080,
        path: "/guest"
    });

// 收到来自客户端的连接请求后，开始给客户端推消息
wss.on("connection", function(ws) {
    ws.on("message", function(message) {
        console.log("received: %s", message);
    });
    sendGuestInfo(ws);
});

function sendGuestInfo(ws) {
    request("http://uinames.com/api?region=china",
        function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var jsonObject = JSON.parse(body),
                    guest = jsonObject.name + jsonObject.surname,
                    guestInfo = {
                        guest: guest,
                        time: dateFormat(new Date(), "HH:MM:ss")
                    };

                if (ws.readyState === WebSocket.OPEN) {

                    // 发，送
                    ws.send(JSON.stringify(guestInfo));

                    // 用随机来“装”得更像不定时推送一些
                    setTimeout(function() {
                        sendGuestInfo(ws);
                    }, (Math.random() * 5 + 3) * 1000);
                }
            }
        });
}
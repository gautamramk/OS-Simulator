
var queue;
var ws = null;
function WebSocketTest() {
    var messageContainer = document.getElementById("messages");
    if ("WebSocket" in window) {
        messageContainer.innerHTML = "WebSocket is supported by your Browser!";
        ws = new WebSocket("ws://localhost:8888/?Id=123456789");
        ws.onopen = function() {
            //ws.send("read");
        };
        ws.onmessage = function (evt) {
            var received_msg = evt.data;
            //messageContainer.innerHTML = "Message is received...";
            messageContainer.innerHTML = received_msg;
            console.log(received_msg);
            queue = JSON.parse(received_msg);
        };
        ws.onclose = function() {
            messageContainer.innerHTML = "Connection is closed...";
        };
    } else {
        messageContainer.innerHTML = "WebSocket NOT supported by your Browser!";
    }
}
function produce(){
    ws.send("p")
}
function consume(){
    ws.send("c");
}

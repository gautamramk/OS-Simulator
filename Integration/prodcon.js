
var queue;
var ws = null;
function WebSocketTest() {
    if ("WebSocket" in window) {
        //display( "WebSocket is supported by your Browser!");
        ws = new WebSocket("ws://localhost:8888/?Id=123456789");
        ws.onopen = function() {
            //ws.send("read");
        };
        ws.onmessage = function (evt) {
            var received_msg = evt.data;
            //messageContainer.innerHTML = "Message is received...";
            console.log(received_msg);
            queue = JSON.parse(received_msg);
            display(queue.queue);

        };
        ws.onclose = function() {
            display("Connection is closed...");
        };
    } else {
       // display("WebSocket NOT supported by your Browser!");
    }
}


function display(queue)
    {
        var terminal=document.getElementById('terminal');

        var li = document.createElement("li");
        var textnode = document.createTextNode(queue);


        li.appendChild(textnode);
        terminal.appendChild(li);


        var list = document.getElementById('list');
        list.innerHTML='';

        for(i=0; i<queue.length;i++)
        {
            console.log(queue);
            console.log(queue[i]);
            if(queue[i]==0)
            {
                console.log("sdasd here");
                continue;

            }

        var img=document.createElement("img");
        img.setAttribute("src","food.png");
        img.setAttribute("height","140px");
        img.setAttribute("width","auto");

        list.appendChild(img);
        }
    }


function produce(){
    ws.send("p")
}
function consume(){
    ws.send("c");
}

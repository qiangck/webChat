var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
	port: 9999
});
var cons = [];
wss.on('connection', function(ws) {
	cons.push(ws);
    ws.on('message', function(message) {
        var obj = JSON.parse(message)
        if(obj.text){
            var times = Date.now();
            obj["time"] = times;
            console.log(obj);
        	for(var i =0;i<cons.length;i++){
        		cons[i].send(JSON.stringify(obj));
        	}
        }
    });
    ws.on('close',function(){
		for(var i=0;i<cons.length;i++){
			if(cons[i] == ws) {cons.splice(i,1);}
		}
	});
});


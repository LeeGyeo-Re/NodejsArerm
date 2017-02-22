var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = require('./router/router')(app);

var jsonParser = bodyParser.json();

app.set('views',__dirname + '/views');
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/",function(req,res){
    res.sendfile("index2.html");
    
});

app.get("/demo", function(){
    console.log("success");
    client.publish('presence','1');
    console.log("12341234");
})

app.post("/switch",function(req, res){
    
    res.writeHead(200,{"Content-Type":"text/plain"});
    var onoff=(req.body.switch);
    console.log("On Off Start");
    client.subscribe('switch',{qos:2});
    if(onoff === 'true'){
        client.publish('presence','2');
        console.log("switch on "+onoff);
    }
    else{
        client.publish('presence','1');
        console.log("switch off "+onoff);
    }
    res.end("switch");
});

app.listen(3000,function(){
    console.log("Express server has started on port 3000")
});
app.use(express.static('public'));
app.use('/',express.static(__dirname+"/"));

var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://192.168.0.9', {clientId:'nodeapp'});

client.on('connect', function () {
    client.subscribe('command',{qos:2});
    client.publish('presence', '2');
});

app.post('/test', jsonParser,function(req,res){
    console.log(JSON.stringify(req.body));
    client.subscribe('test');
    //client.publish('presence',JSON.stringify(req.body));
    client.publish('presence','1');
    console.log("good");
});

client.on('message', function (topic, message) {
    console.log('from mqtt ' + message.toString());
});

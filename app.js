var io = require("socket.io").listen(3000);
var pg = require('pg');

//postgresql
var connection = "tcp://postgres:''@127.0.0.1:5432/testdb";
var client = new pg.Client(connection);


io.sockets.on('connection', function(socket){
/*
    こんな感じで処理ごとに受けて返す感じ？
*/
    //リスト入手
    socket.on('list', function(req){
        console.log('message: ' + req);
        /* database */
        client.connect(function(err){
            if(err){
                console.error('could not connect to postgres', err);
            }
            client.query('select * from solutions;', function(err, result){
            	//ここでオブジェクトの切り分け（要相談）
            	socket.emit('push', result);
            });
        });

    });
});
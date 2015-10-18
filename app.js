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

    socket.on('contribute', function(req){
        console.log('message: ' + req);
        /* 	 {
        		id: ?,//わかんなぇ
				title: 'hogehoge',
				user_id: 1,
				error_id: '1111',
				hashtags: {"#hoge", "#fuga", "#bar"}
				body: content
        	   }*/
        /* database */
        client.connect(function(err){
            if(err){
                console.error('could not connect to postgres', err);
            }
            client.query('insert into solutions(id, user_id, titile, hashtags, body) value(req.id, 1, req.title, req.hashtags, req.body);', function(err, result){
            	//ここでオブジェクトの切り分け（要相談）
            	socket.emit('push', 'ok');
            });
        });
    });

    //socket.on();
});






function getData(){

};


// obj -> json
//var JSONfoo = window.JSON.stringify(foo);

//json -> obj
//var backToJS = JSON.parse(JSONfoo);
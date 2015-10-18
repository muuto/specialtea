var io = require("socket.io").listen(3000);
var pg = require('pg');
var fs = require('fs');

//postgresql
var connection = "tcp://postgres:''@127.0.0.1:5432/testdb";
var client = new pg.Client(connection);


io.sockets.on('connection', function(socket){
/*
    こんな感じで処理ごとに受けて返す感じ？
*/
	//error messge
	socket.on('result', function(req){
    	client.connect(function(err){
    		if(err){
    			console.error(err);
    			return;
    		}
    		var q = 'select ... while like \'%' + req.key + '%\'';
    		client.query(q, function(err, result){
    			socket.emit('push', result);
    		});
    	});
    });


    //リスト入手
    socket.on('solutions', function(req){
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

    socket.on('errmsg', function(req){
    	if(err){
                console.error('could not connect to postgres', err);
            }
            client.query('select * from solutions;', function(err, result){
            	//ここでオブジェクトの切り分け（要相談）
            	socket.emit('errmsg', 'ok');
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
                return;
            }
            var q = 'insert into solutions(id, user_id, titile, hashtags, body) value(' + req.id + ',1, '+ req.title +', ' + req.hashtags + ', '+req.body+');';
            client.query(q, function(err, result){
            	//ここでオブジェクトの切り分け（要相談）
            	socket.emit('contribute', 'ok');
            });
        });
    });

    socket.on('index', function(req){
	fs.readFile('./public/index.html', 'utf8', function(err, file){
		socket.emit(file);
	});
    });

    socket.on('search', function(req){
    	fs.readFile('./public/search.html', 'utf8', function(err, file){
		console.log(file);
    		socket.emit(file);
    	});
    });

    socket.on('detial', function(req){
	fs.readFile('./pulic/detial.html', 'utf8', function(err, file){
		console.log('');
	});
    });




});






function getData(){

};


// obj -> json
//var JSONfoo = window.JSON.stringify(foo);

//json -> obj
//var backToJS = JSON.parse(JSONfoo);

var io = require("socket.io").listen(3000);
var pg = require('pg');

//postgresql
var connection = "tcp://postgres:''@127.0.0.1:5432/testdb";
var client = new pg.Client(connection);

io.sockets.on('connection', function(socket){
	console.log('reqest: ', socket);

/*
	こんな感じで処理ごとに受けて返す感じ？
*/
	//リスト入手
	socket.on('list', function(req){
		console.log('message: ' + req);
		/* database */
		client.connect(function(err){
		
			if(err){
				return console.error('could not connect to postgres', err);
			}
			client.query('select * from solutions;', function(err, result){
				console.log(result);

				io.emit('push', row);


			});

			// query.on('row', function(row){
			// 	row.push(row);
			// });
			// query.on('end', function(row,err){
			// 	io.emit('push' row);
			// });
		});

	});

	//keyからValue入手の場合こんな感じ
	// socket.on('key', function(req){
	// 	console.log('message: ' + req);
	// 	/* database */
	// 	client.connect(function(err){
		
	// 	if(err){
	// 		return console.error('could not connect to postgres', err);
	// 	}
	// 	//よしなにかえる
	// 	client.query('select * from mydata;');

	// 	query.on('end', function(row,err){
	// 		io.emit('push' row);
	// 	});
	// });
});

var socket = io.connect('http://153.122.0.119:3000');

function dispSearchTextarea(){
	var searchWord  = document.searchform1.keywords1.value;
	return searchWord;
}

function search(){
	var searchWord = dispSearchTextarea();
}

function login(){
	
}

$("a").click(function(){
	console.log('a');
	var array = this.attr('hef').split("");
	socket.emit('search', array);
	return false;
	socket.on('push', function(msg){
		console.log(msg);
	});
});
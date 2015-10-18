var express = require('express');
var serveStatic = require('serve-static');

var app = express();

app.use(serveStatic(__dirname + '/public'));
app.listen(80);

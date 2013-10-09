var express = require('express.io');

var server = express();

server.http().io();

var mensajes = [];
var respuestas = []; // <---------

// Static assets
server.use(express.static('./public'));

server.get('/', function (req, res) {
	res.sendfile('index.html');
});

server.io.route('pintar', function(socket){
	console.log('Alguien esta pintando', socket.data);

	server.io.broadcast('pintar', socket.data);
});









server.get('/mensajes', function (req, res) {
	// res.send(mensajes+ '<script>setTimeout(function(){window.location.reload()}, 1000)</script>');

	respuestas.push(res);
});

server.get('/mensajes/:message', function (req, res) {
	mensajes.push(req.params.message);

	// Mandar todos los request
	respuestas.forEach(function(res){
		res.send(mensajes+ '<script>window.location.reload()</script>');
	});

	res.send('Gracias por mandar: ' + req.params.message);
});

server.listen(3000);
console.log('Server corriendo en localhost:3000');
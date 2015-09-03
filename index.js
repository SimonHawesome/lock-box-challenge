var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    path = require('path'),
    app = express();

app.set('port', process.env.PORT || 4000);

app.use(express.static(path.join(__dirname, 'public')));

var server = http.createServer(app);

server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

var io = require('socket.io')(server);

app.get('/', function(req, res){
    res.sendFile('/public/index.html');
});


//Establish total number of required users
var totalUsers = 0;


io.on('connection', function(socket){

        totalUsers ++;

        io.emit('user count', {

            totalUsers: totalUsers

        });

        socket.on('All users logged in', function(socket){

            io.emit('revealCombo');

        });

        socket.on('disconnect', function(socket){

            totalUsers --;

            io.emit('user count', {
                totalUsers: totalUsers
            });

        });

});


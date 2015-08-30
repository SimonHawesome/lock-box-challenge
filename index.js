var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Routing
app.use(express.static(__dirname + '/public'));



//Establish total number of required users
var totalUsers = 0;

io.on('connection', function(socket){

    totalUsers ++;

    io.emit('user count', {
        totalUsers: totalUsers
    });



    socket.on('disconnect', function(socket){

        totalUsers --;

        io.emit('user count', {
            totalUsers: totalUsers
        });
    });
});




http.listen(3000, function(){
  console.log('listening on *:3000');
});

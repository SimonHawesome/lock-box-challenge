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

var clients = [];


io.on('connection', function(socket){

    totalUsers ++;

    io.emit('user count', {
        totalUsers: totalUsers
    });

    clients.push(socket);


    socket.on('All users logged in', function(socket){

        //shuffle(clients);
        //
        //var comboHolders = [];
        //
        //for(var i = 0; i < 3; i ++){
        //    comboHolders.push(clients[i]);
        //}
        //
        //for(var t = 0; t < comboHolders.length; t ++) {
        //    comboHolders[t].join('comboHoldersRoom');
        //}

        io.emit('revealCombo');

    });



    socket.on('disconnect', function(socket){

        totalUsers --;

        io.emit('user count', {
            totalUsers: totalUsers
        });

        clients.splice(clients.indexOf(socket), 1);

        //for(var c = 0; c < clients.length; c ++) {
        //    clients[c].leave('comboHoldersRoom');
        //}

    });
});



function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

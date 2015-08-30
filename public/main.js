$(function() {

    var socket = io();

    var textBoxP = $(".textBox p");

    var textBoxH2 = $(".textBox h2");

    var textBoxH3 = $(".textBox h3");

    socket.on('user count', function(data){

        //console.log(data.totalUsers + "/15");

        textBoxP.text(data.totalUsers + "/15");



        if(data.totalUsers >= 15){

            textBoxP.text("30 00 24");

            textBoxH2.text("Enjoy your tasty treats!");

            textBoxH3.css("display", "none");

        }else{
            textBoxH3.css("display", "block");
        }


    });

});
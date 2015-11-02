define(function(require){
    var Game = require('Game');
    var game = new Game();

    var start = function(){
        document.getElementById("info_block").style.visibility = "hidden";
        return game.startGame(
            document.getElementById("player1").value,
            document.getElementById("player2").value
        );
    };

    document.getElementById("start_button").onclick = start;
});

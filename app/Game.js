/**
 * Created by bubble on 02.11.15.
 */

define("Game", ["Algo", "Field"], function(Algo, Field){
    AdjacencyMatrix = Algo.AdjacencyMatrix;

    function Player (name, color) {
        this.name = name;
        this.color = color;
        this.scores = 0;
    }

    function Game () {
        this.players = [];
        this.activePlayer = 0; // number of player, that is active. 0 - 1st player, 1 - 2nd player
        this.redDots = new AdjacencyMatrix([]);
        this.blueDots = new AdjacencyMatrix([]);
    }

    Game.prototype.activePlayerDots = function() {
        if (this.activePlayer == 0) return this.redDots;
        return this.blueDots;
    };

    Game.prototype.changeActivePlayer = function() {
        this.activePlayer ^= 1;
    };

    function ctrlOnclick (game, dot) {
        var owner = game.players[game.activePlayer];
        dot.setOwner(owner);
        game.activePlayerDots().addElem(dot);
        var cycle = Algo.findCycle(game.activePlayerDots().dotsAdjacency, game.activePlayerDots().dotsArray.length - 1);
        if (cycle.length > 0) game.field.drawCycle(cycle, game);
        game.changeActivePlayer();
    }

    Game.prototype.startGame = function(player1, player2) {
        var self = this;
        this.players.push(new Player(player1.value, "red"));
        this.players.push(new Player(player2.value, "blue"));
        this.field = new Field(document.getElementById("field"), 500, 50);
        //elem.style.visibility = "hidden";
        this.field.createField();

        for (var i = 0; i < this.field.dots.length; i++) {
            var dot = this.field.dots[i];
            var func = ctrlOnclick.bind(null, this, dot);
            dot.domElement.onclick = func;
        }
    };

    return Game;
});

/**
 * Created by bubble on 13.09.15.
 */

"use strict";
function Dot (element, position) {
    this.domElement = element;
    this.owner;
    this.position = {
        row: position.row,
        column: position.column
    };
}

Dot.prototype.isNeighbour = function(neighbour) {
    if (this.position.row == neighbour.position.row && this.position.column == neighbour.position.column)
        return 0;
    return (Math.abs(this.position.row - neighbour.position.row) <= 1) &&
        (Math.abs(this.position.column - neighbour.position.column) <= 1);
};

Dot.prototype.setOwner = function(owner) {
    if (this.owner) return;
    this.owner = owner;
    this.domElement.style.background = owner.color;
};

function Player (name, color) {
    this.name = name;
    this.color = color;
    this.scores = 0;
}

function Field (element, size, step) {
    this.domElement = element;
    this.size = size;
    this.step = step;
    this.dotSize = step/4;
    this.dotStep = step/2;
    this.dots = [];
}

Field.prototype.createField = function() {
    var self = this;
    var table = document.createElement("table");
    var insertTd = "";
    for (var i = 0; i < self.size/self.step; i++) {
        insertTd += "<td><div class = 'dot' ></div></td>";
    }
    for (var i = 0; i < self.size/self.step; i++) {
        var tableRow = document.createElement("tr");
        tableRow.insertAdjacentHTML("afterBegin", insertTd);
        table.appendChild(tableRow);
        for (var j = 0; j < tableRow.children.length; j++) {
            var dot = new Dot(tableRow.children[j].children[0], {row:i, column:j});
            this.dots.push(dot);
        }
    }
    document.body.insertAdjacentHTML("afterBegin", "<style> " +
        ".dot {" +
        "width: " + this.dotSize + "px;  " +
        "height: " + this.dotSize + "px;" +
        "top: " + this.dotStep + "px;" +
        "left: " + this.dotStep + "px;" +
        "</style>");
    table.style.width = this.size + "px";
    table.style.height = this.size + "px";
    var canvas  = "<canvas id = 'canvas' width = \"" + this.size + "px\" height = \"" + this.size + "px\"></canvas>";
    self.domElement.appendChild(table);
    this.domElement.insertAdjacentHTML("afterBegin", canvas);
    this.canvas = this.domElement.firstElementChild;
};

function Game () {
    this.players = [];
    this.activePlayer = 0; // number of player, that is active. 0 - 1st player, 1 - 2nd player
    this.redDots = new AdjacencyMatrix([]);
    this.blueDots = new AdjacencyMatrix([]);
}

Game.prototype.activePlayerDots = function() {
    if (this.activePlayer == 0) return this.redDots;
    return this.blueDots;
}

Game.prototype.changeActivePlayer = function() {
    this.activePlayer ^= 1;
}

Game.prototype.startGame = function(infoBlock) {
    var self = this;
    var elem = document.getElementById(infoBlock);

    this.players.push(new Player(document.querySelectorAll("#" + infoBlock + " input")[0].value, "red"));
    this.players.push(new Player(document.querySelectorAll("#" + infoBlock + " input")[1].value, "blue"));
    this.field = new Field(document.getElementById("field"), 500, 50);
    elem.style.visibility = "hidden";
    this.field.createField();

    for (var i = 0; i < this.field.dots.length; i++) {
        var dot = this.field.dots[i];
        var func = ctrlOnclick.bind(null, this, dot);
        dot.domElement.onclick = func;
    }
}

function AdjacencyMatrix() {
    this.dotsArray = [];
    this.dotsAdjacency = [];
}

AdjacencyMatrix.prototype.addElem = function(element) {
    var self = this;
    self.dotsArray.push(element);
    var adjacency = self.dotsAdjacency;
    adjacency.push([]);

    for (var i = 0; i < adjacency.length; i++) {
        adjacency[adjacency.length - 1][i] = +element.isNeighbour(self.dotsArray[i]);
    }

    for (var i = 0; i < adjacency.length - 1; i++) {
        adjacency[i].push(+self.dotsArray[i].isNeighbour(element));
    }

};

function findCycle(matrix, firstNode) {
    var stack = [];
    var notVisited = [];
    for (var i = 0; i < matrix.length; i++) {
        notVisited.push(i);
    }
    stack.push(firstNode);
    notVisited.splice(notVisited.indexOf(firstNode), 1); //delete visited node from notVisited
    while (stack.length != 0) {
        var u = -1;
        var v = stack[stack.length - 1];
        for (var i = 0; i < notVisited.length; i++) {
            if (matrix[v][notVisited[i]] == 1) {
                u = notVisited[i];
                break;
            }
        }
        if (~u) {
            notVisited.splice(notVisited.indexOf(u), 1);
            stack.push(u);
            if (matrix[u][firstNode] == 1 && stack.length > 3 ) return stack;
        } else stack = [];
    } return stack;
}

function ctrlOnclick (game, dot) {
    var owner = game.players[game.activePlayer];
    dot.setOwner(owner);
    game.activePlayerDots().addElem(dot);
    var cycle = findCycle(game.activePlayerDots().dotsAdjacency, game.activePlayerDots().dotsArray.length - 1);
    if (cycle.length > 0) game.field.drawCycle(cycle, game);
    game.changeActivePlayer();
}

Field.prototype.drawCycle = function (cycle, game) {
    var activeDots = game.activePlayerDots().dotsArray;
    for (var i = 0; i < cycle.length; i++) {
      var v = i; //connection from
      var u = i >= cycle.length - 1 ? 0 : i + 1; //connection to
      this.createConnection(activeDots[cycle[v]], activeDots[cycle[u]]);
  }
};

Field.prototype.createConnection = function (elem1, elem2){
    if (elem1.owner != elem2.owner) return;
    if (Math.abs(elem1.position.row - elem2.position.row) > 1 || Math.abs(elem1.position.column - elem2.position.column) > 1) return;
    var position1 = findCoordinates(elem1, this.step);
    var position2 = findCoordinates(elem2, this.step);
    drawLine(position1[0], position1[1], position2[0], position2[1], elem1.owner.color, this.canvas);
};

function findCoordinates (elem, step) {
    var x = (elem.position.column + 1) * step;
    var y = (elem.position.row + 1) * step;
    return [x,y];
}

function drawLine(x1, y1, x2, y2, color, canvas) {
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = color;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}


var game = new Game();
/**
 * Created by bubble on 13.09.15.
 */
"use strict";
function Dot (element, position) {
    this.domElement = element;
    //this.owner;
    this.position = {
        row: position.row,
        column: position.column
    };
}

Dot.prototype.setOwner = function(owner) {
    if (this.owner) return;
    this.owner = owner;
    this.domElement.style.background = owner.color;
}

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
    self.domElement.appendChild(table);
}

function Game () {
    this.players = [];
    this.activePlayer = 0; // number of player, that is active. 0 - 1st player, 1 - 2nd player
}

Game.prototype.startGame = function(infoBlock) {
    var self = this;
    var elem = document.getElementById(infoBlock);

    this.players.push(new Player(document.querySelectorAll("#" + infoBlock + " input")[0].value, "red"));
    this.players.push(new Player(document.querySelectorAll("#" + infoBlock + " input")[1].value, "blue"));
    this.field = new Field(document.getElementById("field"), 500, 50);
    elem.style.visibility = "hidden";
    this.field.createField();




    /*гавно*/
    //for (var i = 0; i < this.area.dots.length; i++) {
    //    var dot = this.area.dots[i];
    //    dot.element.onclick = function(dot) {
    //        return function(dot){
    //        this.style.background = self.players[self.activePlayer].color;
    //        self.dots[self.activePlayer].push(dot);
    //        self.activePlayer ^= 1;
    //        };
    //    }(dot);
    //}
}

function ctrlOnclick (game, elem, owner) {
    elem.setOwner(owner);

}

var game = new Game();


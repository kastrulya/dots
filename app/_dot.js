/**
 * Created by bubble on 10.09.15.
 * Version of game: 0.01dev
 * Not supported now. Look the "dots.js"
 */
"use strict";

var currentPlayer = 1; //1 - red, 0 - blue

function Player(name, color) {
    this.name = name;
    this.visited = visited;
    this.dotsArray = [];
    this.isActivated = false;
}

Player.prototype.makeStep = function(selectedElem) {
    if (this.isActivated) {
        selectedElem.style.background = this.visited;
        this.dotsArray.append(selectedElem);
        this.isActivated = false;
        currentPlayer = currentPlayer^1;
    }
}

function createDot(elem) {
    currentPlayer = currentPlayer^1;
    elem.style.background = currentPlayer? "red" : "blue";
}

function createField (id, size, step) {
    var table = document.createElement("table");
    var insertTd = "";

    for (var i = 0; i < size/step; i++) {
        insertTd += "<td><div class = 'dot' ></div></div></td>";
    }

    for (var i = 0; i < size/step; i++) {
        var tableRow = document.createElement("tr");
        tableRow.insertAdjacentHTML("afterBegin", insertTd);
        table.appendChild(tableRow);
        for (var j = 0; j < tableRow.children.length; j++) {
            var func = createDot.bind(null, tableRow.children[j].children[0]);
            tableRow.children[j].children[0].onclick = func;
        }
    }


    var dotSize = step/4;

    document.body.insertAdjacentHTML("afterBegin", "<style> " +
        ".dot {" +
        "width: " + dotSize + "px;  " +
        "height: " + dotSize + "px;" +
        "top: " + step/2 + "px;" +
        "left: " + step/2 + "px;" +
        "</style>");

    var parent = document.getElementById(id);
    parent.appendChild(table);
    table.style.width = size + "px";
    table.style.height = size + "px";
}


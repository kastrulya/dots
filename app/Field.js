/**
 * Created by bubble on 02.11.15.
 */
define(["Dot"], function(Dot){
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

    Field.prototype.drawCycle = function (cycle, game) {
        var activeDots = game.activePlayerDots().dotsArray;
        for (var i = 0; i < cycle.length; i++) {
            var v = i; //connection from
            var u = i >= cycle.length - 1 ? 0 : i + 1; //connection to
            this.createConnection(activeDots[cycle[v]], activeDots[cycle[u]]);
        }
    };

    function drawLine(x1, y1, x2, y2, color, canvas) {
        var ctx = canvas.getContext("2d");
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
    }

    function findCoordinates (elem, step) {
        var x = (elem.position.column + 1) * step;
        var y = (elem.position.row + 1) * step;
        return [x,y];
    }


    Field.prototype.createConnection = function (elem1, elem2){
        if (elem1.owner != elem2.owner) return;
        if (Math.abs(elem1.position.row - elem2.position.row) > 1 || Math.abs(elem1.position.column - elem2.position.column) > 1) return;
        var position1 = findCoordinates(elem1, this.step);
        var position2 = findCoordinates(elem2, this.step);
        drawLine(position1[0], position1[1], position2[0], position2[1], elem1.owner.color, this.canvas);
    };

    return Field;
});
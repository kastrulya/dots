/**
 * Created by bubble on 02.11.15.
 */
define(function() {
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

    return Dot;
});
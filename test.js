/**
 * Created by bubble on 17.09.15.
 */

describe("Adjacency matrix" , function () {
   it("check creating of matrix", function() {
       var adjacency = new AdjacencyMatrix();
       assert.equal(adjacency.dotsArray.length, 0);
       assert.equal(adjacency.dotsAdjacency.length, 0);
   }) ;

    describe("Add element to matrix", function () {

        for (var i = 0; i < 15; i++) {
            makeTest(i);
        }

        function makeTest(x) {
            it("size of matrix = " + x, function() {
                var dots = [];
                var adjacency = new AdjacencyMatrix();
                for (var i = 0; i < x; i++) {
                    dots.push(new Dot(document.createElement("div"), {row: i, column: i}));
                    adjacency.addElem(dots[i]);
                }
                assert.equal(adjacency.dotsArray.length, dots.length);
                assert.equal(adjacency.dotsAdjacency.length, dots.length);

                for (var i = 0; i < dots.length; i++) {
                    assert.equal(adjacency.dotsAdjacency[i].length, dots.length);
                }
            });
        }
    });

    describe("Check correct work of adjacency matrix", function () {
        var elem = document.createElement("div");
       it("check matrix of 4 connected element", function () {
           var adjacency = new AdjacencyMatrix();
           for (var i = 0; i < 4; i++) {
                adjacency.addElem(new Dot(elem, {row: 0, column:i}));
           }
           assert.equal(adjacency.dotsAdjacency.toString(), "0,1,0,0,1,0,1,0,0,1,0,1,0,0,1,0");

       });
    });
});

describe("Find cycle", function() {

    it("check cycle of 6 dots", function() {
        var matrix = [[0,1,0,0,0,1], [1,0,1,0,0,0],[0,1,0,1,0,0],[0,0,1,0,1,0],[0,0,0,1,0,1],[1,0,0,0,1,0]];
        var path = findCycle(matrix, 5);
        assert.equal(path.length, 6);
    });

    it("check cycle of 4 dots" , function () {
        var matrix = [[0, 1, 0, 1], [1, 0, 1, 0], [0, 1, 0, 1], [1, 0, 1, 0]];
        var path = findCycle(matrix, 0);
        assert.equal(path.length, 4);
    } )

});
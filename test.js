/**
 * Created by bubble on 17.09.15.
 */
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
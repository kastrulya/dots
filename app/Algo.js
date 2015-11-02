/**
 * Created by bubble on 02.11.15.
 */
define('Algo', function() {

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

    AdjacencyMatrix.prototype.findCycle = function (firstNode) {
        var firstNode = new Node(firstNode, false);
        var stackOfNodes = [];
        stackOfNodes.push(firstNode);
        var notVisited
    };

    function findCycle (matrix, firstNumber) {
        var stack = [];
        var firstNode = {node: firstNumber, visited: false};
        stack.push(firstNode);
        var filterStack = [firstNode];

        while(filterStack.length) {
            var fromNode = filterStack[filterStack.length - 1];
            for (var i = 0; i < matrix.length; i++) {
                var isInStack = ~findValueInStack(stack, i);
                var pathExists = matrix[fromNode.node][i] == 1;
                var indexNodeInStack = ~isInStack;
                if (pathExists) {
                    if (!isInStack)
                        stack.push({node: i, visited: false, from: fromNode});
                    else if (stack[indexNodeInStack].visited == false) {
                        stack.splice(indexNodeInStack, 1);
                        stack.push({node:i, visited: false, from: fromNode});
                    }
                }

            }
            fromNode.visited = true;

            filterStack = stack.filter(function(item) { //while there are node in stack that aren't black
                return item.visited != true;
            });

            if (matrix[fromNode.node][firstNode.node] == 1 && getPath(fromNode).length > 3) {
                return getPath(fromNode);
            }
        }
        return [];
    }

    function Node (node, visited, from) {
        this.node = node;
        this.visited = visited;
        this.from = from;
    }

    function getPath(node) {
        var path = [];
        while (node) {
            path.push(node.node);
            node = node.from;
        }
        return path;
    }

    function Stack (stack) {
        this.stack = stack;
    }

    //Stack.prototype = Object.create([].prototype);
    Stack.prototype.constructor = Stack;

    Stack.prototype.getNodeByNumber = function (number) {
        for (var i = 0; i < this.stack.length; i++) {
            if (this.stack[i].node == value)
                return i;
        }
        return -1;
    };

    Stack.prototype.notVisitedInStack = function () {
        return this.stack.filter(function(item) { //while there are node in stack that aren't black
            return item.visited != true;
        });
    };

    function findValueInStack (stack, value) {
        for (var i = 0; i < stack.length; i++) {
            if (stack[i].node == value)
                return i;
        }
        return -1;
    }

    return {
        "AdjacencyMatrix": AdjacencyMatrix,
        "findCycle": findCycle
    };
});


/** 
 *  @fileOverview AbstractNode for the Graph Framework
 *
 *  @author       Yulong Ran
 *  @requires     static/AbstractNode.js
 */

/**
* The AbstractNode class
* @class
*/
class AbstractNode {
	
	
	/**
	* Constructor for the AbstractNode class
	* @constructor
	*
	* @property {Array} children array of children for the AbstractNode
	* @property {AbstractNode}parent the end of the edge
	*/
	constructor() {
        this.children = [];
        this.parent = undefined;
    }

	/**
	 * Translates the AbstractNode's children by the given amount.
	 * @param   {number} dx the first number
	 * @param   {number} dy the second number
	*/
    translate(dx, dy) {
        for (let i = 0; i < this.children.length; i++) {
            let n = this.children[i];
            n.translate(dx, dy);
        }
    }
	
	/**
	 * Returns whether or not the edge has an end
	 * @param   {AbstractEdge} e the edge to be added
	 * @param   {AbstractNode} p1 the first AbstractNode that has the edge added to it
	 * @param   {AbstractNode} p2 the second AbstractNode that has the edge added to it
	 * @returns {boolean} whether or not the edge has an end
	*/
    addEdge(e, p1, p2) {
        return e.getEnd() != undefined;
    }

	/**
	 * Removes an edge from the graph
	 * @param   {Graph} g the Graph to get the AbstractEdge removed from
	 * @param   {AbstractEdge} e the AbstractEdge to be removed
	*/	
    removeEdge(g, e) {

    }

		/**
	 * Removes an edge from the graph
	 * @param   {Graph} g the Graph to get the AbstractNode removed from
	 * @param   {AbstractNode} e the AbstractNode to be removed
	*/	
    removeNode(g, e) {
        if (e === this.parent) {
            parent = undefined;
        }
        if (e.getParent() === this) {
            for (let i = 0; i < this.children.length; i++) {
                if (this.children[i] === e) {
                    this.children.splice(i, e);
                }
            }
        }
    }


	/**
	* Returns the parent of the AbstractNode
	* @returns {AbstractNode} the Parent of the AbstractNode
	*/
    getParent() {
        return this.parent;
    }

	/**
	* Sets the parent of the AbstractNode
	* @param {AbstractNode} n the Parent of the AbstractNode
	*/
    setParent(n) {
        this.parent = n;
    }

	/**
	* Returns the Children Array of the AbstractNode
	* @returns {Array} the children array of the AbstractNode
	*/
    getChildren() {
        return this.children;
    }

	/**
	* Sets the child into the children array at the given index
	* @param {AbstractNode} node the new child of the AbstractNode
	* @param {number} index the index of the children array to insert the child into
	*/
    addChild2(index, node) {
        let oldParent = node.getParent();

        if (oldParent !== undefined) {
            oldParent.removeChild(node);
        }
        this.children.splice(index+1, 0 , node);
        node.setParent(this);
    }

	/**
	* Sets the child into the children array at the end 
	* @param {AbstractNode} node the new child of the AbstractNode
	*/	
    addChild(node) {
        this.addChild2(this.children.length, node);
    }

	/**
	* Removes the child from the children array at the end 
	* @param {AbstractNode} node the child to be removed
	*/	
    removeChild(node) {
        if (node.getParent() !== this) {
            return;
        }
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i] === node) {
                this.children.splice(i, 1);
            }
        }
        node.setParent(undefined);
    }

/*
    getShape() {
        return undefined;
    }

    setPersistenceDelegate(encode) {

    }
	*/
}

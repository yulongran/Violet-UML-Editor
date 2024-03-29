/** 
 *  @fileOverview Graph for the Graph Framework
 *
 *  @author       Yulong Ran
 *  @requires     static/Graph.js
 */

/**
* The Graph class
* @class
*/
class Graph {
	
	/**
	* Translates the AbstractNode's children by the given amount.
	* @property   {Array} nodes the nodes of the graph
	* @property   {Array} edges the edges of the graph
	* @property   {Array} nodesToBeRemoved the nodes to be removed 
	* @property   {Array} edgesToBeRemoved the edges to be removed 
	* @property   {boolean} needsLayout returns whether or not the 
	* @property   {boolean} needsLayout returns whether or not the 
	* @property   {Rectangle2D} minBounds the minimum bounds of the graph 
	*/
    constructor() {
        this.nodes = []
        this.edges = []
        this.nodesToBeRemoved = [];
        this.edgesToBeRemoved = [];
        this.needsLayout = true;
        this.minBounds;
    }

	/**
	 * Connects two AbstractNodes with an AbstractEdge and updates the graph arrays and redraws the graph
	 * @param   {AbstractEdge} e the edge to be added
	 * @param   {AbstractNode} p1 the first AbstractNode that has the edge added to it
	 * @param   {AbstractNode} p2 the second AbstractNode that has the edge added to it
	 * @returns {boolean}whether or not the node has been connected 
	*/
    connect(e, p1, p2) {
        let n1 = this.findNode(p1);
        let n2 = this.findNode(p2);
        if (n1 !== undefined) {
            e.connect(n1, n2);
            if (n1.addEdge(e, p1, p2) && (e.getEnd() !== undefined)) {
                this.edges.push(e);
                if (!this.nodes.includes(e.getEnd())) {
                    this.nodes.push(e.getEnd())
                }
                this.needsLayout = true;
                return true;
            }
        }
        return false;
    }
	
	/**
	 * Adds in a node inside another node at point P and redraws the graph
	 * @param   {AbstractNode} n1 the first AbstractNode that has the edge added to it
	 * @param   {JSON} p JSON with x and y values
	 * @returns {boolean} whether or not the has been added
	*/
    add(n1, p) {
        let bounds = n1.getBounds();
        n1.translate(p.x - bounds.getX(), p.y - bounds.getY());

        var accepted = false;
        var insideANode = false;
        for (var i = this.nodes.length - 1; i >= 0 && !accepted; i--) {
            let parent = this.nodes[i];
            if (parent.contains(p)) {
                insideANode = true;
                if (parent.addNode(n1, p)) {
                    accepted = true;
                }
            }
        }
        if (insideANode && !accepted) {
            return false;
        }
        this.nodes.push(n1);
        this.needsLayout = true;
        return true;

    }
	
	/**
	 * Finds the a AbstractNode at point P
	 * @param   {JSON} p JSON with x and y values
	 * @returns {AbstractNode} the AbstractNode at the point
	*/
    findNode(p) {
        for (let i = this.nodes.length - 1; i >= 0; i--) {
            const n = this.nodes[i]
            if (n.contains(p)) {
                return n
            }
        }
        return undefined
    }

	/**
	 * Finds the a AbstractEdge at point P
	 * @param   {JSON} p JSON with x and y values
	 * @returns {AbstractEdge} the AbstractEdge at the point
	*/
    findEdge(p) {
        for (let i = this.edges.length - 1; i >= 0; i--) {
            const e = this.edges[i];
            if (e.contains(p)) {
                return e;
            }
        }
        return undefined;
    }
	
	/**
	* Calls the draw method of all the nodes and edges stored in the graph
	*/
    draw() {
        this.layout();
        for (const n of this.nodes) {
            n.draw();
        }
        for (const e of this.edges) {
            e.draw();
        }
    }

	/**
	* Removes the given AbstractNode from the Graph and all of its children
	* @param {AbstractNode} the AbstractNode to be removed
	*/
    removeNode(node) {
       if(this.nodesToBeRemoved.includes((node)))
       {
         return;
       }
       this.nodesToBeRemoved.push(node);
       for(let i=0; i<this.nodes.length; i++)
    {
      let n2= this.nodes[i];
      n2.removeNode(this, node);
    }
    for(let i=0; i<this.edges.length; i++)
    {
      let e= this.edges[i];
      if(e.getStart() === node || e.getEnd() === node)
      {
        this.removeEdge(e);
      }
    }
    this.needsLayout=true;

    }
	
	/**
	* Removes the given AbstractEdge from the Graph 
	* @param {AbstractEdge} the AbstractEdge to be removed
	*/
	  removeEdge(edge) {
      if(this.edgesToBeRemoved.includes(edge))
      {
        return;
      }
      this.edgesToBeRemoved.push(edge);
      for(let i=this.nodes.length-1; i>=0; i--)
      {
        let n= this.nodes[i];
        n.removeEdge(this,edge);
      }
      this.needsLayout=true;
    }

	/**
	* Removes nodes to be removed and calls layout on the nodes to updated them
	* @param {Graph} the graph to be updated
	*/
    layout(g) {
        if (!this.needsLayout) {
            return;
        }
        for(let i=0; i<this.nodesToBeRemoved.length; i++)
    {
      for(let k=0; k<this.nodes.length; k++)
      {
        if(this.nodes[k] === this.nodesToBeRemoved[i])
        {
          this.nodes.splice(k,1);
        }
      }
    }
    for(let i=0; i<this.edgesToBeRemoved.length; i++)
    {
      for(let k=0; k<this.edges.length; k++)
      {
        if(this.edges[k] === this.edgesToBeRemoved[i])
        {
          this.edges.splice(k,1);
        }
      }
    }
        this.nodesToBeRemoved = [];
        this.edgesToBeRemoved = [];

        for (let i = 0; i < this.nodes.length; i++) {
            let n = this.nodes[i];
            n.layout(this);
        }
        this.needsLayout = true;
    }

	/**
	* Returns the bounds of the graph
	* @returns {Rectangle2D} Bounds of the graph
	*/
    getBounds() {
        let r = this.minBounds;
        for (let i = 0; i < this.nodes.length; i++) {
            let n = this.nodes[i];
            let b = n.getBounds();
            if (r === undefined) {
                r = b;
            }
            else {
                r.add(b);
            }
        }
        for (let i = 0; i < this.edges.length; i++) {
            let e = this.edges[i];
            r.add(e.getBounds());
        }

        if (r == null) {
            return new Rectangle2D(0, 0, 0, 0);
        }
        return new Rectangle2D(r.getX(), r.getY(),
            r.getWidth() + AbstractNode.SHADOW_GAP, r.getHeight() + AbstractNode.SHADOW_GAP);
    }

	/**
	* Returns the minimum bounds of the graph
	* @return   {Rectangle2D} minBounds the minimum bounds of the graph
	*/
    getMinBounds() {
        return this.minBounds;
    }

	/**
	* Sets the minimum bounds of the graph
	* @param   {Rectangle2D} newValue the minimum bounds of the graph
	*/
    setMinBounds(newValue) {
        this.minBounds = newValue;
    }

	/**
	* Returns the nodes of the graph
	* @return   {Array} nodes the nodes array of the graph
	*/
    getNodes() {
        return this.nodes;
    }

	/**
	* Returns the edges of the graph
	* @return   {Rectangle2D} edges the array of edges in the of the graph
	*/
    getEdges() {
        return this.edges;
    }

	/**
	* Adds a node into the graph
	* @param {AbstractNode} n the new node to be added in
	* @param {JSON} json with x and y representing a point 
	*/
    addNode(n, p) {
        let bounds = n.getBounds();
        n.translate(p.x - bounds.getX(), p.y - bounds.getY());
        this.nodes.add(n);
    }

}

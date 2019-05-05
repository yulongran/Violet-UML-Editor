class Graph {
    constructor() {
        this.nodes = []
        this.edges = []
        this.nodesToBeRemoved = [];
        this.edgesToBeRemoved = [];
        this.needsLayout = true;
        this.minBounds;
    }

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
    findNode(p) {
        for (let i = this.nodes.length - 1; i >= 0; i--) {
            const n = this.nodes[i]
            if (n.contains(p)) {
                return n
            }
        }
        return undefined
    }

    findEdge(p) {
        for (let i = this.edges.length - 1; i >= 0; i--) {
            const e = this.edges[i];
            if (e.contains(p)) {
                return e;
            }
        }
        return undefined;
    }
    draw() {
        this.layout();
        for (const n of this.nodes) {
            n.draw();
        }
        for (const e of this.edges) {
            e.draw();
        }
    }

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

    getMinBounds() {
        return this.minBounds;
    }

    setMinBounds(newValue) {
        this.minBounds = newValue;
    }

    getNodes() {
        return this.nodes;
    }

    getEdges() {
        return this.edges;
    }

    addNode(n, p) {
        let bounds = n.getBounds();
        n.translate(p.x - bounds.getX(), p.y - bounds.getY());
        this.nodes.add(n);
    }

}

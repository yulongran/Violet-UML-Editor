class SequenceDiagramGraph extends Graph {
    add(n, p) {
        if (n instanceof CallNode) {
            let nodes = super.getNodes();
            var inside = false;
            while (!inside) {
                for (let node of nodes) {
                    if (node instanceof ImplicitParameterNode && node.contains(p)) {
                        inside = true;
                        n.setImplicitParameter(node);
                    }
                }
            }
            if (!inside) {
                return false;
            }
        }
        if (!super.add(n, p)) {
            return false;
        }
        return true;
    }

    removeEdge(e) {
        super.removeEdge(e);
        if (e instanceof CallEdge && e.getEnd().getChildren().size() == 0) {
            removeNode(e.getEnd());
        }
    }

    layout(g) {
        super.layout(g);
        let topLevelCalls = [];
        let objects = [];
        let nodes = super.getNodes();
        for (let node of nodes) {
            if (node instanceof CallNode && node.getParent() === undefined) {
                topLevelCalls.push(node);
            }
            else if (node instanceof ImplicitParameterNode) {
                objects.push(node);
            }
        }
        let edges = super.getEdges();
        for (let edge of edges) {
            if (edge instanceof CallEdge) {
                let end = edge.getEnd();
                if (end instanceof CallNode) {
                    end.setSignaled(edge.isSignal());
                }
            }
        }

        var left = 0;
        var top = 0;

        for (let i = 0; i < objects.length; i++) {
            let n = objects[i];
            n.translate(0, -n.getBounds().getY());
            top = Math.max(top, n.getTopRectangle().getHeight());
        }

        for (let i = 0; i < topLevelCalls.length; i++) {
            let call = topLevelCalls[i];
            call.layout(this);
        }
        for (let i = 0; i < nodes.length; i++) {
            let n = nodes[i];
            if (n instanceof CallNode) {
                top = Math.max(top, n.getBounds().getY() + n.getBounds().getHeight());
            }
        }

        top += 20;
        for (let i = 0; i < objects.length; i++) {
            let n = objects[i];
            let b = n.getBounds();
            n.setBounds(new Rectangle2D(b.getX(), b.getY(), b.getWidth(), top - b.getY()));

        }
    }

    draw() {
        this.layout(this);
        let nodes = super.getNodes();
        for (let i = 0; i < nodes.length; i++) {
            let n = nodes[i];
            if (!(n instanceof CallNode)) {
                n.draw();
            }
        }

        for (let i = 0; i < nodes.length; i++) {
            let n = nodes[i];
            if ((n instanceof CallNode)) {
                n.draw();
            }
        }
        let edges = super.getEdges();
        for (let i = 0; i < edges.length; i++) {
          let e= edges[i];
            e.draw();
        }
    }
}

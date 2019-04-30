class CallNode extends RectangularNode {
    constructor() {
        super();
        this.implicitParameter;
        this.signaled;
        this.openBottom = false;
        this.DEFAULT_WIDTH = 16;
        this.DEFAULT_HEIGHT = 30;
        this.CALL_YGAP = 20;
        super.setBounds(new Rectangle2D(0, 0, this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT));

    }
    draw() {
        let rec = super.getBounds();
        rec.draw();
        if (this.openBottom) {
            b = super.getBounds();
            var x1 = b.getX();
            var x2 = x1 + b.getWidth();
            var y1 = b.getY();
            var y3 = y1 + b.getHeight();
            var y2 = y3 - CALL_YGAP;

            // Draw line1
            ctx.beginPath();
            ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y1);
            ctx.stroke()

            // Draw line2
            ctx.beginPath();
            ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke()

            // Draw line3
            ctx.beginPath();
            ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
            ctx.moveTo(x2, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke()

            // Draw line4
            ctx.beginPath();
            ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
            ctx.moveTo(x1, y2);
            ctx.lineTo(x1, y3);
            ctx.stroke()

            // Draw line4
            ctx.beginPath();
            ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
            ctx.moveTo(x2, y2);
            ctx.lineTo(x2, y3);
            ctx.stroke()
        }
    }

    drawToolBar(ctx) {
        super.getBounds().width = TOOLBAR_WIDTH;
        super.getBounds().height = TOOLBAR_HEIGHT;
        let rec = super.getBounds();
        rec.drawToolBar(ctx);
        if (this.openBottom) {
            b = super.getBounds();
            var x1 = b.getX();
            var x2 = x1 + b.getWidth();
            var y1 = b.getY();
            var y3 = y1 + b.getHeight();
            var y2 = y3 - CALL_YGAP;

            // Draw line1
            ctx.beginPath();
            ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y1);
            ctx.stroke()

            // Draw line2
            ctx.beginPath();
            ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke()

            // Draw line3
            ctx.beginPath();
            ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
            ctx.moveTo(x2, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke()

            // Draw line4
            ctx.beginPath();
            ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
            ctx.moveTo(x1, y2);
            ctx.lineTo(x1, y3);
            ctx.stroke()

            // Draw line4
            ctx.beginPath();
            ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
            ctx.moveTo(x2, y2);
            ctx.lineTo(x2, y3);
            ctx.stroke()
        }
    }

    getImplicitParameter() {
        return this.implicitParameter;
    }

    /**
     Sets the implicit parameter of this call.
     @param newValue the implicit parameter node
     */
    setImplicitParameter(newValue) {
        this.implicitParameter = newValue;
    }
    getConnectionPoint(d) {
        if (d.getX() > 0) {
            return new Point2D(super.getBounds().getMaxX(),
                super.getBounds().getMinY());
        }
        else {
            return new Point2D(super.getBounds().getX(),
                super.getBounds().getMinY());
        }

    }

    addEdge(e, p1, p2) {
        let end = e.getEnd();
        if (end === undefined) {
            return false;
        }
        if (e instanceof ReturnEdge) {
            return end == super.getParent();
        }
        if (!(e instanceof CallEdge)) {
            return false;
        }
        let n = undefined;
        if (end instanceof CallNode) {
            let parent = this;
            while (parent !== undefined && end !== parent) {
                parent = parent.getParent();
            }
            if (end.getParent() === undefined && end !== parent) {
                n = end;
            }
            else {
                let c = new CallNode();
                c.implicitParameter = end.implicitParameter;
                e.connect(this, c);
                n = c;
            }
        }
        else if (end instanceof ImplicitParameterNode) {
            if (end.getTopRectangle().contains(p2)) {
                n = end;
                e.setMiddleLabel("\u00ABcreate\u00BB");
            }
            else {
                let c = new CallNode();
                c.implicitParameter = end;
                e.connect(this, c);
                n = c;
            }
        }
        else return false;

        var i = 0;
        let calls = getChildren();
        while (i < calls.length && calls[i].getBounds().getY() <= p1.getY()) {
            i++;
        }
        addChild(i, n);
        return true;
    }

    removeEdge(g, e) {
        if (e.getStart() === this) {
            removeChild(e.getEnd());
        }
        super.removeEdge(g, e);
    }

    removeNode(g, n) {
        if (n === getParent() || n === this.implicitParameter)
            g.removeNode(this);
    }

    findEdge(g, start, end) {
        // Collection edges = g.getEdges();
        // Iterator iter = edges.iterator();
        // while (iter.hasNext())
        // {
        //    Edge e = (Edge) iter.next();
        //    if (e.getStart() == start && e.getEnd() == end) return e;
        // }
        // return null;
    }

    layout() {
        if (this.implicitParameter === undefined) {
            return;
        }
        var xmid = this.implicitParameter.getBounds().getCenterX();

        for (let c = super.getParent(); c !== undefined; c = c.getParent()) {
            if (c.implicitParameter === this.implicitParameter) {
                xmid += super.getBounds.getWidth() / 2;
            }
        }

        super.translate(xmid - super.getBounds().getCenterX(), 0);

        var ytop = super.getBounds().getY() + this.CALL_YGAP;

        let calls = super.getChildren();
        for (var i = 0; i < calls.length; i++) {
            let n = calls[i];
            if (n instanceof ImplicitParameterNode) {
                n.translate(0, ytop - n.getTopRectangle().getCenterY());
                ytop += n.getTopRectangle().getHeight() / 2 + CALL_YGAP;
            }
            else if (n instanceof CallNode) {
                callEdge = findEdge(g, this, n);
                if (callEdge !== undefined) {
                    let edgeBounds = callEdge.getBounds(g2);
                    ytop += edgeBounds.getHeight() - CALL_YGAP;
                }

                n.translate(0, ytop - n.getBounds().getY());
                n.layout(g, g2, grid);
                if (n.signaled) {
                    ytop += CALL_YGAP;
                }
                else {
                    ytop += n.getBounds().getHeight() + CALL_YGAP;
                }
            }
        }
        if (this.openBottom) {
            tyop += 2 * CALL_YGAP;
        }
        let b = super.getBounds();
        var minHeight = this.DEFAULT_HEIGHT;
        let returnEdge = this.findEdge();
        if (returnEdge !== undefined) {
            let edgeBounds = returnEdge.getBounds(g2);
            minHeight = Math.max(minHeight, edgeBounds.getHeight());
        }
        super.setBounds(new Rectangle2D(b.getX(), b.getY(), b.getWidth(),
            Math.max(minHeight, ytop - b.getY())));
    }

    addNode(n, p) {
        return n instanceof PointNode;
    }
    setSignaled(newValue) {
        this.signaled = newValue;
    }

    isOpenBottom() {
        return this.openBottom;
    }

    setOpenBottom(newValue) {
        this.openBottom = newValue;
    }

    getPropertySheet() {
        let copyOpenBottom = this.openBottom;
        let copyImplicitParameter = this.implicitParameter;
        return {
            openBottom: copyOpenBottom,
        }
    }


}

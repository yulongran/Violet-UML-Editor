
class ImplicitParameterNode extends RectangularNode {
    constructor() {
        super();
        this.name = "" // MultiLineString
        this.DEFAULT_WIDTH = 80;
        this.DEFAULT_HEIGHT = 120;
        this.DEFAULT_TOP_HEIGHT = 60;
        super.setBounds(new Rectangle2D(0, 0, this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT));
        this.topHeight = this.DEFAULT_TOP_HEIGHT;
    }

    contains(p) {
        let bounds = super.getBounds();
        return bounds.getX() <= p.x &&
            p.x <= bounds.getX() + bounds.getWidth();
    }

    draw(newCtx = undefined) {
        var curr_ctx = (newCtx != undefined) ? newCtx : ctx
        let top = this.getTopRectangle();
        let textWidth = ctx.measureText(this.name).width;
        let copyBounds = super.getBounds();
        if (textWidth + 10 > top.width) {
            super.getBounds().width = textWidth+15;
            top = this.getTopRectangle();
        }
        top.draw(curr_ctx);
        let xmid = super.getBounds().getCenterX();
        curr_ctx.beginPath();
        curr_ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
        curr_ctx.moveTo(xmid, top.getMaxY());
        curr_ctx.lineTo(xmid, super.getBounds().getMaxY());
        curr_ctx.stroke()
        curr_ctx.fillStyle = 'black'
        curr_ctx.font = "12px Arial";
        curr_ctx.fillText(this.name, top.x + 10, top.y + 30)

    }

    drawToolBar(ctx) {
        super.getBounds().width = TOOLBAR_WIDTH;
        let top = this.getTopRectangle();
        top.drawToolBar(ctx);
        let xmid = super.getBounds().getCenterX();
        ctx.beginPath();
        ctx.setLineDash([20, 12]);/*dashes are 5px and spaces are 3px*/
        ctx.moveTo(xmid, top.getMaxY());
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineTo(xmid, TOOLBAR_HEIGHT);
        ctx.stroke()
    }

    getTopRectangle() {
        let tRectangle = new Rectangle2D(super.getBounds().getX(), super.getBounds().getY(), super.getBounds().getWidth(), this.topHeight);
        return tRectangle;
    }

    getShape() {
        return getTopRectangle();
    }

    addEdge(e, p1, p2) {
        return false;
    }

    getConnectionPoint(d) {
        if (d.getX() > 0) {
            return new Point2D(super.getBounds().getMaxX(), super.getBounds().getMinY() + this.topHeight / 2);
        }
        else {
            return new Point2D(super.getBounds().getX(), super.getBounds().getMinY() + this.topHeight / 2)
        }
    }

    layout(g) {
        //let b= name.getBounds(g2);
        //b.add(new Rectangle2D(0,0, this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT));
        //let top = new Rectangle2D(super.getBounds().getX(), super.getBounds().getY(), b.getWidth(), b.getHeight());
        //grid.snap(top);
        //super.setBounds(new Rectangle2D(top.getX(), top.getY(), top.getWidth(), super.getBounds().getHeight()));
        //topHeight=top.getHeight();
    }

    setName(n) {
        this.name = n;
    }

    getName() {
        return name;
    }

    clone() {
        let myImplicitParameterNode = new ImplicitParameterNode();
        let cloned = {};
        Object.assign(cloned, myImplicitParameterNode);
        return cloned;
    }

    addNode(n, p) {
        return n instanceof CallNode //|| typeof n === PointNode;
    }

    getProperty() {
        let copyName = this.name;
        var myNode= this;
        return {
            name: copyName,
            inputBox: [copyName],
            setName(n)
            {
              myNode.setName(n);
            },
        }
    }
}

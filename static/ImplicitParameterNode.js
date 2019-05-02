
class ImplicitParameterNode extends RectangularNode {
    constructor() {
        super();
        this.name = "Hello World" // MultiLineString
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

    draw() {
        let top = this.getTopRectangle();
        let textWidth = ctx.measureText(this.name).width;
        let copyBounds = super.getBounds();
        if (textWidth + 10 > top.width) {
            super.getBounds().width = textWidth + 30;
            top = this.getTopRectangle();
        }
        top.draw();
        let xmid = super.getBounds().getCenterX();
        ctx.beginPath();
        ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
        ctx.moveTo(xmid, top.getMaxY());
        ctx.lineTo(xmid, super.getBounds().getMaxY());
        ctx.stroke()
        ctx.fillStyle = 'black'
        ctx.font = "12px Arial";
        ctx.fillText(this.name, top.x + 10, top.y + 30)

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

    getPropertySheet() {
        let copyName = this.name;
        var myNode= this;
        return {
            name: copyName,
            //editorname
            setName(n)
            {
              myNode.setName(n);
            },
        }
    }
}

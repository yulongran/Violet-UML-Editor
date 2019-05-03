
'use strict'
var LineStyle = {
    SOLID: {
        "name": "solid",
        "applyStyle": function () {

        },
        "revertStyle": function () {

        }
    }, DOTTED: {
        "name": "dotted",
        "applyStyle": function () {
            const c = document.getElementById("myCanvas");
            const ctx = c.getContext("2d");
            ctx.setLineDash([5, 3]);
        },
        "revertStyle": function () {
            const c = document.getElementById("myCanvas");
            const ctx = c.getContext("2d");
            ctx.setLineDash([]);
        }
    }
};
var ArrowHead = {
    NONE: {
	"name":"none",
	"drawMethod": function (p1, p2, direction, start) {
		
	},
     "getHeadBounds": function (p1, p2, direction, start) {
		 return new Rectangle2D(0,0,0,0);
	 }
	} 	
	, V: {
        "name": "V",
        "drawMethod": function (p1, p2, direction, start) {
			if (start) {
                if (direction.getX() == 1) {
                    const c = document.getElementById("myCanvas");
                    const ctx = c.getContext("2d");
                    ctx.beginPath();
                    ctx.setLineDash([]);
                    ctx.moveTo(p1.getX(), p1.getY());
                    ctx.lineTo(p1.getX() + 10, p1.getY() + 10);
                    ctx.moveTo(p1.getX(), p1.getY());
                    ctx.lineTo(p1.getX() + 10, p1.getY() - 10);
                    ctx.stroke();
                }
                else {
                    const c = document.getElementById("myCanvas");
                    const ctx = c.getContext("2d");
                    ctx.beginPath();
                    ctx.setLineDash([]);
                    ctx.moveTo(p1.getX(), p1.getY());
                    ctx.lineTo(p1.getX() - 10, p1.getY() + 10);
                    ctx.moveTo(p1.getX(), p1.getY());
                    ctx.lineTo(p1.getX() - 10, p1.getY() - 10);
                    ctx.stroke();
                }
            }
            else {
                if (direction.getX() == -1) {
                    const c = document.getElementById("myCanvas");
                    const ctx = c.getContext("2d");
                    ctx.beginPath();
                    ctx.setLineDash([]);
                    ctx.moveTo(p2.getX(), p2.getY());
                    ctx.lineTo(p2.getX() + 10, p2.getY() + 10);
                    ctx.moveTo(p2.getX(), p2.getY());
                    ctx.lineTo(p2.getX() + 10, p2.getY() - 10);
                    ctx.stroke();
                }
                else {
                    const c = document.getElementById("myCanvas");
                    const ctx = c.getContext("2d");
                    ctx.beginPath();
                    ctx.setLineDash([]);
                    ctx.moveTo(p2.getX(), p2.getY());
                    ctx.lineTo(p2.getX() - 10, p2.getY() + 10);
                    ctx.moveTo(p2.getX(), p2.getY());
                    ctx.lineTo(p2.getX() - 10, p2.getY() - 10);
                    ctx.stroke();
                }
            }
        },
        "getHeadBounds": function (p1, p2, direction, start) {
            if (start) {
                if (direction.getX() == 1) {

                    return new Rectangle2D(p1.getX(), p1.getY() - 10, 10, 20);
                }
                else {
                    return new Rectangle2D(p1.getX() - 10, p1.getY() - 10, 10, 20);
                }
            }
            else {
                if (direction.getX() == -1) {
                    return new Rectangle2D(p2.getX(), p2.getY() - 10, 10, 20);

                }
                else {
                    return new Rectangle2D(p2.getX() - 10, p2.getY() - 10, 10, 20);
                }
            }
        },

    },
    TRIANGLE: {
        "name": "triangle",
        "drawMethod": function (p1, p2, direction, start) {
            if (start) {
                if (direction.getX() == 1) {
                    const c = document.getElementById("myCanvas");
                    const ctx = c.getContext("2d");
                    ctx.beginPath();
                    ctx.setLineDash([]);
                    ctx.moveTo(p1.getX(), p1.getY());
                    ctx.lineTo(p1.getX() + 10, p1.getY() + 10);
                    ctx.moveTo(p1.getX(), p1.getY());
                    ctx.lineTo(p1.getX() + 10, p1.getY() - 10);
                    ctx.lineTo(p1.getX() + 10, p1.getY() + 10);
                    ctx.stroke();
                }
                else {
                    const c = document.getElementById("myCanvas");
                    const ctx = c.getContext("2d");
                    ctx.beginPath();
                    ctx.moveTo(p1.getX(), p1.getY());
                    ctx.lineTo(p1.getX() - 10, p1.getY() + 10);
                    ctx.moveTo(p1.getX(), p1.getY());
                    ctx.lineTo(p1.getX() - 10, p1.getY() - 10);
                    ctx.lineTo(p1.getX() - 10, p1.getY() + 10);
                    ctx.stroke();
                }
            }
            else {
                if (direction.getX() == -1) {
                    const c = document.getElementById("myCanvas");
                    const ctx = c.getContext("2d");
                    ctx.beginPath();
                    ctx.setLineDash([]);
                    ctx.moveTo(p2.getX(), p2.getY());
                    ctx.lineTo(p2.getX() + 10, p2.getY() + 10);
                    ctx.moveTo(p2.getX(), p2.getY());
                    ctx.lineTo(p2.getX() + 10, p2.getY() - 10);
                    ctx.lineTo(p2.getX() + 10, p2.getY() + 10);
                    ctx.stroke();
                }
                else {
                    const c = document.getElementById("myCanvas");
                    const ctx = c.getContext("2d");
                    ctx.beginPath();
                    ctx.moveTo(p2.getX(), p2.getY());
                    ctx.lineTo(p2.getX() - 10, p2.getY() + 10);
                    ctx.moveTo(p2.getX(), p2.getY());
                    ctx.lineTo(p2.getX() - 10, p2.getY() - 10);
                    ctx.lineTo(p2.getX() - 10, p2.getY() + 10);
                    ctx.stroke();
                }
            }

        },
        "getHeadBounds": function (p1, p2, direction, start) {
            if (start) {
                if (direction.getX() == 1) {
                    return new Rectangle2D(p1.getX(), p1.getY() - 10, 10, 20);
                }
                else {
                    return new Rectangle2D(p1.getX() - 10, p1.getY() - 10, 10, 20);
                }
            }
            else {
                if (direction.getX() == -1) {
                    return new Rectangle2D(p2.getX(), p2.getY() - 10, 10, 20);

                }
                else {
                    return new Rectangle2D(p2.getX() - 10, p2.getY() - 10, 10, 20);
                }
            }
        },
    },

    DIAMOND: {
        "name": "diamond",
        "drawMethod": function (p1, p2, direction, start) {
            if (start) {
                const c = document.getElementById("myCanvas");
                const ctx = c.getContext("2d");
                if (direction.getX() == 1) {

                    ctx.setLineDash([]);
                    ctx.beginPath();
                    ctx.moveTo(p1.getX(), p1.getY());
                    ctx.lineTo(p1.getX() + 10, p1.getY() + 10);
                    ctx.moveTo(p1.getX(), p1.getY());
                    ctx.lineTo(p1.getX() + 10, p1.getY() - 10);
                    ctx.lineTo(p1.getX() + 20, p1.getY());
                    ctx.lineTo(p1.getX() + 10, p1.getY() + 10);
                }
                else {
                    ctx.setLineDash([]);
                    ctx.beginPath();
                    ctx.moveTo(p1.getX(), p1.getY());
                    ctx.lineTo(p1.getX() - 10, p1.getY() + 10);
                    ctx.moveTo(p1.getX(), p1.getY());
                    ctx.lineTo(p1.getX() - 10, p1.getY() - 10);
                    ctx.lineTo(p1.getX() - 20, p1.getY());
                    ctx.lineTo(p1.getX() - 10, p1.getY() + 10);
                }
                ctx.fillStyle = "white";
                ctx.fill();
                ctx.fillStyle = "black";
                ctx.stroke();
            }
            else {
                const c = document.getElementById("myCanvas");
                const ctx = c.getContext("2d");

                if (direction.getX() == -1) {
                    ctx.setLineDash([]);
                    ctx.beginPath();
                    ctx.moveTo(p2.getX(), p2.getY());
                    ctx.lineTo(p2.getX() + 10, p2.getY() + 10);
                    ctx.moveTo(p2.getX(), p2.getY());
                    ctx.lineTo(p2.getX() + 10, p2.getY() - 10);
                    ctx.lineTo(p2.getX() + 20, p2.getY());
                    ctx.lineTo(p2.getX() + 10, p2.getY() + 10);
                }
                else {
                    ctx.setLineDash([]);
                    ctx.beginPath();
                    ctx.moveTo(p2.getX(), p2.getY());
                    ctx.lineTo(p2.getX() - 10, p2.getY() + 10);
                    ctx.moveTo(p2.getX(), p2.getY());
                    ctx.lineTo(p2.getX() - 10, p2.getY() - 10);
                    ctx.lineTo(p2.getX() - 20, p2.getY());
                    ctx.lineTo(p2.getX() - 10, p2.getY() + 10);
                }
                ctx.fillStyle = "white";
                ctx.fill();
                ctx.fillStyle = "black";
                ctx.stroke();

            }
        }

        , "getHeadBounds": function (p1, p2, direction, start) {
            if (start) {
                if (direction.getX() == 1) {
                    return new Rectangle2D(p1.getX(), p1.getY() - 10, 20, 20);
                }
                else {
                    return new Rectangle2D(p1.getX() - 20, p1.getY() - 10, 20, 20);
                }
            }
            else {
                if (direction.getX() == -1) {
                    return new Rectangle2D(p2.getX(), p2.getY() - 10, 20, 20);

                }
                else {
                    return new Rectangle2D(p2.getX() - 20, p2.getY() - 10, 20, 20);
                }
            }
        },
    },

    BLACKDIAMOND: {
        "name": "blackdiamond",

        "drawMethod": function (p1, p2, direction, start) {
            if (start) {
                const c = document.getElementById("myCanvas");
                const ctx = c.getContext("2d");
                if (direction.getX() == 1) {

                    ctx.setLineDash([]);
                    ctx.beginPath();
                    ctx.moveTo(p1.getX(), p1.getY());
                    ctx.lineTo(p1.getX() + 10, p1.getY() + 10);
                    ctx.moveTo(p1.getX(), p1.getY());
                    ctx.lineTo(p1.getX() + 10, p1.getY() - 10);
                    ctx.lineTo(p1.getX() + 20, p1.getY());
                    ctx.lineTo(p1.getX() + 10, p1.getY() + 10);
                }
                else {
                    ctx.setLineDash([]);
                    ctx.beginPath();
                    ctx.moveTo(p1.getX(), p1.getY());
                    ctx.lineTo(p1.getX() - 10, p1.getY() + 10);
                    ctx.moveTo(p1.getX(), p1.getY());
                    ctx.lineTo(p1.getX() - 10, p1.getY() - 10);
                    ctx.lineTo(p1.getX() - 20, p1.getY());
                    ctx.lineTo(p1.getX() - 10, p1.getY() + 10);
                }
                ctx.fill();
                ctx.fillStyle = "black";
                ctx.stroke();
            }
            else {
                const c = document.getElementById("myCanvas");
                const ctx = c.getContext("2d");
                if (direction.getX() == -1) {
                    ctx.setLineDash([]);
                    ctx.beginPath();
                    ctx.moveTo(p2.getX(), p2.getY());
                    ctx.lineTo(p2.getX() + 10, p2.getY() + 10);
                    ctx.moveTo(p2.getX(), p2.getY());
                    ctx.lineTo(p2.getX() + 10, p2.getY() - 10);
                    ctx.lineTo(p2.getX() + 20, p2.getY());
                    ctx.lineTo(p2.getX() + 10, p2.getY() + 10);
                }
                else {
                    ctx.setLineDash([]);
                    ctx.beginPath();
                    ctx.moveTo(p2.getX(), p2.getY());
                    ctx.lineTo(p2.getX() - 10, p2.getY() + 10);
                    ctx.moveTo(p2.getX(), p2.getY());
                    ctx.lineTo(p2.getX() - 10, p2.getY() - 10);
                    ctx.lineTo(p2.getX() - 20, p2.getY());
                    ctx.lineTo(p2.getX() - 10, p2.getY() + 10);
                }
                ctx.fill();
                ctx.fillStyle = "black";
                ctx.stroke();
            }
        },
        "getHeadBounds": function (p1, p2, direction, start) {
            if (start) {
                if (direction.getX() == 1) {
                    return new Rectangle2D(p1.getX(), p1.getY() - 10, 20, 20);
                }
                else {
                    return new Rectangle2D(p1.getX() - 20, p1.getY() - 10, 20, 20);
                }
            }
            else {
                if (direction.getX() == -1) {
                    return new Rectangle2D(p2.getX(), p2.getY() - 10, 20, 20);

                }
                else {
                    return new Rectangle2D(p2.getX() - 20, p2.getY() - 10, 20, 20);
                }
            }
        },

    }


};




class CallEdge extends SegmentedLineEdge {
    constructor() {
        super();
        this.signal;
        this.setSignal(false);
    }
    isSignal() { return this.signal; }
    setSignal(newValue) {
        this.signal = newValue;
        if (this.signal) {
            //super.setEndArrowHead(ArrowHead.HALF_V);
            this.setEndArrowHead(ArrowHead.V);
        }
        else
            this.setEndArrowHead(ArrowHead.V);
    }

    getPoints() {
        let a = [];
        let n = super.getEnd();
        let start = this.getStart().getBounds();
        let end = n.getBounds();

        if (n instanceof CallNode && (n.getImplicitParameter() == (this.getStart()).getImplicitParameter())) {
            let p = new Point2D(start.getMaxX(), end.getY() - CallNode.CALL_YGAP / 2);
            let q = new Point2D(end.getMaxX(), end.getY());
            let s = new Point2D(q.getX() + end.getWidth(), q.getY());
            let r = new Point2D(s.getX(), p.getY());
            a.push(p);
            a.push(r);
            a.push(s);
            a.push(q);
        }
        // else if (n instanceof PointNode) // show nicely in tool bar
        // {
        //    a.push(new Point2D(start.getMaxX(), start.getY()));
        //    a.push(new Point2D(end.getX(), start.getY()));
        // }
        else {
            let d = new Direction(start.getX() - end.getX(), 0);
            let endPoint = super.getEnd().getConnectionPoint(d);
            if (start.getCenterX() < endPoint.getX()) {
                a.push(new Point2D(start.getMaxX(),
                    endPoint.getY()));
            }
            else {
                a.push(new Point2D(start.getX(),
                    endPoint.getY()));
            }
            a.push(endPoint);
        }
        return a;
    }
}

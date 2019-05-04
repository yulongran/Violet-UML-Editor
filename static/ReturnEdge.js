/**
   An edge that joins two call nodes.
*/
class ReturnEdge extends SegmentedLineEdge {
    constructor() {
        super();
        this.setEndArrowHead(ArrowHead.V);
        this.setLineStyle(LineStyle.DOTTED);
    }

    getPoints() {
        let a = [];
        let n = this.getEnd();
        let start = this.getStart().getBounds();
        let end = this.getEnd().getBounds();
        // if (n instanceof PointNode) // show nicely in tool bar
        // {
        //     a.push(new Point2D(end.getX(), end.getY()));
        //     a.push(new Point2D(start.getMaxX(), end.getY()));
        // }
        if (start.getCenterX() < end.getCenterX()) {
            a.push(new Point2D(start.getMaxX(), start.getMaxY()));
            a.push(new Point2D(end.getX(), start.getMaxY()));
        }
        else {
            a.push(new Point2D(start.getX(), start.getMaxY()));
            a.push(new Point2D(end.getMaxX(), start.getMaxY()));
        }
        return a;
    }
}

class RectangularNode extends AbstractNode {
    constructor() {
        super();
        this.bounds = new Rectangle2D(0, 0, 0, 0);
    }
    clone() {
      let myRectangularNode = new RectangularNode();
      let cloned = {};
      Object.assign(cloned , myRectangularNode);
      return cloned;
    }

    translate(dx, dy) {
        this.bounds.setX(this.bounds.getX() + dx);
        this.bounds.setY(this.bounds.getY() + dy);
        this.bounds.setHeight(this.bounds.getHeight());
        this.bounds.setWidth(this.bounds.getWidth());
        super.translate(dx, dy);
    }

    contains(p) {
        if (p.x > this.bounds.x && p.x < this.bounds.x + this.bounds.width && p.y > this.bounds.y && p.y < this.y + this.bounds.height) {
            return true
        }
        return undefined
    }

    getBounds() {
        return this.bounds;
    }

    setBounds(newBounds) // arguemnts is a rectangle
    {
        this.bounds = newBounds;
    }

    getConnectionPoint(d) {
        let slope = this.bounds.getHeight() / this.bounds.getWidth();
        let ex = d.getX();
        let ey = d.getY();
        let x = this.bounds.getCenterX();
        let y = this.bounds.getCenterY();

        if (ex != 0 && -slope <= ey / ex && ey / ex <= slope) {
            // intersects at left or right boundary
            if (ex > 0) {
                x = this.bounds.getMaxX();
                y += (this.bounds.getWidth() / 2) * ey / ex;
            }
            else {
                x = this.bounds.getX();
                y -= (this.bounds.getWidth() / 2) * ey / ex;
            }
        }
        else if (ey != 0) {
            // intersects at top or bottom
            if (ey > 0) {
                x += (this.bounds.getHeight() / 2) * ex / ey;
                y = this.bounds.getMaxY();
            }
            else {
                x -= (this.bounds.getHeight() / 2) * ex / ey;
                y = this.bounds.getY();
            }
        }
        return new point(x, y);
    }

    writeObject(out) {

    }
    writeRectangularShape() {

    }
    readObject() {

    }
    readRectangularShape() {

    }
    getShape() {
        return this.bounds;
    }

}

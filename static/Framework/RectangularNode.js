/** 
 *  @fileOverview Rectangular Node that implementes AbstractNode
 *
 *  @author       Yulong Ran
 *  @requires     static/RectangularNode.js
 */
 
 /**
* The RectangularNode class
* @class
*/
class RectangularNode extends AbstractNode {
	
	/**
	* Constructor for the RectangularNode class
	* @constructor
	* @property {Rectangle2D}bounds the bounds of the RectangularNode
	*/
    constructor() {
        super();
        this.bounds = new Rectangle2D(0, 0, 0, 0);
    }
	
	/**
	* Creates a deep copy of the current RectangularNode and returns it
	* @return {RectangularNode}cloned copy of current RectangularNode
	*/
    clone() {
      let myRectangularNode = new RectangularNode();
      let cloned = {};
      Object.assign(cloned , myRectangularNode);
      return cloned;
    }

	/**
	 * Translates the RectangularNode's children by the given amount and updates bounds
	 * @param   {number} dx the first number
	 * @param   {number} dy the second number
	*/	
    translate(dx, dy) {
        this.bounds.setX(this.bounds.getX() + dx);
        this.bounds.setY(this.bounds.getY() + dy);
        this.bounds.setHeight(this.bounds.getHeight());
        this.bounds.setWidth(this.bounds.getWidth());
        super.translate(dx, dy);
    }

	/**
	 * Checks whether or not the JSON point falls inside the bounds of the RectangularNode
	 * @param   {JSON} Json with x and y emulating a point
	 * @returns {boolean} whether or not the point falls inside the 
	*/	
    contains(p) {
        if (this.bounds.contains(p)) {
            return true
        }
        return undefined
    }

	/**
	* Returns the Bounds of the RectangularNode
	* @returns {Rectangle2D} bounds the bounds of the RectangularNode
	*/
    getBounds() {
        return this.bounds;
    }

	/**
	* Sets the Bounds of the RectangularNode
	* @param {Rectangle2D} newBounds the new bounds of the RectangularNode
	*/
    setBounds(newBounds) // arguemnts is a rectangle
    {
        this.bounds = newBounds;
    }

	/**
	* Calculates the connection Point of the RectangularNode with the given direction
	* @param {Direction}d the direction the connection is coming from
	*/
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

/*
    writeObject(out) {

    }
    writeRectangularShape() {

    }
    readObject() {

    }
    readRectangularShape() {

    }
*/	
	/**
	* Gets the shape of the RectangleNode
	* @returns {Rectangle2D}bounds the boundary representing the shape of the RectangleNode
	*/
    getShape() {
        return this.bounds;
    }

}

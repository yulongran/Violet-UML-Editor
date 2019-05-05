/**
   A class that supplies convenience implementations for
   a number of methods in the Edge interface
*/
class AbstractEdge {
  constructor () {
    this.start
    this.end
  }
  clone () {
    /* try
      {
         return super.clone();
      }
      catch (CloneNotSupportedException exception)
      {
         return null;
      }
	  */
  }

  connect (s, e) {
    this.start = s
    this.end = e
  }

  getStart () {
    return this.start
  }

  getEnd () {
    return this.end
  }
  // returns bounds as a line
  getBounds () {
    let conn = this.getConnectionPoints()
    let r = conn
    return r
  }

  getConnectionPoint () {
	  let startBounds = this.start.getBounds()
    let endBounds = this.end.getBounds()
    let startCenter = new Point2D(startBounds.getCenterX(), startBounds.getCenterY())
    let endCenter = new Point2D(endBounds.getCenterX(), endBounds.getCenterY())
    let toEnd = new Direction(endCenter.getX() - startCenter.getX(), endCenter.getY() - startCenter.getY())
    let line = new Line2D(this.start.getConnectionPoint(toEnd), this.end.getConnectionPoint(toEnd.turn(180)))
    return line
  }
}

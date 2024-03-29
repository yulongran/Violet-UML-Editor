/** 
 *  @fileOverview AbstractEdge for the Graph Framework
 *
 *  @author       Jason Tang
 *  @requires     static/AbstractEdge.js
 */

/**
* The AbstractEdge class
* @class
*/
class AbstractEdge
{
	/**
	* Constructor for the AbstractEdge class
	* @constructor
	*
	* @property start the start of the edge
	* @property end the end of the edge
	*/
	constructor()
	{
		this. start;
		this.end;
	}
	
	/**
	* Creates a deep copy of the current edge and returns it
	* @return edge copy of current edge
	*/
	clone()
	{
		let edge=new AbstractEdge();
		edge.connect(this.start,this.end);
		return edge;
	}

	/**
	* Sets the start and end of the edge to the given AbstractNodes
	* @param   {AbstractNode} s the starting value
	* @param   {AbstractNode} e the ending value
	*/
	connect(s, e)
	{
		this.start = s;
		this.end = e;
	}

	/**
	* Returns the starting AbstractNode of the edge
	* @return   {AbstractNode} start the starting point of the edge
	*/
	getStart()
	{
		return this.start;
	}

	/**
	* Returns the ending AbstractNode of the edge
	* @return   {AbstractNode} end the ending AbstractNode of the edge
	*/
	getEnd()
	{
		return this.end;
	}
	
	/**
	* Returns the bounding line of the edge
	* @return   {Line2D} the line representing the edge
	*/
	getBounds()
	{
		let conn = this.getConnectionPoints();
		let r = conn;
		return r;
	}
   
   	/**
	* Calculates the bounding line of the edge from 
	* the ConnectoinPoints of the AbstractNodes
	* @return   {Line2D} the line representing the edge
	*/
   getConnectionPoint()
   {
	  let startBounds = this.start.getBounds();
      let endBounds = this.end.getBounds();
      let startCenter = new Point2D(startBounds.getCenterX(), startBounds.getCenterY());
      let endCenter = new Point2D(endBounds.getCenterX(), endBounds.getCenterY());
      let toEnd = new Direction(endCenter.getX()- startCenter.getX(), endCenter.getY()- startCenter.getY());
      let line =new Line2D(this.start.getConnectionPoint(toEnd),this.end.getConnectionPoint(toEnd.turn(180)));
      return line;
   }
}

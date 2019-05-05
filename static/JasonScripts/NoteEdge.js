
public NoteEdge extends SegmentedLineEdge
{
	constructor(){
		super();
		this.setLineStyle(LineStyle.DOTTED);
	}
	 getConnectionPoints()
   {
       start = getStart().getBounds();
       end = getEnd().getBounds();
       d = new Direction(end.getCenterX() - start.getCenterX(), end.getCenterY() - start.getCenterY());

      return new Line2D(getStart().getConnectionPoint(d), new Point2D(getEnd().getX(),getEnd().getY()));
   }

}

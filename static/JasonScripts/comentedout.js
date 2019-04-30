//commented out code


   /**
      Computes the attachment point for drawing a string.
      @param g2 the graphics context
      @param p an endpoint of the segment along which to
      draw the string
      @param q the other endpoint of the segment along which to
      draw the string
      @param b the bounds of the string to draw
      @param center true if the string should be centered
      along the segment
      @return the point at which to draw the string
   */
   //dimension d Ignore it I guess?
/*   private static Point2D getAttachmentPoint(Graphics2D g2, 
      Point2D p, Point2D q, ArrowHead arrow, Dimension d, boolean center)
   {    
      let GAP = 3;
      let xoff = GAP;
      let yoff = -GAP - d.getHeight();
      let attach = q;
      if (center)
      {
         if (p.getX() > q.getX()) 
         { 
            return getAttachmentPoint(g2, q, p, arrow, d, center); 
         }
         attach = new Point2D.Double((p.getX() + q.getX()) / 2, 
            (p.getY() + q.getY()) / 2);
         if (p.getY() < q.getY())
            yoff =  - GAP - d.getHeight();
         else if (p.getY() == q.getY())
            xoff = -d.getWidth() / 2;
         else
            yoff = GAP;
      }
      else 
      {
         if (p.getX() < q.getX())
         {
            xoff = -GAP - d.getWidth();
         }
         if (p.getY() > q.getY())
         {
            yoff = GAP;
         }
         if (arrow != null)
         {
            Rectangle2D arrowBounds = arrow.getPath(p, q).getBounds2D();
            if (p.getX() < q.getX())
            {
               xoff -= arrowBounds.getWidth();
            }
            else
            {
               xoff += arrowBounds.getWidth();
            }
         }
      }
      return new Point2D.Double(attach.getX() + xoff, attach.getY() + yoff);
   }
*/
   /**
      Computes the extent of a string that is drawn along a line segment.
      @param g2 the graphics context
      @param p an endpoint of the segment along which to
      draw the string
      @param q the other endpoint of the segment along which to
      draw the string
      @param s the string to draw
      @param center true if the string should be centered
      along the segment
      @return the rectangle enclosing the string
   */
   /*//ignore:
   private static Rectangle2D getStringBounds(Graphics2D g2, 
      Point2D p, Point2D q, ArrowHead arrow, String s, boolean center)
   {
      if (g2 == null) return new Rectangle2D.Double();
      if (s == null || s.equals("")) return new Rectangle2D.Double(q.getX(), q.getY(), 0, 0);
      label.setText("<html>" + s + "</html>");
      label.setFont(g2.getFont());
      Dimension d = label.getPreferredSize();
      Point2D a = getAttachmentPoint(g2, p, q, arrow, d, center);
      return new Rectangle2D.Double(a.getX(), a.getY(), d.getWidth(), d.getHeight());
   }
   */
/*OverWritten?
//fix this
   public Rectangle2D getBounds(Graphics2D g2)
   {
      ArrayList points = getPoints();
      Rectangle2D r = super.getBounds(g2);
      r.add(getStringBounds(g2, 
               (Point2D) points.get(1), (Point2D) points.get(0), 
               startArrowHead, startLabel, false));
      r.add(getStringBounds(g2, 
               (Point2D) points.get(points.size() / 2 - 1),
               (Point2D) points.get(points.size() / 2), 
               null, middleLabel, true));
      r.add(getStringBounds(g2, 
               (Point2D) points.get(points.size() - 2),
               (Point2D) points.get(points.size() - 1), 
               endArrowHead, endLabel, false));
      return r;
   }
   */
/*
//idk ignore
   public Shape getShape()
   {
      let path = getSegmentPath();
      ArrayList points = getPoints();
      path.append(startArrowHead.getPath((Point2D)points.get(1),
            (Point2D)points.get(0)), false);
      path.append(endArrowHead.getPath((Point2D)points.get(points.size() - 2),
            (Point2D)points.get(points.size() - 1)), false);
      return path;
   }


   private GeneralPath getSegmentPath()
   {
      ArrayList points = getPoints();
      
      GeneralPath path = new GeneralPath();
      Point2D p = (Point2D) points.get(points.size() - 1);
      path.moveTo((float) p.getX(), (float) p.getY());
      for (int i = points.size() - 2; i >= 0; i--)
      {
         p = (Point2D) points.get(i);
         path.lineTo((float) p.getX(), (float) p.getY());
      }
      return path;
   }
*/   
   /*getConnectionPoints()
   {
      let points = getPoints();
      return new Line2D( points[0],
          points[points.size() - 1]);
   }
   */
//getRectangle



/*
   contains(aPoint)
   {
      let MAX_DIST = 3;

      // the end points may contain small nodes, so don't
      // match them
      let conn = getConnectionPoints();
      if (aPoint.distance(conn.getP1()) <= MAX_DIST 
         || aPoint.distance(conn.getP2()) <= MAX_DIST)
         return false;
//idk

      let p = getShape();
      let fatStroke = new BasicStroke(
         (float)(2 * MAX_DIST));
      let fatPath = fatStroke.createStrokedShape(p);
      return fatPath.contains(aPoint);
  
}
*/ 
/*
class Direction
{

   //public static final Direction NORTH = new Direction(0, -1);
   //public static final Direction SOUTH = new Direction(0, 1);
   //public static final Direction EAST = new Direction(1, 0);
   //public static final Direction WEST = new Direction(-1, 0);


   /**
      Constructs a direction between two points
      @param p the starting point
      @param q the ending point
   
   constructor(p,q)
   {
	   let x;
	   let y;
	   if(p instanceof Point2D &&q instanceof Point2D){
		x=q.getX() - p.getX();
		y=q.getY() - p.getY();
	   }
	   else{
		   x=p;
		   y=q;
	   }
	let length = Math.sqrt(x * x + y * y);
      if (length !== 0) 
      x = x / length;
      y = y / length; 
   }

   /**
      Turns this direction by an angle.
      @param angle the angle in degrees
   
   turn(angle)
   {
      let a = Math.toRadians(angle);
      return new Direction(
         x * Math.cos(a) - y * Math.sin(a),
         x * Math.sin(a) + y * Math.cos(a));
   }

   /**
      Gets the x-component of this direction
      @return the x-component (between -1 and 1)
   
   getX()
   {
      return x;
   }

   /**
      Gets the y-component of this direction
      @return the y-component (between -1 and 1)
   
   getY()
   {
      return y;
   }
}
*/




draw methods


/*if(this.getStartArrowHead()=="V"){
			
			if(direction.getX()==1){			
					const c=document.getElementById("myCanvas");
					const ctx = c.getContext("2d");
                    ctx.beginPath();
					ctx.setLineDash([]);
					ctx.moveTo(p1.getX(),p1.getY());
					ctx.lineTo(p1.getX()+10,p1.getY()+10);
					ctx.moveTo(p1.getX(),p1.getY());
					ctx.lineTo(p1.getX()+10,p1.getY()-10);
					ctx.stroke();
				}
				else{
					const c=document.getElementById("myCanvas");
					const ctx = c.getContext("2d");
                    ctx.beginPath();
					ctx.setLineDash([]);
					ctx.moveTo(p1.getX(),p1.getY());
					ctx.lineTo(p1.getX()-10,p1.getY()+10);
					ctx.moveTo(p1.getX(),p1.getY());
					ctx.lineTo(p1.getX()-10,p1.getY()-10);
					ctx.stroke();					
				}
		}		
		if(this.getEndArrowHead()=="V"){
					if(direction.getX()==-1){			
					const c=document.getElementById("myCanvas");
					const ctx = c.getContext("2d");
                    ctx.beginPath();
					ctx.setLineDash([]);
					ctx.moveTo(p2.getX(),p2.getY());
					ctx.lineTo(p2.getX()+10,p2.getY()+10);
					ctx.moveTo(p2.getX(),p2.getY());
					ctx.lineTo(p2.getX()+10,p2.getY()-10);
					ctx.stroke();
				}
				else{
					const c=document.getElementById("myCanvas");
					const ctx = c.getContext("2d");
                    ctx.beginPath();
					ctx.setLineDash([]);
					ctx.moveTo(p2.getX(),p2.getY());
					ctx.lineTo(p2.getX()-10,p2.getY()+10);
					ctx.moveTo(p2.getX(),p2.getY());
					ctx.lineTo(p2.getX()-10,p2.getY()-10);
					ctx.stroke();					
				}
		}
		if(this.getStartArrowHead()=="triangle"){
				if(direction.getX()==1){			
					const c=document.getElementById("myCanvas");
					const ctx = c.getContext("2d");
                    ctx.beginPath();
					ctx.setLineDash([]);
					ctx.moveTo(p1.getX(),p1.getY());
					ctx.lineTo(p1.getX()+10,p1.getY()+10);
					ctx.moveTo(p1.getX(),p1.getY());
					ctx.lineTo(p1.getX()+10,p1.getY()-10);
					ctx.lineTo(p1.getX()+10,p1.getY()+10);
					ctx.stroke();
				}
				else{
					const c=document.getElementById("myCanvas");
					const ctx = c.getContext("2d");
					ctx.beginPath();
					ctx.moveTo(p1.getX(),p1.getY());
					ctx.lineTo(p1.getX()-10,p1.getY()+10);
					ctx.moveTo(p1.getX(),p1.getY());
					ctx.lineTo(p1.getX()-10,p1.getY()-10);
					ctx.lineTo(p1.getX()-10,p1.getY()+10);
					ctx.stroke();					
				}
		}
		if(this.getEndArrowHead()=="triangle"){
				if(direction.getX()==-1){			
					const c=document.getElementById("myCanvas");
					const ctx = c.getContext("2d");
                    ctx.beginPath();
					ctx.setLineDash([]);
					ctx.moveTo(p2.getX(),p2.getY());
					ctx.lineTo(p2.getX()+10,p2.getY()+10);
					ctx.moveTo(p2.getX(),p2.getY());
					ctx.lineTo(p2.getX()+10,p2.getY()-10);
					ctx.lineTo(p2.getX()+10,p2.getY()+10);
					ctx.stroke();
				}
				else{
					const c=document.getElementById("myCanvas");
					const ctx = c.getContext("2d");
					ctx.beginPath();
					ctx.moveTo(p2.getX(),p2.getY());
					ctx.lineTo(p2.getX()-10,p2.getY()+10);
					ctx.moveTo(p2.getX(),p2.getY());
					ctx.lineTo(p2.getX()-10,p2.getY()-10);
					ctx.lineTo(p2.getX()-10,p2.getY()+10);
					ctx.stroke();					
				}
		}
		if(this.getStartArrowHead()=="diamond"||this.getStartArrowHead()=="blackdiamond"){
					const c=document.getElementById("myCanvas");
					const ctx = c.getContext("2d");
					
					if(direction.getX()==1){
					
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(p1.getX(),p1.getY());
					ctx.lineTo(p1.getX()+10,p1.getY()+10);
					ctx.moveTo(p1.getX(),p1.getY());
					ctx.lineTo(p1.getX()+10,p1.getY()-10);
					ctx.lineTo(p1.getX()+20,p1.getY());
					ctx.lineTo(p1.getX()+10,p1.getY()+10);
					}
					else{
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(p1.getX(),p1.getY());
					ctx.lineTo(p1.getX()-10,p1.getY()+10);
					ctx.moveTo(p1.getX(),p1.getY());
					ctx.lineTo(p1.getX()-10,p1.getY()-10);
					ctx.lineTo(p1.getX()-20,p1.getY());
					ctx.lineTo(p1.getX()-10,p1.getY()+10);	
					}
					if(this.getStartArrowHead()=="diamond"){
						ctx.fillStyle="white";
					}
						ctx.fill();
						ctx.fillStyle="black";
						ctx.stroke();
		}
		if(this.getEndArrowHead()=="diamond"||this.getEndArrowHead()=="blackdiamond"){
					const c=document.getElementById("myCanvas");
					const ctx = c.getContext("2d");
					if(direction.getX()==-1){
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(p2.getX(),p2.getY());
					ctx.lineTo(p2.getX()+10,p2.getY()+10);
					ctx.moveTo(p2.getX(),p2.getY());
					ctx.lineTo(p2.getX()+10,p2.getY()-10);
					ctx.lineTo(p2.getX()+20,p2.getY());
					ctx.lineTo(p2.getX()+10,p2.getY()+10);
					}
					else{
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(p2.getX(),p2.getY());
					ctx.lineTo(p2.getX()-10,p2.getY()+10);
					ctx.moveTo(p2.getX(),p2.getY());
					ctx.lineTo(p2.getX()-10,p2.getY()-10);
					ctx.lineTo(p2.getX()-20,p2.getY());
					ctx.lineTo(p2.getX()-10,p2.getY()+10);	
					}
					if(this.getEndArrowHead()=="diamond"){
						ctx.fillStyle="white";
					}
						ctx.fill();
						ctx.fillStyle="black";
						ctx.stroke();
		}
		else{}
		
		*/



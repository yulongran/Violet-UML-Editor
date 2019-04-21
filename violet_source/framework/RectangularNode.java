/*
Violet - A program for editing UML diagrams.

Copyright (C) 2002 Cay S. Horstmann (http://horstmann.com)

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/

package com.horstmann.violet.framework;

import java.awt.Graphics2D;
import java.awt.Shape;
import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;
import java.awt.geom.RectangularShape;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;


/**
   A node that has a rectangular shape.
*/
public abstract class RectangularNode extends AbstractNode
{
   public Object clone()
   {
      RectangularNode cloned = (RectangularNode)super.clone();
      cloned.Rectangle2D = (Rectangle2D)Rectangle2D.clone();
      return cloned;
   }

   public void translate(double dx, double dy)
   {
      Rectangle2D.setFrame(Rectangle2D.getX() + dx,
         Rectangle2D.getY() + dy, 
         Rectangle2D.getWidth(), 
         Rectangle2D.getHeight());
      super.translate(dx, dy);
   }

   public boolean contains(Point2D p)
   {
      return Rectangle2D.contains(p);
   }

   public Rectangle2D getRectangle2D()
   {
      return (Rectangle2D)Rectangle2D.clone();
   }

   public void setRectangle2D(Rectangle2D newRectangle2D)
   {
      Rectangle2D = newRectangle2D;
   }

   public void layout(Graph g, Graphics2D g2, Grid grid)
   {
      grid.snap(Rectangle2D);
   }

   public Point2D getConnectionPoint(Direction d)
   {
      double slope = Rectangle2D.getHeight() / Rectangle2D.getWidth();
      double ex = d.getX();
      double ey = d.getY();
      double x = Rectangle2D.getCenterX();
      double y = Rectangle2D.getCenterY();
      
      if (ex != 0 && -slope <= ey / ex && ey / ex <= slope)
      {  
         // intersects at left or right boundary
         if (ex > 0) 
         {
            x = Rectangle2D.getMaxX();
            y += (Rectangle2D.getWidth() / 2) * ey / ex;
         }
         else
         {
            x = Rectangle2D.getX();
            y -= (Rectangle2D.getWidth() / 2) * ey / ex;
         }
      }
      else if (ey != 0)
      {  
         // intersects at top or bottom
         if (ey > 0) 
         {
            x += (Rectangle2D.getHeight() / 2) * ex / ey;
            y = Rectangle2D.getMaxY();
         }
         else
         {
            x -= (Rectangle2D.getHeight() / 2) * ex / ey;
            y = Rectangle2D.getY();
         }
      }
      return new Point2D.Double(x, y);
   }

   private void writeObject(ObjectOutputStream out)
      throws IOException
   {
      out.defaultWriteObject();
      writeRectangularShape(out, Rectangle2D);
   }

   /**
      A helper method to overcome the problem that the 2D shapes
      aren't serializable. It writes x, y, width and height
      to the stream.
      @param out the stream
      @param s the shape      
   */
   private static void writeRectangularShape(
      ObjectOutputStream out, 
      RectangularShape s)
      throws IOException
   {
      out.writeDouble(s.getX());
      out.writeDouble(s.getY());
      out.writeDouble(s.getWidth());
      out.writeDouble(s.getHeight());
   }

   private void readObject(ObjectInputStream in)
      throws IOException, ClassNotFoundException
   {
      in.defaultReadObject();
      Rectangle2D = new Rectangle2D.Double();
      readRectangularShape(in, Rectangle2D);
   }
   
   /**
      A helper method to overcome the problem that the 2D shapes
      aren't serializable. It reads x, y, width and height
      from the stream.
      @param in the stream
      @param s the shape whose frame is set from the stream values
   */
   private static void readRectangularShape(ObjectInputStream in,
      RectangularShape s)
      throws IOException
   {
      double x = in.readDouble();
      double y = in.readDouble();
      double width = in.readDouble();
      double height = in.readDouble();
      s.setFrame(x, y, width, height);
   }

   public Shape getShape()
   {
      return Rectangle2D;
   }
   
   private transient Rectangle2D Rectangle2D;
}

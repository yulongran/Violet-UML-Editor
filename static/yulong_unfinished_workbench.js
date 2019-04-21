class AbstractNode
{
  constructor()
  {
    this.children = [];
    parent = undefined;
    this.SHADOW_GAP=4;
    this.SHADOW_COLOR='gray';
  }

  translate(dx, dy)
  {
    for(let i=0; i<children.length; i++)
    {
       let n = children[i];
       n.translate(dx,dy);
    }
  }

  addEdge(e, p1, p2)
  {
    return e.getEnd() !=undefined;
  }

  removeEdge(g, e)
  {

  }

  removeNode(g, e)
  {
    if(e === parent)
    {
      parent = undefined;
    }
    if(e.getParenet() === this)
    {
      for(let i=0; i< children.length ; i++)
      {
        if(children[i] === e)
        {
          children.splice(i, e);
        }
      }
    }
  }

  addNode(n, p)
  {
    return false;
  }

  getParent()
  {
    return parent;
  }

  setParent(n)
  {
    parent=n;
  }

  getChildren()
  {
    return children;
  }

  addChild(index , node)
  {
      let oldParent = node.getParent();
      if(oldParent === undefined)
      {
        oldParent.removeChild(node);
      }
      children.add(index, node);
      node.setParent(this);
  }

  addChild(node)
  {
    addChild(children.length, node);
  }

  removeChild(node)
  {
    if(node.getParent() !==this)
    {
      return;
    }
    for(let i=0; i< children.length ; i++)
    {
      if(children[i] === e)
      {
        children.splice(i, e);
      }
    }
    node.setParent(undefined);
  }

  getShape()
  {
    return undefined;
  }

  setPersistenceDelegate(encode)
  {

  }
}



class RectangularNode extends AbstractNode
{
  constructor()
  {
    this.Rectangle2D = new Rectangle2D(0,0,0,0);
  }
  clone()
  {

  }

  translate(dx, dy)
  {
    super.translate(dx,dy);
  }

  contains(p)
  {
    if (p.x > this.Rectangle2D.x && p.x < this.Rectangle2D.x + this.Rectangle2D.width && p.y > this.Rectangle2D.y && p.y < this.y + this.Rectangle2D.height) {
        return true
      }
      return undefined
  }

  getRectangle2D()
  {
    return Rectangle2D;
  }

  setRectangle2D(newRectangle2D) // arguemnts is a rectangle
  {
     Rectangle2D=newRectangle2D;
  }

  getConnectionPoint(d)
   {
      let slope = Rectangle2D.getHeight() / Rectangle2D.getWidth();
      let ex = d.getX();
      let ey = d.getY();
      let x = Rectangle2D.getCenterX();
      let y = Rectangle2D.getCenterY();

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
      return new point(x,y);
   }

   writeObject(out)
   {

   }
   writeRectangularShape()
   {

   }
   readObject()
   {

   }
   readRectangularShape()
   {

   }
   getShape()
   {
     return this.Rectangle2D;
   }

}

class point
{
  constructor(x, y)
  {
    this.x=x;
    this.y=y;
  }
}

class Rectangle2D
{
  constructor(x,y,height, width)
  {
    this.x=x;
    this.y=y;
    this.height=height;
    this.width=width;

    getX()
    {
      return this.x;
    }
    getY()
    {
      return this.y;
    }

    getHeight()
    {
      return this.height;
    }

    getWidth()
    {
      return this.width;
    }
    getCenterX()
    {
      return this.x+this.width/2;
    }
    getCenterY()
    {
      return this.y+this.width/2;
    }
    getMaxX()
    {
      return this.x+this.width;
    }
    getMaxY()
    {
      return this.y+this.height;
    }
  }
  draw()
  {
    // Top Horizontal line of the rectangle
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(this.x+this.DEFAULT_WIDTH,this.y);
    ctx.stroke();

    // Left vertical
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(this.x,this.y+this.DEFAULT_HEIGHT);
    ctx.stroke();

    // Right vertical
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(this.x+this.DEFAULT_WIDTH,this.y);
    ctx.lineTo(this.x+this.DEFAULT_WIDTH,this.y+this.DEFAULT_HEIGHT);
    ctx.stroke();

    // Bottom Horizontal
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(this.x,this.y+this.DEFAULT_HEIGHT);
    ctx.lineTo(this.x+this.DEFAULT_WIDTH,this.y+this.DEFAULT_HEIGHT);
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
    ctx.moveTo(this.x+this.DEFAULT_WIDTH/2,this.DEFAULT_HEIGHT);
    ctx.lineTo(this.x+this.DEFAULT_WIDTH/2, this.DEFAULT_HEIGHT+ 50);
    ctx.stroke();
  }
}

class ImplicitParameterNode extends RectangularNode
{
  constructor(x,y)
  {
    this.x=x;
    this.y=y;
    this.name; // MultiLineString
    this.topHeight=DEFAULT_HEIGHT;
    this.DEFAULT_TOP_HEIGHT = 60;
    this.DEFAULT_WIDTH = 80;
    this.DEFAULT_HEIGHT = 120;
    setRectangle2D(new Rectangle2D(x,y, DEFAULT_WIDTH, DEFAULT_HEIGHT));
  }

  contains(p)
  {
      let Rectangle2D =getRectangle2D();
      return Rectangle2D.getX() <= p.getX() &&
         p.getX() <= Rectangle2D.getX() + Rectangle2D.getWidth();
  }

  draw()
  {
      let top = getTopRectangle();
      draw(top);
  }

  getTopRectangle()
  {
    return new Rectangle2D(getRectangle2D().getX(),
         getRectangle2D().getY(), getRectangle2D().getWidth(), this.topHeight);
  }

  getShape()
  {
    return getTopRectangle();
  }

  addEdge(e, p1, p2)
  {
    return false;
  }
}

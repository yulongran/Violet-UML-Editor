
const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

// Since we are changing the canvas size in csss, our drawing looks blurry
// Fixing the canvas pixel by resize
canvas.width = canvas.clientWidth
canvas.height = canvas.clientHeight

// Keep track if the callNode button in the tool is pressed
var callNode_button = false
var implicitParameterNode_button=false;

document.addEventListener('DOMContentLoaded', function () {
  const graph = new Graph()
  let selected
  let dragStartPoint
  graph.draw()

  function repaint () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    graph.draw()
    if (selected !== undefined) {
      const bounds = selected.getBounds()
      drawGrabber(bounds.x, bounds.y)
      drawGrabber(bounds.x + bounds.width, bounds.y)
      drawGrabber(bounds.x, bounds.y + bounds.height)
      drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
    }
  }

  function mouseLocation (event) {
    var rect = canvas.getBoundingClientRect()
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  }

  canvas.addEventListener('mousedown', event => {
    let mousePoint = mouseLocation(event)
    selected = graph.findNode(mousePoint)

    // If the callNode button is pressed in the toolbar
    if (implicitParameterNode_button === true && selected === undefined) {
      let n1 = new ImplicitParameterNode()
      graph.add(n1,  mousePoint);
    }

    // If we unselected, the callNode button get reset
    if (selected !== undefined) {
      dragStartPoint = mousePoint
       = selected.getBounds()
      callNode = false
    }
    repaint()
  })

  canvas.addEventListener('mousemove', event => {
    if (dragStartPoint === undefined) return
    let mousePoint = mouseLocation(event)
    if (selected !== undefined) {
    const bounds = selected.getBounds()


    selected.translate(
        dragStartPoint.x - bounds.x +
        mousePoint.x - dragStartPoint.x,
        dragStartPoint.y - bounds.y +
        mousePoint.y - dragStartPoint.y)
    }
    repaint()
  })

  canvas.addEventListener('mouseup', event => {
    dragStartPoint = undefined
     = undefined
  })
})

//******************************************************************************
//*******************************Framework**************************************
//******************************************************************************


class Graph {
  constructor () {
    this.nodes = []
    this.edges = []
  }
  add (n1, p) {
    this.nodes.push(n1)
    console.log(p.x-n1.x);
    n1.translate(p.x - n1.x,
 p.y - n1.y);

  }
  findNode (p) {
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      const n = this.nodes[i]
      if (n.contains(p)) {
        return n
      }
    }
    return undefined
  }
  draw () {
    for (const n of this.nodes) {
      n.draw()
    }
  }
  connect (e, p1,
    p2) {
    const n1 = this.findNode(p1)
    const n2 = this.findNode(p2)
    if (n1 !== undefined && n2 !== undefined) {
      e.connect(n1, n2)
      this.edges.push(e)
      return true
    }
    return false
  }
}

function drawGrabber (x, y) {
  const size = 6
  ctx.fillRect(x - size / 2, y - size / 2, size, size)
  ctx.fillStyle = 'red'
}

function center (rect) {
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
}


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
    for(let i=0; i<this.children.length; i++)
    {
       let n = this.children[i];
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
    super();
    this.bounds = new Rectangle2D(0,0,0,0);
  }
  clone()
  {

  }

  translate(dx, dy)
  {
    this.bounds.setX(this.bounds.getX()+dx);
    this.bounds.setY(this.bounds.getY()+dy);
    this.bounds.setHeight(this.bounds.getHeight());
    this.bounds.setWidth(this.bounds.getWidth());
    super.translate(dx,dy);
  }

  contains(p)
  {
    if (p.x > this.bounds.x && p.x < this.bounds.x + this.bounds.width && p.y > this.bounds.y && p.y < this.y + this.bounds.height) {
        return true
      }
      return undefined
  }

  getBounds()
  {
    //console.log("My rect width is " + this..getWidth())
    return this.bounds;
  }

  setBounds(newBounds) // arguemnts is a rectangle
  {
     this.bounds=newBounds;
  }

  getConnectionPoint(d)
   {
      let slope = this.bounds.getHeight() / this.bounds.getWidth();
      let ex = d.getX();
      let ey = d.getY();
      let x = this.bounds.getCenterX();
      let y = this.bounds.getCenterY();

      if (ex != 0 && -slope <= ey / ex && ey / ex <= slope)
      {
         // intersects at left or right boundary
         if (ex > 0)
         {
            x = this.bounds.getMaxX();
            y += (this.bounds.getWidth() / 2) * ey / ex;
         }
         else
         {
            x = this.bounds.getX();
            y -= (this.bounds.getWidth() / 2) * ey / ex;
         }
      }
      else if (ey != 0)
      {
         // intersects at top or bottom
         if (ey > 0)
         {
            x += (this.bounds.getHeight() / 2) * ex / ey;
            y = this.bounds.getMaxY();
         }
         else
         {
            x -= (this.bounds.getHeight() / 2) * ex / ey;
            y = this.bounds.getY();
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
     return this.bounds;
   }

}

//******************************************************************************
//*******************************UtilityClass**************************************
//******************************************************************************

/**
 A point object similar to Point2D in java
*/
class Point2D
{
  constructor(x, y)
  {
    this.x=x;
    this.y=y;
  }
}

/**
 A rectangle object similar Rectangle2D in java
*/
class Rectangle2D
{
  constructor(x,y, width, height)
  {
    this.x=x;
    this.y=y;
    this.height=height;
    this.width=width;
  }

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

    setX(x)
    {
      this.x=x;
    }
    setY(y)
    {
      this.y=y;
    }
    setHeight(h)
    {
      this.height=h;
    }
    setWidth(w)
    {
      this.width=w;
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

  draw()
  {
    // Top Horizontal line of the rectangle
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(this.x+this.width,this.y);
    ctx.stroke();

    // Left vertical
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(this.x,this.y+this.height);
    ctx.stroke();

    // Right vertical
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(this.x+this.width,this.y);
    ctx.lineTo(this.x+this.width,this.y+this.height);
    ctx.stroke();

    // Bottom Horizontal
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(this.x,this.y+this.height);
    ctx.lineTo(this.x+this.width,this.y+this.height);
    ctx.stroke();

  }
}

class ImplicitParameterNode extends RectangularNode
{
  constructor()
  {
    super();
    this.x=0;
    this.y=0;
    this.name; // MultiLineString
    this.DEFAULT_WIDTH = 80;
    this.DEFAULT_HEIGHT = 120;
    this.DEFAULT_TOP_HEIGHT = 60;
    super.setBounds(new Rectangle2D(0,0, this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT));
    this.topHeight=this.DEFAULT_TOP_HEIGHT;
  }

  contains(p)
  {
      let bounds = super.getBounds();
      return bounds.getX() <= p.x &&
         p.x <= bounds.getX() + bounds.getWidth();
  }

  draw()
  {
      let top = this.getTopRectangle();
      top.draw();
      let xmid=super.getBounds().getCenterX();
      ctx.beginPath();
      ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
      ctx.moveTo(xmid, top.getMaxY());
      ctx.lineTo(xmid, super.getBounds().getMaxY());
      ctx.stroke()

  }

  getTopRectangle()
  {
    //console.log(super.getBounds().getWidth());
    let tRectangle= new Rectangle2D(super.getBounds().getX(),super.getBounds().getY(), super.getBounds().getWidth(), this.topHeight);
    return tRectangle;
  }

  getShape()
  {
    return getTopRectangle();
  }

  addEdge(e, p1, p2)
  {
    return false;
  }

  getConnectionPoint(d)
  {
    if(d.get()>0)
    {
      return new point(super.getBounds().getMaxX(), super.getBounds().getMinY()+topHeight/2);
    }
    else {
      return new point(super.getBounds().getX(), super.getBounds().getMinY()+topHeight/2)
    }
  }

  layout(g, g2, grid)
  {

  }

  setName(n)
  {
    name=n;
  }

  getName()
  {
    return name;
  }

  clone()
  {

  }

  addNode(n, p)
  {
    return typeof n === CallNode || typeof n === PointNode;
  }

  translate(dx, dy)
  {
    //console.log(dx);
    //console.log(this.bounds.getX());
    this.bounds.setX(this.bounds.getX()+dx);
    this.bounds.setY(0);
    this.bounds.setHeight(this.bounds.getHeight());
    this.bounds.setWidth(this.bounds.getWidth());
    //super.translate(dx,dy);
  }

}

// May change the function to class
class CallNode {
  constructor(x, y)
  {
    this.x=x
    this.y=y
    this.openBootom = true
    this.signaled
    this.DEFAULT_WIDTH = 75
    this.DEFAULT_HEIGHT = 60
    this.CALL_YGAP = 20

  }
  getBounds()
  {
      return {
        x: this.x,
        y: this.y,
        width: this.DEFAULT_WIDTH,
        height: this.DEFAULT_HEIGHT
      }
  }
  contains(p)
  {
    if (p.x > this.x && p.x < this.x + this.DEFAULT_WIDTH && p.y > this.y && p.y < this.y + this.DEFAULT_HEIGHT) {
        return true
      }
      return undefined
    }

  translate (dx, dy)
  {
      this.x += dx
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

// Action listener for jquery
$('#callNode').on('click', function () {
  implicitParameterNode_button = true
})

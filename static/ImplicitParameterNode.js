/**
* An object node in a SequenceDiagram
*/
class ImplicitParameterNode extends RectangularNode {
  /**
  * Construct a ImplicitParameterNode
  */
  constructor () {
    super()
    this.name = '' // MultiLineString
    this.DEFAULT_WIDTH = 80
    this.DEFAULT_HEIGHT = 120
    this.DEFAULT_TOP_HEIGHT = 60
    this.children = []
    super.setBounds(new Rectangle2D(0, 0, this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT))
    this.topHeight = this.DEFAULT_TOP_HEIGHT
  }

  /**
  * Determine whether the node contains a points
  * @param {Point2D} p A point
  * @return {boolean} true if the node contains the point ; false if the node does not contains the point
  */
  contains (p) {
    let bounds = super.getBounds()
    return bounds.getX() <= p.x &&
            p.x <= bounds.getX() + bounds.getWidth()
  }

  /**
  * Draws the ImplicitParameterNode on canvas
  * @param {Canvas} newCtx A reference to the canvas
  */
  draw (newCtx = undefined) {
    var curr_ctx = (newCtx !== undefined) ? newCtx : ctx
    let top = this.getTopRectangle()
    let textWidth = ctx.measureText(this.name).width
    if (textWidth + 10 > top.width) {
      super.getBounds().width = textWidth + 15
      top = this.getTopRectangle()
    }
    top.draw(curr_ctx)
    let xmid = super.getBounds().getCenterX()
    curr_ctx.beginPath()
    curr_ctx.setLineDash([5, 3])/* dashes are 5px and spaces are 3px */
    curr_ctx.moveTo(xmid, top.getMaxY())
    curr_ctx.lineTo(xmid, super.getBounds().getMaxY())
    curr_ctx.stroke()
    curr_ctx.fillStyle = 'black'
    curr_ctx.font = '12px Arial'
    curr_ctx.fillText(this.name, top.x + 10, top.y + 30)
  }

  /**
  * Draws the ImplicitParameterNode on tool
  * @param {Canvas} ctx A reference to the canvas
  */
  drawToolBar (ctx) {
    super.getBounds().width = TOOLBAR_WIDTH
    let top = this.getTopRectangle()
    top.drawToolBar(ctx)
    let xmid = super.getBounds().getCenterX()
    ctx.beginPath()
    ctx.setLineDash([20, 12])/* dashes are 5px and spaces are 3px */
    ctx.moveTo(xmid, top.getMaxY())
    ctx.strokeStyle = '#FFFFFF'
    ctx.lineTo(xmid, TOOLBAR_HEIGHT)
    ctx.stroke()
  }

  /**
  * Gets the top rectangle of the ImplicitParameterNode
  * @return {Rectangle2D} tRectangle the top rectangle of the ImplicitParameterNode
  */
  getTopRectangle () {
    let tRectangle = new Rectangle2D(super.getBounds().getX(), super.getBounds().getY(), super.getBounds().getWidth(), this.topHeight)
    return tRectangle
  }

  /**
  * Gets the shape of the ImplicitParameterNode
  * @return {Rectangle2D} the top rectangle of the ImplicitParameterNode
  */
  getShape () {
    return getTopRectangle()
  }

  /**
  * Add an edge to the ImplicitParameterNode
  * @param  {Edge}  e - The edge add to the ImplicitParameterNode
  * @param  {Point2D} p1 - The point that edge going to connect
  * @param  {Point2D} p2 - The point that edge going to connect
  * @return {boolean} false
  */
  addEdge (e, p1, p2) {
    return false
  }

  /**
  * Gets the getConnectionPoint of the ImplicitParameterNode
  * @param  {Point2D} d - The direction that edge going to connect
  * @return {Point2D} the connection point
  */
  getConnectionPoint (d) {
    if (d.getX() > 0) {
      return new Point2D(super.getBounds().getMaxX(), super.getBounds().getMinY() + this.topHeight / 2)
    } else {
      return new Point2D(super.getBounds().getX(), super.getBounds().getMinY() + this.topHeight / 2)
    }
  }

  layout (g) {
    // let b= name.getBounds(g2);
    // b.add(new Rectangle2D(0,0, this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT));
    // let top = new Rectangle2D(super.getBounds().getX(), super.getBounds().getY(), b.getWidth(), b.getHeight());
    // grid.snap(top);
    // super.setBounds(new Rectangle2D(top.getX(), top.getY(), top.getWidth(), super.getBounds().getHeight()));
    // topHeight=top.getHeight();
  }

  /**
  * Sets the name of the ImplicitParameterNode
  * @param {String}  n - The name of the ImplicitParameterNode
  */
  setName (n) {
    this.name = n
  }

  /**
  * Gets the name of the ImplicitParameterNode
  * @return {String} name - The name of the ImplicitParameterNode
  */
  getName () {
    return name
  }

  /**
  * Gets the children of the ImplicitParameterNode
  * @param  {Array}  children - A list of children of the ImplicitParameterNode
  */
  getChildren () {
    return this.children
  }

  /**
  * Clone a ImplicitParameterNode
  * @return {ImplicitParameterNode} cloned - A clone copy of the ImplicitParameterNode
  */
  clone () {
    let myImplicitParameterNode = new ImplicitParameterNode()
    let cloned = {}
    Object.assign(cloned, myImplicitParameterNode)
    return cloned
  }

  /**
  * Add a node as the child of ImplicitParameterNode
  * @param  {Node} n - A node to be add as child
  * @param  {Point2D}  p - The point of the child nodes
  * @return {boolean} true if n is a CallNode
  */
  addNode (n, p) {
    this.children.push(n)
    return n instanceof CallNode // || typeof n === PointNode;
  }

  /**
  * Gets the property of the ImplicitParameterNode
  * @return {Object} - Object contains the propery of ImplicitParameterNode, editor type and setter method for the propery
  */
  getProperty () {
    let copyName = this.name
    var myNode = this
    return {
      Name: {
        name: copyName,
        inputBox: [copyName],
        setName (n) {
          myNode.setName(n)
        } }
    }
  }
}

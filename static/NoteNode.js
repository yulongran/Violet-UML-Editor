/**
 *  @fileOverview Note Node for the SequenceDiagram
 *
 *  @author       YuJie Hong
 */
/**
* A note node in a Sequence Diagram
*/
class NoteNode extends RectangularNode {
  /**
  * Construct a ImplicitParameterNode
  */
  constructor () {
    super()
    this.DEFAULT_WIDTH = 60
    this.DEFAULT_HEIGHT = 40
    this.color = 'yellow'
    this.text = ''
    this.setBounds(new Rectangle2D(0, 0, this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT))
        // text.setJustification(MultiLineString.LEFT);
  }

  /**
  * Add an edge to the note node
  * @param  {Edge}  e - The edge add to the NoteNode
  * @param  {Point2D} p1 - The point that edge going to connect
  * @param  {Point2D} p2 - The point that edge going to connect
  * @return {boolean} true- if the end node of the edge is undefined
  */
  addEdge (e, p1, p2) // edge, Point2D, Point2D
    {
    const end = new PointNode()
    end.translate(p2.getX(), p2.getY())
    e.connect(this, end)
    return super.addEdge(e, p1, p2)
  }

  /**
  * Remove an edge from the graph
  * @param  {Graph} g - The graph contains the NoteNode
  * @param  {Edge}  e - The edge to be remmoved
  */
  removeEdge (g, e) // graph, edge
    {
    if (e.getStart() == this) { g.removeNode(e.getEnd()) }
  }

  /**
  * Adjust the layout of the note node
  * @param  {Graph}  g - The graph that contains the note Node
  */
  layout () {
    let b = ctx.measureText(this.text)
    let bw = ctx.measureText(this.text).width
    let bh = 12 // parseInt(ctx.font);
    let bounds = super.getBounds()
    b = new Rectangle2D(bounds.getX(), bounds.getY(),
            Math.max(bw, this.DEFAULT_WIDTH), Math.max(bh, this.DEFAULT_HEIGHT))
    super.setBounds(b)
  }

  /**
  Gets the value of the text property.
  @return {String} the text inside the note
	*/
  getText () {
    return this.text
  }

  /**
  Sets the value of the text property.
  @param {String} newValue the text inside the note
  */
  setText (newValue) {
    this.text = newValue
  }

  /**
  Gets the value of the color property.
  @return {Color} the background color of the note
  */
  getColor () {
    return this.color
  }

  /**
  Sets the value of the color property.
  @param newValue the background color of the note
  */
  setColor (newValue) {
    this.color = newValue
  }

  /**
  * Draws the note node on canvas
  */
  draw () {
    let ctx = canvas.getContext('2d')
    ctx.fillStyle = this.color
    ctx.fillRect(super.getBounds().getX(), super.getBounds().getY(),
            this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT)
    ctx.strokeRect(super.getBounds().getX(), super.getBounds().getY(),
            this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT)
    ctx.beginPath() // fold
    ctx.clearRect(super.getBounds().getX() + this.DEFAULT_WIDTH * 3 / 4,
            super.getBounds().getY() - 1, this.DEFAULT_WIDTH / 4 + 1, this.DEFAULT_HEIGHT / 4)
    ctx.moveTo(super.getBounds().getX() + this.DEFAULT_WIDTH * 3 / 4,
            super.getBounds().getY())
    ctx.lineTo(super.getBounds().getX() + this.DEFAULT_WIDTH,
            super.getBounds().getY() + this.DEFAULT_HEIGHT / 4)
    ctx.lineTo(super.getBounds().getX() + this.DEFAULT_WIDTH * 3 / 4,
            super.getBounds().getY() + this.DEFAULT_HEIGHT / 4)
    ctx.closePath()

    let textWidth = ctx.measureText(this.text).width // text
    if (textWidth + 10 > this.DEFAULT_WIDTH) {
      super.getBounds().width = textWidth + 25
      this.DEFAULT_WIDTH += 25
    }
    ctx.fillStyle = 'black'
    ctx.font = '12pt Arial'
    ctx.fillText(this.text, super.getBounds().getX() + 10, super.getBounds().getY() + 25)
    ctx.stroke()
  }

  /**
  * Draws the note node on the tool bar
  * @param {Canvas} ctx A reference to the canvas
  */
  drawToolBar (ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(super.getBounds().getX(), super.getBounds().getY(),
            TOOLBAR_WIDTH, TOOLBAR_HEIGHT / 4)
    ctx.strokeRect(super.getBounds().getX(), super.getBounds().getY(),
            TOOLBAR_WIDTH, TOOLBAR_HEIGHT / 4)
    ctx.beginPath() // fold
    ctx.clearRect(super.getBounds().getX() + TOOLBAR_WIDTH * 3 / 4,
            super.getBounds().getY(), TOOLBAR_WIDTH / 4, TOOLBAR_HEIGHT / 12)
    ctx.moveTo(super.getBounds().getX() + TOOLBAR_WIDTH * 3 / 4,
            super.getBounds().getY())
    ctx.lineTo(super.getBounds().getX() + TOOLBAR_WIDTH,
            super.getBounds().getY() + TOOLBAR_HEIGHT / 12)
    ctx.lineTo(super.getBounds().getX() + TOOLBAR_WIDTH * 3 / 4,
            super.getBounds().getY() + TOOLBAR_HEIGHT / 12)
    ctx.closePath()
    ctx.fillStyle = 'white'
    ctx.fill()
    ctx.stroke()
  }

  /**
  * Gets the shape of the note node
  * @return {Rectangle2D} the shape of the note node
  */
  getShape () {
    let bounds = getBounds() // Rectangle2D obj
    let path = new GeneralPath() // GeneralPath obj
    path.moveTo(bounds.getX(), bounds.getY())
    path.lineTo((bounds.getMaxX() - FOLD_X), bounds.getY())
    path.lineTo(bounds.getMaxX(), bounds.getY() + FOLD_Y)
    path.lineTo(bounds.getMaxX(), bounds.getMaxY())
    path.lineTo(bounds.getX(), bounds.getMaxY())
    path.closePath()
    return path // shape drawn
  }

  /**
  * Clone a note node
  * @return {NoteNode} cloned - A clone copy of the note node
  */
  clone () {
        // let cloned = (NoteNode)super.clone();
        // cloned.text = (String)text.clone();
    let cloned = new NoteNode()
    cloned.text = this.text()
    return cloned
  }

  /**
  * Gets the property of the note node
  * @return {Object} - Object contains the propery of note node, editor type and setter method for the propery
  */
  getProperty () {
    let copyText = this.text
    let copyColor = this.color
    var myNode = this
    return {
      Text: {
        text: copyText,
        inputBox: copyText,
        setText (n) {
          myNode.setText(n)
        }
      },
      Color: {
        Color: copyColor,
        colorSelector: copyColor,
        setColor (c) {
          myNode.setColor(c)
        }
      }
    }
  }
}

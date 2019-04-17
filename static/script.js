
const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

// Since we are changing the canvas size in csss, our drawing looks blurry
// Fixing the canvas pixel by resize
canvas.width = canvas.clientWidth
canvas.height = canvas.clientHeight

// Keep track if the callNode button in the tool is pressed
var callNode = false

document.addEventListener('DOMContentLoaded', function () {
  const graph = new Graph()
  let selected
  let dragStartPoint
  let dragStartBounds
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
    if (callNode === true && selected === undefined) {
      let n1 = new CallNode(event.x, 0)
      graph.add(n1)
    }

    // If we unselected, the callNode button get reset
    if (selected !== undefined) {
      dragStartPoint = mousePoint
      dragStartBounds = selected.getBounds()
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
        dragStartBounds.x - bounds.x +
        mousePoint.x - dragStartPoint.x,
        dragStartBounds.y - bounds.y +
        mousePoint.y - dragStartPoint.y)
    }
    repaint()
  })

  canvas.addEventListener('mouseup', event => {
    dragStartPoint = undefined
    dragStartBounds = undefined
  })
})


class Graph {
  constructor () {
    this.nodes = []
    this.edges = []
  }
  add (n) {
    this.nodes.push(n)
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

function drawGrabber (x, y) {
  const size = 6
  ctx.fillRect(x - size / 2, y - size / 2, size, size)
  ctx.fillStyle = 'red'
}

function center (rect) {
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
}

// Action listener for jquery
$('#callNode').on('click', function () {
  callNode = true
})

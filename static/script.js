//var Graph1 = require("./src/Graph.js")
const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

// Since we are changing the canvas size in csss, our drawing looks blurry
// Fixing the canvas pixel by resize
canvas.width = canvas.clientWidth
canvas.height = canvas.clientHeight

// Keep track if the callNode button in the tool is pressed
var callNode_button = false
var implicitParameterNode_button = false;
var addNote_button = false
var selected_button = false;

document.addEventListener('DOMContentLoaded', function () {
    const graph = new SequenceDiagramGraph()
    let selected_shape;
    let dragStartPoint
    graph.draw();

    function repaint() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        graph.draw();
        if (selected_shape !== undefined) {
            const bounds = selected_shape.getBounds()
            drawGrabber(bounds.x, bounds.y)
            drawGrabber(bounds.x + bounds.width, bounds.y)
            drawGrabber(bounds.x, bounds.y + bounds.height)
            drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
        }
    }

    function mouseLocation(event) {
        var rect = canvas.getBoundingClientRect()
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }
  canvas.addEventListener('dblclick', event => {
      let mousePoint = mouseLocation(event)
      selected_shape = graph.findNode(mousePoint);
      if(selected_shape !== undefined)
      {
        createPopUp(selected_shape.getPropertySheet(), selected_shape, graph);
        openForm();
      }
  })

    canvas.addEventListener('mousedown', event => {
        let mousePoint = mouseLocation(event)
        selected_shape = graph.findNode(mousePoint);

        // If the implicitParameterNode_button button is pressed in the toolbar
        if (implicitParameterNode_button === true && selected_shape === undefined) {
            let n1 = new ImplicitParameterNode()
            graph.add(n1, mousePoint);
        }
        // If the callNode button is pressed in the toolbar
        else if (callNode_button === true && !(selected_shape instanceof CallNode)) {
            let n1 = new CallNode()
            graph.add(n1, mousePoint);
        }

        else if(selected_shape === undefined)
        {
              implicitParameterNode_button = false;
              callNode_button = false;
              addNote = false
        }
        // If we unselected, the callNode button get reset
      if (selected_shape !== undefined) {
            dragStartPoint = mousePoint
            dragStartBounds=selected_shape.getBounds();
            //popUp(selected_shape.getPropertySheet());
            let something=1;
        }
      repaint()
    })

    canvas.addEventListener('mousemove', event => {
        if (dragStartPoint === undefined) return
        let mousePoint = mouseLocation(event)
        if (selected_shape !== undefined) {
            const bounds = selected_shape.getBounds()

            selected_shape.translate(
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

  /**
  https://www.w3schools.com/howto/howto_css_login_form.asp
  **/
function createPopUp(propertySheet, n , g) // n: Node, g: graph
{
  let propertyName= Object.getOwnPropertyNames(propertySheet);
  let propertyValue=Object.values(propertySheet);
  let oldName= n.name;
  var div = document.createElement('div');
  div.id ="myForm";
  div.class="form-popup";
  div.style.display = 'none';
  div.style.position = 'fixed';
  div.style.bottom = '0';
  div.style.right = "15px";
  div.style.border="3px solid #f1f1f1";
  div.style.zIndex="9";

  var form = document.createElement("form");
  form.action = "/action_page.php";
  form.class  = "form-container";
  form.style.maxWidth ="300px";
  form.style.padding="10px";
  form.style.background="white";

  for(let i=0; i<propertyName.length; i++)
  {
    // For loop for label
    var label= document.createElement("Label");
    label.for ="email"
    label.innerHTML = propertyName[i];
    form.appendChild(label);
    var input = document.createElement("input");
    input.placeholder=propertyValue[i];
    input.name=propertyName[i];
    input.id=propertyName[i];
    input.style.width="100%";
    input.style.padding="15px";
    input.style.margin="5px 0 22px 0";
    input.style.border="none";
    input.style.background="#f1f1f1";
    input.oninput=function()
    {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      g.draw();
      n.setName(document.getElementById(propertyName[i]).value);
    }
    form.appendChild(input);
  }

  var submit = document.createElement("button");
  submit.type = "button";
  submit.class="btn";
  submit.innerHTML = "Submit";
  form.appendChild(submit);
  submit.style.backgroundColor="#4CAF50";
  submit.style.color="white";
  submit.style.padding="16px 20px";
  submit.style.border="none";
  submit.style.cursor="poiner";
  submit.style.width="100%";
  submit.style.marginBottom="10px";
  submit.style.opacity="0.8";
  submit.onclick = function()
  {
    closeForm();
    g.draw();
  }

  var close= document.createElement('button');
  close.type="button";
  close.class="btn cancel";
  close.innerHTML = "Close";
  close.style.backgroundColor="#4CAF50";
  close.style.color="white";
  close.style.padding="16px 20px";
  close.style.border="none";
  close.style.cursor="poiner";
  close.style.width="100%";
  close.style.marginBottom="10px";
  close.style.opacity="0.8";
  close.onclick = function()
  {
    //g.draw();
    //n.setName(oldName);
    //ctx.clearRect(0, 0, canvas.width, canvas.height)
    closeForm();
  }
  form.appendChild(close);
  div.appendChild(form);
  document.body.insertBefore(div, canvas);
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
   var form = document.getElementById('myForm');
   form.remove();
  //document.getElementById("myForm").style.display = "none";
}

//******************************************************************************
//*******************************Framework**************************************
//******************************************************************************


function drawGrabber(x, y) {
    const size = 4
    ctx.fillStyle = 'red'
    ctx.fillRect(x - size / 2, y - size / 2, size, size)
}

function center(rect) {
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
}




//******************************************************************************
//*******************************UtilityClass**************************************
//******************************************************************************

/**
 A point object similar to Point2D in java
*/
class Point2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

/**
 A rectangle object similar Rectangle2D in java
*/
class Rectangle2D {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }

    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }

    getHeight() {
        return this.height;
    }

    getWidth() {
        return this.width;
    }

    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }
    setHeight(h) {
        this.height = h;
    }
    setWidth(w) {
        this.width = w;
    }
    getCenterX() {
        return this.x + this.width / 2;
    }
    getCenterY() {
        return this.y + this.width / 2;
    }
    getMaxX() {
        return this.x + this.width;
    }
    getMaxY() {
        return this.y + this.height;
    }

    draw() {
        // Top Horizontal line of the rectangle
        ctx.fillStyle = ('white');
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x, this.y);
        ctx.fill();
        ctx.stroke();

    }

    contains(p)
    {
      return (this.x<p.x && (this.x+this.width)>p.x && this.y < p.y && (this.y+this.height) > p.y)
    }
}

//******************************************************************************
//*******************************SequenceDiagram********************************
//******************************************************************************

//WIP
class NoteNode extends RectangularNode {

    constructor() {
        super();
        this.DEFAULT_WIDTH = 60;
        this.DEFAULT_HEIGHT = 40;
        this.FOLD_X = 8;
        this.FOLD_Y = 8;
        this.color = "yellow";
        this.text = "";
        this.setBounds(new Rectangle2D(0, 0, this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT));
        //text.setJustification(MultiLineString.LEFT);
    }

    addEdge(e, p1, p2) //edge, Point2D, Point2D
    {
			const end = new PointNode();
			end.translate(p2.getX(), p2.getY());
			e.connect(this, end);
			return super.addEdge(e, p1, p2);
    }

    removeEdge(g, e) //graph, edge
    {
			if (e.getStart() == this)
				g.removeNode(e.getEnd());
    }

    layout(g, g2, grid) //graph, Graphics2D, Grid
    {
			let b = text.getBounds(g2); //Rectangle2D obj, getMultiLineBounds(name, g2);
			let bounds = getBounds(); //Rectangle2D
			b = new Rectangle2D(bounds.getX(), bounds.getY(),
				Math.max(b.getWidth(), DEFAULT_WIDTH), Math.max(b.getHeight(), DEFAULT_HEIGHT));
			grid.snap(b);
			setBounds(b);
    }

    /**
     Gets the value of the text property.
     @return the text inside the note
		*/
    getText() {
			return this.text;
    }

    /**
       Sets the value of the text property.
       @param newValue the text inside the note
    */
    setText(newValue) {
			this.text = newValue;
    }

    /**
       Gets the value of the color property.
       @return the background color of the note
    */
    getColor() {
			return this.color;
    }

    /**
       Sets the value of the color property.
       @param newValue the background color of the note
    */
    setColor(newValue) {
			this.color = newValue;
    }

    draw() {
			// super.draw();
			// Color oldColor = g2.getColor();
			// g2.setColor(color);

			// let path = getShape(); //Shape obj
			// g2.fill(path);
			// g2.setColor(oldColor);
			// g2.draw(path);

			// let bounds = getBounds(); //Rectangle2D obj
			// let fold = new GeneralPath();
			// fold.moveTo((bounds.getMaxX() - FOLD_X), bounds.getY());
			// fold.lineTo(bounds.getMaxX() - FOLD_X, bounds.getY() + FOLD_X);
			// fold.lineTo(bounds.getMaxX(), (bounds.getY() + FOLD_Y));
			// fold.closePath();
			// oldColor = g2.getColor();
			// g2.setColor(g2.getBackground());
			// g2.fill(fold);
			// g2.setColor(oldColor);
			// g2.draw(fold);

			// text.draw(g2, getBounds());
    }

    getShape()
    {
			let bounds = getBounds(); //Rectangle2D obj
			let path = new GeneralPath(); //GeneralPath obj
			path.moveTo(bounds.getX(), bounds.getY());
			path.lineTo((bounds.getMaxX() - FOLD_X), bounds.getY());
			path.lineTo(bounds.getMaxX(), bounds.getY() + FOLD_Y);
			path.lineTo(bounds.getMaxX(), bounds.getMaxY());
			path.lineTo(bounds.getX(), bounds.getMaxY());
			path.closePath();
			return path; //shape drawn
    }

    clone() {
			//let cloned = (NoteNode)super.clone();
			//cloned.text = (String)text.clone();
			let cloned = new NoteNode();
			cloned.text = this.text();
			return cloned;
    }
}
// Action listener for jquery
$('#ImplicitParameterNode').on('click', function () {
    implicitParameterNode_button = true
})
// Action listener for jquery
$('#callNode').on('click', function () {
    callNode_button = true
    implicitParameterNode_button = false

})
// Set all other button to false
$('#Select').on('click', function () {
    callNode_button = false;
    implicitParameterNode_button = false

})

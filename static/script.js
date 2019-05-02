//var Graph1 = require("./src/Graph.js")
const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
const TOOLBAR_WIDTH = 300
const TOOLBAR_HEIGHT = 350


// Since we are changing the canvas size in csss, our drawing looks blurry
// Fixing the canvas pixel by resize
canvas.width = canvas.clientWidth
canvas.height = canvas.clientHeight

// List of button variables
var callNode_button = false;
var implicitParameterNode_button = false;
var addNote_button = false;
var selected_button = false;
var callEdge_button=false;

document.addEventListener('DOMContentLoaded', function () {
    const graph = new SequenceDiagramGraph()
    let selected_shape;
    let selected_edge;
    let dragStartPoint
    let mouseDown_drawEdge=false;
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
        selected_edge  = graph.findEdge(mousePoint);
        if (selected_shape !== undefined) {
            createPropertySheet(selected_shape.getProperty(),graph);
            openForm();
        }
    })

    canvas.addEventListener('mousedown', event => {
        let mousePoint = mouseLocation(event)
        selected_shape = graph.findNode(mousePoint);
        selected_edge  = graph.findEdge(mousePoint);

        // If the implicitParameterNode_button button is pressed in the toolbar
        if (implicitParameterNode_button === true && selected_shape === undefined)
        {
            let n1 = new ImplicitParameterNode()
            graph.add(n1, mousePoint);

            resetToolBar()
        }
        // If the callNode button is pressed in the toolbar
        if (callNode_button === true && !(selected_shape instanceof CallNode))
        {
            let n1 = new CallNode()
            graph.add(n1, mousePoint);
            resetToolBar()
        }

        if (selected_shape === undefined)
        {
            implicitParameterNode_button = false;
            callNode_button = false;
        }

        if(addNote_button === true && selected_shape === undefined)
        {
           console.log("I amh ere");
            let n1 = new NoteNode()
            graph.add(n1, mousePoint);
            resetToolBar()
        }

        if(callEdge_button === true && selected_shape !==undefined)
        {
          implicitParameterNode_button = false;
          callNode_button = false;
          addNote_button = false
          mouseDown_drawEdge=true;
        }

        // If we unselected, the callNode button get reset
        if (selected_shape !== undefined) {
            dragStartPoint = mousePoint
            dragStartBounds = selected_shape.getBounds();
            let something = 1;
        }
        repaint()
    })

    canvas.addEventListener('mousemove', event => {
        if (dragStartPoint === undefined)
        {
          return;
        }
        let mousePoint = mouseLocation(event)
        if (selected_shape !== undefined && !callEdge_button) {
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
        mousePoint = mouseLocation(event)
        if(selected_shape !==undefined && callEdge_button)
        {
           let e = new CallEdge();
           let d=graph.connect(e, dragStartPoint, mousePoint);
        }
        dragStartPoint = undefined;
        dragStartBounds = undefined;
        callEdge_button=false;
        repaint();
    })
})



/**
https://www.w3schools.com/howto/howto_css_login_form.asp
**/
function createPropertySheet(property, g) {
    let propertyName = Object.getOwnPropertyNames(property);
    let propertyValue= Object.values(property);
    var div = document.createElement('div');
    div.id = "myForm";
    div.class = "form-popup";
    div.style.display = 'none';
    div.style.position = 'fixed';
    div.style.bottom = '0';
    div.style.right = "15px";
    div.style.border = "3px solid #f1f1f1";
    div.style.zIndex = "9";

    var form = document.createElement("form");
    form.action = "/action_page.php";
    form.class = "form-container";
    form.style.maxWidth = "300px";
    form.style.padding = "10px";
    form.style.background = "white";
    // Property format : name, editor type, settter method
    for (let i = 0; i < propertyName.length; i=i+3) {
          var label = document.createElement("Label");
          label.innerHTML = propertyName[i];
          form.appendChild(label);

          // Editor type : input box
          if(propertyName[i+1] === "inputBox")
          {
            var input = document.createElement("input");
            input.placeholder = propertyValue[i+1]; // Name: current name
            input.name = propertyName[i];
            input.id = propertyName[i];
            input.style.width = "100%";
            input.style.padding = "15px";
            input.style.margin = "5px 0 22px 0";
            input.style.border = "none";
            input.style.background = "#f1f1f1";
            input.oninput = function()
            {
              ctx.clearRect(0, 0, canvas.width, canvas.height)
              property[propertyName[i+2]](input.value)
              g.draw();
            }
            form.appendChild(input);
          }

          // Editor type: select bar
          else if(propertyName[i+1] === "selectBar")
          {
            var select = document.createElement("SELECT");
            select.id = propertyName[i];
            select.style.width = "100%";
            select.style.padding = "15px";
            select.style.margin = "5px 0 22px 0";
            select.style.border = "none";
            select.style.background = "#f1f1f1";
            let optionList= propertyValue[i+1];
            for(let i=0; i<optionList.length; i++)
            {
              var option = document.createElement("option");
              option.value = optionList[i];
              option.text = optionList[i];
              select.appendChild(option);
            }
            select.onchange = function ()
            {
              ctx.clearRect(0, 0, canvas.width, canvas.height)
              console.log(property[propertyName[i+2]])
              property[propertyName[i+2]](select.value)
              g.draw();
            }
            form.appendChild(select);
          }

          // Editor type: Color picker
          else if(propertyName[i+1] === "selectBar")
          {
            var select = document.createElement("SELECT");
            select.id = propertyName[i];
            select.style.width = "100%";
            select.style.padding = "15px";
            select.style.margin = "5px 0 22px 0";
            select.style.border = "none";
            select.style.background = "#f1f1f1";
            let optionList= propertyValue[i+1];
            for(let i=0; i<optionList.length; i++)
            {
              var option = document.createElement("option");
              option.class ="red";
              option.value = optionList[i];
              option.text = optionList[i];
              select.appendChild(option);
            }
            select.onchange = function ()
            {
              ctx.clearRect(0, 0, canvas.width, canvas.height)
              console.log(property[propertyName[i+2]])
              property[propertyName[i+2]](select.value)
              option.style.color=select.value;
              g.draw();
            }
            form.appendChild(select);
          }

    }

    var submit = document.createElement("button");
    submit.type = "button";
    submit.class = "btn btn-danger";
    submit.innerHTML = "&check; Update";
    form.appendChild(submit);
    submit.style.backgroundColor = "#4CAF50";
    submit.style.color = "white";
    submit.style.padding = "16px 20px";
    submit.style.border = "none";
    submit.style.cursor = "poiner";
    submit.style.width = "100%";
    submit.style.marginBottom = "10px";
    submit.style.opacity = "0.8";
    submit.onclick = function () {
    closeForm();
    g.draw();
    }

    var close = document.createElement('button');
    close.type = "button";
    close.class = "btn cancel";
    close.innerHTML = "&#120; Cancel";
    close.style.backgroundColor = "#ff0000";
    close.style.color = "white";
    close.style.padding = "16px 20px";
    close.style.border = "none";
    close.style.cursor = "poiner";
    close.style.width = "100%";
    close.style.marginBottom = "10px";
    close.style.opacity = "0.8";
    close.onclick = function () {
      g.draw();
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

function drawGrabberToolBar(ctx, x, y) {
    const size = 25
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
	 getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
}

class Line2D{
	constructor(p1,p2){
		this.p1=p1;
		this.p2=p2;
		this.x1=p1.getX();
		this.y1=p1.getY();
		this.x2=p2.getX();
		this.y2=p2.getY();
	}
	getP1(){
		return this.p1;
	}
	getP2(){
		return this.p2;
	}
	getPM(){
		let pm=new Point2D(Math.round((this.getX1()+this.getX2())/2),Math.round((this.getY1()+this.getY2())/2));
		return pm;
	}
    getX1() {
        return this.x1;
    }
    getY1() {
        return this.y1;
    }
    getX2() {
        return this.x2;
    }
    getY2() {
        return this.y2;
    }
	setX1(x) {
        this.x1 = x;
    }
    setY1(y) {
        this.y1 = y;
    }
    setX2(x) {
        this.x2 = x;
    }
    setY2(y) {
        this.y2 = y;
    }
	contains(aPoint){
		let m=((this.getY2()-this.getY1())/(this.getX2()-this.getX1()));
		let calculatedY=m*(aPoint.getX()-this.getX1())+this.getY1();
		if(aPoint.getY()+3>=calculatedY&&aPoint.getY()-3<=calculatedY){
			if(this.getX1()>this.getX2()){
				if(aPoint.getX()<=this.getX1()&&aPoint.getX()>=this.getX2()){
					return true;
				}
				return false;
			}
			else{
				if(aPoint.getX()>=this.getX1()&&aPoint.getX()<=this.getX2()){
					return true;
				}
				return false;
			}
		}
		return false;
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
    getMinY()
    {
      return this.y;
    }
    getMinX()
    {
            return this.x;
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

    drawToolBar(ctx) {
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

    contains(p) {
        return (this.x < p.x && (this.x + this.width) > p.x && this.y < p.y && (this.y + this.height) > p.y)
    }
}

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
   */

   constructor(dx, dy)
   {
     this.x= dx;
     this.y= dy;
	   this.length = Math.sqrt(this.x * this.x + this.y * this.y);
      if (length !== 0){
	    this.x = Math.round(this.x / length);
      this.y = Math.round(this.y / length);
   }

   }

   /**
      Turns this direction by an angle.
      @param angle the angle in degrees
	*/
   turn(angle)
   {
      let a = angle* Math.PI / 180;
		  let d= new Direction(
      Math.round(this.x * Math.cos(a) - this.y * Math.sin(a)),Math.round(
      this.x * Math.sin(a) + this.y * Math.cos(a)));
      return d;

   }

   /**
      Gets the x-component of this direction
      @return the x-component (between -1 and 1)

   */
   getX()
   {
      return this.x;
   }

   /**
      Gets the y-component of this direction
      @return the y-component (between -1 and 1)

   */
   getY()
   {
      return this.y;
   }
}

//******************************************************************************
//*******************************SequenceDiagram********************************
//******************************************************************************


// Action listener for jquery
$('#ImplicitParameterNode').on('click', function () {
    implicitParameterNode_button = true

    $("#ImplicitParameterNode").addClass("active")
    $("#callNode").removeClass("active")
    $("#addNote").removeClass("active")
    $("#Select").removeClass("active")

})
// Action listener for jquery
$('#callNode').on('click', function () {
    callNode_button = true
    implicitParameterNode_button = false

    $("#callNode").addClass("active")
    $("#ImplicitParameterNode").removeClass("active")
    $("#addNote").removeClass("active")
    $("#Select").removeClass("active")
})

$('#addNote').on('click', function () {
    addNote_button = true
    implicitParameterNode_button = false

    $("#addNote").addClass("active")
    $("#ImplicitParameterNode").removeClass("active")
    $("#callNode").removeClass("active")
    $("#Select").removeClass("active")
})

// Set all other button to false
$('#Select').on('click', function () {
    callNode_button = false;
    implicitParameterNode_button = false;
    addNote_button = false;

    $("#Select").addClass("active")
    $("#ImplicitParameterNode").removeClass("active")
    $("#callNode").removeClass("active")
    $("#addNote").removeClass("active")
})

// Set all other button to false
$('#callEdge').on('click', function () {
    callEdge_button = true;
    callNode_button = false;
    implicitParameterNode_button = false;
    addNote_button = false;

  //  $("#Select").addClass("active")
    $("#ImplicitParameterNode").removeClass("active")
    $("#callNode").removeClass("active")
    $("#addNote").removeClass("active")
})

function resetToolBar() {
    callNode_button = false;
    implicitParameterNode_button = false;
    addNote_button = false;

    $("#ImplicitParameterNode").removeClass("active")
    $("#callNode").removeClass("active")
    $("#addNote").removeClass("active")
    $("#Select").removeClass("active")
}
$(document).ready(function () {
    drawSelectToolBarToolBar()
    drawImplicitParameterNodeToolBar()
    drawCallNodeToolBar()
    drawNoteNodeToolBar()

    function drawSelectToolBarToolBar() {
        // let n = new ImplicitParameterNode();
        var canvas = document.getElementById("SelectToolBar");
        var ctx = canvas.getContext("2d");
        drawGrabberToolBar(ctx, 0, 0)
        drawGrabberToolBar(ctx, TOOLBAR_WIDTH, 0)
        drawGrabberToolBar(ctx, 0, 150)
        drawGrabberToolBar(ctx, TOOLBAR_WIDTH, 150)
    }

    function drawImplicitParameterNodeToolBar() {
        let n = new ImplicitParameterNode();
        var canvas = document.getElementById("ImplicitParameterNodeToolBar");
        var ctx = canvas.getContext("2d");
        n.drawToolBar(ctx)
    }

    function drawCallNodeToolBar() {
        let n = new CallNode();
        var canvas = document.getElementById("CallNodeToolBar");
        var ctx = canvas.getContext("2d");
        n.drawToolBar(ctx)
    }

    function drawNoteNodeToolBar() {
        let n = new NoteNode();
        var canvas = document.getElementById("NoteNodeToolBar");
        var ctx = canvas.getContext("2d");
        n.drawToolBar(ctx)
    }
});

/**
 *  @fileOverview Main script for SequenceDiagram handles tool bar, click listener and button listener
 *
 *  @author Do Hong Kimpy, Yulong Ran, Jason Tang, Jiehong Yu
 */

/**
* Canvas in the html
* @constant
* @type {element}
*/
const canvas = document.getElementById('myCanvas')

/**
* Context of the canvas
* @constant
* @type {element}
*/
const ctx = canvas.getContext('2d')

/**
* Condition variable to indicate editor is opne
* @type {boolean}
*/
var editorOpen = false

/**
* Tool Bar width
* @constant
* @type {Integer}
*/
const TOOLBAR_WIDTH = 300

/**
* Tool Bar height
* @constant
* @type {Integer}
*/
const TOOLBAR_HEIGHT = 350

// Since we are changing the canvas size in css, our drawing looks blurry
// Fixing the canvas pixel by resize
canvas.width = canvas.clientWidth
canvas.height = canvas.clientHeight

/**
* Condition variable to indicate callNode button is pressed
* @type {boolean}
*/
var callNode_button = false

/**
* Condition variable to indicate implicitParameterNode button is pressed
* @type {boolean}
*/
var implicitParameterNode_button = false

/**
* Condition variable to indicate addNote button is pressed
* @type {boolean}
*/
var addNote_button = false

/**
* Condition variable to indicate select button is pressed
* @type {boolean}
*/
var selected_button = false

/**
* Condition variable to indicate callEdge button is pressed
* @type {boolean}
*/
var callEdge_button = false

/**
* Condition variable to indicate return edge button is pressed
* @type {boolean}
*/
var returnEdge_button = false

/**
* Select object in the SequenceDiagram
* @type {Node}
*/
let selected_shape

/**
* Select edge in the SequenceDiagram
* @type {Edge}
*/
let selected_edge

/**
* A sequnece Diagram Graph
* @type {Graph}
*/
const graph = new SequenceDiagramGraph()

/**
* A drag start point on the graph
* @type {Point2D}
*/
let dragStartPoint

/**
* Condition variable to indicate need draw Edge
* @type {boolean}
*/
let mouseDown_drawEdge = false

/**
* Re-draw the graph with grabber
*/
function repaint() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    graph.draw()
    let bounds
    if (selected_shape !== undefined || selected_edge !== undefined) {
        if (selected_edge !== undefined) {
            bounds = selected_edge.getBounds()
            let line = selected_edge.getBounds()
            drawGrabber(line.getX1(), line.getY1())
            drawGrabber(line.getX2(), line.getY2())
        } else {
            bounds = selected_shape.getBounds()
            drawGrabber(bounds.x, bounds.y)
            drawGrabber(bounds.x + bounds.width, bounds.y)
            drawGrabber(bounds.x, bounds.y + bounds.height)
            drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
        }
    }
}

/**
* Action listener for the document
*/
document.addEventListener('DOMContentLoaded', function () {
    graph.draw()

    /**
    * Gets the mouseLocation of the event
    * @param {Event} event the event
    * @return {Object} an object with x y coordinate
    */
    function mouseLocation(event) {
        var rect = canvas.getBoundingClientRect()
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }

    /**
    * Action lstener when double click the canvas
    */
    canvas.addEventListener('dblclick', event => {
        let mousePoint = mouseLocation(event)
        selected_shape = graph.findNode(mousePoint)
        selected_edge = graph.findEdge(mousePoint)
        if (selected_shape !== undefined) {
            createPropertySheet(selected_shape.getProperty(), graph)
            openForm()
        } else if (selected_shape === undefined && selected_edge !== undefined) {
            createPropertySheet(selected_edge.getProperty(), graph)
            openForm()
        }
    })

    /**
    * Action lstener when single click the canvas
    */
    canvas.addEventListener('mousedown', event => {
        let mousePoint = mouseLocation(event)
        selected_shape = graph.findNode(mousePoint)
        selected_edge = graph.findEdge(mousePoint)

        // If the implicitParameterNode_button button is pressed in the toolbar
        if (implicitParameterNode_button === true && selected_shape === undefined) {
            let n1 = new ImplicitParameterNode()
            graph.add(n1, mousePoint)

            resetToolBar()
        }
        // If the callNode button is pressed in the toolbar
        if (callNode_button === true && !(selected_shape instanceof CallNode)) {
            let n1 = new CallNode()
            graph.add(n1, mousePoint)
            resetToolBar()
        }

        if (selected_shape === undefined) {
            implicitParameterNode_button = false
            callNode_button = false
        }

        if (addNote_button === true && selected_shape === undefined) {
            let n1 = new NoteNode()
            graph.add(n1, mousePoint)
            resetToolBar()
        }

        if (callEdge_button === true && selected_shape !== undefined) {
            implicitParameterNode_button = false
            callNode_button = false
            addNote_button = false
            mouseDown_drawEdge = true
        }
        if (returnEdge_button === true && selected_shape !== undefined) {
            implicitParameterNode_button = false
            callNode_button = false
            addNote_button = false
            mouseDown_drawEdge = true
        }

        // If we unselected, the callNode button get reset
        if (selected_shape !== undefined) {
            dragStartPoint = mousePoint
            dragStartBounds = selected_shape.getBounds()
            let something = 1
        }
        repaint()
    })

    /**
    * Action lstener when move the mouse point on canvas
    */
    canvas.addEventListener('mousemove', event => {
        if (dragStartPoint === undefined) {
            return
        }
        let mousePoint = mouseLocation(event)
        if (selected_shape !== undefined && !callEdge_button && !returnEdge_button) {
            const bounds = selected_shape.getBounds()
            selected_shape.translate(
                dragStartBounds.x - bounds.x +
                mousePoint.x - dragStartPoint.x,
                dragStartBounds.y - bounds.y +
                mousePoint.y - dragStartPoint.y)
        }
        repaint()
    })

    /**
    * Action lstener when release the mouse on canvas
    */
    canvas.addEventListener('mouseup', event => {
        mousePoint = mouseLocation(event)
        if (selected_shape !== undefined && callEdge_button) {
            let e = new CallEdge()
            let d = graph.connect(e, dragStartPoint, mousePoint)
        } else if (selected_shape !== undefined && returnEdge_button) {
            let e = new ReturnEdge()
            let d = graph.connect(e, dragStartPoint, mousePoint)
        }
        dragStartPoint = undefined
        dragStartBounds = undefined
        callEdge_button = false
        returnEdge_button = false
        repaint()
    })
})

/**
https://www.w3schools.com/howto/howto_css_login_form.asp
**/

/**
* Construct a property editor
* @param {Object} property the property object contains the information of the property editor
* @param {Graph}  g the graph that editor is on
*/
function createPropertySheet(property, g) {
    if (editorOpen) {
        closeForm()
    }
    let propertyObject = Object.getOwnPropertyNames(property)  // Array of object
    var div = document.createElement('div')
    div.id = 'myForm'
    div.class = 'form-popup'
    div.style.display = 'none'
    div.style.position = 'fixed'
    div.style.bottom = '0'
    div.style.right = '15px'
    div.style.border = '3px solid #f1f1f1'
    div.style.zIndex = '9'

    var form = document.createElement('form')
    form.action = '/action_page.php'
    form.class = 'form-container'
    form.style.maxWidth = '300px'
    form.style.padding = '10px'
    form.style.background = 'white'
    for (let k = 0; k < propertyObject.length; k++) {
        let propertyN = property[propertyObject[k]] // Kth object
        let propertyName = Object.getOwnPropertyNames(propertyN) // Property Name within the object : object, typeof editor, setter
        let propertyValue = Object.values(propertyN) // Acutally value within each property name
        // Property format : name, editor type, settter method
        var label = document.createElement('Label')
        label.innerHTML = propertyName[0]
        form.appendChild(label)
        // Editor type : input box
        if (propertyName[1] === 'inputBox') {
            var input = document.createElement('input')
            input.placeholder = propertyValue[1] // Name: current name
            input.name = propertyName[0]
            input.id = propertyName[0]
            input.style.width = '100%'
            input.style.padding = '15px'
            input.style.height = '20px'
            input.style.margin = '5px 0 22px 0'
            input.style.border = 'none'
            input.style.background = '#f1f1f1'
            input.oninput = function () {
                propertyN[propertyName[2]](document.getElementById(propertyName[0]).value)
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                g.draw()
            }
            form.appendChild(input)
        }

        // Editor type: select bar
        else if (propertyName[1] === 'selectBar') {
            var select = document.createElement('SELECT')
            select.id = propertyName[0]
            select.value = ''
            select.style.width = '100%'
            select.style.padding = '15px'
            select.style.margin = '5px 0 22px 0'
            select.style.border = 'none'
            select.style.background = '#f1f1f1'
            let optionList = propertyValue[1]
            for (let i = 0; i < optionList.length; i++) {
                var option = document.createElement('option')
                option.value = optionList[i]
                option.text = optionList[i]
                select.appendChild(option)
            }
            select.onchange = function () {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                propertyN[propertyName[2]](document.getElementById(propertyName[0]).value)
                g.draw()
            }
            form.appendChild(select)
        }

        // Editor type: Color picker
        else if (propertyName[1] === 'colorSelector') {
            var color = document.createElement('INPUT')
            color.setAttribute('type', 'color')
            color.disabled = false
            color.id = 'color'
            color.style.width = '100%'
            color.style.padding = '15px'
            color.style.margin = '5px 0 22px 0'
            color.style.border = 'none'
            color.value = '#e6e600'
            color.addEventListener('change', updateColor, false)
            function updateColor() {
                propertyN[propertyName[2]](color.value)
                g.draw()
            }
            form.appendChild(color)
        }
    }

    var submit = document.createElement('button')
    submit.type = 'button'
    submit.class = 'btn btn-danger'
    submit.innerHTML = '&check; Update'
    form.appendChild(submit)
    submit.style.backgroundColor = '#4CAF50'
    submit.style.color = 'white'
    submit.style.padding = '16px 20px'
    submit.style.border = 'none'
    submit.style.cursor = 'poiner'
    submit.style.width = '100%'
    submit.style.marginBottom = '10px'
    submit.style.opacity = '0.8'
    submit.onclick = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        g.draw()
        closeForm()
    }

    var close = document.createElement('button')
    close.type = 'button'
    close.class = 'btn cancel'
    close.innerHTML = '&#120; Cancel'
    close.style.backgroundColor = '#ff0000'
    close.style.color = 'white'
    close.style.padding = '16px 20px'
    close.style.border = 'none'
    close.style.cursor = 'poiner'
    close.style.width = '100%'
    close.style.marginBottom = '10px'
    close.style.opacity = '0.8'
    close.onclick = function () {
        g.draw()
        closeForm()
    }
    form.appendChild(close)
    div.appendChild(form)
    document.body.insertBefore(div, canvas)
    editorOpen = true
}

/**
* Opens a form
*/
function openForm() {
    document.getElementById('myForm').style.display = 'block'
}

/**
* Close a form
*/
function closeForm() {
    var form = document.getElementById('myForm')
    form.remove()
    editorOpen = false
    // document.getElementById("myForm").style.display = "none";
}

//* *****************************************************************************
//* ******************************Framework**************************************
//* *****************************************************************************

/**
* Draws the grabber at specific coordinate
* @param {number} x the x coordinate
* @param {number} y the y coordinate
*/
function drawGrabber(x, y) {
    const size = 4
    ctx.fillStyle = 'red'
    ctx.fillRect(x - size / 2, y - size / 2, size, size)
}

/**
* Draws the grabber on tool bar
* @param {number} x the x coordinate
* @param {number} y the y coordinate
* @param {Canvas} ctx the canvas
*/
function drawGrabberToolBar(ctx, x, y) {
    const size = 25
    ctx.fillStyle = 'red'
    ctx.fillRect(x - size / 2, y - size / 2, size, size)
}

/**
* Gets the center point of a rectangle
* @param {Rectangle2D} rect a rectangle
* @return {Object} a object contains x and y coordinate
*/
function center(rect) {
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
}

//* *****************************************************************************
//* ******************************UtilityClass**************************************
//* *****************************************************************************

/**
 A point object similar to Point2D in java
*/
class Point2D {
    /**
    * Construct a point
    * @param {number} x the x coordinate
    * @param {number} y the y coordinate
    */
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    /**
    * Gets the x coordinate of the point
    * @return {number} the x coordinate
    */
    getX() {
        return this.x
    }

    /**
    * Gets the y coordinate of the point
    * @return {number} the y coordinate
    */
    getY() {
        return this.y
    }
}

/**
* A line object
*/
class Line2D {

    /**
    * Construct a line
    * @param {Point2D} p1 one end point of the line
    * @param {Point2D} p2 one end point of the line
    */
    constructor(p1, p2) {
        this.p1 = p1
        this.p2 = p2
        this.x1 = p1.getX()
        this.y1 = p1.getY()
        this.x2 = p2.getX()
        this.y2 = p2.getY()
    }

    /**
    * Gets the p1 of the line
    * @return {Point2D} p1 for the line
    */
    getP1() {
        return this.p1
    }

    /**
    * Gets the p2 of the line
    * @return {Point2D} p2 for the line
    */
    getP2() {
        return this.p2
    }

    /**
    * Gets the middle point of the line
    * @return {Point2D} middle point for the line
    */
    getPM() {
        let pm = new Point2D(Math.round((this.getX1() + this.getX2()) / 2), this.getY2())
        return pm
    }

    /**
    * Gets the x coordinate of point1 on the line
    * @return {number} x coordinate of point1 on the lie
    */
    getX1() {
        return this.x1
    }

    /**
    * Gets the y coordinate of point1 on the line
    * @return {number} y coordinate of point1 on the lie
    */
    getY1() {
        return this.y1
    }

    /**
    * Gets the x coordinate of point2 on the line
    * @return {number} x coordinate of point2 on the lie
    */
    getX2() {
        return this.x2
    }

    /**
    * Gets the y coordinate of point2 on the line
    * @return {number} y coordinate of point2 on the lie
    */
    getY2() {
        return this.y2
    }

    /**
    * Sets the x coordinate of point1 on the line
    * @param {number} x coordinate of point1 on the lie
    */
    setX1(x) {
        this.x1 = x
    }

    /**
    * Sets the y coordinate of point1 on the line
    * @param {number} y coordinate of point1 on the lie
    */
    setY1(y) {
        this.y1 = y
    }

    /**
    * Sets the x coordinate of point2 on the line
    * @param {number} x coordinate of point2 on the lie
    */
    setX2(x) {
        this.x2 = x
    }

    /**
    * Sets the y coordinate of point2 on the line
    * @param {number} y coordinate of point2 on the lie
    */
    setY2(y) {
        this.y2 = y
    }

    /**
    * Determine wether the Line contains a point
    * @param {Point2D}  a point to be test
    * @return {boolean} true if line contains the point false line does not contains the point
    */
    contains(aPoint) {
        let m = ((this.getY2() - this.getY1()) / (this.getX2() - this.getX1()))
        let calculatedY = m * (aPoint.x - this.getX1()) + this.getY1()
        if (aPoint.y + 3 >= calculatedY && aPoint.y - 3 <= calculatedY) {
            if (this.getX1() > this.getX2()) {
                if (aPoint.x <= this.getX1() && aPoint.x >= this.getX2()) {
                    return true
                }
                return false
            } else {
                if (aPoint.x >= this.getX1() && aPoint.x <= this.getX2()) {
                    return true
                }
                return false
            }
        }
        return false
    }

}

/**
 A rectangle object similar Rectangle2D in java
*/
class Rectangle2D {

    /**
    * Constructs a Rectangle2D
    * @param {number} x the x coordinate of the rectangle
    * @param {number} y the y coordinate of the rectangle
    * @param {number} width the width of the rectangle
    * @param {number} height the height of the rectangle
    */
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.height = height
        this.width = width
    }

    /**
    * Gets the x coordinate of the Rectangle2D
    * @return {number} x coordinate of the Rectangle2D
    */
    getX() {
        return this.x
    }

    /**
    * Gets the y coordinate of the Rectangle2D
    * @return {number} y coordinate of the Rectangle2D
    */
    getY() {
        return this.y
    }
    /**
    * Gets the height of the Rectangle2D
    * @return {number} height of the Rectangle2D
    */
    getHeight() {
        return this.height
    }

    /**
    * Gets the width of the Rectangle2D
    * @return {number} width of the Rectangle2D
    */
    getWidth() {
        return this.width
    }

    /**
    * Sets the x coordinate of the Rectangle2D
    * @param {number} x coordinate of the Rectangle2D
    */
    setX(x) {
        this.x = x
    }

    /**
    * Sets the y coordinate of the Rectangle2D
    * @param {number} y coordinate of the Rectangle2D
    */
    setY(y) {
        this.y = y
    }

    /**
    * Sets the height of the Rectangle2D
    * @param {number} height of the Rectangle2D
    */
    setHeight(h) {
        this.height = h
    }

    /**
    * Sets the width of the Rectangle2D
    * @param {number} width of the Rectangle2D
    */
    setWidth(w) {
        this.width = w
    }

    /**
    * Gets the center x of the Rectangle2D
    * @return {number} center x of the Rectangle2D
    */
    getCenterX() {
        return this.x + this.width / 2
    }

    /**
    * Gets the center y of the Rectangle2D
    * @return {number} center y of the Rectangle2D
    */
    getCenterY() {
        return this.y + this.width / 2
    }

    /**
    * Gets the max x of the Rectangle2D
    * @return {number} max x of the Rectangle2D
    */
    getMaxX() {
        return this.x + this.width
    }

    /**
    * Gets the max y of the Rectangle2D
    * @return {number} max y of the Rectangle2D
    */
    getMaxY() {
        return this.y + this.height
    }

    /**
    * Gets the min y of the Rectangle2D
    * @return {number} min y of the Rectangle2D
    */
    getMinY() {
        return this.y
    }

    /**
    * Gets the min x of the Rectangle2D
    * @return {number} min x of the Rectangle2D
    */
    getMinX() {
        return this.x
    }

    /**
    * Draws the Rectangle2D on canvas
    */
    draw() {
        // Top Horizontal line of the rectangle
        ctx.fillStyle = ('white')
        ctx.beginPath()
        ctx.setLineDash([])
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x + this.width, this.y)
        ctx.lineTo(this.x + this.width, this.y + this.height)
        ctx.lineTo(this.x, this.y + this.height)
        ctx.lineTo(this.x, this.y)
        ctx.fill()
        ctx.stroke()
    }

    /**
  * Draws the Rectangle2D on tool bar
  * @param {Canvas} Ctx A reference to the canvas
  */
    drawToolBar(ctx) {
        // Top Horizontal line of the rectangle
        ctx.fillStyle = ('white')
        ctx.beginPath()
        ctx.setLineDash([])
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x + this.width, this.y)
        ctx.lineTo(this.x + this.width, this.y + this.height)
        ctx.lineTo(this.x, this.y + this.height)
        ctx.lineTo(this.x, this.y)
        ctx.fill()
        ctx.stroke()
    }

    /**
    * Determine whether the rectangle contains a points
    * @param {Point2D} p A point
    * @return {boolean} true if the rectangle contains the point ; false if the rectangle does not contains the point
    */
    contains(p) {
        return (this.x < p.x && (this.x + this.width) > p.x && this.y < p.y && (this.y + this.height) > p.y)
    }

    /**
    * Gets the connection point of the rectangle
    * @param {Point2D} toEnd A point
    * @return {Point2D} the connection point of the rectangle
    */

    getConnectionPoint(toEnd) {
        return new Point2D(this.getX(), this.getY());
    }
}

/**
* A direction
*/
class Direction {

    // public static final Direction NORTH = new Direction(0, -1);
    // public static final Direction SOUTH = new Direction(0, 1);
    // public static final Direction EAST = new Direction(1, 0);
    // public static final Direction WEST = new Direction(-1, 0);

	/**

      Constructs a direction between two points
      @param p the starting point
      @param q the ending point
   */

    constructor(p, q) {
        let x
        let y
        if (p instanceof Point2D && q instanceof Point2D) {
            this.x = q.getX() - p.getX()
            this.y = q.getY() - p.getY()
        } else {
            this.x = p
            this.y = q
        }
        let length = Math.sqrt(this.x * this.x + this.y * this.y)
        if (length !== 0) {
            this.x = Math.round(this.x / length)
            this.y = Math.round(this.y / length)
        }
    }

    /**
       Turns this direction by an angle.
       @param angle the angle in degrees
     */
    turn(angle) {
        let a = angle * Math.PI / 180
        let d = new Direction(
            Math.round(this.x * Math.cos(a) - this.y * Math.sin(a)), Math.round(
                this.x * Math.sin(a) + this.y * Math.cos(a)))
        return d
    }

    /**
       Gets the x-component of this direction
       @return the x-component (between -1 and 1)

    */
    getX() {
        return this.x
    }

    /**
       Gets the y-component of this direction
       @return the y-component (between -1 and 1)

    */
    getY() {
        return this.y
    }
}

//* *****************************************************************************
//* ******************************SequenceDiagram********************************
//* *****************************************************************************

// Action listener for jquery
$('#ImplicitParameterNode').on('click', function () {
    implicitParameterNode_button = true

    $('#ImplicitParameterNode').addClass('active')
    $('#callNode').removeClass('active')
    $('#addNote').removeClass('active')
    $('#Select').removeClass('active')
    $("#callEdge").removeClass("active")
    $("#returnEdge").removeClass("active")
})
// Action listener for jquery
$('#callNode').on('click', function () {
    callNode_button = true
    implicitParameterNode_button = false

    $('#callNode').addClass('active')
    $('#ImplicitParameterNode').removeClass('active')
    $('#addNote').removeClass('active')
    $('#Select').removeClass('active')
    $("#callEdge").removeClass("active")
    $("#returnEdge").removeClass("active")
})

$('#addNote').on('click', function () {
    addNote_button = true
    implicitParameterNode_button = false

    $('#addNote').addClass('active')
    $('#ImplicitParameterNode').removeClass('active')
    $('#callNode').removeClass('active')
    $('#Select').removeClass('active')
    $("#callEdge").removeClass("active")
    $("#returnEdge").removeClass("active")
})

// Set all other button to false
$('#Select').on('click', function () {
    callNode_button = false
    implicitParameterNode_button = false
    addNote_button = false

    $('#Select').addClass('active')
    $('#ImplicitParameterNode').removeClass('active')
    $('#callNode').removeClass('active')
    $('#addNote').removeClass('active')
    $("#callEdge").removeClass("active")
    $("#returnEdge").removeClass("active")
})

// Set all other button to false
$('#callEdge').on('click', function () {
    callEdge_button = true
    callNode_button = false
    implicitParameterNode_button = false
    addNote_button = false

    $("#callEdge").addClass("active")
    $('#ImplicitParameterNode').removeClass('active')
    $('#Select').removeClass('active')
    $('#callNode').removeClass('active')
    $('#addNote').removeClass('active')
    $("#returnEdge").removeClass("active")
})

// Set all other button to false
$('#returnEdge').on('click', function () {
    returnEdge_button = true
    callEdge_button = false
    callNode_button = false
    implicitParameterNode_button = false
    addNote_button = false

    $("#returnEdge").addClass("active")
    $('#ImplicitParameterNode').removeClass('active')
    $('#Select').removeClass('active')
    $('#callNode').removeClass('active')
    $('#addNote').removeClass('active')
    $("#callEdge").removeClass("active")

    // $("#returnEdge").removeClass("active")
})

$('#deleteNode').on('click', function () {
    if (selected_shape !== undefined) {
        if (selected_shape instanceof ImplicitParameterNode) {
            for (const n of selected_shape.getChildren()) {
                graph.removeNode(n)
            }
        }
        graph.removeNode(selected_shape)
        selected_shape = undefined
        repaint()
    }

    if (selected_edge !== undefined) {
        graph.removeEdge(selected_edge)
        selected_edge = undefined
        repaint()
    }
    $('#Select').removeClass('active')
    $('#ImplicitParameterNode').removeClass('active')
    $('#callNode').removeClass('active')
    $('#addNote').removeClass('active')
})

/**
* Resets the toolbar
*/
function resetToolBar() {
    callNode_button = false
    implicitParameterNode_button = false
    addNote_button = false

    $('#ImplicitParameterNode').removeClass('active')
    $('#callNode').removeClass('active')
    $('#addNote').removeClass('active')
    $('#Select').removeClass('active')
}
$(document).ready(function () {
    drawSelectToolBarToolBar()
    drawImplicitParameterNodeToolBar()
    drawCallNodeToolBar()
    drawNoteNodeToolBar()

    /**
    * Draw selection tool bar
    */
    function drawSelectToolBarToolBar() {
        // let n = new ImplicitParameterNode();
        var canvas = document.getElementById('SelectToolBar')
        var ctx = canvas.getContext('2d')
        drawGrabberToolBar(ctx, 0, 0)
        drawGrabberToolBar(ctx, TOOLBAR_WIDTH, 0)
        drawGrabberToolBar(ctx, 0, 150)
        drawGrabberToolBar(ctx, TOOLBAR_WIDTH, 150)
    }

    /**
    * Draw ImplicitParameterNode tool bar
    */
    function drawImplicitParameterNodeToolBar() {
        let n = new ImplicitParameterNode()
        var canvas = document.getElementById('ImplicitParameterNodeToolBar')
        var ctx = canvas.getContext('2d')
        n.drawToolBar(ctx)
    }

    /**
    * Draw callNode tool bar
    */
    function drawCallNodeToolBar() {
        let n = new CallNode()
        var canvas = document.getElementById('CallNodeToolBar')
        var ctx = canvas.getContext('2d')
        n.drawToolBar(ctx)
    }

    /**
    * Draw NoteNode tool bar
    */
    function drawNoteNodeToolBar() {
        let n = new NoteNode()
        var canvas = document.getElementById('NoteNodeToolBar')
        var ctx = canvas.getContext('2d')
        n.drawToolBar(ctx)
    }
})

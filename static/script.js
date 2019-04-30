//var Graph1 = require("./src/Graph.js")
const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
const TOOLBAR_WIDTH = 300
const TOOLBAR_HEIGHT = 350


// Since we are changing the canvas size in csss, our drawing looks blurry
// Fixing the canvas pixel by resize
canvas.width = canvas.clientWidth
canvas.height = canvas.clientHeight

// Keep track if the callNode button in the tool is pressed
var callNode_button = false;
var implicitParameterNode_button = false;
var addNote_button = false;
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
        if (selected_shape !== undefined) {
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

            resetToolBar()
        }
        // If the callNode button is pressed in the toolbar
        else if (callNode_button === true && !(selected_shape instanceof CallNode)) {
            let n1 = new CallNode()
            graph.add(n1, mousePoint);
            resetToolBar()
        }

        else if (selected_shape === undefined) {
            implicitParameterNode_button = false;
            callNode_button = false;
            addNote = false
        }

        if (addNote_button === true && selected_shape === undefined) {
            let n1 = new NoteNode()
            graph.add(n1, mousePoint);
            resetToolBar()
        }

        // If we unselected, the callNode button get reset
        if (selected_shape !== undefined) {
            dragStartPoint = mousePoint
            dragStartBounds = selected_shape.getBounds();
            //popUp(selected_shape.getPropertySheet());
            let something = 1;
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
function createPopUp(propertySheet, n, g) {
    let propertyName = Object.getOwnPropertyNames(propertySheet);
    let propertyValue = Object.values(propertySheet);
    let oldName = n.name;
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

    for (let i = 0; i < propertyName.length; i++) {
        // For loop for label
        var label = document.createElement("Label");
        label.for = "email"
        label.innerHTML = propertyName[i];
        form.appendChild(label);
        var input = document.createElement("input");
        input.placeholder = propertyValue[i];
        input.name = propertyName[i];
        input.id = propertyName[i];
        input.style.width = "100%";
        input.style.padding = "15px";
        input.style.margin = "5px 0 22px 0";
        input.style.border = "none";
        input.style.background = "#f1f1f1";
        input.oninput = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            n.setName(document.getElementById(propertyName[i]).value);
            g.draw();
        }
        form.appendChild(input);
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
        n.setName(oldName);
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


class Graph {
    constructor() {
        this.nodes = []
        this.edges = []
        this.nodesToBeRemoved = [];
        this.edgesToBeRemoved = [];
        this.needsLayout = true;
        this.minBounds;
    }

    connect(e, p1, p2) {
        let n1 = findNode(p1);
        let n2 = findNode(p2);
        if (n1 !== undefined) {
            e.connect(n1, n2);
            if (n1.addEdge(e, p1, p2) && e.getEnd() !== undefined) {
                this.edges.add(e);
                if (!this.nodes.contains(e.getEnd())) {
                    this.nodes.add(e.getEnd())
                }
                needsLayout = true;
                return true;
            }
        }
        return false;
    }
    add(n1, p) {
        let bounds = n1.getBounds();
        n1.translate(p.x - bounds.getX(), p.y - bounds.getY());

        var accepted = false;
        var insideANode = false;
        for (var i = this.nodes.length - 1; i >= 0 && !accepted; i--) {
            let parent = this.nodes[i];
            if (parent.contains(p)) {
                insideANode = true;
                if (parent.addNode(n1, p)) {
                    accepted = true;
                }
            }
        }
        if (insideANode && !accepted) {
            return false;
        }
        this.nodes.push(n1);
        this.needsLayout = true;
        return true;

    }
    findNode(p) {
        for (let i = this.nodes.length - 1; i >= 0; i--) {
            const n = this.nodes[i]
            if (n.contains(p)) {
                return n;
            }
        }
        return undefined;
    }

    findEdge(p) {
        for (let i = this.edges.length - 1; i >= 0; i--) {
            const e = this.edges[i];
            if (e.contains(p)) {
                return e;
            }
        }
        return undefined;
    }
    draw() {
        this.layout();
        for (const n of this.nodes) {
            n.draw();
        }
        for (const e of this.edges) {
            e.draw();
        }
    }

    removeNode(n) {
        if (this.nodesToBeRemoved.contains(n)) {
            return;
        }
        this.nodesToBeRemoved.add(n);
        for (let i = this.nodes.length - 1; i >= 0; i--) {
            let n = this.nodes[i];
            n.removeEdge(this, e);
        }
        needsLayout = true;
    }

    layout() {
        if (!this.needsLayout) {
            return;
        }
        //https://stackoverflow.com/questions/19957348/javascript-arrays-remove-all-elements-contained-in-another-array
        // this.nodes=this.nodes.filter(function (e)
        // {
        //   return this.nodesToBeRemoved.indexOf(e)<0;
        // })
        //
        // this.edges=this.edges.filter(function (e)
        // {
        //   return this.edgesToBeRemoved.indexOf(e)<0;
        // })
        this.nodesToBeRemoved = [];
        this.edgesToBeRemoved = [];

        for (let i = 0; i < this.nodes.length; i++) {
            let n = this.nodes[i];
            n.layout();
        }
        this.needsLayout = true;
    }

    getBounds() {
        let r = this.minBounds;
        for (let i = 0; i < this.nodes.length; i++) {
            let n = this.nodes[i];
            let b = n.getBounds();
            if (r === undefined) {
                r = b;
            }
            else {
                r.add(b);
            }
        }
        for (let i = 0; i < this.edges.length; i++) {
            let e = this.edges[i];
            r.add(e.getBounds());
        }

        if (r == null) {
            return new Rectangle2D(0, 0, 0, 0);
        }
        return new Rectangle2D(r.getX(), r.getY(),
            r.getWidth() + AbstractNode.SHADOW_GAP, r.getHeight() + AbstractNode.SHADOW_GAP);
    }

    getMinBounds() {
        return this.minBounds;
    }

    setMinBounds(newValue) {
        this.minBounds = newValue;
    }

    getNodes() {
        return this.nodes;
    }

    getEdges() {
        return this.edges;
    }

    getEdgesToRemove() {
        return this.edgesToBeRemoved;
    }
    addNode(n, p) {
        let bounds = n.getBounds();
        n.translate(p.x - bounds.getX(), p.y - bounds.getY());
        this.nodes.add(n);
    }

}

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

class AbstractNode {
    constructor() {
        this.children = [];
        parent = undefined;
        this.SHADOW_GAP = 4;
        this.SHADOW_COLOR = 'gray';
    }

    translate(dx, dy) {
        for (let i = 0; i < this.children.length; i++) {
            let n = this.children[i];
            n.translate(dx, dy);
        }
    }

    addEdge(e, p1, p2) {
        return e.getEnd() != undefined;
    }

    removeEdge(g, e) {
        g.getEdgesToRemove().add(e);
    }

    removeNode(g, e) {
        if (e === parent) {
            parent = undefined;
        }
        if (e.getParenet() === this) {
            for (let i = 0; i < children.length; i++) {
                if (children[i] === e) {
                    children.splice(i, e);
                }
            }
        }
    }

    addNode(n, p) {
        return false;
    }

    getParent() {
        return this.parent;
    }

    setParent(n) {
        this.parent = n;
    }

    getChildren() {
        return this.children;
    }

    addChild(index, node) {
        let oldParent = node.getParent();
        if (oldParent === undefined) {
            oldParent.removeChild(node);
        }
        children.add(index, node);
        node.setParent(this);
    }

    addChild(node) {
        addChild(children.length, node);
    }

    removeChild(node) {
        if (node.getParent() !== this) {
            return;
        }
        for (let i = 0; i < children.length; i++) {
            if (children[i] === e) {
                children.splice(i, e);
            }
        }
        node.setParent(undefined);
    }

    getShape() {
        return undefined;
    }

    setPersistenceDelegate(encode) {

    }
}


class RectangularNode extends AbstractNode {
    constructor() {
        super();
        this.bounds = new Rectangle2D(0, 0, 0, 0);
    }
    clone() {
        let myRectangularNode = new RectangularNode();
        let cloned = {};
        Object.assign(cloned, myRectangularNode);
        return cloned;
    }

    translate(dx, dy) {
        this.bounds.setX(this.bounds.getX() + dx);
        this.bounds.setY(this.bounds.getY() + dy);
        this.bounds.setHeight(this.bounds.getHeight());
        this.bounds.setWidth(this.bounds.getWidth());
        super.translate(dx, dy);
    }

    contains(p) {
        if (this.bounds.contains(p)) {
            return true
        }
        return undefined
    }

    getBounds() {
        return this.bounds;
    }

    setBounds(newBounds) // arguemnts is a rectangle
    {
        this.bounds = newBounds;
    }

    getConnectionPoint(d) {
        let slope = this.bounds.getHeight() / this.bounds.getWidth();
        let ex = d.getX();
        let ey = d.getY();
        let x = this.bounds.getCenterX();
        let y = this.bounds.getCenterY();

        if (ex != 0 && -slope <= ey / ex && ey / ex <= slope) {
            // intersects at left or right boundary
            if (ex > 0) {
                x = this.bounds.getMaxX();
                y += (this.bounds.getWidth() / 2) * ey / ex;
            }
            else {
                x = this.bounds.getX();
                y -= (this.bounds.getWidth() / 2) * ey / ex;
            }
        }
        else if (ey != 0) {
            // intersects at top or bottom
            if (ey > 0) {
                x += (this.bounds.getHeight() / 2) * ex / ey;
                y = this.bounds.getMaxY();
            }
            else {
                x -= (this.bounds.getHeight() / 2) * ex / ey;
                y = this.bounds.getY();
            }
        }
        return new point(x, y);
    }

    writeObject(out) {

    }
    writeRectangularShape() {

    }
    readObject() {

    }
    readRectangularShape() {

    }
    getShape() {
        return this.bounds;
    }

    removeEdge(g, e) {
        super.removeEdge(g, e);
    }
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

//******************************************************************************
//*******************************SequenceDiagram********************************
//******************************************************************************
class SequenceDiagramGraph extends Graph {
    add(n, p) {
        if (n instanceof CallNode) {
            let nodes = super.getNodes();
            var inside = false;
            while (!inside) {
                for (let node of nodes) {
                    if (node instanceof ImplicitParameterNode && node.contains(p)) {
                        inside = true;
                        n.setImplicitParameter(node);
                    }
                }
            }
            if (!inside) {
                return false;
            }
        }
        if (!super.add(n, p)) {
            return false;
        }
        return true;
    }

    removeEdge(e) {
        super.removeEdge(e);
        if (e instanceof CallEdge && e.getEnd().getChildren().size() == 0) {
            removeNode(e.getEnd());
        }
    }

    layout() {
        super.layout();
        let topLevelCalls = [];
        let objects = [];
        let nodes = super.getNodes();
        for (let node of nodes) {
            if (node instanceof CallNode && node.getParent() === undefined) {
                topLevelCalls.push(node);
            }
            else if (node instanceof ImplicitParameterNode) {
                objects.push(node);
            }
        }
        let edges = super.getEdges();
        for (let edge of edges) {
            if (edge instanceof CallEdge) {
                let end = e.getEnd();
                if (end instanceof CallNode) {
                    end.setSignaled(e.isSignal());
                }
            }
        }

        var left = 0;
        var top = 0;

        for (let i = 0; i < objects.length; i++) {
            let n = objects[i];
            n.translate(0, -n.getBounds().getY());
            top = Math.max(top, n.getTopRectangle().getHeight());
        }

        for (let i = 0; i < topLevelCalls.length; i++) {
            let call = topLevelCalls[i];
            call.layout();
        }
        for (let i = 0; i < nodes.length; i++) {
            let n = nodes[i];
            if (n instanceof CallNode) {
                top = Math.max(top, n.getBounds().getY() + n.getBounds().getHeight());
            }
        }

        top += 20;
        for (let i = 0; i < objects.length; i++) {
            let n = objects[i];
            let b = n.getBounds();
            n.setBounds(new Rectangle2D(b.getX(), b.getY(), b.getWidth(), top - b.getY()));

        }
    }

    draw() {
        this.layout();
        let nodes = super.getNodes();
        for (let i = 0; i < nodes.length; i++) {
            let n = nodes[i];
            if (!(n instanceof CallNode)) {
                n.draw();
            }
        }

        for (let i = 0; i < nodes.length; i++) {
            let n = nodes[i];
            if ((n instanceof CallNode)) {
                n.draw();
            }
        }

        let edges = super.getEdges();
        for (let i = 0; i < edges.length; i++) {
            e.draw();
        }
    }
}


class ImplicitParameterNode extends RectangularNode {
    constructor() {
        super();
        this.name = "Hello World" // MultiLineString
        this.DEFAULT_WIDTH = 80;
        this.DEFAULT_HEIGHT = 120;
        this.DEFAULT_TOP_HEIGHT = 60;
        super.setBounds(new Rectangle2D(0, 0, this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT));
        this.topHeight = this.DEFAULT_TOP_HEIGHT;
    }

    contains(p) {
        let bounds = super.getBounds();
        return bounds.getX() <= p.x &&
            p.x <= bounds.getX() + bounds.getWidth();
    }

    draw() {
        let top = this.getTopRectangle();
        let textWidth = ctx.measureText(this.name).width;
        let copyBounds = super.getBounds();
        if (textWidth + 10 > top.width) {
            super.getBounds().width = textWidth + 30;
            top = this.getTopRectangle();
        }
        top.draw();
        let xmid = super.getBounds().getCenterX();
        ctx.beginPath();
        ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
        ctx.moveTo(xmid, top.getMaxY());
        ctx.lineTo(xmid, super.getBounds().getMaxY());
        ctx.stroke()
        ctx.fillStyle = 'black'
        ctx.font = "12px Arial";
        ctx.fillText(this.name, top.x + 10, top.y + 30)

    }

    drawToolBar(ctx) {
        super.getBounds().width = TOOLBAR_WIDTH;
        let top = this.getTopRectangle();
        top.drawToolBar(ctx);
        let xmid = super.getBounds().getCenterX();
        ctx.beginPath();
        ctx.setLineDash([20, 12]);/*dashes are 5px and spaces are 3px*/
        ctx.moveTo(xmid, top.getMaxY());
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineTo(xmid, TOOLBAR_HEIGHT);
        ctx.stroke()
    }

    getTopRectangle() {
        let tRectangle = new Rectangle2D(super.getBounds().getX(), super.getBounds().getY(), super.getBounds().getWidth(), this.topHeight);
        return tRectangle;
    }

    getShape() {
        return getTopRectangle();
    }

    addEdge(e, p1, p2) {
        return false;
    }

    getConnectionPoint(d) {
        if (d.get() > 0) {
            return new point(super.getBounds().getMaxX(), super.getBounds().getMinY() + topHeight / 2);
        }
        else {
            return new point(super.getBounds().getX(), super.getBounds().getMinY() + topHeight / 2)
        }
    }

    layout() {
        //let b= name.getBounds(g2);
        //b.add(new Rectangle2D(0,0, this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT));
        //let top = new Rectangle2D(super.getBounds().getX(), super.getBounds().getY(), b.getWidth(), b.getHeight());
        //grid.snap(top);
        //super.setBounds(new Rectangle2D(top.getX(), top.getY(), top.getWidth(), super.getBounds().getHeight()));
        //topHeight=top.getHeight();
    }

    setName(n) {
        this.name = n;
    }

    getName() {
        return name;
    }

    clone() {
        let myImplicitParameterNode = new ImplicitParameterNode();
        let cloned = {};
        Object.assign(cloned, myImplicitParameterNode);
        return cloned;
    }

    addNode(n, p) {
        return n instanceof CallNode //|| typeof n === PointNode;
    }

    getPropertySheet() {
        let copyName = this.name;
        return {
            name: copyName,
        }
    }
}

// May change the function to class
class CallNode extends RectangularNode {
    constructor() {
        super();
        this.implicitParameter;
        this.signaled;
        this.openBottom = false;
        this.DEFAULT_WIDTH = 16;
        this.DEFAULT_HEIGHT = 30;
        this.CALL_YGAP = 20;
        super.setBounds(new Rectangle2D(0, 0, this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT));

    }
    draw() {
        let rec = super.getBounds();
        rec.draw();
        if (this.openBottom) {
            b = super.getBounds();
            var x1 = b.getX();
            var x2 = x1 + b.getWidth();
            var y1 = b.getY();
            var y3 = y1 + b.getHeight();
            var y2 = y3 - CALL_YGAP;

            // Draw line1
            ctx.beginPath();
            ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y1);
            ctx.stroke()

            // Draw line2
            ctx.beginPath();
            ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke()

            // Draw line3
            ctx.beginPath();
            ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
            ctx.moveTo(x2, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke()

            // Draw line4
            ctx.beginPath();
            ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
            ctx.moveTo(x1, y2);
            ctx.lineTo(x1, y3);
            ctx.stroke()

            // Draw line4
            ctx.beginPath();
            ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
            ctx.moveTo(x2, y2);
            ctx.lineTo(x2, y3);
            ctx.stroke()
        }
    }

    drawToolBar(ctx) {
        super.getBounds().width = TOOLBAR_WIDTH;
        super.getBounds().height = TOOLBAR_HEIGHT;
        let rec = super.getBounds();
        rec.drawToolBar(ctx);
        if (this.openBottom) {
            b = super.getBounds();
            var x1 = b.getX();
            var x2 = x1 + b.getWidth();
            var y1 = b.getY();
            var y3 = y1 + b.getHeight();
            var y2 = y3 - CALL_YGAP;

            // Draw line1
            ctx.beginPath();
            ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y1);
            ctx.stroke()

            // Draw line2
            ctx.beginPath();
            ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke()

            // Draw line3
            ctx.beginPath();
            ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
            ctx.moveTo(x2, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke()

            // Draw line4
            ctx.beginPath();
            ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
            ctx.moveTo(x1, y2);
            ctx.lineTo(x1, y3);
            ctx.stroke()

            // Draw line4
            ctx.beginPath();
            ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
            ctx.moveTo(x2, y2);
            ctx.lineTo(x2, y3);
            ctx.stroke()
        }
    }

    getImplicitParameter() {
        return this.implicitParameter;
    }

    /**
     Sets the implicit parameter of this call.
     @param newValue the implicit parameter node
     */
    setImplicitParameter(newValue) {
        this.implicitParameter = newValue;
    }
    getConnectionPoint(d) {
        if (d.getX() > 0) {
            return new Point2D(super.getBounds().getMaxX(),
                super.getBounds().getMinY());
        }
        else {
            return new Point2D(super.getBounds().getX(),
                super.getBounds().getMinY());
        }

    }

    addEdge(e, p1, p2) {
        let end = e.getEnd();
        if (end === undefined) {
            return false;
        }
        if (e instanceof ReturnEdge) {
            return end == super.getParent();
        }
        if (!(e instanceof CallEdge)) {
            return false;
        }
        let n = undefined;
        if (end instanceof CallNode) {
            let parent = this;
            while (parent !== undefined && end !== parent) {
                parent = parent.getParent();
            }
            if (end.getParent() === undefined && end !== parent) {
                n = end;
            }
            else {
                let c = new CallNode();
                c.implicitParameter = end.implicitParameter;
                e.connect(this, c);
                n = c;
            }
        }
        else if (end instanceof ImplicitParameterNode) {
            if (end.getTopRectangle().contains(p2)) {
                n = end;
                e.setMiddleLabel("\u00ABcreate\u00BB");
            }
            else {
                let c = new CallNode();
                c.implicitParameter = end;
                e.connect(this, c);
                n = c;
            }
        }
        else return false;

        var i = 0;
        let calls = getChildren();
        while (i < calls.length && calls[i].getBounds().getY() <= p1.getY()) {
            i++;
        }
        addChild(i, n);
        return true;
    }

    removeEdge(g, e) {
        if (e.getStart() === this) {
            removeChild(e.getEnd());
        }
        super.removeEdge(g, e);
    }

    removeNode(g, n) {
        if (n === getParent() || n === this.implicitParameter)
            g.removeNode(this);
    }

    findEdge(g, start, end) {
        // Collection edges = g.getEdges();
        // Iterator iter = edges.iterator();
        // while (iter.hasNext())
        // {
        //    Edge e = (Edge) iter.next();
        //    if (e.getStart() == start && e.getEnd() == end) return e;
        // }
        // return null;
    }

    layout() {
        if (this.implicitParameter === undefined) {
            return;
        }
        var xmid = this.implicitParameter.getBounds().getCenterX();

        for (let c = super.getParent(); c !== undefined; c = c.getParent()) {
            if (c.implicitParameter === this.implicitParameter) {
                xmid += super.getBounds.getWidth() / 2;
            }
        }

        super.translate(xmid - super.getBounds().getCenterX(), 0);

        var ytop = super.getBounds().getY() + this.CALL_YGAP;

        let calls = super.getChildren();
        for (var i = 0; i < calls.length; i++) {
            let n = calls[i];
            if (n instanceof ImplicitParameterNode) {
                n.translate(0, ytop - n.getTopRectangle().getCenterY());
                ytop += n.getTopRectangle().getHeight() / 2 + CALL_YGAP;
            }
            else if (n instanceof CallNode) {
                callEdge = findEdge(g, this, n);
                if (callEdge !== undefined) {
                    let edgeBounds = callEdge.getBounds(g2);
                    ytop += edgeBounds.getHeight() - CALL_YGAP;
                }

                n.translate(0, ytop - n.getBounds().getY());
                n.layout(g, g2, grid);
                if (n.signaled) {
                    ytop += CALL_YGAP;
                }
                else {
                    ytop += n.getBounds().getHeight() + CALL_YGAP;
                }
            }
        }
        if (this.openBottom) {
            tyop += 2 * CALL_YGAP;
        }
        let b = super.getBounds();
        var minHeight = this.DEFAULT_HEIGHT;
        let returnEdge = this.findEdge();
        if (returnEdge !== undefined) {
            let edgeBounds = returnEdge.getBounds(g2);
            minHeight = Math.max(minHeight, edgeBounds.getHeight());
        }
        super.setBounds(new Rectangle2D(b.getX(), b.getY(), b.getWidth(),
            Math.max(minHeight, ytop - b.getY())));
    }

    addNode(n, p) {
        return n instanceof PointNode;
    }
    setSignaled(newValue) {
        this.signaled = newValue;
    }

    isOpenBottom() {
        return this.openBottom;
    }

    setOpenBottom(newValue) {
        this.openBottom = newValue;
    }

    getPropertySheet() {
        let copyOpenBottom = this.openBottom;
        let copyImplicitParameter = this.implicitParameter;
        return {
            openBottom: copyOpenBottom,
        }
    }


}

class NoteNode extends RectangularNode {

    constructor() {
        super();
        this.DEFAULT_WIDTH = 60;
        this.DEFAULT_HEIGHT = 40;
        this.FOLD_X = 8;
        this.FOLD_Y = 8;
        this.color = "yellow";
        this.text = "Text";
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

    layout() {
        let b = ctx.measureText(this.text);
        let bw = ctx.measureText(this.text).width;
        let bh = 12; //parseInt(ctx.font);
        let bounds = super.getBounds();
        b = new Rectangle2D(bounds.getX(), bounds.getY(),
            Math.max(bw, this.DEFAULT_WIDTH), Math.max(bh, this.DEFAULT_HEIGHT));
        super.setBounds(b);
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
        // let textWidth = ctx.measureText(this.text).width;
        // ctx.beginPath();
        // ctx.moveTo(0,0);
        // ctx.lineTo(this.DEFAULT_WIDTH, 0);
        // ctx.lineTo(this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT);
        // ctx.lineTo(0, this.DEFAULT_HEIGHT);
        // ctx.moveTo(this.DEFAULT_WIDTH*3/4, 0); //fold
        // ctx.lineTo(this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT/4);
        // ctx.fillStyle = this.color;
        // ctx.fill();
        // ctx.stroke();
        // ctx.font = "8px Arial";
        // ctx.fillText(this.text, this.DEFAULT_WIDTH, this.DEFAULT_WIDTH);

        let ctx = canvas.getContext('2d');
        ctx.fillStyle = this.color;
        ctx.fillRect(super.getBounds().getX(), super.getBounds().getY(),
            this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT);
        ctx.strokeRect(super.getBounds().getX(), super.getBounds().getY(),
            this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT);
        ctx.beginPath(); //fold
        ctx.clearRect(super.getBounds().getX() + this.DEFAULT_WIDTH * 3 / 4,
            super.getBounds().getY() - 1, this.DEFAULT_WIDTH / 4 + 1, this.DEFAULT_HEIGHT / 4);
        ctx.moveTo(super.getBounds().getX() + this.DEFAULT_WIDTH * 3 / 4,
            super.getBounds().getY());
        ctx.lineTo(super.getBounds().getX() + this.DEFAULT_WIDTH,
            super.getBounds().getY() + this.DEFAULT_HEIGHT / 4);
        ctx.lineTo(super.getBounds().getX() + this.DEFAULT_WIDTH * 3 / 4,
            super.getBounds().getY() + this.DEFAULT_HEIGHT / 4);
        ctx.closePath();

        let textWidth = ctx.measureText(this.text).width; //text
        if (textWidth + 10 > this.DEFAULT_WIDTH) {
            super.getBounds().width = textWidth + 25;
            this.DEFAULT_WIDTH += 25;
        }
        ctx.fillStyle = 'black';
        ctx.font = '12pt Arial';
        ctx.fillText(this.text, super.getBounds().getX() + 10, super.getBounds().getY() + 25);
        ctx.stroke();
    }

    drawToolBar(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(super.getBounds().getX(), super.getBounds().getY(),
            TOOLBAR_WIDTH, TOOLBAR_HEIGHT/4);
        ctx.strokeRect(super.getBounds().getX(), super.getBounds().getY(),
            TOOLBAR_WIDTH, TOOLBAR_HEIGHT/4);
				ctx.beginPath(); //fold
        ctx.clearRect(super.getBounds().getX() + TOOLBAR_WIDTH * 3 / 4,
            super.getBounds().getY(), TOOLBAR_WIDTH / 4, TOOLBAR_HEIGHT / 12);
        ctx.moveTo(super.getBounds().getX() + TOOLBAR_WIDTH * 3 / 4,
            super.getBounds().getY());
        ctx.lineTo(super.getBounds().getX() + TOOLBAR_WIDTH,
            super.getBounds().getY() + TOOLBAR_HEIGHT / 12);
        ctx.lineTo(super.getBounds().getX() + TOOLBAR_WIDTH * 3 / 4,
            super.getBounds().getY() + TOOLBAR_HEIGHT / 12);
        ctx.closePath();
				ctx.fillStyle = 'white';
				ctx.fill();
				ctx.stroke();
    }

    getShape() {
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
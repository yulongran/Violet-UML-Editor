
'use strict'
var LineStyle={SOLID:"solid",DASHED:"dashed"};
var ArrowHead={NONE:"none",V:"V",TRIANGLE:"triangle",DIAMOND:"diamond",BLACKDIAMOND:"blackdiamond"};
var Direction={LEFT:"left",RIGHT:"right"};


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
	getBounds(){
		return this;
	}
	getConnectionPoint(toEnd){
		return new Point2D(this.getX(),this.getY());
	}
}
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
		console.log("here");
		let pm=new Point2D(Math.round((this.getX1()+this.getX2())/2),Math.round((this.getY1()+this.getY2())/2));
		console.log(pm);
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
    

}



/**
   A class that supplies convenience implementations for
   a number of methods in the Edge interface
*/
class AbstractEdge
{
	
	constructor(){
   let start;
   let end;
	}
   clone()
   {
      /*try
      {
         return super.clone();
      }
      catch (CloneNotSupportedException exception)
      {
         return null;
      }
	  */
   }

   connect(s, e)
   {
      this.start = s;
      this.end = e;
   }

   getStart()
   {
      return this.start;
   }

   getEnd()
   {
      return this.end;
   }
	//returns bounds as a line since lines are horizontal
   getBounds()
   {
      conn = getConnectionPoints();
      let r = new Rectangle2D(conn.getX1(), conn.getY1(),conn.getX1-conn.getX2,conn.getY1-conn.getY2);
      return r;
   }

   getConnectionPoints()
   {
      let startBounds = this.start.getBounds();
      let endBounds = this.end.getBounds();
      let startCenter = new Point2D(
         startBounds.getCenterX(), startBounds.getCenterY());
      let endCenter = new Point2D(
         endBounds.getCenterX(), endBounds.getCenterY());
      let toEnd;
      return new Line2D(
         this.start.getConnectionPoint(toEnd),
         this.end.getConnectionPoint(toEnd));
   }
}


/**
   An edge that is composed of multiple line segments
*/
class SegmentedLineEdge extends AbstractEdge
{ 
//   private static JLabel label = new JLabel();

   /**
      Costructs an edge with no adornments.
   */
   constructor()
   {
	   super();
     let lineStyle = LineStyle.SOLID;
     let startArrowHead = ArrowHead.NONE;
     let endArrowHead = ArrowHead.NONE;
     let startLabel = "";
     let middleLabel = "";
     let endLabel = "";
   }
   setLineStyle(newValue) { this.lineStyle = newValue; }
   getLineStyle() { return this.lineStyle; }
   setStartArrowHead(newValue) { this.startArrowHead = newValue; }
   getStartArrowHead() { return this.startArrowHead; }
   setEndArrowHead(newValue) { this.endArrowHead = newValue; }
   getEndArrowHead() { return this.endArrowHead; }
   setStartLabel(newValue) { this.startLabel = newValue; }
   getStartLabel() { return this.startLabel;}
   setMiddleLabel(newValue) { this.middleLabel = newValue; }
   getMiddleLabel() { return this.middleLabel; }
   setEndLabel(newValue) { this.endLabel = newValue; }
   getEndLabel() { return this.endLabel; }
 
	draw(p1,p2)
   { 
	const c=document.getElementById("myCanvas");
	const ctx = c.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(p1.getX(),p1.getY());
	let style=this.getLineStyle();
	if(style=="dashed"){
	ctx.setLineDash([5, 15]);
	}
	ctx.lineTo(p2.getX(),p2.getY());
	ctx.stroke();	
	ctx.setLineDash([]);
	var direction;
	if(p1.getX()>p2.getX()){
		direction=Direction.RIGHT;
	}
	else{
		direction=Direction.LEFT;
	}
	this.drawArrowHeads(p1,p2,direction);
	
	this.drawPositionedStrings();
	}

	drawArrowHeads(p1,p2,direction){
		if(this.getStartArrowHead()=="V"){
				if(direction=="left"){			
					const c=document.getElementById("myCanvas");
					const ctx = c.getContext("2d");
                    ctx.beginPath();
					ctx.setLineDash([]);
					ctx.moveTo(p1.getX(),p1.getY());
					ctx.lineTo(p1.getX()+10,p1.getY()+10);
					ctx.moveTo(p1.getX(),p1.getY());
					ctx.lineTo(p1.getX()+10,p1.getY()-10);
					ctx.stroke();
				}
				else{
					const c=document.getElementById("myCanvas");
					const ctx = c.getContext("2d");
                    ctx.beginPath();
					ctx.setLineDash([]);
					ctx.moveTo(p1.getX(),p1.getY());
					ctx.lineTo(p1.getX()-10,p1.getY()+10);
					ctx.moveTo(p1.getX(),p1.getY());
					ctx.lineTo(p1.getX()-10,p1.getY()-10);
					ctx.stroke();					
				}
		}		
		if(this.getEndArrowHead()=="V"){
					if(direction=="right"){			
					const c=document.getElementById("myCanvas");
					const ctx = c.getContext("2d");
                    ctx.beginPath();
					ctx.setLineDash([]);
					ctx.moveTo(p2.getX(),p2.getY());
					ctx.lineTo(p2.getX()+10,p2.getY()+10);
					ctx.moveTo(p2.getX(),p2.getY());
					ctx.lineTo(p2.getX()+10,p2.getY()-10);
					ctx.stroke();
				}
				else{
					const c=document.getElementById("myCanvas");
					const ctx = c.getContext("2d");
                    ctx.beginPath();
					ctx.setLineDash([]);
					ctx.moveTo(p2.getX(),p2.getY());
					ctx.lineTo(p2.getX()-10,p2.getY()+10);
					ctx.moveTo(p2.getX(),p2.getY());
					ctx.lineTo(p2.getX()-10,p2.getY()-10);
					ctx.stroke();					
				}
		}
		if(this.getStartArrowHead()=="triangle"){
			console.log("here");
				if(direction=="left"){			
					const c=document.getElementById("myCanvas");
					const ctx = c.getContext("2d");
                    ctx.beginPath();
					ctx.setLineDash([]);
					ctx.moveTo(p1.getX(),p1.getY());
					ctx.lineTo(p1.getX()+10,p1.getY()+10);
					ctx.moveTo(p1.getX(),p1.getY());
					ctx.lineTo(p1.getX()+10,p1.getY()-10);
					ctx.lineTo(p1.getX()+10,p1.getY()+10);
					ctx.stroke();
				}
				else{
					const c=document.getElementById("myCanvas");
					const ctx = c.getContext("2d");
					ctx.beginPath();
					ctx.moveTo(p1.getX(),p1.getY());
					ctx.lineTo(p1.getX()-10,p1.getY()+10);
					ctx.moveTo(p1.getX(),p1.getY());
					ctx.lineTo(p1.getX()-10,p1.getY()-10);
					ctx.lineTo(p1.getX()-10,p1.getY()+10);
					ctx.stroke();					
				}
		}
		if(this.getEndArrowHead()=="triangle"){
			console.log("here");
				if(direction=="right"){			
					const c=document.getElementById("myCanvas");
					const ctx = c.getContext("2d");
                    ctx.beginPath();
					ctx.setLineDash([]);
					ctx.moveTo(p2.getX(),p2.getY());
					ctx.lineTo(p2.getX()+10,p2.getY()+10);
					ctx.moveTo(p2.getX(),p2.getY());
					ctx.lineTo(p2.getX()+10,p2.getY()-10);
					ctx.lineTo(p2.getX()+10,p2.getY()+10);
					ctx.stroke();
				}
				else{
					const c=document.getElementById("myCanvas");
					const ctx = c.getContext("2d");
					ctx.beginPath();
					ctx.moveTo(p2.getX(),p2.getY());
					ctx.lineTo(p2.getX()-10,p2.getY()+10);
					ctx.moveTo(p2.getX(),p2.getY());
					ctx.lineTo(p2.getX()-10,p2.getY()-10);
					ctx.lineTo(p2.getX()-10,p2.getY()+10);
					ctx.stroke();					
				}
		}
		if(this.getStartArrowHead()=="diamond"||this.getStartArrowHead()=="blackdiamond"){
					const c=document.getElementById("myCanvas");
					const ctx = c.getContext("2d");
					
					if(direction=="left"){
					
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(p1.getX(),p1.getY());
					ctx.lineTo(p1.getX()+10,p1.getY()+10);
					ctx.moveTo(p1.getX(),p1.getY());
					ctx.lineTo(p1.getX()+10,p1.getY()-10);
					ctx.lineTo(p1.getX()+20,p1.getY());
					ctx.lineTo(p1.getX()+10,p1.getY()+10);
					}
					else{
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(p1.getX(),p1.getY());
					ctx.lineTo(p1.getX()-10,p1.getY()+10);
					ctx.moveTo(p1.getX(),p1.getY());
					ctx.lineTo(p1.getX()-10,p1.getY()-10);
					ctx.lineTo(p1.getX()-20,p1.getY());
					ctx.lineTo(p1.getX()-10,p1.getY()+10);	
					}
					if(this.getStartArrowHead()=="diamond"){
						ctx.fillStyle="white";
					}
						ctx.fill();
						ctx.fillStyle="black";
						ctx.stroke();
		}
		if(this.getEndArrowHead()=="diamond"||this.getEndArrowHead()=="blackdiamond"){
					const c=document.getElementById("myCanvas");
					const ctx = c.getContext("2d");
					
					if(direction=="right"){
					
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(p2.getX(),p2.getY());
					ctx.lineTo(p2.getX()+10,p2.getY()+10);
					ctx.moveTo(p2.getX(),p2.getY());
					ctx.lineTo(p2.getX()+10,p2.getY()-10);
					ctx.lineTo(p2.getX()+20,p2.getY());
					ctx.lineTo(p2.getX()+10,p2.getY()+10);
					}
					else{
					ctx.setLineDash([]);
					ctx.beginPath();
					ctx.moveTo(p2.getX(),p2.getY());
					ctx.lineTo(p2.getX()-10,p2.getY()+10);
					ctx.moveTo(p2.getX(),p2.getY());
					ctx.lineTo(p2.getX()-10,p2.getY()-10);
					ctx.lineTo(p2.getX()-20,p2.getY());
					ctx.lineTo(p2.getX()-10,p2.getY()+10);	
					}
					if(this.getEndArrowHead()=="diamond"){
						ctx.fillStyle="white";
					}
						ctx.fill();
						ctx.fillStyle="black";
						ctx.stroke();
		}
		else{}
	}
	
	drawPositionedStrings(){
		let line=this.getConnectionPoints();
		if(this.getStartLabel()!==undefined){
		this.drawString(this.getStartLabel(),line.getP1());
		}
		
		if(this.getMiddleLabel()!==undefined){
		this.drawString(this.getMiddleLabel(),line.getPM());
		}
		if(this.getEndLabel()!==undefined){
		this.drawString(this.getEndLabel(),line.getP2());
		}
	
	}
   drawString(s,p)
   {
    const c=document.getElementById("myCanvas");
	const ctx = c.getContext("2d");
	
	ctx.font = '20px serif';
	ctx.fillText(s, p.getX(),p.getY());   
   }

getBounds()
   {
      return super.getBounds();
   }

//add this in
getHeadBounds(){

}
  contains(aPoint)
   {
if(getBounds().contains(aPoint)||getHeadBounds().contains(aPoint)){
return true;
}
return false;
   }

}



document.addEventListener('DOMContentLoaded', function () {

var edge=new SegmentedLineEdge();
var p1=new Rectangle2D(30,400,1,1);
var p2=new Rectangle2D(500,400,1,1);
//edge.draw(p1,p2);
const c=document.getElementById("myCanvas");
const ctx = c.getContext("2d");
edge.connect(p1,p2);
//edge.setStartLabel("Start");
//edge.setMiddleLabel("Middle");
//edge.setEndLabel("End");
//edge.drawPositionedStrings();
//edge.setLineStyle(LineStyle.SOLID);
//edge.setStartArrowHead(ArrowHead.DIAMOND);
//edge.setEndArrowHead(ArrowHead.DIAMOND);
edge.draw(p1,p2);
});

'use strict'
var LineStyle={SOLID:{"name":"solid",
"applyStyle":function(){

},
"revertStyle":function(){

}
},DOTTED:{"name":"dotted",
"applyStyle":function(){
	const c=document.getElementById("myCanvas");
	const ctx = c.getContext("2d");
	ctx.setLineDash([5, 3]);
},
"revertStyle":function(){
	const c=document.getElementById("myCanvas");
	const ctx = c.getContext("2d");
	ctx.setLineDash([]);
}
}
};
var ArrowHead={NONE:"none",V:{"name":"V",
"drawMethod":function(p1,p2,direction,start) {
if(start){
				if(direction.getX()==1){
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
else{
					if(direction.getX()==-1){
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
},
"getHeadBounds":function(p1,p2,direction,start) {
if(start){
				if(direction.getX()==1){

					return new Rectangle2D(p1.getX(),p1.getY()-10,10,20);
				}
				else{
					return new Rectangle2D(p1.getX()-10,p1.getY()-10,10,20);
				}
}
else{
					if(direction.getX()==-1){
					return new Rectangle2D(p2.getX(),p2.getY()-10,10,20);

				}
				else{
					return new Rectangle2D(p2.getX()-10,p2.getY()-10,10,20);
				}
		}
},

},
TRIANGLE:{"name":"triangle",
"drawMethod":function(p1,p2,direction,start){
	if(start){
		if(direction.getX()==1){
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
	else{
		if(direction.getX()==-1){
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

},
"getHeadBounds":function(p1,p2,direction,start) {
if(start){
				if(direction.getX()==1){
					return new Rectangle2D(p1.getX(),p1.getY()-10,10,20);
				}
				else{
					return new Rectangle2D(p1.getX()-10,p1.getY()-10,10,20);
				}
}
else{
					if(direction.getX()==-1){
					return new Rectangle2D(p2.getX(),p2.getY()-10,10,20);

				}
				else{
					return new Rectangle2D(p2.getX()-10,p2.getY()-10,10,20);
				}
		}
},
},

DIAMOND:{"name":"diamond",
"drawMethod":function(p1,p2,direction,start){
if(start){
					const c=document.getElementById("myCanvas");
					const ctx = c.getContext("2d");
					if(direction.getX()==1){

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
						ctx.fillStyle="white";
						ctx.fill();
						ctx.fillStyle="black";
						ctx.stroke();
		}
		else {
			const c=document.getElementById("myCanvas");
					const ctx = c.getContext("2d");

					if(direction.getX()==-1){
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
						ctx.fillStyle="white";
						ctx.fill();
						ctx.fillStyle="black";
						ctx.stroke();

		}
}

,"getHeadBounds":function(p1,p2,direction,start) {
if(start){
				if(direction.getX()==1){
					return new Rectangle2D(p1.getX(),p1.getY()-10,20,20);
				}
				else{
					return new Rectangle2D(p1.getX()-20,p1.getY()-10,20,20);
				}
}
else{
					if(direction.getX()==-1){
					return new Rectangle2D(p2.getX(),p2.getY()-10,20,20);

				}
				else{
					return new Rectangle2D(p2.getX()-20,p2.getY()-10,20,20);
				}
		}
},
},

BLACKDIAMOND:{"name":"blackdiamond",

"drawMethod":function(p1,p2,direction,start){
	if(start){
		const c=document.getElementById("myCanvas");
					const ctx = c.getContext("2d");
					if(direction.getX()==1){

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
						ctx.fill();
						ctx.fillStyle="black";
						ctx.stroke();
	}
	else{
			const c=document.getElementById("myCanvas");
					const ctx = c.getContext("2d");
					if(direction.getX()==-1){
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
						ctx.fill();
						ctx.fillStyle="black";
						ctx.stroke();
	}
},
"getHeadBounds":function(p1,p2,direction,start) {
if(start){
				if(direction.getX()==1){
					return new Rectangle2D(p1.getX(),p1.getY()-10,20,20);
				}
				else{
					return new Rectangle2D(p1.getX()-20,p1.getY()-10,20,20);
				}
}
else{
					if(direction.getX()==-1){
					return new Rectangle2D(p2.getX(),p2.getY()-10,20,20);

				}
				else{
					return new Rectangle2D(p2.getX()-20,p2.getY()-10,20,20);
				}
		}
},

}




};

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

   constructor(p,q)
   {
	   let x;
	   let y;
	   if(p instanceof Point2D &&q instanceof Point2D){
		this.x=q.getX() - p.getX();
		this.y=q.getY() - p.getY();
	   }
	   else{
		   this.x=p;
		   this.y=q;
	   }
	let length = Math.sqrt(this.x * this.x + this.y * this.y);
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
		return new Direction(
         Math.round(this.x * Math.cos(a) - this.y * Math.sin(a)),Math.round(
         this.x * Math.sin(a) + this.y * Math.cos(a)));

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
	const c=document.getElementById("myCanvas");
	const ctx = c.getContext("2d");
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
      let conn = this.getConnectionPoints();
      let r = conn;
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
      let toEnd = new Direction(startCenter, endCenter);
      return new Line2D(
         this.start.getConnectionPoint(toEnd),
         this.end.getConnectionPoint(toEnd.turn(180)));
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

	draw()
   {


	let line=this.getConnectionPoints();
	let p1=line.getP1();
	let p2=line.getP2();
	const c=document.getElementById("myCanvas");
	const ctx = c.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(p1.getX(),p1.getY());
	let style=this.getLineStyle();
	if(style!==undefined){
	style.applyStyle();
	}
	ctx.lineTo(p2.getX(),p2.getY());
	ctx.stroke();	
	if(style!==undefined){
	style.revertStyle();
	}
	var direction=new Direction(p1,p2);
	this.drawArrowHeads(p1,p2,direction);
	this.drawPositionedStrings();
	}

	drawArrowHeads(p1,p2,direction){
		
		if(this.getStartArrowHead()!==undefined)
		this.getStartArrowHead().drawMethod(p1,p2,direction,true);

		if(this.getEndArrowHead().drawMethod!==undefined)
		this.getEndArrowHead().drawMethod(p1,p2,direction,false);

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
//protect against undefined
contains(aPoint)
{
	   let line=this.getConnectionPoints();
	   let p1=line.getP1();
	   let p2=line.getP2();
		var direction=new Direction(p1,p2);
		//const c=document.getElementById("myCanvas");
		//const ctx = c.getContext("2d");
		//ctx.rect(this.getStartArrowHead().getHeadBounds(p1,p2,direction,true).getX(),this.getStartArrowHead().getHeadBounds(p1,p2,direction,true).getY(),this.getStartArrowHead().getHeadBounds(p1,p2,direction,true).getWidth(),this.getStartArrowHead().getHeadBounds(p1,p2,direction,true).getHeight());
		//ctx.rect(this.getEndArrowHead().getHeadBounds(p1,p2,direction,false).getX(),this.getEndArrowHead().getHeadBounds(p1,p2,direction,false).getY(),this.getEndArrowHead().getHeadBounds(p1,p2,direction,false).getWidth(),this.getEndArrowHead().getHeadBounds(p1,p2,direction,false).getHeight());
		//ctx.stroke();
		//console.log(this.getStartArrowHead().getHeadBounds(p1,p2,direction,true));
		//console.log(this.getEndArrowHead().getHeadBounds(p1,p2,direction,false));		
		
		if(this.getStartArrowHead()!==undefined){
			if(this.getStartArrowHead().getHeadBounds(p1,p2,direction,true).contains(aPoint)){
				return true;
			}
		}
		
		if(this.getEndArrowHead()!==undefined){
			if(this.getEndArrowHead().getHeadBounds(p1,p2,direction,false).contains(aPoint)){
				return true;
			}
		}

	if(this.getBounds().contains(aPoint)||this.getStartArrowHead().getHeadBounds(p1,p2,direction,true).contains(aPoint)||this.getEndArrowHead().getHeadBounds(p1,p2,direction,false).contains(aPoint)){
		return true;
	}
return false;
}

}


class CallEdge extends SegmentedLineEdge
{
   constructor()
   {
	super();
      let signal;
	  this.setSignal(false);
   }
   isSignal() { return signal; }
   setSignal(newValue)
   {
      this.signal = newValue;
      if (this.signal){
		  //FUCK implement halfV????

         //super.setEndArrowHead(ArrowHead.HALF_V);
         this.setEndArrowHead(ArrowHead.V);
      }
	  else
        this.setEndArrowHead(ArrowHead.V);
   }

   getPoints()
   {
      let a = [];
      let n = this.getEnd();
      let start = this.getStart().getBounds();
      let end = n.getBounds();

      if (n instanceof CallNode &&(n.getImplicitParameter() ==(this.getStart()).getImplicitParameter()))
      {
         let  p = new Point2D(start.getMaxX(), end.getY() - CallNode.CALL_YGAP / 2);
         let q = new Point2D(end.getMaxX(), end.getY());
         let s = new Point2D(q.getX() + end.getWidth(), q.getY());
         let r = new Point2D(s.getX(), p.getY());
         a.push(p);
         a.push(r);
         a.push(s);
         a.push(q);
      }
      else if (n instanceof PointNode) // show nicely in tool bar
      {
         a.push(new Point2D(start.getMaxX(), start.getY()));
         a.push(new Point2D(end.getX(), start.getY()));
      }
      else
      {
         let  d = new Direction(start.getX() - end.getX(), 0);
         endPoint = getEnd().getConnectionPoint(d);

         if (start.getCenterX() < endPoint.getX())
            a.add(new Point2D.Double(start.getMaxX(),
                     endPoint.getY()));
         else
            a.add(new Point2D.Double(start.getX(),
                     endPoint.getY()));
         a.add(endPoint);
      }
      return a;
   }
}
/**
   An edge that joins two call nodes.
*/
class ReturnEdge extends SegmentedLineEdge
{
   constructor()
   {
	super();
      this.setEndArrowHead(ArrowHead.V);
      this.setLineStyle(LineStyle.DOTTED);
   }

   getPoints()
   {
      let a = [];
      let n = this.getEnd();
      let start = this.getStart().getBounds();
      let end = this.getEnd().getBounds();
      if (n instanceof PointNode) // show nicely in tool bar
      {
         a.push(new Point2D(end.getX(), end.getY()));
         a.push(new Point2D(start.getMaxX(), end.getY()));
      }
      else if (start.getCenterX() < end.getCenterX())
      {
         a.push(new Point2D(start.getMaxX(), start.getMaxY()));
         a.push(new Point2D(end.getX(), start.getMaxY()));
      }
      else
      {
         a.push(new Point2D(start.getX(), start.getMaxY()));
         a.push(new Point2D(end.getMaxX(), start.getMaxY()));
      }
      return a;
   }
}





document.addEventListener('DOMContentLoaded', function () {

var edge=new CallEdge();
var p2=new Rectangle2D(100,400,40,40);
var p1=new Rectangle2D(500,300,40,40);
//edge.draw(p1,p2);
const c=document.getElementById("myCanvas");
const ctx = c.getContext("2d");
edge.connect(p1,p2);
edge.setStartLabel("Start");
//edge.setMiddleLabel("Middle");
edge.setEndLabel("End");
//edge.drawPositionedStrings();
edge.draw();
//console.log(edge);
//let line=new Line2D(p1,p2);
let testPoint=new Point2D(500,300);
//let point1=new Point2D(500,300)
//let point2=new Point2D(30,400)
//var direction=new Direction(point1,point2);
//console.log(direction.getX());
console.log(edge.contains(testPoint));
//console.log(edge.getPoints());
ArrowHead['test']="test";
console.log(ArrowHead);

});

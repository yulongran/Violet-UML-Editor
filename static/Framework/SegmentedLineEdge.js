'use strict'
var LineStyle={SOLID:{"name":"solid",
"applyStyle":function(){
	const c=document.getElementById("myCanvas");
	const ctx = c.getContext("2d");
	ctx.setLineDash([]);
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
     this.lineStyle = LineStyle.SOLID;
     this.startArrowHead = ArrowHead.NONE;
     this.endArrowHead = ArrowHead.NONE;
     this.startLabel = "";
     this.middleLabel = "";
     this.endLabel = "";
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

		if(this.getStartArrowHead().drawMethod!==undefined)
		{
			this.getStartArrowHead().drawMethod(p1,p2,direction,true);
		}

		if(this.getEndArrowHead().drawMethod!==undefined)
		{
			this.getEndArrowHead().drawMethod(p1,p2,direction,false);
		}

	}

	drawPositionedStrings(){
		let line=super.getConnectionPoint();
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
	ctx.fillStyle = 'black'
	//ctx.font = '20px serif';
	ctx.fillText(s, p.getX(),p.getY());
   }

  getConnectionPoints()
	{
		let points = this.getPoints();
		return new Line2D(points[0], points[points.length-1]);

	}

contains(aPoint)
{
	   let line=this.getConnectionPoints();
	   let p1=line.getP1();
	   let p2=line.getP2();
		var direction=new Direction(p1,p2);
		if(this.getStartArrowHead()!==undefined&&this.getStartArrowHead()==ArrowHead.NONE){
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

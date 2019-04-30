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
	style.applyStyle();
	ctx.lineTo(p2.getX(),p2.getY());
	ctx.stroke();
	style.revertStyle();
	var direction=new Direction(p1,p2);
	this.drawArrowHeads(p1,p2,direction);
	this.drawPositionedStrings();
	}

	drawArrowHeads(p1,p2,direction){

		if(this.getStartArrowHead().drawMethod!==undefined)
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

contains(aPoint)
{
	   let line=this.getConnectionPoints();
	   let p1=line.getP1();
	   let p2=line.getP2();
		var direction=new Direction(p1,p2);
		const c=document.getElementById("myCanvas");
		const ctx = c.getContext("2d");
		ctx.rect(this.getStartArrowHead().getHeadBounds(p1,p2,direction,true).getX(),this.getStartArrowHead().getHeadBounds(p1,p2,direction,true).getY(),this.getStartArrowHead().getHeadBounds(p1,p2,direction,true).getWidth(),this.getStartArrowHead().getHeadBounds(p1,p2,direction,true).getHeight());
		ctx.rect(this.getEndArrowHead().getHeadBounds(p1,p2,direction,false).getX(),this.getEndArrowHead().getHeadBounds(p1,p2,direction,false).getY(),this.getEndArrowHead().getHeadBounds(p1,p2,direction,false).getWidth(),this.getEndArrowHead().getHeadBounds(p1,p2,direction,false).getHeight());
		ctx.stroke();
		console.log(this.getStartArrowHead().getHeadBounds(p1,p2,direction,true));
		console.log(this.getEndArrowHead().getHeadBounds(p1,p2,direction,false));
	if(this.getBounds().contains(aPoint)||this.getStartArrowHead().getHeadBounds(p1,p2,direction,true).contains(aPoint)||this.getEndArrowHead().getHeadBounds(p1,p2,direction,false).contains(aPoint)){
		return true;
	}
return false;
}

}

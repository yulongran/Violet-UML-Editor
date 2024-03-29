'use strict'
/** 
 *  @fileOverview CallEdge that implementes SegmentedLineEdge
 *
 *  @author       Jason Tang
 *  @requires     ReturnEdge.js
 */
class ReturnEdge extends SegmentedLineEdge {
	
	/**
	* Constructor for the SegmentedLineEdge class
	* @constructor
	*/	
    constructor() {
        super();
        this.setEndArrowHead(ArrowHead.V);
        this.setLineStyle(LineStyle.DOTTED);
    }

	/**
	* Gets the array of Points of the ReturnEdge
	* @returns {Array} Points of the ReturnEdge
	*/
    getPoints() {
        let a = [];
        let n = this.getEnd();
        let start = this.getStart().getBounds();
        let end = this.getEnd().getBounds();
        // if (n instanceof PointNode) // show nicely in tool bar
        // {
        //     a.push(new Point2D(end.getX(), end.getY()));
        //     a.push(new Point2D(start.getMaxX(), end.getY()));
        // }
        if (start.getCenterX() < end.getCenterX()) {
            a.push(new Point2D(start.getMaxX(), start.getMaxY()));
            a.push(new Point2D(end.getX(), start.getMaxY()));
        }
        else {
            a.push(new Point2D(start.getX(), start.getMaxY()));
            a.push(new Point2D(end.getMaxX(), start.getMaxY()));
        }
        return a;
    }
    
	/**
	* Gets the peropertySheet of the CallEdge
	* @returns {JSON} Properties of the CallEdge
	*/	
	getProperty() {
      let copylineStyle= this.LineStyle;
      let copyStartArrowHead=this.ArrowHead;
      let copyEndArrowHead=this.ArrowHead;
      let copyStartLabel=this.startLabel;
      let copyMiddleLabel=this.middleLabel;
      let copyEndLabel= this.endLabel;
      var myEdge= this;
      return {
        LineStyle:{
                   LineStyle: copylineStyle,
                   selectBar: ["SOLID", "DOTTED"],
                   setLineStyle(n)
                   {
                     if(n === "SOLID")
                     myEdge.setLineStyle(LineStyle.SOLID);
                     else if(n === "DOTTED")
                     {
                       myEdge.setLineStyle(LineStyle.DOTTED);
                     }
                   },},
       StartArrowHead:{
         StartArrowHead: copyStartArrowHead,
                  selectBar: ["NONE", "V","TRIANGLE","DIAMOND","BLACKDIAMOND"],
                  setStartArrowHead(n)
                  {
                    if(n === "NONE")
                    {
                      myEdge.setStartArrowHead(ArrowHead.NONE);
                    }
                    else if(n === "V")
                    {
                      myEdge.setStartArrowHead(ArrowHead.V);
                    }
                    else if(n === "TRIANGLE")
                    {
                      myEdge.setStartArrowHead(ArrowHead.TRIANGLE);
                    }
                    else if(n === "DIAMOND")
                    {
                      myEdge.setStartArrowHead(ArrowHead.DIAMOND);
                    }
                    else if(n === "BLACKDIAMOND")
                    {
                      myEdge.setStartArrowHead(ArrowHead.BLACKDIAMOND);
                    }					
                  },
                },
       EndArrowHead:{
         EndArrowHead: copyEndArrowHead,
		 selectBar: ["NONE", "V","TRIANGLE","DIAMOND","BLACKDIAMOND"],
         setEndArrowHead(n)
         {
           if(n === "NONE")
           {
             myEdge.setEndArrowHead(ArrowHead.NONE);
           }
           else if(n === "V")
           {
             myEdge.setEndArrowHead(ArrowHead.V);
           }
			else if(n === "TRIANGLE")
			{
				myEdge.setEndArrowHead(ArrowHead.TRIANGLE);
			}
			else if(n === "DIAMOND")
			{
			myEdge.setEndArrowHead(ArrowHead.DIAMOND);
			}
			else if(n === "BLACKDIAMOND")
			{
				myEdge.setEndArrowHead(ArrowHead.BLACKDIAMOND);
			}			   
         },
       },
       StartLabel:{
         StartLabel: copyStartLabel,
         inputBox: [copyStartLabel],
         setStartLabel(n)
         {
           myEdge.setStartLabel(n);
         },
       },
       MiddleLabel:{
         MiddleLabel: copyMiddleLabel,
         inputBox: [copyMiddleLabel],
         setMiddleLabel(n)
         {
           myEdge.setMiddleLabel(n);
         },
       },
       EndLabel:{
         EndLabel: copyEndLabel,
         inputBox: [copyEndLabel],
         setEndLabel(n)
         {
           myEdge.setEndLabel(n);
         },
       },
      }
   }
	
	/**
	* Draws the CallEdge found in the 
	* @param {canvas.getContext}ctx the context of the canvas
	*/
	drawToolBar(ctx) {
		var edge=new ReturnEdge();
		var p1=new Rectangle2D(20,TOOLBAR_HEIGHT/2,1,1);
		var p2=new Rectangle2D(TOOLBAR_WIDTH-20,TOOLBAR_HEIGHT/2,1,1);
		edge.connect(p1,p2);
		edge.draw();
	}
}

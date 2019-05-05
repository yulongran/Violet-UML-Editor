/**
   An edge that joins two call nodes.
*/
class ReturnEdge extends SegmentedLineEdge {
    constructor() {
        super();
        this.setEndArrowHead(ArrowHead.V);
        this.setLineStyle(LineStyle.DOTTED);
    }

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
                  selectBar: ["NONE", "V"],
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
                  },
                },
       EndArrowHead:{
         EndArrowHead: copyEndArrowHead,
         selectBar: ["NONE" , "V"],
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
}

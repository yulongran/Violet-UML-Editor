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
            TOOLBAR_WIDTH, TOOLBAR_HEIGHT);
        ctx.strokeRect(super.getBounds().getX(), super.getBounds().getY(),
            TOOLBAR_WIDTH, TOOLBAR_HEIGHT);
        ctx.beginPath(); //fold
        ctx.moveTo(super.getBounds().getX() + this.DEFAULT_WIDTH * 3,
            super.getBounds().getY());
        ctx.lineTo(super.getBounds().getX() + TOOLBAR_WIDTH,
            super.getBounds().getY() + TOOLBAR_HEIGHT / 8);
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

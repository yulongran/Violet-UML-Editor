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

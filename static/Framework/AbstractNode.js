class AbstractNode {
  constructor () {
    this.children = []
    this.parent = undefined
    this.SHADOW_GAP = 4
    this.SHADOW_COLOR = 'gray'
  }

  translate (dx, dy) {
    for (let i = 0; i < this.children.length; i++) {
      let n = this.children[i]
      n.translate(dx, dy)
    }
  }

  addEdge (e, p1, p2) {
    return e.getEnd() != undefined
  }

  removeEdge (g, e) {

  }

  removeNode (g, e) {
    if (e === this.parent) {
      parent = undefined
    }
    if (e.getParent() === this) {
      for (let i = 0; i < children.length; i++) {
        if (children[i] === e) {
          children.splice(i, e)
        }
      }
    }
  }

  // addNode(n, p) {
  //     return false;
  // }

  getParent () {
    return this.parent
  }

  setParent (n) {
    this.parent = n
  }

  getChildren () {
    return this.children
  }

  addChild2 (index, node) {
    let oldParent = node.getParent()

    if (oldParent !== undefined) {
      oldParent.removeChild(node)
    }
    this.children.splice(index + 1, 0, node)
    node.setParent(this)
  }

  addChild (node) {
    this.addChild2(this.children.length, node)
  }

  removeChild (node) {
    if (node.getParent() !== this) {
      return
    }
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i] === node) {
        this.children.splice(i, 1)
      }
    }
    node.setParent(undefined)
  }

  getShape () {
    return undefined
  }

  setPersistenceDelegate (encode) {

  }
}

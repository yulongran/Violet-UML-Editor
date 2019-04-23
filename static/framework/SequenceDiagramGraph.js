class SequenceDiagramGraph extends graph
{
  add(n, p)
  {
    if(n instanceof CallNode)
    {
      let nodes = super.getNodes();
      var inside =false;
      while(!inside)
      {
        for(let node of nodes)
        {
          if(node instanceof ImplicitParameterNode && node.contains(p))
          {
            inside=true;
            n.setImplicitParameter(node);
          }
        }
      }
      if(!inside)
      {
        return false;
      }
    }
    if(!super.add(n,p))
    {
      return false;
    }
    return true;
  }

  removeEdge(e)
  {
    super.removeEdge(e);
    if(e instanceof CallEdge && e.getEnd().getChildren().size() ==0)
    {
      removeNode(e.getEnd());
    }
  }

  layout()
  {
    super.layout();
    let topLevelCalls = [];
    let objects =[];
    let nodes=super.getNodes();
    for(let node of nodes)
    {
      if(node instanceof CallNode && n.getParent()=== undefined)
      {
        topLevelCalls.add(node);
      }
      else if(node instanceof ImplicitParameterNode)
      {
        objects.add(node);
      }
    }
    let edges=super.getEdges();
    for(let edge of edges)
    {
      if(edge instanceof CallEdge)
      {
        let end = e.getEnd();
        if(end instanceof CallNode)
        {
          end.setSignaled(e.isSignal());
        }
      }
    }

    var left =0;
    var top =0;

    for(let i=0; i<objects.length; i++)
    {
      let n= objects[i];
      n.translte(0, -n.getBounds.getY();)
      top=Math.max(top, n.getTopRectangle.getHeight());
    }

    for(let i=0; i<topLevelCalls.length; i++)
    {
      let call == topLevelCalls[i];
      call.layout();
    }
    for(let i=0; i<nodes.length; i++)
    {
      if(n instanceof CallNode)
      {
        top=Math.max(top, n.getBounds().getY()+n.getBounds().getHeight());
      }
    }

    top += CallNode.CALL_YGAP;

    for(let i=0; i<objects.length; i++)
    {
      let n= objecs[i];
      let b= n.getBounds();
      n.setBounds(new Rectangle2D(b.getX(), b.getY(), b.getWidth(), top-b.getY()));
    }
  }

  draw()
  {
    layout();
    let nodes= getNodes();
    for(let i=0; i<nodes.length; i++)
    {
      if(!(n instanceof CallNode))
      {
        n.draw();
      }
    }

    let edges=getEdges();
    for(let i=0; i<edges.length;i++)
    {
      e.draw();
    }
  }
}

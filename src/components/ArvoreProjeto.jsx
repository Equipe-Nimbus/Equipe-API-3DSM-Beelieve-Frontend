import ReactFlow, { useNodesState, useEdgesState, Controls } from "reactflow";
import dagre from "dagre";

import "reactflow/dist/style.css";


function ArvoreProjeto({
	listaNodes,
	listaEdges
}) {
	const dagreGraph = new dagre.graphlib.Graph();
	dagreGraph.setDefaultEdgeLabel(() => ({}));

	const nodeWidth = 200;
	const nodeHeight = 36;

	const getLayoutedElements = (nodes, edges, direction = "TB") => {
	  const isHorizontal = direction === "LR";
	  dagreGraph.setGraph({ rankdir: direction });
	
	  nodes.forEach((node) => {
	    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
	  });
	
	  edges.forEach((edge) => {
	    dagreGraph.setEdge(edge.source, edge.target);
	  });
	
	  dagre.layout(dagreGraph);
	
	  nodes.forEach((node) => {
	    const nodeWithPosition = dagreGraph.node(node.id);
	    node.targetPosition = isHorizontal ? "left" : "top";
	    node.sourcePosition = isHorizontal ? "right" : "bottom";
	    node.position = {
	      x: nodeWithPosition.x - nodeWidth / 2,
	      y: nodeWithPosition.y - nodeHeight / 2
	    };
	
	    return node;
	  });
	
	  return { nodes, edges };
	};

	const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
	  listaNodes,
	  listaEdges
	);
	const [nodes] = useNodesState(layoutedNodes);
	const [edges] = useEdgesState(layoutedEdges);
	
	return (
		<div className="w-full h-[500px]"> 
			<ReactFlow
      		nodes={nodes}
      		edges={edges}
      		fitView
    		>
    		<Controls/>
    		</ReactFlow>
		</div>    	
  	)	
}
export default ArvoreProjeto;



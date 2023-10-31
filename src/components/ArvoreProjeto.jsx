import React, { useEffect } from "react"
import ReactFlow, { useNodesState, useEdgesState } from "reactflow";
import dagre from "dagre";

import "reactflow/dist/style.css";


function ArvoreProjeto({
	listaNodes,
	listaEdges
}) {
	const dagreGraph = new dagre.graphlib.Graph();
	dagreGraph.setDefaultEdgeLabel(() => ({}));

	const nodeWidth = 172;
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
	
	    // We are shifting the dagre node position (anchor=center center) to the top left
	    // so it matches the React Flow node anchor point (top left).
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
	useEffect(() => {
		console.log('Nodes que estão chegando: ', listaNodes)
		console.log('Edges que estão chegando: ', listaEdges)
	})
	return (
    	<ReactFlow
      		nodes={nodes}
      		edges={edges}
      		fitView
    	>
    	</ReactFlow>
  	)	
}
export default ArvoreProjeto;



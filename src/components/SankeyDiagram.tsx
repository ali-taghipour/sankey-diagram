import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal, SankeyNode, SankeyLink } from 'd3-sankey';

interface SankeyDiagramProps {
  data:{
    nodes: any;
    links: any;
  };
  width: number;
  height: number;
}

const SankeyDiagram: React.FC<SankeyDiagramProps> = ({ data, width, height }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (data && svgRef.current) {
      // Create the Sankey diagram
      const sankeyDiagram = sankey<{}, {}>()
        .nodeWidth(20) // Set the default node width
        .nodePadding(10) // Set the default node padding
        .extent([[0, 0], [width, height]]);
      const { nodes, links } = sankeyDiagram(data);
      
      // Create the SVG container
      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height);

      // Customize the size of the first node's bar
      const firstNode:any = nodes[0];
      firstNode.x1 = 10
      firstNode.y1 = 100; // Increase the height of the first node's bar
      firstNode.sourceLinks[0].y0 = 50
      firstNode.sourceLinks[0].y1 = 70

      // Draw the links
      svg.append('g')
        .selectAll('path')
        .data(links)
        .join('path')
        .attr('d', sankeyLinkHorizontal())
        .attr('stroke', '#000')
        .attr('stroke-opacity', 0.2)
        .attr('fill', 'none');

      // Draw the nodes
      svg.append('g')
        .selectAll('rect')
        .data(nodes)
        .join('rect')
        .attr('x', (d) => d.x0 ?? 0)
        .attr('y', (d) => d.y0 ?? 0)
        .attr('height', (d) => (d.y1 ?? 0) - (d.y0 ?? 0))
        .attr('width', (d) => (d.x1 ?? 0) - (d.x0 ?? 0))
        .attr('fill', '#2196f3');
    }
  }, [data, width, height]);

  return <svg ref={svgRef}></svg>;
};

export default SankeyDiagram;

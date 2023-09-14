import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal, SankeyNode, SankeyLink } from 'd3-sankey';

interface SankeyDiagramProps {
  data:{
    nodes: SankeyNode<any,any>[];
    links: SankeyLink<any,any>[];
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
        .nodeId((d:any) => d.name)
        .nodeWidth(20) // Set the custom node width
        .nodePadding(0) // Set the custom node padding
        .extent([[150, 50], [width, height]]);
      const { nodes, links } = sankeyDiagram(data);
      
      // Create the SVG container
      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height);

      // Customize the size of the first node's bar
      const startNodes:any = nodes.filter((node:any) => node.startNode);
      startNodes.forEach(node => {
        //const averageY = (node.y0 + node.y1) / 2;
        //const y0 = averageY - (node.size/2);
       // const y1 = averageY + (node.size/2);
        //node.y0 = y0;
        node.y1 = node.y0 + node.size; 
        // node.sourceLinks.forEach((link,index) => {
        //   link.width = node.size;
        //   link.y0 = averageY;
        //   const targetY0 = link.target.y0;
        //   const targetY1 = link.target.y1;
        //   link.y1 = (targetY0 + targetY1)/2;
        // })
        
      })
      
      // Define a color scale for the nodes
      const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

      // Link 
      const link = sankeyLinkHorizontal();

      // Draw the links
      svg.append('g')
        .selectAll('path')
        .data(links)
        .join('path')
        .attr('d', (d) => {
         if((d.source as any).startNode){
          console.log((d.target as any))
          return `M${(d.source as any).x0 + (d.source as any).size} ${(d.source as any).y0} L${(d.source as any).x1} ${(d.source as any).y1} L${(d.target as any).x0} ${(d.target as any).y1} 
          L${(d.target as any).x0} ${(d.target as any).y0} Z`;
         }else{
          return link(d);
         }
        })
        .attr('stroke', 'lightblue')
        .attr('stroke-opacity', 0.4)
        .attr('fill', d => (d.source as any).startNode ? 'red' : 'none')
        .attr('stroke-width', (d) => Math.max(1,(d.source as any).startNode ? 0 : d.width))
        .style('mix-blend-mode','multiply');

      // Draw the nodes
      svg.append('g')
        .selectAll('rect')
        .data(nodes)
        .join('rect')
        .attr('x', (d) => d.x0 ?? 0)
        .attr('y', (d) => d.y0 ?? 0)
        .attr('height', (d) => (d.y1 ?? 0) - (d.y0 ?? 0))
        .attr('width', (d) => (d.x1 ?? 0) - (d.x0 ?? 0))
        .attr('fill', (d:any) => colorScale(d.name))
        .attr('stroke', '#000');

      // Add labels to the nodes
      svg.append('g')
        .selectAll('text')
        .data(nodes)
        .join('text')
        .attr('x', (d) => (d.x0 ?? 0) - 10)
        .attr('y', (d) => (d.y0 ?? 0) + ((d.y1 ?? 0) - (d.y0 ?? 0)) / 2)
        .attr('dy', '0.35em')
        .attr('text-anchor', 'end')
        .text((d:any) => d.name)
        .attr('fill', '#fff')
        .style('font-size', '12px');
    }
  }, [data, width, height]);

  return <svg ref={svgRef}></svg>;
};

export default SankeyDiagram;

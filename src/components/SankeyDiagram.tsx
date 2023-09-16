import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal, SankeyNode, SankeyLink, SankeyGraph } from 'd3-sankey';

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
        .nodePadding(30) // Set the custom node padding
        .nodeSort(null)
        .nodeAlign(d => {
          // @ts-ignore
          return d.group
        })
        .extent([[0, 0], [width, height]]);
      const { nodes, links } = sankeyDiagram(data);
      
      // Create the SVG container
      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height);

      // Customize the size of the first node's bar
      const startNodes:any = nodes.filter((node:any) => node.startNode);
      startNodes.forEach((node,index:number) => {
        node.y1 = node.y0 + node.size;
      }) 

      // Link 
      const link = sankeyLinkHorizontal();
      const newlinks:any = [...links];

          // splite nodes
          let newNodes:any = [...nodes];
          nodes.forEach(node => {
            newNodes = newNodes.filter(n => n !== node);
            if(!node.targetLinks.length){
              if(node.sourceLinks.length > 1){
                node.sourceLinks.forEach((sNode,sNodeIndex) => {
                  let totalPreWidth = 0;
                  for(let i = 0; i < sNodeIndex;i++){
                    totalPreWidth = totalPreWidth + node.sourceLinks[i].width;
                  }
            
                  const y0 = node.y0 + totalPreWidth;
                  const y1 = y0  + node.sourceLinks[sNodeIndex].width;

                  if(!newlinks[newlinks.findIndex(i => i.y0 === sNode.y0 && i.y1 === sNode.y1)].sY0 && !newlinks[newlinks.findIndex(i => i.y0 === sNode.y0 && i.y1 === sNode.y1)].sY1){
                    newlinks[newlinks.findIndex(i => i.y0 === sNode.y0 && i.y1 === sNode.y1)] = {...newlinks[newlinks.findIndex(i => i.y0 === sNode.y0 && i.y1 === sNode.y1)],sY0:y0,sY1:y1};
                  }
                  
                  newNodes.push({...node,order:sNodeIndex,nodeColor:(sNode as any).nodeColor,tL: false,rootNode:(sNode as any).rootNode });
                }) 
              }else{
                node.sourceLinks.forEach((sNode,sNodeIndex) => {
                  if(!newlinks[newlinks.findIndex(i => i.y0 === sNode.y0 && i.y1 === sNode.y1)].sY0 && !newlinks[newlinks.findIndex(i => i.y0 === sNode.y0 && i.y1 === sNode.y1)].sY1){

                    newlinks[newlinks.findIndex(i => i.y0 === sNode.y0 && i.y1 === sNode.y1)] = {...newlinks[newlinks.findIndex(i => i.y0 === sNode.y0 && i.y1 === sNode.y1)],sY0:node.y0,sY1:node.y1}
                  }
                  newNodes.push({...node,nodeColor:(sNode as any).nodeColor,rootNode:(sNode as any).rootNode });
                }) 
              }
              
            }else{
              if(node.targetLinks.length > 1){
                let orderedSourceLinks:any = new Set();
                if(node.sourceLinks.length){
                  const firstSLink:any = node.sourceLinks[0];
                  let linkSpot = {color:firstSLink.color,nodeColor:firstSLink.nodeColor,value:firstSLink.value};
                  orderedSourceLinks.add(node.sourceLinks[0]);
                  node.sourceLinks.forEach((sNode,sNodeIndex) => {
                    node.sourceLinks.forEach((sNode2,sNodeIndex2) => {
                      if(linkSpot.color === (sNode2 as any).color && linkSpot.nodeColor === (sNode2 as any).nodeColor){
                        orderedSourceLinks.add(sNode2);
                      }
                    })
                    linkSpot = {color:(sNode as any).color,nodeColor:(sNode as any).nodeColor,value:(sNode as any).value};
                    orderedSourceLinks.add(sNode);
                  });
                }

                if(!orderedSourceLinks.size){
                  orderedSourceLinks = node.sourceLinks;
                }else{
                  orderedSourceLinks = Array.from(orderedSourceLinks);
                }
                
                orderedSourceLinks.forEach((sNode,sNodeIndex) => {
                  let totalPreWidth = 0;
                  for(let i = 0; i < sNodeIndex;i++){
                    totalPreWidth = totalPreWidth + orderedSourceLinks[i].width;
                  }
            
                  const y0 = node.y0 + totalPreWidth;
                  const y1 = y0  + orderedSourceLinks[sNodeIndex].width;

                  if(!newlinks[newlinks.findIndex(i => i.y0 === sNode.y0 && i.y1 === sNode.y1)].sY0 && !newlinks[newlinks.findIndex(i => i.y0 === sNode.y0 && i.y1 === sNode.y1)].sY1){
                    newlinks[newlinks.findIndex(i => i.y0 === sNode.y0 && i.y1 === sNode.y1)] = {...newlinks[newlinks.findIndex(i => i.y0 === sNode.y0 && i.y1 === sNode.y1)],sY0:y0,sY1:y1};
                  }
                }) 

              node.targetLinks.forEach((sNode,sNodeIndex) => {
                let totalPreWidth = 0;
                for(let i = 0; i < sNodeIndex;i++){
                  totalPreWidth = totalPreWidth + node.targetLinks[i].width;
                }
          
                const y0 = node.y0 + totalPreWidth;
                const y1 = y0  + node.targetLinks[sNodeIndex].width;

                if(!newlinks[newlinks.findIndex(i => i.y0 === sNode.y0 && i.y1 === sNode.y1)].tY0 && !newlinks[newlinks.findIndex(i => i.y0 === sNode.y0 && i.y1 === sNode.y1)].tY1){
                  newlinks[newlinks.findIndex(i => i.y0 === sNode.y0 && i.y1 === sNode.y1)] = {...newlinks[newlinks.findIndex(i => i.y0 === sNode.y0 && i.y1 === sNode.y1)],tY0:y0,tY1:y1};
                }

                newNodes.push({...node,order:sNodeIndex,nodeColor:(sNode as any).nodeColor,tL: true,rootNode:(sNode as any).rootNode });
              }) 
             }else{
              node.sourceLinks.forEach((sNode,sNodeIndex) => {
                if(!newlinks[newlinks.findIndex(i => i.y0 === sNode.y0 && i.y1 === sNode.y1)].sY0 && !newlinks[newlinks.findIndex(i => i.y0 === sNode.y0 && i.y1 === sNode.y1)].sY1){
                 newlinks[newlinks.findIndex(i => i.y0 === sNode.y0 && i.y1 === sNode.y1)] = {...newlinks[newlinks.findIndex(i => i.y0 === sNode.y0 && i.y1 === sNode.y1)],sY0:node.y0,sY1:node.y1}
                }
              }) 

              node.targetLinks.forEach((sNode,sNodeIndex) => {
                if(!newlinks[newlinks.findIndex(i => i.y0 === sNode.y0 && i.y1 === sNode.y1)].tY0 && !newlinks[newlinks.findIndex(i => i.y0 === sNode.y0 && i.y1 === sNode.y1)].tY1){
                  newlinks[newlinks.findIndex(i => i.y0 === sNode.y0 && i.y1 === sNode.y1)] = {...newlinks[newlinks.findIndex(i => i.y0 === sNode.y0 && i.y1 === sNode.y1)],tY0:node.y0,tY1:node.y1}
                }
                newNodes.push({...node,nodeColor:(sNode as any).nodeColor,rootNode:(sNode as any).rootNode });
              }) 
            }
            }
          })

      // Draw the links
      svg.append('g')
        .selectAll('path')
        .data(newlinks)
        .join('path')
        .attr('d', (d:any) => {
          return `M${(d.source as any).x1} ${d.sY1}
         C${(d.source as any).x1 + ((d.target as any).x0 - (d.source as any).x1)/3}, ${d.sY1} ${(d.target as any).x0 - ((d.target as any).x0 - (d.source as any).x1)/3},${d.tY1} ${(d.target as any).x0} ${d.tY1}    
         L${(d.target as any).x0} ${d.tY0}
         C${(d.target as any).x0 + ((d.source as any).x1 - (d.target as any).x0)/3}, ${d.sY0} ${(d.source as any).x1 - ((d.source as any).x1 - (d.target as any).x0)/3},${d.sY0} ${(d.source as any).x1} ${d.sY0}`;
        })
        .attr('stroke-opacity', 0.1)
        .attr('stroke-width', (d:any) => Math.max(1,d.width))
        .attr('fill',(d:any) => "#ccc")
        .attr('class',(d:any) => d.rootNode === "AT&T" ? "AT_T" : d.rootNode)
        .style('mix-blend-mode','multiply')
        .on('mouseover',(d) => {
          const nodeClass = d.target.getAttribute('class');
          let linkColor = "";
          let nodeColor = "";

          links.forEach((link:any) => {
            if(link.rootNode === nodeClass){
              linkColor = link.color;
              nodeColor = link.nodeColor;
            }
          })
          const allLinkSameClass = d.target.parentNode.parentNode.querySelectorAll('.'+nodeClass);
          allLinkSameClass.forEach(el => {
            el.setAttribute("fill",linkColor)
          })
          const allNodeSameClass = d.target.parentNode.parentNode.querySelectorAll('.'+nodeClass + 'P');
          allNodeSameClass.forEach(el => {
            el.setAttribute("fill",nodeColor)
          })
          return null;
        }).on('mouseout',(d) => {
          const nodeClass = d.target.getAttribute('class');
          const allLinkSameClass = d.target.parentNode.parentNode.querySelectorAll('.'+nodeClass);
          allLinkSameClass.forEach(el => {
            el.setAttribute("fill","#ccc")
          })
          const allNodeSameClass = d.target.parentNode.parentNode.querySelectorAll('.'+nodeClass + 'P');
          allNodeSameClass.forEach(el => {
            el.setAttribute("fill","#ddd")
          })
          return null;
        })

      // Draw the nodes
      svg.append('g')
        .selectAll('rect')
        .data(newNodes)
        .join('path')
        .attr('d', (d:any) => {
          let y0 = d.y0;
          let y1 = d.y1;

          if(d.order || d.order === 0){
            if(d.order > 0){
              if(d.tL){
                let totalPreWidth = 0;
                for(let i = 0; i < d.order;i++){
                  totalPreWidth = totalPreWidth + d.targetLinks[i].width;
                }
          
                y0 = y0 + totalPreWidth;
                y1 = y0  + d.targetLinks[d.order].width;
              }else{
                let totalPreWidth = 0;
                for(let i = 0; i < d.order;i++){
                  totalPreWidth = totalPreWidth + d.sourceLinks[i].width;
                }

                y0 = y0 + totalPreWidth;
                y1 = y0 + d.sourceLinks[d.order].width;
              }
            }else{
              if(d.tL){
                y1 = y0 + d.targetLinks[0].width;
              }else{
                y1 = y0 + d.sourceLinks[0].width;
              }
            }
          }
          
          return `M${d.x0} ${y0} L${d.x1} ${y0} L${d.x1} ${y1} L${d.x0} ${y1} Z`;
        })
        .attr('stroke', 'none')
        .attr('stroke-opacity', 0.1)
        .attr('fill',"#ddd")
        .attr('class',(d:any) => d.rootNode === "AT&T" ? "AT_T" + 'P' : d.rootNode + 'P')
        .style('mix-blend-mode','multiply')
        .on('mouseover',(d) => {
          const nodeClass = d.target.getAttribute('class');
          let linkColor = "";
          let nodeColor = "";

          links.forEach((link:any) => {
            if(link.rootNode === nodeClass.slice(0,-1)){
              linkColor = link.color;
              nodeColor = link.nodeColor;
            }
          })
          const allLinkSameClass = d.target.parentNode.parentNode.querySelectorAll('.'+nodeClass.slice(0,-1));
          allLinkSameClass.forEach(el => {
            el.setAttribute("fill",linkColor)
          })
          const allNodeSameClass = d.target.parentNode.parentNode.querySelectorAll('.'+nodeClass);
          allNodeSameClass.forEach(el => {
            el.setAttribute("fill",nodeColor)
          })
          return null;
        }).on('mouseout',(d) => {
          const nodeClass = d.target.getAttribute('class');
          const allLinkSameClass = d.target.parentNode.parentNode.querySelectorAll('.'+nodeClass.slice(0,-1));
          allLinkSameClass.forEach(el => {
            el.setAttribute("fill","#ccc")
          })
          const allNodeSameClass = d.target.parentNode.parentNode.querySelectorAll('.'+nodeClass);
          allNodeSameClass.forEach(el => {
            el.setAttribute("fill","#ddd")
          })
          return null;
        })


      // Add labels to the nodes
      svg.append('g')
        .selectAll('text')
        .data(nodes)
        .join('text')
        .attr('x', (d) => (d.x0 ?? 0) + (((d.x1 ?? 0) - (d.x0 ?? 0)) / 2))
        .attr('y', (d) => (d.y0 ?? 0) + ((d.y1 ?? 0) - (d.y0 ?? 0)) / 2)
        .attr('text-anchor', 'middle')
        .attr('writing-mode',"tb")
        .text((d:any) => d.name)
        .attr('fill', '#fff')
        .style('font-size', '14px');
    }
  }, [data, width, height]);

  return <svg ref={svgRef}></svg>;
};

export default SankeyDiagram;

export const createConnectionPath = (fromNode: any, toNode: any, fromPoint: string, toPoint: string) => {
  // Calculate actual connection points based on node position and connection type
  let startX, startY, endX, endY;
  
  // From node connection point
  switch (fromPoint) {
    case 'top':
      startX = fromNode.x + fromNode.width / 2;
      startY = fromNode.y;
      break;
    case 'right':
      startX = fromNode.x + fromNode.width;
      startY = fromNode.y + fromNode.height / 2;
      break;
    case 'bottom':
      startX = fromNode.x + fromNode.width / 2;
      startY = fromNode.y + fromNode.height;
      break;
    case 'left':
      startX = fromNode.x;
      startY = fromNode.y + fromNode.height / 2;
      break;
    default:
      startX = fromNode.x + fromNode.width / 2;
      startY = fromNode.y + fromNode.height;
  }
  
  // To node connection point
  switch (toPoint) {
    case 'top':
      endX = toNode.x + toNode.width / 2;
      endY = toNode.y;
      break;
    case 'right':
      endX = toNode.x + toNode.width;
      endY = toNode.y + toNode.height / 2;
      break;
    case 'bottom':
      endX = toNode.x + toNode.width / 2;
      endY = toNode.y + toNode.height;
      break;
    case 'left':
      endX = toNode.x;
      endY = toNode.y + toNode.height / 2;
      break;
    default:
      endX = toNode.x + toNode.width / 2;
      endY = toNode.y;
  }
  
  // Create smooth curve with appropriate control points
  const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  const curvature = Math.min(distance * 0.3, 80);
  
  let controlX1, controlY1, controlX2, controlY2;
  
  if (fromPoint === 'bottom' && toPoint === 'top') {
    // Vertical flow - most common case
    controlX1 = startX;
    controlY1 = startY + curvature;
    controlX2 = endX;
    controlY2 = endY - curvature;
  } else if (fromPoint === 'right' && toPoint === 'left') {
    // Horizontal flow
    controlX1 = startX + curvature;
    controlY1 = startY;
    controlX2 = endX - curvature;
    controlY2 = endY;
  } else {
    // General case - adaptive curve
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    
    if (Math.abs(endX - startX) > Math.abs(endY - startY)) {
      // More horizontal
      controlX1 = startX + (endX - startX) * 0.3;
      controlY1 = startY;
      controlX2 = endX - (endX - startX) * 0.3;
      controlY2 = endY;
    } else {
      // More vertical
      controlX1 = startX;
      controlY1 = startY + (endY - startY) * 0.3;
      controlX2 = endX;
      controlY2 = endY - (endY - startY) * 0.3;
    }
  }
  
  return `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;
};
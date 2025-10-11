import React from 'react';
import { Trash2, Move, AlertCircle, Database, User, Mail, MessageSquare, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { createConnectionPath } from '../utils/connectionUtils';

interface WorkflowCanvasProps {
  canvasRef: React.RefObject<HTMLDivElement>;
  workflowNodes: any[];
  connections: any[];
  isConnecting: boolean;
  connectionStart: any;
  onNodeMouseDown: (e: React.MouseEvent, nodeId: string) => void;
  onNodeDelete: (nodeId: string) => void;
  onConnectionDelete: (connectionId: string) => void;
  onCanvasDrop: (e: React.DragEvent) => void;
  onCanvasDragOver: (e: React.DragEvent) => void;
  onCancelConnection: () => void;
  onStartConnection: (nodeId: string, point: any, e: React.MouseEvent) => void;
  onCompleteConnection: (nodeId: string, point: any, e: React.MouseEvent) => void;
}

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  canvasRef,
  workflowNodes,
  connections,
  isConnecting,
  connectionStart,
  onNodeMouseDown,
  onNodeDelete,
  onConnectionDelete,
  onCanvasDrop,
  onCanvasDragOver,
  onCancelConnection,
  onStartConnection,
  onCompleteConnection
}) => {
  const getNodeIcon = (nodeType: string) => {
    switch (nodeType) {
      case 'trigger':
        return Zap;
      case 'action':
        return User;
      case 'condition':
        return Database;
      default:
        return AlertCircle;
    }
  };

  const getNodeColor = (nodeType: string) => {
    switch (nodeType) {
      case 'trigger':
        return 'text-white';
      case 'action':
        return 'text-white';
      case 'condition':
        return 'text-white';
      default:
        return 'text-white';
    }
  };

  const getNodeBackgroundColor = (nodeType: string) => {
    switch (nodeType) {
      case 'trigger':
        return '#550015';
      case 'action':
        return '#000080';
      case 'condition':
        return '#008080';
      default:
        return '#6D6D70';
    }
  };

  const renderConnectionPoints = (node: any) => {
    const points = [
      { position: 'top', type: 'input', x: node.x + node.width / 2, y: node.y },
      { position: 'right', type: 'output', x: node.x + node.width, y: node.y + node.height / 2 },
      { position: 'bottom', type: 'output', x: node.x + node.width / 2, y: node.y + node.height },
      { position: 'left', type: 'input', x: node.x, y: node.y + node.height / 2 },
    ];

    return points.map((point, index) => (
      <div
        key={`${node.id}-${point.position}`}
        className={`absolute w-3 h-3 rounded-full border-2 border-white cursor-pointer transition-all z-20 ${
          point.type === 'input' 
            ? 'bg-blue-500 hover:bg-blue-600 hover:scale-125' 
            : 'bg-green-500 hover:bg-green-600 hover:scale-125'
        } ${isConnecting ? 'scale-125 animate-pulse' : ''}`}
        style={{
          left: point.x - 6,
          top: point.y - 6
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (isConnecting && point.type === 'input') {
            onCompleteConnection(node.id, point, e);
          } else if (!isConnecting && point.type === 'output') {
            onStartConnection(node.id, point, e);
          }
        }}
        title={`${point.type === 'input' ? 'Input' : 'Output'} connection point`}
      />
    ));
  };

  const renderConnections = () => {
    return connections.map((connection) => {
      const fromNode = workflowNodes.find(n => n.id === connection.from);
      const toNode = workflowNodes.find(n => n.id === connection.to);
      
      if (!fromNode || !toNode) return null;

      const path = createConnectionPath(fromNode, toNode, connection.fromPoint, connection.toPoint);
      
      return (
        <g key={connection.id}>
          {/* Main connection line with click handler */}
          <path
            d={path}
            stroke="#FFFFFF"
            strokeWidth="3"
            fill="none"
            className="cursor-pointer transition-colors"
            markerEnd="url(#arrowhead)"
            onMouseEnter={(e) => e.currentTarget.setAttribute('stroke', '#FFD35B')}
            onMouseLeave={(e) => e.currentTarget.setAttribute('stroke', '#FFFFFF')}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Deleting connection:', connection.id);
              onConnectionDelete(connection.id);
            }}
          />
          {/* Wider invisible path for easier clicking */}
          <path
            d={path}
            stroke="transparent"
            strokeWidth="20"
            fill="none"
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Deleting connection (wide area):', connection.id);
              onConnectionDelete(connection.id);
            }}
            title="Click to delete connection"
          />
        </g>
      );
    });
  };

  const renderNodes = () => {
    return workflowNodes.map((node) => {
      const Icon = getNodeIcon(node.type);
      
      return (
        <div key={node.id}>
          {/* Main Node */}
          <div
            className={`absolute rounded-lg shadow-lg border-2 border-white cursor-move select-none transition-all hover:shadow-xl ${getNodeColor(node.type)} ${
              node.hasError ? 'ring-2 ring-red-500' : ''
            }`}
            style={{
              left: node.x,
              top: node.y,
              width: node.width,
              height: node.height,
              zIndex: 5,
              backgroundColor: getNodeBackgroundColor(node.type)
            }}
            onMouseDown={(e) => onNodeMouseDown(e, node.id)}
            title="Double-click to configure, drag to move"
          >
            <div className="p-3 h-full flex items-center justify-between bg-[rgba(79,0,0,0)]">
              <div className="flex items-center flex-1">
                <Icon className="h-5 w-5 mr-2 flex-shrink-0" style={{ color: '#FFFFFF' }} />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate" style={{ color: '#FFFFFF' }}>{node.name}</div>
                  <div className="text-xs opacity-75 capitalize" style={{ color: '#FFFFFF' }}>{node.type}</div>
                </div>
              </div>
              
              {/* Node Actions */}
              <div className="flex items-center space-x-1 ml-2">
                {node.collaborators && node.collaborators.length > 0 && (
                  <div className="flex -space-x-1">
                    {node.collaborators.slice(0, 2).map((collaborator, index) => (
                      <div
                        key={index}
                        className="w-5 h-5 rounded-full bg-white text-gray-700 text-xs flex items-center justify-center border border-gray-300"
                      >
                        {collaborator.name[0]}
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Delete Button */}
                <button
                  className="h-6 w-6 p-0 text-white hover:bg-white/20 rounded flex items-center justify-center transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNodeDelete(node.id);
                  }}
                  title="Delete Node"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
            
            {/* Error Indicator */}
            {node.hasError && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <AlertCircle className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
          
          {/* Connection Points */}
          {renderConnectionPoints(node)}
        </div>
      );
    });
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    // Only cancel connection if we're not clicking on a connection or node
    const target = e.target as HTMLElement;
    if (target.tagName === 'svg' || target.classList.contains('bg-gray-50/30')) {
      onCancelConnection();
    }
  };

  return (
    <div 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full transition-all"
      style={{ backgroundColor: '#101624' }}
      onDrop={onCanvasDrop}
      onDragOver={onCanvasDragOver}
      onClick={handleCanvasClick}
    >
      {/* Background Grid */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle, #2E2A55 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          opacity: 0.6
        }}
      />
      
      {/* SVG for Connections */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        style={{ zIndex: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="#FFFFFF"
            />
          </marker>
        </defs>
        {renderConnections()}
      </svg>
      
      {/* Nodes */}
      <div className="absolute inset-0" style={{ zIndex: 5 }}>
        {renderNodes()}
      </div>
      
      {/* Connection Status Overlay */}
      {isConnecting && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg z-50" style={{ backgroundColor: '#9B4A4A' }}>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm text-white">Click a blue input point to complete connection</span>
          </div>
        </div>
      )}
      
      {/* Canvas Instructions */}
      {workflowNodes.length === 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-lg mb-2" style={{ color: '#A1A1A5' }}>Start Building Your Workflow</div>
          <div className="text-sm" style={{ color: '#6D6D70' }}>Drag nodes from the palette to create your automation</div>
        </div>
      )}
    </div>
  );
};
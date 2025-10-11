import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { nodeTypes } from '../../data/constants';

interface NodePaletteProps {
  selectedCategory: string;
  onDragStart: (e: React.DragEvent, nodeType: any) => void;
}

export const NodePalette: React.FC<NodePaletteProps> = ({
  selectedCategory,
  onDragStart
}) => {
  const renderNodeSection = (type: string, title: string) => {
    const filteredNodes = nodeTypes.filter(n => 
      n.type === type && (selectedCategory === 'all' || n.category === selectedCategory)
    );

    if (filteredNodes.length === 0) return null;

    return (
      <div>
        <h4 className="font-medium mb-2" style={{ color: '#EAEAEA' }}>{title}</h4>
        <div className="space-y-2">
          {filteredNodes.map((node) => {
            const Icon = node.icon;
            return (
              <div 
                key={node.id} 
                className="flex items-center p-3 rounded border cursor-grab hover:shadow-md hover:scale-105 transition-all select-none"
                style={{
                  backgroundColor: '#141419',
                  borderColor: 'rgba(255, 255, 255, 0.1)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(155, 74, 74, 0.4)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                draggable
                onDragStart={(e) => onDragStart(e, node)}
              >
                <Icon className="h-4 w-4 mr-2" style={{ 
                  color: node.type === 'trigger' ? '#9B4A4A' : 
                        node.type === 'action' ? '#2A66F6' : 
                        node.type === 'condition' ? '#1FA861' : '#9B4A4A'
                }} />
                <span className="text-sm" style={{ color: '#EAEAEA' }}>{node.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Card style={{ backgroundColor: '#141419', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
      <CardHeader>
        <CardTitle style={{ color: '#EAEAEA' }}>Node Palette</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {renderNodeSection('trigger', 'Triggers')}
          {renderNodeSection('action', 'Actions')}
          {renderNodeSection('condition', 'Conditions')}
        </div>
      </CardContent>
    </Card>
  );
};
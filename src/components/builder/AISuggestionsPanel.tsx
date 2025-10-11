import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Zap } from 'lucide-react';
import { aiNodeSuggestions } from '../../data/constants';

export const AISuggestionsPanel: React.FC = () => {
  return (
    <Card style={{ backgroundColor: '#141419', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
      <CardHeader>
        <CardTitle className="flex items-center" style={{ color: '#EAEAEA' }}>
          <Zap className="h-4 w-4 mr-2" style={{ color: '#9B4A4A' }} />
          AI Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {aiNodeSuggestions.map((suggestion) => {
            const Icon = suggestion.icon;
            return (
              <div key={suggestion.id} className="p-3 rounded-lg border hover:shadow-sm cursor-pointer transition-all" style={{
                backgroundColor: '#0E0E10',
                borderColor: 'rgba(255, 255, 255, 0.1)'
              }}>
                <div className="flex items-start space-x-3">
                  <Icon className="h-4 w-4 mt-0.5" style={{ color: '#9B4A4A' }} />
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: '#EAEAEA' }}>{suggestion.name}</p>
                    <p className="text-xs mt-1" style={{ color: '#A1A1A5' }}>{suggestion.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
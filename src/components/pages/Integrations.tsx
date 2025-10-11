import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Plus, Search, Eye, Code, Network, Webhook } from 'lucide-react';
import { integrations } from '../../data/constants';

interface IntegrationsProps {
  integrationFilter: string;
  setIntegrationFilter: (filter: string) => void;
  integrationSearch: string;
  setIntegrationSearch: (search: string) => void;
  setSelectedIntegration: (integration: any) => void;
  setIntegrationModalOpen: (open: boolean) => void;
}

export const Integrations: React.FC<IntegrationsProps> = ({
  integrationFilter,
  setIntegrationFilter,
  integrationSearch,
  setIntegrationSearch,
  setSelectedIntegration,
  setIntegrationModalOpen
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold" style={{ color: '#EAEAEA' }}>Integrations</h1>
        <Button style={{
          backgroundColor: '#1D0210',
          color: '#FFFFFF'
        }} className="hover:bg-[#160008]">
          <Plus className="h-4 w-4 mr-2" />
          Add Integration
        </Button>
      </div>

      <Card style={{ backgroundColor: '#141419', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <CardContent className="pt-6">
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: '#6D6D70' }} />
              <Input 
                placeholder="Search integrations..." 
                className="pl-10"
                style={{
                  backgroundColor: '#0E0E10',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#EAEAEA'
                }}
                value={integrationSearch}
                onChange={(e) => setIntegrationSearch(e.target.value)}
              />
            </div>
            <Select value={integrationFilter} onValueChange={setIntegrationFilter}>
              <SelectTrigger className="w-48" style={{
                backgroundColor: '#0E0E10',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                color: '#EAEAEA'
              }}>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Communication">Communication</SelectItem>
                <SelectItem value="CRM">CRM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {integrations.map((integration, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300" style={{
            backgroundColor: '#141419',
            borderColor: 'rgba(255, 255, 255, 0.1)'
          }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{integration.icon}</div>
                  <div>
                    <div className="font-medium" style={{ color: '#EAEAEA' }}>{integration.name}</div>
                    <Badge variant="outline" className="text-xs mt-1" style={{
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      color: '#A1A1A5'
                    }}>{integration.category}</Badge>
                  </div>
                </div>
                <Badge variant={integration.status === 'connected' ? 'default' : 'secondary'} style={{
                  backgroundColor: integration.status === 'connected' ? '#4ADE80' : '#A1A1A5',
                  color: '#0E0E10'
                }}>
                  {integration.status}
                </Badge>
              </div>
              <p className="text-sm mb-4" style={{ color: '#A1A1A5' }}>{integration.description}</p>
              <div className="flex space-x-2">
                <Button 
                  variant={integration.status === 'connected' ? 'destructive' : 'default'}
                  style={{
                    backgroundColor: integration.status === 'connected' ? '#9B4A4A' : '#1D0210',
                    color: '#FFFFFF'
                  }}
                  className={integration.status === 'connected' ? 'hover:bg-[#B55A5A]' : 'hover:bg-[#160008]'}
                  size="sm"
                >
                  {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                </Button>
                <Button variant="outline" size="sm" style={{
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#A1A1A5'
                }}>
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
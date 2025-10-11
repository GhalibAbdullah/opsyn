import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Plus, BookOpen, Star, Eye, Copy, Share, MoreHorizontal } from 'lucide-react';
import { workflows, workflowTemplates } from '../../data/constants';

interface WorkflowsPageProps {
  workflowFilter: string;
  setWorkflowFilter: (filter: string) => void;
  setShareModalOpen: (open: boolean) => void;
}

export const WorkflowsPage: React.FC<WorkflowsPageProps> = ({
  workflowFilter,
  setWorkflowFilter,
  setShareModalOpen
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold" style={{ color: '#EAEAEA' }}>Workflows</h1>
        <div className="flex space-x-2">
          <Select value={workflowFilter} onValueChange={setWorkflowFilter}>
            <SelectTrigger className="w-40" style={{ 
              backgroundColor: '#141419', 
              borderColor: 'rgba(255, 255, 255, 0.1)',
              color: '#EAEAEA'
            }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Workflows</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
            </SelectContent>
          </Select>
          <Button style={{ 
            backgroundColor: '#1D0210', 
            color: '#FFFFFF'
          }} className="hover:bg-[#160008]">
            <Plus className="h-4 w-4 mr-2" />
            New Workflow
          </Button>
        </div>
      </div>

      <Card style={{ backgroundColor: '#141419', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <CardHeader>
          <CardTitle className="flex items-center" style={{ color: '#EAEAEA' }}>
            <BookOpen className="h-5 w-5 mr-2" />
            Template Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {workflowTemplates.map((template) => (
              <div key={template.id} className="p-4 rounded-lg border hover:shadow-md transition-all duration-200" style={{
                backgroundColor: '#0E0E10',
                borderColor: 'rgba(255, 255, 255, 0.1)'
              }}>
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="secondary">{template.category}</Badge>
                  <div className="flex items-center text-sm" style={{ color: '#6D6D70' }}>
                    <Star className="h-3 w-3 mr-1 fill-current" style={{ color: '#FFD35B' }} />
                    {template.rating}
                  </div>
                </div>
                <h4 className="font-medium mb-2" style={{ color: '#EAEAEA' }}>{template.name}</h4>
                <p className="text-sm mb-3" style={{ color: '#A1A1A5' }}>{template.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs" style={{ color: '#6D6D70' }}>{template.uses} uses</span>
                  <Button size="sm" variant="outline" style={{
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#A1A1A5'
                  }}>Use Template</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="hover:shadow-lg transition-all duration-300" style={{
            backgroundColor: '#141419',
            borderColor: 'rgba(255, 255, 255, 0.1)'
          }}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle style={{ color: '#EAEAEA' }}>{workflow.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={workflow.status === 'active' ? 'default' : 'secondary'} style={{
                      backgroundColor: workflow.status === 'active' ? '#4ADE80' : '#F97316',
                      color: '#0E0E10'
                    }}>
                      {workflow.status}
                    </Badge>
                    <Badge variant="outline" style={{
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      color: '#A1A1A5'
                    }}>{workflow.category}</Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm" style={{ color: '#A1A1A5' }}>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4" style={{ color: '#A1A1A5' }}>{workflow.description}</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" style={{
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#A1A1A5'
                }}>
                  <Eye className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" style={{
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#A1A1A5'
                }}>
                  <Copy className="h-4 w-4 mr-1" />
                  Duplicate
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShareModalOpen(true)} style={{
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#A1A1A5'
                }}>
                  <Share className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
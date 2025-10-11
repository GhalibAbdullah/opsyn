import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { 
  Brain, 
  Lightbulb, 
  ThumbsUp, 
  X, 
  Sparkles, 
  Zap, 
  GitBranch, 
  MoreHorizontal, 
  ArrowDown, 
  User, 
  MousePointer, 
  History, 
  Save,
  Play,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Circle,
  Mail,
  MessageSquare,
  Database,
  Calendar,
  FileText,
  Globe,
  Clock,
  ArrowRight
} from 'lucide-react';

import { NodePalette } from '../builder/NodePalette';
import { AISuggestionsPanel } from '../builder/AISuggestionsPanel';
import { ConfigurationPanel } from '../builder/ConfigurationPanel';
import { WorkflowCanvas } from '../builder/WorkflowCanvas';
import { createDragHandlers, createConnectionHandlers, createNodeHandlers } from '../utils/builderHandlers';

interface BuilderProps {
  shareModalOpen: boolean;
  setShareModalOpen: (open: boolean) => void;
}

export const Builder: React.FC<BuilderProps> = ({ shareModalOpen, setShareModalOpen }) => {
  const [builderMode, setBuilderMode] = useState('canvas');
  const [selectedVersion, setSelectedVersion] = useState('v1.3');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [configPanelOpen, setConfigPanelOpen] = useState(false);
  const [configTab, setConfigTab] = useState('settings');
  
  // Wizard state
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardData, setWizardData] = useState({
    workflowName: '',
    workflowDescription: '',
    triggerType: '',
    triggerService: '',
    actionType: '',
    actionService: '',
    additionalSteps: []
  });
  
  // Configuration panel state
  const [nodeConfig, setNodeConfig] = useState({
    name: '',
    description: '',
    timeout: 30,
    retryEnabled: false
  });

  // Workflow state
  const [workflowNodes, setWorkflowNodes] = useState<any[]>([]);
  const [connections, setConnections] = useState<any[]>([]);
  
  // Interaction state
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState<any>(null);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const [aiSuggestions, setAiSuggestions] = useState([
    { id: 1, text: 'Add error handling for API timeouts?', accepted: null },
    { id: 2, text: 'Schedule this workflow to run daily at 9 AM?', accepted: null },
    { id: 3, text: 'Send confirmation email to admin when workflow completes?', accepted: null }
  ]);

  // Initialize with sample nodes for demo
  useEffect(() => {
    setWorkflowNodes([
      { 
        id: 'demo-1', 
        type: 'trigger', 
        name: 'Form Submission', 
        x: 150, 
        y: 100, 
        width: 200,
        height: 80,
        hasError: false, 
        collaborators: [],
        config: { name: 'Form Submission', description: '', timeout: 30, retryEnabled: false }
      },
      { 
        id: 'demo-2', 
        type: 'action', 
        name: 'Send Email', 
        x: 150, 
        y: 250, 
        width: 200,
        height: 80,
        hasError: false, 
        collaborators: [],
        config: { 
          name: 'Send Email', 
          description: '', 
          timeout: 30, 
          retryEnabled: false,
          apiKey: '',
          senderEmail: '',
          recipientEmail: '',
          subject: '',
          body: '',
          enableHtml: false
        }
      },
      { 
        id: 'demo-3', 
        type: 'condition', 
        name: 'Check Status', 
        x: 450, 
        y: 175, 
        width: 200,
        height: 80,
        hasError: false, 
        collaborators: [],
        config: { name: 'Check Status', description: '', timeout: 30, retryEnabled: false }
      }
    ]);
    
    setConnections([
      {
        id: 'demo-conn-1',
        from: 'demo-1',
        to: 'demo-2',
        fromPoint: 'bottom',
        toPoint: 'top'
      },
      {
        id: 'demo-conn-2',
        from: 'demo-2',
        to: 'demo-3',
        fromPoint: 'right',
        toPoint: 'left'
      }
    ]);
  }, []);

  // Create handlers
  const { handlePaletteDragStart, handleCanvasDrop, handleCanvasDragOver } = createDragHandlers();
  const { handleNodeMouseDown } = createNodeHandlers();
  const { startConnection, completeConnection, cancelConnection } = createConnectionHandlers();

  const deleteNode = (nodeId: string) => {
    setWorkflowNodes(prev => prev.filter(n => n.id !== nodeId));
    setConnections(prev => prev.filter(c => c.from !== nodeId && c.to !== nodeId));
    if (selectedNode === nodeId) {
      setSelectedNode(null);
      setConfigPanelOpen(false);
      setNodeConfig({ name: '', description: '', timeout: 30, retryEnabled: false });
    }
  };

  const deleteConnection = (connectionId: string) => {
    setConnections(prev => prev.filter(c => c.id !== connectionId));
  };

  const handleNodeClick = (e: React.MouseEvent, nodeId: string) => {
    handleNodeMouseDown(
      e, 
      nodeId, 
      workflowNodes, 
      canvasRef, 
      setSelectedNode, 
      setWorkflowNodes, 
      setConfigPanelOpen, 
      setNodeConfig
    );
  };

  const handleCanvasDropWrapper = (e: React.DragEvent) => {
    handleCanvasDrop(e, canvasRef, setWorkflowNodes);
  };

  const handleCancelConnection = () => {
    cancelConnection(setIsConnecting, setConnectionStart);
  };

  const handleStartConnection = (nodeId: string, point: any, e: React.MouseEvent) => {
    startConnection(nodeId, point, e, workflowNodes, setIsConnecting, setConnectionStart);
  };

  const handleCompleteConnection = (nodeId: string, point: any, e: React.MouseEvent) => {
    completeConnection(
      nodeId, 
      point, 
      e, 
      isConnecting, 
      connectionStart, 
      setConnections, 
      setIsConnecting, 
      setConnectionStart
    );
  };

  // Wizard functions
  const wizardSteps = [
    { id: 1, title: 'Workflow Basics', description: 'Give your workflow a name and description' },
    { id: 2, title: 'Choose Trigger', description: 'What starts your workflow?' },
    { id: 3, title: 'Select Actions', description: 'What should happen?' },
    { id: 4, title: 'Review & Create', description: 'Review your workflow and create it' }
  ];

  const triggerOptions = [
    { id: 'webhook', name: 'Webhook/API Call', description: 'Trigger when an external service calls your webhook', icon: Globe },
    { id: 'schedule', name: 'Schedule', description: 'Run on a specific schedule (daily, weekly, etc.)', icon: Clock },
    { id: 'email', name: 'New Email', description: 'Trigger when you receive a new email', icon: Mail },
    { id: 'form', name: 'Form Submission', description: 'When a form is submitted on your website', icon: FileText }
  ];

  const actionOptions = [
    { id: 'email', name: 'Send Email', description: 'Send an email notification', icon: Mail, service: 'Gmail' },
    { id: 'slack', name: 'Send Slack Message', description: 'Post a message to Slack', icon: MessageSquare, service: 'Slack' },
    { id: 'database', name: 'Save to Database', description: 'Store data in a database', icon: Database, service: 'PostgreSQL' },
    { id: 'calendar', name: 'Create Calendar Event', description: 'Add an event to calendar', icon: Calendar, service: 'Google Calendar' }
  ];

  const handleWizardNext = () => {
    if (wizardStep < wizardSteps.length) {
      setWizardStep(wizardStep + 1);
    }
  };

  const handleWizardPrevious = () => {
    if (wizardStep > 1) {
      setWizardStep(wizardStep - 1);
    }
  };

  const handleWizardComplete = () => {
    // Generate workflow from wizard data
    const newNodes = [];
    const newConnections = [];
    
    // Create trigger node
    if (wizardData.triggerType) {
      const triggerNode = {
        id: `wizard-trigger-${Date.now()}`,
        type: 'trigger',
        name: triggerOptions.find(t => t.id === wizardData.triggerType)?.name || 'Trigger',
        x: 200,
        y: 100,
        width: 200,
        height: 80,
        hasError: false,
        collaborators: [],
        config: { name: wizardData.triggerType, description: '', timeout: 30, retryEnabled: false }
      };
      newNodes.push(triggerNode);
    }
    
    // Create action node
    if (wizardData.actionType) {
      const actionNode = {
        id: `wizard-action-${Date.now()}`,
        type: 'action',
        name: actionOptions.find(a => a.id === wizardData.actionType)?.name || 'Action',
        x: 200,
        y: 250,
        width: 200,
        height: 80,
        hasError: false,
        collaborators: [],
        config: { name: wizardData.actionType, description: '', timeout: 30, retryEnabled: false }
      };
      newNodes.push(actionNode);
      
      // Create connection
      if (newNodes.length === 2) {
        newConnections.push({
          id: `wizard-conn-${Date.now()}`,
          from: newNodes[0].id,
          to: newNodes[1].id,
          fromPoint: 'bottom',
          toPoint: 'top'
        });
      }
    }
    
    setWorkflowNodes(newNodes);
    setConnections(newConnections);
    setBuilderMode('canvas');
    
    // Reset wizard
    setWizardStep(1);
    setWizardData({
      workflowName: '',
      workflowDescription: '',
      triggerType: '',
      triggerService: '',
      actionType: '',
      actionService: '',
      additionalSteps: []
    });
  };

  const updateWizardData = (key: string, value: any) => {
    setWizardData(prev => ({ ...prev, [key]: value }));
  };

  const renderWizardStep = () => {
    switch (wizardStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl mb-2" style={{ color: '#EAEAEA' }}>Let's start with the basics</h3>
              <p style={{ color: '#A1A1A5' }}>Give your workflow a clear name and describe what it will do.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#EAEAEA' }}>
                  Workflow Name *
                </label>
                <Input
                  placeholder="e.g., Customer Onboarding Automation"
                  value={wizardData.workflowName}
                  onChange={(e) => updateWizardData('workflowName', e.target.value)}
                  className="w-full"
                  style={{
                    backgroundColor: '#1E1E22',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#EAEAEA'
                  }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#EAEAEA' }}>
                  Description
                </label>
                <Textarea
                  placeholder="Describe what this workflow will do..."
                  value={wizardData.workflowDescription}
                  onChange={(e) => updateWizardData('workflowDescription', e.target.value)}
                  rows={4}
                  className="w-full"
                  style={{
                    backgroundColor: '#1E1E22',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#EAEAEA'
                  }}
                />
              </div>
            </div>
            
            <div className="border rounded-lg p-4" style={{
              backgroundColor: '#141419',
              borderColor: 'rgba(255, 255, 255, 0.1)'
            }}>
              <div className="flex items-start space-x-3">
                <Lightbulb className="h-5 w-5 mt-0.5" style={{ color: '#2A66F6' }} />
                <div>
                  <p className="text-sm font-medium" style={{ color: '#EAEAEA' }}>Pro Tip</p>
                  <p className="text-sm mt-1" style={{ color: '#A1A1A5' }}>
                    Choose a descriptive name that explains the workflow's purpose. This helps you and your team understand what it does at a glance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl mb-2" style={{ color: '#EAEAEA' }}>What should trigger your workflow?</h3>
              <p style={{ color: '#A1A1A5' }}>Choose what event will start your automation.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {triggerOptions.map((trigger) => {
                const Icon = trigger.icon;
                const isSelected = wizardData.triggerType === trigger.id;
                
                return (
                  <div
                    key={trigger.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all`}
                    style={{
                      backgroundColor: isSelected ? '#141419' : '#141419',
                      borderColor: isSelected ? '#9B4A4A' : 'rgba(255, 255, 255, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.borderColor = 'rgba(155, 74, 74, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onClick={() => updateWizardData('triggerType', trigger.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className={`h-6 w-6 mt-1`} style={{
                        color: isSelected ? '#9B4A4A' : '#6D6D70'
                      }} />
                      <div className="flex-1">
                        <h4 className="font-medium" style={{ color: '#EAEAEA' }}>{trigger.name}</h4>
                        <p className="text-sm mt-1" style={{ color: '#A1A1A5' }}>{trigger.description}</p>
                      </div>
                      {isSelected && (
                        <CheckCircle className="h-5 w-5" style={{ color: '#9B4A4A' }} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {wizardData.triggerType && (
              <div className="border rounded-lg p-4" style={{
                backgroundColor: '#141419',
                borderColor: '#4ADE80'
              }}>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" style={{ color: '#4ADE80' }} />
                  <p className="text-sm font-medium" style={{ color: '#EAEAEA' }}>
                    Selected: {triggerOptions.find(t => t.id === wizardData.triggerType)?.name}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl mb-2" style={{ color: '#EAEAEA' }}>What should happen next?</h3>
              <p style={{ color: '#A1A1A5' }}>Choose the action your workflow will perform when triggered.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {actionOptions.map((action) => {
                const Icon = action.icon;
                const isSelected = wizardData.actionType === action.id;
                
                return (
                  <div
                    key={action.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all`}
                    style={{
                      backgroundColor: isSelected ? '#141419' : '#141419',
                      borderColor: isSelected ? '#9B4A4A' : 'rgba(255, 255, 255, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.borderColor = 'rgba(155, 74, 74, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onClick={() => updateWizardData('actionType', action.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className={`h-6 w-6 mt-1`} style={{
                        color: isSelected ? '#9B4A4A' : '#6D6D70'
                      }} />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium" style={{ color: '#EAEAEA' }}>{action.name}</h4>
                          <Badge variant="outline" className="text-xs" style={{
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            color: '#A1A1A5'
                          }}>{action.service}</Badge>
                        </div>
                        <p className="text-sm mt-1" style={{ color: '#A1A1A5' }}>{action.description}</p>
                      </div>
                      {isSelected && (
                        <CheckCircle className="h-5 w-5" style={{ color: '#9B4A4A' }} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {wizardData.actionType && (
              <div className="border rounded-lg p-4" style={{
                backgroundColor: '#141419',
                borderColor: '#4ADE80'
              }}>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" style={{ color: '#4ADE80' }} />
                  <p className="text-sm font-medium" style={{ color: '#EAEAEA' }}>
                    Selected: {actionOptions.find(a => a.id === wizardData.actionType)?.name}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl mb-2" style={{ color: '#EAEAEA' }}>Review Your Workflow</h3>
              <p style={{ color: '#A1A1A5' }}>Check everything looks correct before creating your workflow.</p>
            </div>
            
            <div className="border rounded-lg p-6 space-y-4" style={{
              backgroundColor: '#141419',
              borderColor: 'rgba(255, 255, 255, 0.1)'
            }}>
              <div>
                <h4 className="font-medium mb-2" style={{ color: '#EAEAEA' }}>Workflow Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#A1A1A5' }}>Name:</span>
                    <span className="text-sm font-medium" style={{ color: '#EAEAEA' }}>{wizardData.workflowName || 'Untitled Workflow'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#A1A1A5' }}>Description:</span>
                    <span className="text-sm font-medium" style={{ color: '#EAEAEA' }}>{wizardData.workflowDescription || 'No description'}</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <h4 className="font-medium mb-4" style={{ color: '#EAEAEA' }}>Workflow Flow</h4>
                <div className="flex items-center space-x-4">
                  {/* Trigger */}
                  <div className="flex-1">
                    <div className="text-white p-3 rounded-lg text-center" style={{ backgroundColor: '#9B4A4A' }}>
                      <div className="font-medium text-sm">
                        {triggerOptions.find(t => t.id === wizardData.triggerType)?.name || 'No Trigger'}
                      </div>
                      <div className="text-xs opacity-90 mt-1">TRIGGER</div>
                    </div>
                  </div>
                  
                  <ArrowRight className="h-5 w-5" style={{ color: '#6D6D70' }} />
                  
                  {/* Action */}
                  <div className="flex-1">
                    <div className="text-white p-3 rounded-lg text-center" style={{ backgroundColor: '#2A66F6' }}>
                      <div className="font-medium text-sm">
                        {actionOptions.find(a => a.id === wizardData.actionType)?.name || 'No Action'}
                      </div>
                      <div className="text-xs opacity-90 mt-1">ACTION</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4" style={{
              backgroundColor: '#141419',
              borderColor: 'rgba(255, 255, 255, 0.1)'
            }}>
              <div className="flex items-start space-x-3">
                <Sparkles className="h-5 w-5 mt-0.5" style={{ color: '#2A66F6' }} />
                <div>
                  <p className="text-sm font-medium" style={{ color: '#EAEAEA' }}>What's Next?</p>
                  <p className="text-sm mt-1" style={{ color: '#A1A1A5' }}>
                    After creating your workflow, you can configure each step in detail and test it before going live.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold" style={{ color: '#EAEAEA' }}>AI Workflow Builder</h1>
        <div className="flex items-center space-x-2">
          <Select value={selectedVersion} onValueChange={setSelectedVersion}>
            <SelectTrigger className="w-32" style={{
              backgroundColor: '#141419',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              color: '#EAEAEA'
            }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="v1.3">v1.3 (Current)</SelectItem>
              <SelectItem value="v1.2">v1.2</SelectItem>
              <SelectItem value="v1.1">v1.1</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" style={{
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#A1A1A5'
          }}>
            <History className="h-4 w-4 mr-2" />
            Compare
          </Button>
          <Button style={{
            backgroundColor: '#1D0210',
            color: '#FFFFFF'
          }} className="hover:bg-[#160008]">
            <Save className="h-4 w-4 mr-2" />
            Save Workflow
          </Button>
        </div>
      </div>

      {/* Builder Tabs */}
      <Tabs value={builderMode} onValueChange={setBuilderMode}>
        <TabsList className="grid w-full grid-cols-3" style={{ backgroundColor: '#141419' }}>
          <TabsTrigger 
            value="ai" 
            className="data-[state=active]:bg-[#1D0210] data-[state=active]:text-white" 
            style={{ color: '#A1A1A5' }}
          >
            <Brain className="h-4 w-4 mr-2" style={{ color: '#1D0210' }} />
            AI Builder
          </TabsTrigger>
          <TabsTrigger 
            value="wizard" 
            className="data-[state=active]:bg-[#1D0210] data-[state=active]:text-white" 
            style={{ color: '#A1A1A5' }}
          >
            <Zap className="h-4 w-4 mr-2" />
            Wizard
          </TabsTrigger>
          <TabsTrigger 
            value="canvas" 
            className="data-[state=active]:bg-[#1D0210] data-[state=active]:text-white" 
            style={{ color: '#A1A1A5' }}
          >
            <MousePointer className="h-4 w-4 mr-2" />
            Canvas
          </TabsTrigger>
        </TabsList>

        {/* AI Builder Mode */}
        <TabsContent value="ai" className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full min-h-[600px]">
            <div className="space-y-6">
              <Card style={{ backgroundColor: '#141419', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <CardHeader>
                  <CardTitle className="flex items-center" style={{ color: '#EAEAEA' }}>
                    <Brain className="h-5 w-5 mr-2" style={{ color: '#1D0210' }} />
                    Describe Your Workflow
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg border" style={{
                    backgroundColor: '#0E0E10',
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                  }}>
                    <Textarea
                      className="w-full h-32 resize-none border-none outline-none bg-transparent"
                      style={{ color: '#EAEAEA' }}
                      placeholder="Describe what you want to automate in plain English..."
                      defaultValue="When a form is submitted on our website, add the contact to our CRM, send a welcome email, and notify the sales team on Slack."
                    />
                  </div>
                  <Button className="w-full" style={{
                    backgroundColor: '#1D0210',
                    color: '#FFFFFF'
                  }}>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Workflow
                  </Button>
                </CardContent>
              </Card>

              <Card style={{ backgroundColor: '#141419', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <CardHeader>
                  <CardTitle className="flex items-center" style={{ color: '#EAEAEA' }}>
                    <Lightbulb className="h-5 w-5 mr-2" style={{ color: '#1D0210' }} />
                    AI Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {aiSuggestions.map((suggestion) => (
                      <div key={suggestion.id} className="p-3 rounded-lg border" style={{
                        backgroundColor: '#0E0E10',
                        borderColor: 'rgba(255, 255, 255, 0.1)'
                      }}>
                        <div className="flex items-start justify-between">
                          <p className="text-sm flex-1" style={{ color: '#EAEAEA' }}>{suggestion.text}</p>
                          <div className="flex space-x-2 ml-3">
                            <Button size="sm" variant={suggestion.accepted === true ? "default" : "outline"} style={{
                              borderColor: 'rgba(255, 255, 255, 0.1)',
                              color: '#A1A1A5'
                            }}>
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant={suggestion.accepted === false ? "default" : "outline"} style={{
                              borderColor: 'rgba(255, 255, 255, 0.1)',
                              color: '#A1A1A5'
                            }}>
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card style={{ backgroundColor: '#141419', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
              <CardHeader>
                <CardTitle className="flex items-center" style={{ color: '#EAEAEA' }}>
                  <GitBranch className="h-5 w-5 mr-2" style={{ color: '#1D0210' }} />
                  Visual Editor
                  <div className="ml-auto flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">SC</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">MR</AvatarFallback>
                    </Avatar>
                    <span className="text-xs" style={{ color: '#6D6D70' }}>2 online</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <div className="p-4 rounded-lg text-white" style={{ backgroundColor: '#6B2D2D' }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Zap className="h-5 w-5 mr-2" />
                        <span className="font-medium">Trigger: Form Submission</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm mt-2 opacity-90">Website contact form</p>
                  </div>
                  <div className="flex justify-center">
                    <ArrowDown className="h-6 w-6" style={{ color: '#6B2D2D' }} />
                  </div>
                  <div className="p-4 rounded-lg border" style={{
                    backgroundColor: '#0E0E10',
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                  }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="h-5 w-5 mr-2 text-[var(--opsyn-dusty-rose)]" />
                        <span className="font-medium text-[var(--opsyn-navy)]">Add to CRM</span>
                      </div>
                    </div>
                    <p className="text-sm mt-2 text-gray-600">Create contact in Salesforce</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Wizard Mode */}
        <TabsContent value="wizard" className="flex-1">
          <div className="max-w-4xl mx-auto">
            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {wizardSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      wizardStep > step.id 
                        ? 'bg-green-500 text-white' 
                        : wizardStep === step.id 
                        ? 'bg-[var(--opsyn-dusty-rose)] text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {wizardStep > step.id ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <span>{step.id}</span>
                      )}
                    </div>
                    <div className="ml-3 hidden sm:block">
                      <div className={`text-sm font-medium ${
                        wizardStep >= step.id ? 'text-[var(--opsyn-navy)]' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-500">{step.description}</div>
                    </div>
                    {index < wizardSteps.length - 1 && (
                      <div className={`mx-4 h-px w-12 sm:w-24 ${
                        wizardStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step content */}
            <Card style={{ backgroundColor: '#141419', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
              <CardContent className="p-8">
                {renderWizardStep()}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-6">
              <Button
                variant="outline"
                onClick={handleWizardPrevious}
                disabled={wizardStep === 1}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              <div className="text-sm text-gray-500">
                Step {wizardStep} of {wizardSteps.length}
              </div>

              {wizardStep === wizardSteps.length ? (
                <Button
                  onClick={handleWizardComplete}
                  className="bg-[var(--opsyn-dusty-rose)] hover:bg-[var(--opsyn-dusty-rose)]/90 flex items-center space-x-2"
                  disabled={!wizardData.workflowName || !wizardData.triggerType || !wizardData.actionType}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Create Workflow</span>
                </Button>
              ) : (
                <Button
                  onClick={handleWizardNext}
                  className="bg-[var(--opsyn-dusty-rose)] hover:bg-[var(--opsyn-dusty-rose)]/90 flex items-center space-x-2"
                  disabled={
                    (wizardStep === 1 && !wizardData.workflowName) ||
                    (wizardStep === 2 && !wizardData.triggerType) ||
                    (wizardStep === 3 && !wizardData.actionType)
                  }
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Enhanced Canvas Mode */}
        <TabsContent value="canvas" className="flex-1">
          <div className="flex flex-col h-full min-h-[600px] space-y-4">
            {/* Connection Status Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Communication">Communication</SelectItem>
                    <SelectItem value="Data Integration">Data Integration</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Monitoring">Monitoring</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {isConnecting && connectionStart && (
                <div className="text-sm text-[var(--opsyn-dusty-rose)] font-medium animate-pulse">
                  🔗 Connecting from "{connectionStart.node.name}" → Click a blue input point
                </div>
              )}
            </div>

            <div className="flex-1 grid grid-cols-12 gap-6">
              {/* Left Panel - Complete Node Palette + AI Suggestions */}
              <div className="col-span-3 space-y-6">
                <NodePalette
                  selectedCategory={selectedCategory}
                  onDragStart={handlePaletteDragStart}
                />
                <AISuggestionsPanel />
              </div>

              {/* Main Canvas Area */}
              <div className={`${configPanelOpen ? 'col-span-4' : 'col-span-9'} transition-all duration-300`}>
                <Card className="h-full relative overflow-hidden" style={{ 
                  backgroundColor: '#101624', 
                  borderColor: 'rgba(255, 255, 255, 0.1)' 
                }}>
                  <CardHeader className="border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <div className="flex items-center justify-between">
                      <CardTitle style={{ color: '#EAEAEA' }}>Workflow Canvas</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => {
                          setWorkflowNodes([]);
                          setConnections([]);
                        }} style={{
                          borderColor: 'rgba(255, 255, 255, 0.1)',
                          color: '#A1A1A5'
                        }}>
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" style={{
                          borderColor: 'rgba(255, 255, 255, 0.1)',
                          color: '#A1A1A5'
                        }}>
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-0 h-full relative">
                    <WorkflowCanvas
                      canvasRef={canvasRef}
                      workflowNodes={workflowNodes}
                      connections={connections}
                      isConnecting={isConnecting}
                      connectionStart={connectionStart}
                      onNodeMouseDown={handleNodeClick}
                      onNodeDelete={deleteNode}
                      onConnectionDelete={deleteConnection}
                      onCanvasDrop={handleCanvasDropWrapper}
                      onCanvasDragOver={handleCanvasDragOver}
                      onCancelConnection={handleCancelConnection}
                      onStartConnection={handleStartConnection}
                      onCompleteConnection={handleCompleteConnection}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Configuration Panel */}
              {configPanelOpen && (
                <ConfigurationPanel
                  selectedNode={selectedNode}
                  configTab={configTab}
                  setConfigTab={setConfigTab}
                  nodeConfig={nodeConfig}
                  setNodeConfig={setNodeConfig}
                  workflowNodes={workflowNodes}
                  setWorkflowNodes={setWorkflowNodes}
                  onClose={() => {
                    setConfigPanelOpen(false);
                    setSelectedNode(null);
                  }}
                />
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
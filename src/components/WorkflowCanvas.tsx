import React, { useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { 
  RotateCcw,
  Move,
  AlertCircle,
  Plus,
  Workflow,
  MousePointer,
  Play,
  Trash2,
  Save,
  X,
  Settings,
  ScrollText,
  CheckCircle,
  XCircle,
  Zap
} from 'lucide-react';
import { nodeTypes, aiNodeSuggestions, canvasNodes, workflowConnections } from '../data/sampleData';
import { createCurvedPath, getConnectionPoints } from '../utils/canvasHelpers';

interface WorkflowCanvasProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedNode: string | null;
  setSelectedNode: (nodeId: string | null) => void;
  configPanelOpen: boolean;
  setConfigPanelOpen: (open: boolean) => void;
  configTab: string;
  setConfigTab: (tab: string) => void;
  hoveredConnection: any;
  setHoveredConnection: (connection: any) => void;
  hoveredNode: string | null;
  setHoveredNode: (nodeId: string | null) => void;
  mousePosition: { x: number; y: number };
  setMousePosition: (position: { x: number; y: number }) => void;
}

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedNode,
  setSelectedNode,
  configPanelOpen,
  setConfigPanelOpen,
  configTab,
  setConfigTab,
  hoveredConnection,
  setHoveredConnection,
  hoveredNode,
  setHoveredNode,
  mousePosition,
  setMousePosition
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <TooltipProvider>
      <div className="flex flex-col h-full min-h-[600px] space-y-4">
        {/* Category Selector Above Canvas */}
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
              <SelectItem value="HR">HR</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 grid grid-cols-12 gap-6">
          {/* Left Panel - Node Palette + AI Suggestions */}
          <div className="col-span-3 space-y-6">
            {/* Node Palette */}
            <Card className="bg-[var(--opsyn-light-blush)] border-[var(--opsyn-dusty-rose)]/20">
              <CardHeader>
                <CardTitle className="text-[var(--opsyn-navy)]">Node Palette</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-[var(--opsyn-navy)] mb-2">Triggers</h4>
                    <div className="space-y-2">
                      {nodeTypes
                        .filter(n => n.type === 'trigger' && (selectedCategory === 'all' || n.category === selectedCategory))
                        .map((node) => {
                          const Icon = node.icon;
                          return (
                            <div key={node.id} className="flex items-center p-2 bg-white rounded border border-[var(--opsyn-dusty-rose)]/20 cursor-grab hover:shadow-sm">
                              <Icon className="h-4 w-4 mr-2 text-[var(--opsyn-dusty-rose)]" />
                              <span className="text-sm text-[var(--opsyn-navy)]">{node.name}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-[var(--opsyn-navy)] mb-2">Actions</h4>
                    <div className="space-y-2">
                      {nodeTypes
                        .filter(n => n.type === 'action' && (selectedCategory === 'all' || n.category === selectedCategory))
                        .map((node) => {
                          const Icon = node.icon;
                          return (
                            <div key={node.id} className="flex items-center p-2 bg-white rounded border border-[var(--opsyn-dusty-rose)]/20 cursor-grab hover:shadow-sm">
                              <Icon className="h-4 w-4 mr-2 text-[var(--opsyn-dusty-rose)]" />
                              <span className="text-sm text-[var(--opsyn-navy)]">{node.name}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-[var(--opsyn-navy)] mb-2">Conditions</h4>
                    <div className="space-y-2">
                      {nodeTypes
                        .filter(n => n.type === 'condition' && (selectedCategory === 'all' || n.category === selectedCategory))
                        .map((node) => {
                          const Icon = node.icon;
                          return (
                            <div key={node.id} className="flex items-center p-2 bg-white rounded border border-[var(--opsyn-dusty-rose)]/20 cursor-grab hover:shadow-sm">
                              <Icon className="h-4 w-4 mr-2 text-[var(--opsyn-dusty-rose)]" />
                              <span className="text-sm text-[var(--opsyn-navy)]">{node.name}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Suggestions Panel */}
            <Card className="bg-[var(--opsyn-light-blush)] border-[var(--opsyn-dusty-rose)]/20">
              <CardHeader>
                <CardTitle className="flex items-center text-[var(--opsyn-navy)]">
                  <Zap className="h-4 w-4 mr-2 text-[var(--opsyn-dusty-rose)]" />
                  AI Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiNodeSuggestions.map((suggestion) => {
                    const Icon = suggestion.icon;
                    return (
                      <div key={suggestion.id} className="p-3 bg-white rounded-lg border border-[var(--opsyn-dusty-rose)]/10 hover:shadow-sm cursor-pointer transition-all">
                        <div className="flex items-start space-x-3">
                          <Icon className="h-4 w-4 text-[var(--opsyn-dusty-rose)] mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-[var(--opsyn-navy)]">{suggestion.name}</p>
                            <p className="text-xs text-gray-600 mt-1">{suggestion.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Canvas */}
          <div className={`${configPanelOpen ? 'col-span-6' : 'col-span-9'} transition-all duration-300`}>
            <Card className="bg-white border-[var(--opsyn-dusty-rose)]/20 h-full relative overflow-hidden">
              <CardHeader className="border-b border-[var(--opsyn-dusty-rose)]/20">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[var(--opsyn-navy)]">Workflow Canvas</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Move className="h-4 w-4" />
                    </Button>
                    <div className="text-sm text-muted-foreground">100%</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 h-full relative">
                <div 
                  ref={canvasRef}
                  className="w-full h-full"
                  onMouseMove={(e) => {
                    if (canvasRef.current) {
                      const rect = canvasRef.current.getBoundingClientRect();
                      setMousePosition({
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top
                      });
                    }
                  }}
                >
                  {/* Grid Pattern */}
                  <div className="absolute inset-0" style={{
                    backgroundImage: `
                      linear-gradient(#E8C4C4 1px, transparent 1px),
                      linear-gradient(90deg, #E8C4C4 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px',
                    opacity: 0.3
                  }}></div>
                  
                  {/* Canvas Content with Enhanced Nodes and Connections */}
                  <div className="relative h-full p-6">
                    {/* Connection Lines SVG */}
                    <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
                      {/* Define markers for arrowheads */}
                      <defs>
                        <marker id="arrowhead-active" markerWidth="10" markerHeight="7" 
                         refX="9" refY="3.5" orient="auto" markerUnits="strokeWidth">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#CE7777" />
                        </marker>
                        <marker id="arrowhead-conditional" markerWidth="10" markerHeight="7" 
                         refX="9" refY="3.5" orient="auto" markerUnits="strokeWidth">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#F2E5E5" />
                        </marker>
                      </defs>
                      
                      {/* Render connections */}
                      {workflowConnections.map((connection) => {
                        const fromNode = canvasNodes.find(n => n.id === connection.from);
                        const toNode = canvasNodes.find(n => n.id === connection.to);
                        
                        if (!fromNode || !toNode) return null;
                        
                        const pathD = createCurvedPath(fromNode, toNode, connection);
                        const isActive = connection.type === 'active';
                        const strokeColor = isActive ? '#CE7777' : '#F2E5E5';
                        const strokeDasharray = isActive ? 'none' : '5,5';
                        const markerEnd = isActive ? 'url(#arrowhead-active)' : 'url(#arrowhead-conditional)';
                        
                        return (
                          <g key={connection.id}>
                            {/* Connection path with hover area */}
                            <path
                              d={pathD}
                              stroke="transparent"
                              strokeWidth="12"
                              fill="none"
                              style={{ pointerEvents: 'all', cursor: 'pointer' }}
                              onMouseEnter={() => setHoveredConnection(connection)}
                              onMouseLeave={() => setHoveredConnection(null)}
                            />
                            <path
                              d={pathD}
                              stroke={hoveredConnection?.id === connection.id ? '#CE7777' : strokeColor}
                              strokeWidth={hoveredConnection?.id === connection.id ? '3' : '2'}
                              strokeDasharray={strokeDasharray}
                              fill="none"
                              markerEnd={markerEnd}
                              style={{ pointerEvents: 'none' }}
                            />
                          </g>
                        );
                      })}
                    </svg>

                    {/* Nodes with enhanced features */}
                    {canvasNodes.map((node) => (
                      <div
                        key={node.id}
                        className={`absolute p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                          node.type === 'trigger' ? 'bg-[var(--opsyn-dusty-rose)] text-white border-[var(--opsyn-dusty-rose)]' :
                          node.type === 'action' ? 'bg-[var(--opsyn-pale-blush)] text-[var(--opsyn-navy)] border-[var(--opsyn-dusty-rose)]/20' :
                          'bg-[var(--opsyn-light-blush)] text-[var(--opsyn-navy)] border-[var(--opsyn-dusty-rose)]/20'
                        } ${selectedNode === node.id ? 'ring-2 ring-[var(--opsyn-dusty-rose)]' : ''}`}
                        style={{ left: node.x, top: node.y, width: node.width, height: node.height }}
                        onClick={() => {
                          setSelectedNode(node.id);
                          setConfigPanelOpen(true);
                        }}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                      >
                        {/* Error Indicator */}
                        {node.hasError && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                <AlertCircle className="h-3 w-3 text-white" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{node.errorMessage}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}

                        {/* Collaboration Indicators */}
                        {node.collaborators.map((collaborator, index) => (
                          <div
                            key={index}
                            className="absolute -top-1 -left-1 w-3 h-3 rounded-full border-2 border-white"
                            style={{ backgroundColor: collaborator.color, left: `${index * 8}px` }}
                            title={`${collaborator.name} is viewing`}
                          />
                        ))}

                        {/* Connection Points (show on hover) */}
                        {hoveredNode === node.id && getConnectionPoints(node).map((point, index) => (
                          <div
                            key={index}
                            className="absolute w-3 h-3 bg-[var(--opsyn-dusty-rose)] rounded-full border-2 border-white flex items-center justify-center cursor-crosshair hover:scale-125 transition-transform"
                            style={{ 
                              left: point.x - node.x - 6, 
                              top: point.y - node.y - 6,
                              zIndex: 10
                            }}
                            title={`Connect from ${point.position}`}
                          >
                            <Plus className="h-2 w-2 text-white" />
                          </div>
                        ))}

                        <div className="flex items-center space-x-2">
                          <Workflow className="h-5 w-5" />
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">{node.name}</span>
                            <span className="text-xs opacity-75">Step {node.step}</span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Connection Tooltip */}
                    {hoveredConnection && (
                      <div
                        className="absolute bg-[var(--opsyn-navy)] text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none"
                        style={{
                          left: mousePosition.x + 10,
                          top: mousePosition.y - 10,
                          zIndex: 50
                        }}
                      >
                        Step {hoveredConnection.fromStep} → Step {hoveredConnection.toStep}
                        {hoveredConnection.condition && (
                          <div className="text-[var(--opsyn-pale-blush)]">
                            Condition: {hoveredConnection.condition}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Empty State */}
                    {canvasNodes.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <MousePointer className="h-12 w-12 mx-auto mb-4 text-[var(--opsyn-dusty-rose)]" />
                          <p className="text-lg font-medium">Drag nodes from the palette to start building</p>
                          <p className="text-sm">Create workflows visually by connecting nodes</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Mini-map */}
                  <div className="absolute bottom-4 right-4 w-40 h-24 bg-[var(--opsyn-light-blush)] border-2 border-[var(--opsyn-dusty-rose)]/40 rounded-lg shadow-lg">
                    <div className="h-full flex items-center justify-center text-xs text-muted-foreground relative">
                      <span>Mini-map</span>
                      {/* Sample mini-nodes with connections */}
                      <div className="absolute top-2 left-2 w-2 h-2 bg-[var(--opsyn-dusty-rose)] rounded-sm"></div>
                      <div className="absolute top-5 left-2 w-2 h-2 bg-[var(--opsyn-pale-blush)] rounded-sm"></div>
                      <div className="absolute top-8 left-2 w-2 h-2 bg-[var(--opsyn-pale-blush)] rounded-sm"></div>
                      {/* Mini connection lines */}
                      <svg className="absolute inset-0">
                        <line x1="3" y1="9" x2="3" y2="13" stroke="#CE7777" strokeWidth="1"/>
                        <line x1="3" y1="17" x2="3" y2="21" stroke="#CE7777" strokeWidth="1"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Node Configuration */}
          {configPanelOpen && (
            <div className="col-span-3">
              <Card className="bg-[var(--opsyn-pale-blush)] border-[var(--opsyn-dusty-rose)]/20 h-full">
                <CardHeader className="border-b border-[var(--opsyn-dusty-rose)]/20">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[var(--opsyn-navy)]">Node Configuration</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setConfigPanelOpen(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Tabs value={configTab} onValueChange={setConfigTab}>
                    <TabsList className="grid w-full grid-cols-2 bg-[var(--opsyn-light-blush)] m-2">
                      <TabsTrigger value="settings" className="data-[state=active]:bg-[var(--opsyn-dusty-rose)] data-[state=active]:text-white">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </TabsTrigger>
                      <TabsTrigger value="logs" className="data-[state=active]:bg-[var(--opsyn-dusty-rose)] data-[state=active]:text-white">
                        <ScrollText className="h-4 w-4 mr-2" />
                        Logs
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="settings" className="p-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--opsyn-navy)] mb-2">Node Name</label>
                        <Input defaultValue="Form Submission" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--opsyn-navy)] mb-2">Description</label>
                        <Textarea defaultValue="Triggers when a contact form is submitted" className="h-20" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--opsyn-navy)] mb-2">Timeout (seconds)</label>
                        <Input defaultValue="30" type="number" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="retry" />
                        <label htmlFor="retry" className="text-sm text-[var(--opsyn-navy)]">Enable retry on failure</label>
                      </div>
                    </TabsContent>

                    <TabsContent value="logs" className="p-4 space-y-4">
                      <div className="space-y-3">
                        <div className="p-3 bg-white rounded-lg border border-[var(--opsyn-dusty-rose)]/10">
                          <div className="flex items-center space-x-2 mb-1">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium text-[var(--opsyn-navy)]">Execution Success</span>
                          </div>
                          <p className="text-xs text-muted-foreground">2024-01-20 14:30:22</p>
                          <p className="text-xs text-gray-600 mt-1">Form data processed successfully</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg border border-[var(--opsyn-dusty-rose)]/10">
                          <div className="flex items-center space-x-2 mb-1">
                            <XCircle className="h-4 w-4 text-red-500" />
                            <span className="text-sm font-medium text-[var(--opsyn-navy)]">Execution Failed</span>
                          </div>
                          <p className="text-xs text-muted-foreground">2024-01-20 12:15:18</p>
                          <p className="text-xs text-gray-600 mt-1">Invalid email format</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Bottom Toolbar */}
        <div className="flex justify-between items-center p-4 bg-[var(--opsyn-light-blush)] border border-[var(--opsyn-dusty-rose)]/20 rounded-lg">
          <Button className="bg-[var(--opsyn-dusty-rose)] hover:bg-[var(--opsyn-dusty-rose)]/90 text-white">
            <Play className="h-4 w-4 mr-2" />
            Run Test Workflow
          </Button>
          
          <div className="flex space-x-2">
            <Button variant="outline">
              <Trash2 className="h-4 w-4 mr-2" />
              Discard Changes
            </Button>
            <Button className="bg-[var(--opsyn-navy)] hover:bg-[var(--opsyn-navy)]/90 text-white">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
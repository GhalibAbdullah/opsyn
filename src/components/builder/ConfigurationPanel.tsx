import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { X, Settings as SettingsIcon, FileText, CheckCircle, XCircle, Clock, Eye, EyeOff } from 'lucide-react';

interface ConfigurationPanelProps {
  selectedNode: string | null;
  configTab: string;
  setConfigTab: (tab: string) => void;
  nodeConfig: any;
  setNodeConfig: (config: any) => void;
  workflowNodes: any[];
  setWorkflowNodes: (updater: (nodes: any[]) => any[]) => void;
  onClose: () => void;
}

export const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
  selectedNode,
  configTab,
  setConfigTab,
  nodeConfig,
  setNodeConfig,
  workflowNodes,
  setWorkflowNodes,
  onClose
}) => {
  const [showSecrets, setShowSecrets] = React.useState<{[key: string]: boolean}>({});
  
  const selectedNodeData = workflowNodes.find(n => n.id === selectedNode);
  
  if (!selectedNode || !selectedNodeData) return null;

  const updateNodeConfig = (field: string, value: any) => {
    const newConfig = { ...nodeConfig, [field]: value };
    setNodeConfig(newConfig);
    
    setWorkflowNodes(prev => prev.map(node => 
      node.id === selectedNode 
        ? { ...node, config: newConfig }
        : node
    ));
  };

  const toggleSecretVisibility = (field: string) => {
    setShowSecrets(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const renderSecretInput = (field: string, label: string, placeholder: string) => (
    <div className="space-y-2">
      <Label style={{ color: '#A1A1A5' }}>{label}</Label>
      <div className="relative">
        <Input
          type={showSecrets[field] ? "text" : "password"}
          placeholder={placeholder}
          value={nodeConfig[field] || ''}
          onChange={(e) => updateNodeConfig(field, e.target.value)}
          className="pr-10"
          style={{
            backgroundColor: '#1E1E22',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#EAEAEA'
          }}
        />
        <button
          type="button"
          onClick={() => toggleSecretVisibility(field)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600"
          style={{ color: '#6D6D70' }}
        >
          {showSecrets[field] ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );

  const renderEmailConfiguration = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 p-3 rounded-lg" style={{
        backgroundColor: '#141419',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid'
      }}>
        <SettingsIcon className="h-5 w-5" style={{ color: '#2A66F6' }} />
        <div>
          <div className="font-medium" style={{ color: '#EAEAEA' }}>Email Configuration</div>
          <div className="text-sm" style={{ color: '#A1A1A5' }}>Configure email sending parameters</div>
        </div>
      </div>
      
      {renderSecretInput('apiKey', 'API Key', 'Enter your email service API key')}
      
      <div className="space-y-2">
        <Label style={{ color: '#A1A1A5' }}>Sender Email</Label>
        <Input
          type="email"
          placeholder="sender@company.com"
          value={nodeConfig.senderEmail || ''}
          onChange={(e) => updateNodeConfig('senderEmail', e.target.value)}
          style={{
            backgroundColor: '#1E1E22',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#EAEAEA'
          }}
        />
      </div>
      
      <div className="space-y-2">
        <Label style={{ color: '#A1A1A5' }}>Recipient Email</Label>
        <Input
          type="email"
          placeholder="recipient@company.com"
          value={nodeConfig.recipientEmail || ''}
          onChange={(e) => updateNodeConfig('recipientEmail', e.target.value)}
          style={{
            backgroundColor: '#1E1E22',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#EAEAEA'
          }}
        />
      </div>
      
      <div className="space-y-2">
        <Label style={{ color: '#A1A1A5' }}>Subject</Label>
        <Input
          placeholder="Email subject"
          value={nodeConfig.subject || ''}
          onChange={(e) => updateNodeConfig('subject', e.target.value)}
          style={{
            backgroundColor: '#1E1E22',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#EAEAEA'
          }}
        />
      </div>
      
      <div className="space-y-2">
        <Label style={{ color: '#A1A1A5' }}>Email Body</Label>
        <Textarea
          placeholder="Email content..."
          value={nodeConfig.body || ''}
          onChange={(e) => updateNodeConfig('body', e.target.value)}
          rows={4}
          style={{
            backgroundColor: '#1E1E22',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#EAEAEA'
          }}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          checked={nodeConfig.enableHtml || false}
          onCheckedChange={(checked) => updateNodeConfig('enableHtml', checked)}
        />
        <Label style={{ color: '#A1A1A5' }}>Enable HTML content</Label>
      </div>
    </div>
  );

  const renderSlackConfiguration = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 p-3 rounded-lg" style={{
        backgroundColor: '#141419',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid'
      }}>
        <SettingsIcon className="h-5 w-5" style={{ color: '#4ADE80' }} />
        <div>
          <div className="font-medium" style={{ color: '#EAEAEA' }}>Slack Configuration</div>
          <div className="text-sm" style={{ color: '#A1A1A5' }}>Configure Slack messaging</div>
        </div>
      </div>
      
      {renderSecretInput('webhookUrl', 'Webhook URL', 'https://hooks.slack.com/services/...')}
      
      <div className="space-y-2">
        <Label style={{ color: '#A1A1A5' }}>Channel</Label>
        <Input
          placeholder="#general"
          value={nodeConfig.channel || ''}
          onChange={(e) => updateNodeConfig('channel', e.target.value)}
          style={{
            backgroundColor: '#1E1E22',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#EAEAEA'
          }}
        />
      </div>
      
      <div className="space-y-2">
        <Label style={{ color: '#A1A1A5' }}>Message</Label>
        <Textarea
          placeholder="Message to send..."
          value={nodeConfig.message || ''}
          onChange={(e) => updateNodeConfig('message', e.target.value)}
          rows={3}
          style={{
            backgroundColor: '#1E1E22',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#EAEAEA'
          }}
        />
      </div>
      
      <div className="space-y-2">
        <Label style={{ color: '#A1A1A5' }}>Bot Username</Label>
        <Input
          placeholder="OPSYN Bot"
          value={nodeConfig.username || ''}
          onChange={(e) => updateNodeConfig('username', e.target.value)}
          style={{
            backgroundColor: '#1E1E22',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#EAEAEA'
          }}
        />
      </div>
    </div>
  );

  const renderDatabaseConfiguration = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 p-3 rounded-lg" style={{
        backgroundColor: '#141419',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid'
      }}>
        <SettingsIcon className="h-5 w-5" style={{ color: '#9B4A4A' }} />
        <div>
          <div className="font-medium" style={{ color: '#EAEAEA' }}>Database Configuration</div>
          <div className="text-sm" style={{ color: '#A1A1A5' }}>Configure database connection and query</div>
        </div>
      </div>
      
      {renderSecretInput('connectionString', 'Connection String', 'postgres://user:password@host:port/database')}
      
      <div className="space-y-2">
        <Label style={{ color: '#A1A1A5' }}>Database</Label>
        <Input
          placeholder="database_name"
          value={nodeConfig.database || ''}
          onChange={(e) => updateNodeConfig('database', e.target.value)}
          style={{
            backgroundColor: '#1E1E22',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#EAEAEA'
          }}
        />
      </div>
      
      <div className="space-y-2">
        <Label style={{ color: '#A1A1A5' }}>Table</Label>
        <Input
          placeholder="table_name"
          value={nodeConfig.table || ''}
          onChange={(e) => updateNodeConfig('table', e.target.value)}
          style={{
            backgroundColor: '#1E1E22',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#EAEAEA'
          }}
        />
      </div>
      
      <div className="space-y-2">
        <Label style={{ color: '#A1A1A5' }}>SQL Query</Label>
        <Textarea
          placeholder="SELECT * FROM users WHERE..."
          value={nodeConfig.query || ''}
          onChange={(e) => updateNodeConfig('query', e.target.value)}
          rows={4}
          className="font-mono text-sm"
          style={{
            backgroundColor: '#1E1E22',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#EAEAEA'
          }}
        />
      </div>
    </div>
  );

  const renderApiConfiguration = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 p-3 rounded-lg" style={{
        backgroundColor: '#141419',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid'
      }}>
        <SettingsIcon className="h-5 w-5" style={{ color: '#FFD35B' }} />
        <div>
          <div className="font-medium" style={{ color: '#EAEAEA' }}>API Configuration</div>
          <div className="text-sm" style={{ color: '#A1A1A5' }}>Configure HTTP API request</div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label style={{ color: '#A1A1A5' }}>URL</Label>
        <Input
          placeholder="https://api.example.com/endpoint"
          value={nodeConfig.url || ''}
          onChange={(e) => updateNodeConfig('url', e.target.value)}
          style={{
            backgroundColor: '#1E1E22',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#EAEAEA'
          }}
        />
      </div>
      
      <div className="space-y-2">
        <Label style={{ color: '#A1A1A5' }}>Method</Label>
        <Select value={nodeConfig.method || 'GET'} onValueChange={(value) => updateNodeConfig('method', value)}>
          <SelectTrigger style={{
            backgroundColor: '#1E1E22',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#EAEAEA'
          }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="POST">POST</SelectItem>
            <SelectItem value="PUT">PUT</SelectItem>
            <SelectItem value="DELETE">DELETE</SelectItem>
            <SelectItem value="PATCH">PATCH</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {renderSecretInput('apiKey', 'API Key', 'Enter your API key')}
      
      <div className="space-y-2">
        <Label style={{ color: '#A1A1A5' }}>Request Headers (JSON)</Label>
        <Textarea
          placeholder='{"Content-Type": "application/json"}'
          value={nodeConfig.headers ? JSON.stringify(nodeConfig.headers, null, 2) : ''}
          onChange={(e) => {
            try {
              const headers = JSON.parse(e.target.value);
              updateNodeConfig('headers', headers);
            } catch {
              // Invalid JSON, don't update
            }
          }}
          rows={3}
          className="font-mono text-sm"
          style={{
            backgroundColor: '#1E1E22',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#EAEAEA'
          }}
        />
      </div>
      
      <div className="space-y-2">
        <Label style={{ color: '#A1A1A5' }}>Request Body</Label>
        <Textarea
          placeholder="Request body content..."
          value={nodeConfig.body || ''}
          onChange={(e) => updateNodeConfig('body', e.target.value)}
          rows={4}
          className="font-mono text-sm"
          style={{
            backgroundColor: '#1E1E22',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#EAEAEA'
          }}
        />
      </div>
    </div>
  );

  const renderBasicConfiguration = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label style={{ color: '#A1A1A5' }}>Node Name</Label>
        <Input
          placeholder="Node name"
          value={nodeConfig.name || ''}
          onChange={(e) => updateNodeConfig('name', e.target.value)}
          style={{
            backgroundColor: '#1E1E22',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#EAEAEA'
          }}
        />
      </div>
      
      <div className="space-y-2">
        <Label style={{ color: '#A1A1A5' }}>Description</Label>
        <Textarea
          placeholder="Describe what this node does..."
          value={nodeConfig.description || ''}
          onChange={(e) => updateNodeConfig('description', e.target.value)}
          rows={3}
          style={{
            backgroundColor: '#1E1E22',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#EAEAEA'
          }}
        />
      </div>
      
      <div className="space-y-2">
        <Label style={{ color: '#A1A1A5' }}>Timeout (seconds)</Label>
        <Input
          type="number"
          value={nodeConfig.timeout || 30}
          onChange={(e) => updateNodeConfig('timeout', parseInt(e.target.value))}
          style={{
            backgroundColor: '#1E1E22',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#EAEAEA'
          }}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          checked={nodeConfig.retryEnabled || false}
          onCheckedChange={(checked) => updateNodeConfig('retryEnabled', checked)}
        />
        <Label style={{ color: '#A1A1A5' }}>Enable retry on failure</Label>
      </div>
      
      {nodeConfig.retryEnabled && (
        <div className="space-y-2">
          <Label style={{ color: '#A1A1A5' }}>Retry Count</Label>
          <Input
            type="number"
            value={nodeConfig.retryCount || 3}
            onChange={(e) => updateNodeConfig('retryCount', parseInt(e.target.value))}
            style={{
              backgroundColor: '#1E1E22',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              color: '#EAEAEA'
            }}
          />
        </div>
      )}
    </div>
  );

  const renderSpecificConfiguration = () => {
    const nodeName = selectedNodeData.name.toLowerCase();
    
    if (nodeName.includes('email') || nodeName.includes('gmail')) {
      return renderEmailConfiguration();
    }
    if (nodeName.includes('slack')) {
      return renderSlackConfiguration();
    }
    if (nodeName.includes('database') || nodeName.includes('sql')) {
      return renderDatabaseConfiguration();
    }
    if (nodeName.includes('api') || nodeName.includes('http') || nodeName.includes('webhook')) {
      return renderApiConfiguration();
    }
    
    return renderBasicConfiguration();
  };

  const renderLogsTab = () => (
    <div className="p-6 space-y-4">
      {/* Success Log */}
      <div className="rounded-lg p-4" style={{
        backgroundColor: '#141419',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid'
      }}>
        <div className="flex items-center space-x-2 mb-2">
          <CheckCircle className="h-5 w-5" style={{ color: '#4ADE80' }} />
          <span className="font-medium" style={{ color: '#4ADE80' }}>Execution Success</span>
        </div>
        <div className="text-sm mb-1" style={{ color: '#A1A1A5' }}>2024-01-20 14:30:22</div>
        <div className="text-sm" style={{ color: '#EAEAEA' }}>Form data processed successfully</div>
      </div>

      {/* Failed Log */}
      <div className="rounded-lg p-4" style={{
        backgroundColor: '#141419',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid'
      }}>
        <div className="flex items-center space-x-2 mb-2">
          <XCircle className="h-5 w-5" style={{ color: '#9B4A4A' }} />
          <span className="font-medium" style={{ color: '#9B4A4A' }}>Execution Failed</span>
        </div>
        <div className="text-sm mb-1" style={{ color: '#A1A1A5' }}>2024-01-20 12:15:18</div>
        <div className="text-sm" style={{ color: '#EAEAEA' }}>Invalid email format</div>
      </div>
    </div>
  );

  return (
    <div className="col-span-5 transition-all duration-300">
      <Card className="h-full" style={{
        backgroundColor: '#141419',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
      }}>
        <CardHeader className="border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <CardTitle style={{ color: '#EAEAEA' }}>
              Node Configuration
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
              style={{
                color: '#A1A1A5',
                ':hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <Tabs value={configTab} onValueChange={setConfigTab}>
            <TabsList className="w-full rounded-none border-b" style={{
              backgroundColor: '#1E1E22',
              borderColor: 'rgba(255, 255, 255, 0.1)'
            }}>
              <TabsTrigger 
                value="settings" 
                className="flex-1"
                style={{
                  color: configTab === 'settings' ? '#FFFFFF' : '#A1A1A5',
                  backgroundColor: configTab === 'settings' ? '#6B2D2D' : '#2E2A55'
                }}
              >
                <SettingsIcon className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
              <TabsTrigger 
                value="logs" 
                className="flex-1"
                style={{
                  color: configTab === 'logs' ? '#FFFFFF' : '#A1A1A5',
                  backgroundColor: configTab === 'logs' ? '#6B2D2D' : '#2E2A55'
                }}
              >
                <FileText className="h-4 w-4 mr-2" />
                Logs
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="settings" className="p-6 space-y-6">
              {renderSpecificConfiguration()}
            </TabsContent>
            
            <TabsContent value="logs" className="p-0">
              {renderLogsTab()}
            </TabsContent>
          </Tabs>
          
          <div className="p-6 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
            <div className="flex justify-between space-x-3">
              <Button 
                variant="outline" 
                onClick={onClose} 
                className="flex-1"
                style={{
                  backgroundColor: '#1E1E22',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#EAEAEA'
                }}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                onClick={() => {
                  // Save configuration and update node name if changed
                  if (nodeConfig.name !== selectedNodeData.name) {
                    setWorkflowNodes(prev => prev.map(node => 
                      node.id === selectedNode 
                        ? { ...node, name: nodeConfig.name, config: nodeConfig }
                        : node
                    ));
                  }
                  onClose();
                }}
                style={{
                  backgroundColor: '#6B2D2D',
                  color: '#FFFFFF'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = '#8C3C3C';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = '#6B2D2D';
                }}
              >
                Save Configuration
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
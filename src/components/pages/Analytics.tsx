import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Bug, TrendingUp, AlertCircle, Cpu, Brain, Lightbulb, ExternalLink, RefreshCw, Zap } from 'lucide-react';
import { usageData, performanceData, errorData } from '../../data/constants';

interface AnalyticsProps {
  errorAnalysisOpen: boolean;
  setErrorAnalysisOpen: (open: boolean) => void;
  errorFilter: string;
  setErrorFilter: (filter: string) => void;
}

export const Analytics: React.FC<AnalyticsProps> = ({
  errorAnalysisOpen,
  setErrorAnalysisOpen,
  errorFilter,
  setErrorFilter
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold" style={{ color: '#EAEAEA' }}>Analytics & Performance</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setErrorAnalysisOpen(true)} style={{
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#A1A1A5'
          }}>
            <Bug className="h-4 w-4 mr-2" />
            Error Analysis
          </Button>
          <Select>
            <SelectTrigger className="w-40" style={{
              backgroundColor: '#141419',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              color: '#EAEAEA'
            }}>
              <SelectValue placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Success Rate Over Time */}
        <Card style={{ backgroundColor: '#141419', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#EAEAEA' }}>Success vs Failure Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis dataKey="name" stroke="#A1A1A5" />
                <YAxis stroke="#A1A1A5" />
                <RechartsTooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#000000'
                  }}
                  labelStyle={{
                    color: '#000000'
                  }}
                />
                <Line type="monotone" dataKey="successful" stroke="#344966" strokeWidth={2} name="Successful" />
                <Line type="monotone" dataKey="failed" stroke="#e6aace" strokeWidth={2} name="Failed" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Restored Vertical Integration Performance Bar Chart */}
        <Card style={{ backgroundColor: '#141419', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#EAEAEA' }}>Integration Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis 
                  dataKey="name" 
                  stroke="#A1A1A5" 
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="#A1A1A5" />
                <RechartsTooltip 
                  formatter={(value, name) => [
                    name === 'usage' ? `${value}%` : `${value}s`,
                    name === 'usage' ? 'Usage Rate' : 'Avg Time'
                  ]}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#000000'
                  }}
                  labelStyle={{
                    color: '#000000'
                  }}
                />
                <Bar dataKey="usage" fill="#344966" name="usage" />
                <Bar dataKey="avgTime" fill="#e6aace" name="avgTime" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Detailed Performance Metrics */}
        <Card style={{ backgroundColor: '#141419', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#EAEAEA' }}>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#0E0E10' }}>
                  <div className="text-2xl font-bold" style={{ color: '#EAEAEA' }}>2.3s</div>
                  <div className="text-sm" style={{ color: '#6D6D70' }}>Average Execution Time</div>
                </div>
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#0E0E10' }}>
                  <div className="text-2xl font-bold" style={{ color: '#EAEAEA' }}>15,847</div>
                  <div className="text-sm" style={{ color: '#6D6D70' }}>Total Executions</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span style={{ color: '#EAEAEA' }}>Most Used Integration</span>
                  <span className="font-bold" style={{ color: '#EAEAEA' }}>Gmail (85%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: '#EAEAEA' }}>Peak Usage Time</span>
                  <span className="font-bold" style={{ color: '#EAEAEA' }}>9 AM - 11 AM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: '#EAEAEA' }}>Error Rate</span>
                  <span className="font-bold" style={{ color: '#EF4444' }}>5.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: '#EAEAEA' }}>Avg. Tasks per Workflow</span>
                  <span className="font-bold" style={{ color: '#EAEAEA' }}>4.2</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Distribution */}
        <Card style={{ backgroundColor: '#141419', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#EAEAEA' }}>Workflow Category Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Sales', value: 35, color: '#0D1821' },
                    { name: 'Marketing', value: 28, color: '#344966' },
                    { name: 'Support', value: 22, color: '#E6AACE' },
                    { name: 'Operations', value: 15, color: '#F0F4EF' }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                >
                  {[
                    { name: 'Sales', value: 35, color: '#0D1821' },
                    { name: 'Marketing', value: 28, color: '#344966' },
                    { name: 'Support', value: 22, color: '#E6AACE' },
                    { name: 'Operations', value: 15, color: '#F0F4EF' }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI-Powered Optimization Suggestions */}
      <Card style={{ backgroundColor: '#141419', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <CardHeader>
          <CardTitle className="flex items-center" style={{ color: '#EAEAEA' }}>
            <Brain className="h-5 w-5 mr-2" style={{ color: '#e6aace' }} />
            AI-Powered Optimization Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg" style={{ 
              backgroundColor: '#0E0E10', 
              borderColor: '#e6aace' 
            }}>
              <div className="flex items-start">
                <Cpu className="h-5 w-5 mt-0.5 mr-3" style={{ color: '#e6aace' }} />
                <div className="flex-1">
                  <h4 className="font-medium" style={{ color: '#e6aace' }}>Enable Parallel Processing</h4>
                  <p className="text-sm mt-1" style={{ color: '#A1A1A5' }}>
                    "Email Campaign" workflow can process multiple contacts simultaneously. This could reduce execution time by 40%.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2" style={{
                    borderColor: '#e6aace',
                    color: '#e6aace'
                  }}>
                    Apply Optimization
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg" style={{ 
              backgroundColor: '#0E0E10', 
              borderColor: '#e6aace' 
            }}>
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 mt-0.5 mr-3" style={{ color: '#e6aace' }} />
                <div className="flex-1">
                  <h4 className="font-medium" style={{ color: '#e6aace' }}>Optimize "Data Sync" Workflow</h4>
                  <p className="text-sm mt-1" style={{ color: '#A1A1A5' }}>
                    This workflow has a 15% failure rate due to API timeouts. Consider adding retry logic with exponential backoff.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2" style={{
                    borderColor: '#e6aace',
                    color: '#e6aace'
                  }}>
                    View Details
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg" style={{ 
              backgroundColor: '#0E0E10', 
              borderColor: '#e6aace' 
            }}>
              <div className="flex items-start">
                <TrendingUp className="h-5 w-5 mt-0.5 mr-3" style={{ color: '#e6aace' }} />
                <div className="flex-1">
                  <h4 className="font-medium" style={{ color: '#e6aace' }}>Batch Processing Opportunity</h4>
                  <p className="text-sm mt-1" style={{ color: '#A1A1A5' }}>
                    "Invoice Processing" workflow can be optimized by batching requests. Potential 60% time savings for high-volume periods.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2" style={{
                    borderColor: '#e6aace',
                    color: '#e6aace'
                  }}>
                    Implement Batching
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Analysis Modal */}
      <Dialog open={errorAnalysisOpen} onOpenChange={setErrorAnalysisOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto" style={{
          backgroundColor: '#141419',
          borderColor: 'rgba(255, 255, 255, 0.1)'
        }}>
          <DialogHeader>
            <DialogTitle className="flex items-center" style={{ color: '#EAEAEA' }}>
              <Bug className="h-5 w-5 mr-2" style={{ color: '#1D0210' }} />
              Error Analysis & AI Troubleshooting
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex space-x-4">
              <Select value={errorFilter} onValueChange={setErrorFilter}>
                <SelectTrigger className="w-48" style={{
                  backgroundColor: '#0E0E10',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#EAEAEA'
                }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Errors</SelectItem>
                  <SelectItem value="timeout">Timeout Errors</SelectItem>
                  <SelectItem value="validation">Validation Errors</SelectItem>
                  <SelectItem value="rate_limit">Rate Limit Errors</SelectItem>
                  <SelectItem value="data">Data Errors</SelectItem>
                </SelectContent>
              </Select>
              
              <Input placeholder="Search errors..." className="flex-1" style={{
                backgroundColor: '#0E0E10',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                color: '#EAEAEA'
              }} />
            </div>

            <div className="space-y-4">
              {errorData.map((error) => (
                <Card key={error.id} className="border-l-4" style={{
                  backgroundColor: '#0E0E10',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderLeftColor: '#9B4A4A'
                }}>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-8">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="destructive">{error.type}</Badge>
                          <span className="font-medium" style={{ color: '#EAEAEA' }}>{error.workflow}</span>
                          <span className="text-sm" style={{ color: '#6D6D70' }}>Step {error.step}</span>
                        </div>
                        
                        <p className="text-sm mb-2" style={{ color: '#9B4A4A' }}>{error.error}</p>
                        <p className="text-xs" style={{ color: '#6D6D70' }}>{error.timestamp}</p>
                        
                        <div className="mt-3 p-3 border rounded-lg" style={{
                          backgroundColor: '#141419',
                          borderColor: '#4ADE80'
                        }}>
                          <div className="flex items-start">
                            <Lightbulb className="h-4 w-4 mt-0.5 mr-2" style={{ color: '#4ADE80' }} />
                            <div>
                              <h5 className="text-sm font-medium" style={{ color: '#4ADE80' }}>AI Suggestion</h5>
                              <p className="text-sm" style={{ color: '#A1A1A5' }}>{error.suggestion}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-span-4 flex flex-col space-y-2">
                        <Button variant="outline" size="sm" style={{
                          borderColor: 'rgba(255, 255, 255, 0.1)',
                          color: '#A1A1A5'
                        }}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Go to Step
                        </Button>
                        <Button variant="outline" size="sm" style={{
                          borderColor: 'rgba(255, 255, 255, 0.1)',
                          color: '#A1A1A5'
                        }}>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Retry
                        </Button>
                        <Button size="sm" style={{
                          backgroundColor: '#1D0210',
                          color: '#FFFFFF'
                        }} className="hover:bg-[#160008]">
                          <Zap className="h-4 w-4 mr-2" />
                          Apply Fix
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
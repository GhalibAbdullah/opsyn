import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Workflow, Play, CheckCircle, Clock, User, Eye, XCircle } from 'lucide-react';
import { usageData, activityData, recentRuns } from '../../data/constants';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card style={{ backgroundColor: '#141419', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: '#EAEAEA' }}>Total Workflows</CardTitle>
            <Workflow className="h-4 w-4" style={{ color: '#1D0210' }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#EAEAEA' }}>24</div>
            <p className="text-xs" style={{ color: '#6D6D70' }}>+3 from last month</p>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: '#141419', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: '#EAEAEA' }}>Active Runs</CardTitle>
            <Play className="h-4 w-4" style={{ color: '#1D0210' }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#EAEAEA' }}>12</div>
            <p className="text-xs" style={{ color: '#6D6D70' }}>Currently executing</p>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: '#141419', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: '#EAEAEA' }}>Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4" style={{ color: '#1D0210' }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#EAEAEA' }}>94.2%</div>
            <p className="text-xs" style={{ color: '#6D6D70' }}>+2.1% from last week</p>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: '#141419', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: '#EAEAEA' }}>Pending Tasks</CardTitle>
            <Clock className="h-4 w-4" style={{ color: '#1D0210' }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#EAEAEA' }}>8</div>
            <p className="text-xs" style={{ color: '#6D6D70' }}>Awaiting execution</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Overview Chart */}
        <Card style={{ backgroundColor: '#141419', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#EAEAEA' }}>Usage Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={usageData}>
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
                <Area type="monotone" dataKey="successful" stackId="1" stroke="#344966" fill="#344966" fillOpacity={0.6} />
                <Area type="monotone" dataKey="failed" stackId="1" stroke="#e6aace" fill="#e6aace" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card style={{ backgroundColor: '#141419', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#EAEAEA' }}>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {activityData.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {activity.type === 'success' && <CheckCircle className="h-5 w-5" style={{ color: '#4ADE80' }} />}
                    {activity.type === 'error' && <XCircle className="h-5 w-5" style={{ color: '#9B4A4A' }} />}
                    {activity.type === 'user' && <User className="h-5 w-5" style={{ color: '#1D0210' }} />}
                    {activity.type === 'schedule' && <Clock className="h-5 w-5" style={{ color: '#FFD35B' }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm" style={{ color: '#EAEAEA' }}>{activity.message}</p>
                    <p className="text-xs" style={{ color: '#6D6D70' }}>{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Runs Table */}
      <Card style={{ backgroundColor: '#141419', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <CardHeader>
          <CardTitle style={{ color: '#EAEAEA' }}>Recent Runs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRuns.map((run) => (
              <div key={run.id} className="flex items-center justify-between p-3 rounded-lg border" style={{ 
                backgroundColor: '#0E0E10', 
                borderColor: 'rgba(255, 255, 255, 0.1)' 
              }}>
                <div className="flex items-center space-x-3">
                  <div className="font-medium" style={{ color: '#EAEAEA' }}>{run.name}</div>
                  <Badge 
                    variant={run.status === 'success' ? 'default' : run.status === 'failed' ? 'destructive' : 'secondary'}
                    style={
                      run.status === 'success' ? {
                        backgroundColor: '#4ADE80',
                        color: '#000000',
                        borderColor: '#4ADE80'
                      } : run.status === 'failed' ? {
                        backgroundColor: '#9B4A4A',
                        color: '#FFFFFF',
                        borderColor: '#9B4A4A'
                      } : run.status === 'pending' ? {
                        backgroundColor: '#FFD35B',
                        color: '#000000',
                        borderColor: '#FFD35B'
                      } : {}
                    }
                  >
                    {run.status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm" style={{ color: '#6D6D70' }}>
                  <span>{run.lastRun}</span>
                  <span>{run.duration}</span>
                  <Button variant="ghost" size="sm" style={{ color: '#A1A1A5' }}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

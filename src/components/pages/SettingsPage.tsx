import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Key, Monitor, Download, Trash2 } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: '#EAEAEA' }}>Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card style={{ backgroundColor: '#141419', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#EAEAEA' }}>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#EAEAEA' }}>Full Name</label>
              <Input defaultValue="Sarah Chen" style={{
                backgroundColor: '#0E0E10',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                color: '#EAEAEA'
              }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#EAEAEA' }}>Email</label>
              <Input defaultValue="sarah@company.com" style={{
                backgroundColor: '#0E0E10',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                color: '#EAEAEA'
              }} />
            </div>
            <Button style={{
              backgroundColor: '#1D0210',
              color: '#FFFFFF'
            }} className="hover:bg-[#160008]">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: '#141419', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#EAEAEA' }}>Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium" style={{ color: '#EAEAEA' }}>Two-Factor Authentication</div>
                <div className="text-sm" style={{ color: '#6D6D70' }}>Add extra security</div>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium" style={{ color: '#EAEAEA' }}>API Keys</div>
                <div className="text-sm" style={{ color: '#6D6D70' }}>Manage API access</div>
              </div>
              <Button variant="outline" size="sm" style={{
                borderColor: 'rgba(255, 255, 255, 0.1)',
                color: '#A1A1A5'
              }}>
                <Key className="h-4 w-4 mr-1" />
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
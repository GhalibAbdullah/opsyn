import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Plus, MoreHorizontal, MessageSquare, Heart } from 'lucide-react';
import { teamMembers } from '../../data/constants';

export const Collaborate: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold" style={{ color: '#EAEAEA' }}>Team Collaboration</h1>
        <Button style={{
          backgroundColor: '#1D0210',
          color: '#FFFFFF'
        }} className="hover:bg-[#160008]">
          <Plus className="h-4 w-4 mr-2" />
          Invite Member
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card style={{ backgroundColor: '#141419', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#EAEAEA' }}>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 rounded-lg border" style={{
                  backgroundColor: '#0E0E10',
                  borderColor: 'rgba(255, 255, 255, 0.1)'
                }}>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{member.avatar}</div>
                    <div>
                      <div className="font-medium" style={{ color: '#EAEAEA' }}>{member.name}</div>
                      <div className="text-sm" style={{ color: '#6D6D70' }}>{member.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={member.role === 'Owner' ? 'default' : 'secondary'} style={{
                      backgroundColor: member.role === 'Owner' ? '#1D0210' : '#A1A1A5',
                      color: '#FFFFFF'
                    }}>
                      {member.role}
                    </Badge>
                    <Button variant="ghost" size="sm" style={{ color: '#A1A1A5' }}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: '#141419', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#EAEAEA' }}>Workflow Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              <div className="flex items-start space-x-3">
                <div className="text-xl">👩‍💼</div>
                <div className="flex-1">
                  <div className="font-medium" style={{ color: '#EAEAEA' }}>Sarah Chen</div>
                  <p className="text-sm mt-1" style={{ color: '#A1A1A5' }}>The email template needs updating with new branding.</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <p className="text-xs" style={{ color: '#6D6D70' }}>2 hours ago</p>
                    <Button variant="ghost" size="sm" className="text-xs" style={{ color: '#A1A1A5' }}>Reply</Button>
                    <Button variant="ghost" size="sm" className="text-xs" style={{ color: '#A1A1A5' }}>
                      <Heart className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex space-x-2">
                <Input placeholder="Add a comment..." className="flex-1" style={{
                  backgroundColor: '#0E0E10',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#EAEAEA'
                }} />
                <Button size="sm" style={{
                  backgroundColor: '#1D0210',
                  color: '#FFFFFF'
                }} className="hover:bg-[#160008]">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
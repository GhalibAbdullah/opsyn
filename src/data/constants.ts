import { Mail, Clock, FileText, Webhook, Database, Bell, Network, GitBranch, Timer, Filter, Calendar } from 'lucide-react';

export const usageData = [
  { name: 'Jan', executions: 2400, successful: 2280, failed: 120 },
  { name: 'Feb', executions: 1398, successful: 1328, failed: 70 },
  { name: 'Mar', executions: 9800, successful: 9310, failed: 490 },
  { name: 'Apr', executions: 3908, successful: 3712, failed: 196 },
  { name: 'May', executions: 4800, successful: 4560, failed: 240 },
  { name: 'Jun', executions: 3800, successful: 3610, failed: 190 },
];

export const performanceData = [
  { name: 'Webhook Trigger', avgTime: 0.3, usage: 38 },
  { name: 'Salesforce API', avgTime: 3.1, usage: 45 },
  { name: 'Slack Integration', avgTime: 0.8, usage: 72 },
  { name: 'Gmail Integration', avgTime: 1.2, usage: 85 },
];

export const errorData = [
  { id: 1, workflow: 'Lead Processing', step: 3, error: 'API timeout: Salesforce connection failed', timestamp: '2024-01-20 14:30:22', type: 'timeout', suggestion: 'Increase timeout value from 30s to 60s or add retry logic with exponential backoff.' },
  { id: 2, workflow: 'Email Campaign', step: 1, error: 'Invalid email format in contact field', timestamp: '2024-01-20 12:15:18', type: 'validation', suggestion: 'Add email validation step before processing or use regex pattern to clean email addresses.' },
  { id: 3, workflow: 'Data Sync', step: 2, error: 'Missing required field: company_name', timestamp: '2024-01-20 09:45:10', type: 'data', suggestion: 'Add conditional logic to handle missing company names or set a default value like "Unknown Company".' },
  { id: 4, workflow: 'Slack Notifications', step: 1, error: 'Rate limit exceeded: 100 requests per minute', timestamp: '2024-01-19 16:22:55', type: 'rate_limit', suggestion: 'Implement request queuing or reduce notification frequency during peak hours.' }
];

export const activityData = [
  { id: 1, type: 'success', message: 'Workflow "Lead Processing" executed successfully', time: '2 min ago' },
  { id: 2, type: 'user', message: 'Sarah Chen added to "Email Campaign" workflow', time: '15 min ago' },
  { id: 3, type: 'error', message: 'Error in "Data Sync" at Step 3: API timeout', time: '1 hour ago' },
  { id: 4, type: 'success', message: 'Workflow "Slack Notifications" completed', time: '2 hours ago' },
  { id: 5, type: 'user', message: 'New collaborator Michael R. joined workspace', time: '3 hours ago' },
  { id: 6, type: 'schedule', message: 'Daily backup workflow scheduled for 2 AM', time: '4 hours ago' },
];

export const recentRuns = [
  { id: 1, name: 'Lead Processing', lastRun: '2 min ago', duration: '1.2s', status: 'success' },
  { id: 2, name: 'Email Campaign', lastRun: '15 min ago', duration: '3.4s', status: 'success' },
  { id: 3, name: 'Data Sync', lastRun: '1 hour ago', duration: '12.1s', status: 'failed' },
  { id: 4, name: 'Slack Notifications', lastRun: '2 hours ago', duration: '0.8s', status: 'success' },
  { id: 5, name: 'Invoice Processing', lastRun: '5 hours ago', duration: '2.1s', status: 'pending' },
];

export const workflows = [
  {
    id: 1,
    name: 'Lead Processing',
    description: 'Automatically process new leads from website forms',
    created: '2024-01-15',
    modified: '2024-01-20',
    status: 'active',
    collaborators: 3,
    category: 'Sales',
    executions: 1247,
    successRate: 96.2
  },
  {
    id: 2,
    name: 'Email Campaign',
    description: 'Send personalized follow-up emails to prospects',
    created: '2024-01-10',
    modified: '2024-01-18',
    status: 'active',
    collaborators: 2,
    category: 'Marketing',
    executions: 856,
    successRate: 98.1
  },
  {
    id: 3,
    name: 'Data Sync',
    description: 'Sync customer data between CRM and marketing tools',
    created: '2024-01-05',
    modified: '2024-01-16',
    status: 'draft',
    collaborators: 1,
    category: 'Integration',
    executions: 0,
    successRate: 0
  },
];

export const integrations = [
  { name: 'Gmail', icon: '📧', status: 'connected', category: 'Communication', description: 'Send and receive emails' },
  { name: 'Slack', icon: '💬', status: 'connected', category: 'Communication', description: 'Team messaging and notifications' },
  { name: 'Salesforce', icon: '☁️', status: 'connected', category: 'CRM', description: 'Customer relationship management' },
  { name: 'Trello', icon: '📋', status: 'disconnected', category: 'Project Management', description: 'Task and project organization' },
  { name: 'Zoom', icon: '📹', status: 'connected', category: 'Communication', description: 'Video conferencing and meetings' },
  { name: 'HubSpot', icon: '🎯', status: 'disconnected', category: 'CRM', description: 'Inbound marketing and sales' },
  { name: 'Stripe', icon: '💳', status: 'connected', category: 'Payment', description: 'Payment processing' },
  { name: 'Shopify', icon: '🛒', status: 'disconnected', category: 'E-commerce', description: 'Online store management' },
];

export const teamMembers = [
  { id: 1, name: 'Sarah Chen', email: 'sarah@company.com', role: 'Owner', avatar: '👩‍💼', lastActive: '2 min ago' },
  { id: 2, name: 'Michael Rodriguez', email: 'michael@company.com', role: 'Editor', avatar: '👨‍💻', lastActive: '15 min ago' },
  { id: 3, name: 'Emma Thompson', email: 'emma@company.com', role: 'Viewer', avatar: '👩‍🚀', lastActive: '2 hours ago' },
];

export const workflowTemplates = [
  {
    id: 1,
    name: 'Lead Capture & Nurturing',
    description: 'Automatically capture leads from forms and start email nurturing sequence',
    category: 'Sales',
    uses: 1247,
    rating: 4.8,
    tags: ['CRM', 'Email', 'Forms']
  },
  {
    id: 2,
    name: 'Customer Support Ticket Triage',
    description: 'Route support tickets based on priority and assign to appropriate teams',
    category: 'Support',
    uses: 892,
    rating: 4.6,
    tags: ['Support', 'Automation', 'Routing']
  },
  {
    id: 3,
    name: 'Social Media Post Scheduler',
    description: 'Schedule and publish content across multiple social media platforms',
    category: 'Marketing',
    uses: 654,
    rating: 4.7,
    tags: ['Social Media', 'Content', 'Scheduling']
  },
  {
    id: 4,
    name: 'Invoice & Payment Processing',
    description: 'Generate invoices, send reminders, and process payments automatically',
    category: 'Finance',
    uses: 543,
    rating: 4.9,
    tags: ['Finance', 'Payments', 'Invoicing']
  }
];

export const nodeTypes = [
  { id: 'email-trigger', name: 'Email Received', icon: Mail, type: 'trigger', color: 'dusty-rose', category: 'Communication' },
  { id: 'form-trigger', name: 'Form Submitted', icon: FileText, type: 'trigger', color: 'dusty-rose', category: 'Data Integration' },
  { id: 'schedule-trigger', name: 'Scheduled', icon: Clock, type: 'trigger', color: 'dusty-rose', category: 'Monitoring' },
  { id: 'webhook-trigger', name: 'Webhook', icon: Webhook, type: 'trigger', color: 'dusty-rose', category: 'Data Integration' },
  
  { id: 'send-email', name: 'Send Email', icon: Mail, type: 'action', color: 'pale-blush', category: 'Communication' },
  { id: 'create-record', name: 'Create Record', icon: Database, type: 'action', color: 'pale-blush', category: 'Data Integration' },
  { id: 'send-notification', name: 'Send Notification', icon: Bell, type: 'action', color: 'pale-blush', category: 'Communication' },
  { id: 'http-request', name: 'HTTP Request', icon: Network, type: 'action', color: 'pale-blush', category: 'Data Integration' },
  
  { id: 'condition', name: 'Condition', icon: GitBranch, type: 'condition', color: 'light-blush', category: 'Sales' },
  { id: 'delay', name: 'Delay', icon: Timer, type: 'condition', color: 'light-blush', category: 'Monitoring' },
  { id: 'filter', name: 'Filter', icon: Filter, type: 'condition', color: 'light-blush', category: 'Data Integration' },
];

export const aiNodeSuggestions = [
  { id: 1, name: 'Send Confirmation Email', icon: Mail, description: 'Follow up with email confirmation' },
  { id: 2, name: 'Create Calendar Event', icon: Calendar, description: 'Schedule a follow-up meeting' },
  { id: 3, name: 'Update CRM Status', icon: Database, description: 'Mark lead as contacted' }
];

export const canvasNodes = [
  { 
    id: 'node-1', 
    type: 'trigger', 
    name: 'Form Submission', 
    x: 100, 
    y: 100, 
    width: 160,
    height: 80,
    hasError: false, 
    collaborators: [{ name: 'Sarah', color: '#CE7777' }] 
  },
  { 
    id: 'node-2', 
    type: 'action', 
    name: 'Add to CRM', 
    x: 100, 
    y: 220, 
    width: 160,
    height: 80,
    hasError: true, 
    errorMessage: 'Missing API key configuration',
    collaborators: [{ name: 'Michael', color: '#2B3A55' }] 
  },
  { 
    id: 'node-3', 
    type: 'action', 
    name: 'Send Email', 
    x: 100, 
    y: 340, 
    width: 160,
    height: 80,
    hasError: false, 
    collaborators: [] 
  }
];
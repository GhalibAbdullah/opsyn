// src/pages/MainPage.tsx
import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Workflow, Link2, Users, Bot, Play, CheckCircle, ArrowRight, Zap,
  GitBranch, Database, Globe, Shield, Heart, BarChart3
} from 'lucide-react';
import opsynLogo from 'figma:asset/c0beb7938dec93ac35f48599799e2f4c1c8641af.png';
import { integrations } from '../../data/constants';
import { useNavigate, useLocation } from 'react-router-dom';

interface MainPageProps {
  onLogin?: () => void;
  onSignUp?: () => void;
}

export const MainPage: React.FC<MainPageProps> = ({ onLogin, onSignUp }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Build "return to" URL for after-auth redirect
  const currentUrl =
    (location.pathname || '/') +
    (location.search || '') +
    (location.hash || '');

  const gotoLogin = () => {
    if (onLogin) return onLogin();
    navigate(`/login?next=${encodeURIComponent(currentUrl)}`);
  };

  const gotoSignup = () => {
    if (onSignUp) return onSignUp();
    navigate(`/signup?next=${encodeURIComponent(currentUrl)}`);
  };

  const features = [
    {
      icon: Workflow,
      title: 'Automate Workflows',
      description: 'Build powerful automations with our visual drag-and-drop interface',
    },
    {
      icon: Link2,
      title: 'Integrate Your Tools',
      description: 'Connect 500+ apps and services seamlessly',
    },
    {
      icon: Users,
      title: 'Collaborate Seamlessly',
      description: 'Work together in real-time with your entire team',
    },
    {
      icon: Bot,
      title: 'Powered by AI',
      description: 'Intelligent automation that learns and optimizes',
    },
  ];

  const detailedFeatures = [
    {
      icon: Bot,
      title: 'AI-Powered Builder',
      description:
        'Create workflows using natural language. Just describe what you want, and our AI builds it for you.',
      badge: 'Popular',
    },
    {
      icon: Workflow,
      title: 'Visual Workflow Designer',
      description:
        'Drag and drop interface for building complex automation workflows with ease.',
      badge: 'New',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share workflows, set permissions, and work together in real-time.',
      badge: null,
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'SOC 2 compliant with end-to-end encryption and advanced access controls.',
      badge: null,
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description:
        'Track workflow performance, identify bottlenecks, and optimize your automations.',
      badge: null,
    },
    {
      icon: Zap,
      title: 'Real-time Execution',
      description:
        'Workflows run instantly with sub-second response times and 99.9% uptime.',
      badge: null,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#0E0E10' }}>
      {/* Abstract Background with OPSYN Colors */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(165deg, #070500 0%, #05060A 25%, #050A15 45%, #1B0E1E 70%, #1d0210 100%)',
        }}
      />

      {/* Flowing Abstract Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div
          className="absolute top-20 -left-20 w-96 h-96 rounded-full blur-3xl transform rotate-12"
          style={{
            background:
              'radial-gradient(circle, rgba(155, 74, 74, 0.1) 0%, rgba(161, 161, 165, 0.2) 100%)',
          }}
        />
        <div
          className="absolute top-40 right-10 w-80 h-80 rounded-full blur-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(109, 109, 112, 0.3) 0%, transparent 100%)',
          }}
        />
        <div
          className="absolute bottom-20 left-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(155, 74, 74, 0.15) 0%, transparent 100%)',
          }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-32 h-32 rounded-full blur-xl"
          style={{ backgroundColor: 'rgba(161, 161, 165, 0.4)' }}
        />
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-20 w-full px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={opsynLogo} alt="OPSYN" className="h-10 w-auto" />
            <span className="text-2xl font-bold" style={{ color: '#EAEAEA' }}>
              OPSYN
            </span>
          </div>

          {/* Navigation Links & Buttons */}
          <div className="hidden lg:flex items-center space-x-8">
            <a
              href="#features"
              className="font-medium transition-colors duration-200"
              style={{ color: '#A1A1A5' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#EAEAEA')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#A1A1A5')}
            >
              Features
            </a>
            <a
              href="#integrations"
              className="font-medium transition-colors duration-200"
              style={{ color: '#A1A1A5' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#EAEAEA')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#A1A1A5')}
            >
              Integrations
            </a>
            <a
              href="#docs"
              className="font-medium transition-colors duration-200"
              style={{ color: '#A1A1A5' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#EAEAEA')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#A1A1A5')}
            >
              Docs
            </a>
            <a
              href="#community"
              className="font-medium transition-colors duration-200"
              style={{ color: '#A1A1A5' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#EAEAEA')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#A1A1A5')}
            >
              Community
            </a>

            <div className="flex items-center space-x-3 ml-4">
              <Button
                onClick={gotoLogin}
                variant="ghost"
                className="font-medium px-4 py-2 rounded-lg transition-all duration-200"
                style={{ color: '#A1A1A5' }}
              >
                Login
              </Button>
              <Button
                onClick={gotoSignup}
                style={{ backgroundColor: '#1D0210' }}
                className="hover:bg-opacity-90 text-white font-medium px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Sign Up
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              onClick={gotoSignup}
              style={{ backgroundColor: '#1D0210' }}
              className="hover:bg-opacity-90 text-white font-medium px-6 py-2 rounded-lg"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
                style={{ backgroundColor: 'rgba(161, 161, 165, 0.6)', color: '#EAEAEA' }}
              >
                <Heart className="w-4 h-4 mr-2" style={{ color: '#9B4A4A' }} />
                Free forever for everyone
              </div>

              <h1
                className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight"
                style={{ color: '#EAEAEA' }}
              >
                Welcome to
                <span className="block mt-2" style={{ color: '#9B4A4A' }}>
                  OPSYN
                </span>
              </h1>

              <p className="text-xl lg:text-2xl leading-relaxed max-w-xl" style={{ color: '#A1A1A5' }}>
                Collaborative workflow automation, powered by AI &mdash;{' '}
                <span className="font-semibold" style={{ color: '#9B4A4A' }}>
                  free for everyone
                </span>
                .
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={gotoSignup}
                className="px-8 py-4 text-white text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                style={{ backgroundColor: '#1D0210' }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.backgroundColor = '#160008')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.backgroundColor = '#1D0210')}
              >
                Start Building &mdash; It&apos;s Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                className="px-8 py-4 border-2 text-lg font-medium rounded-xl transition-all duration-300"
                style={{ backgroundColor: '#000000', borderColor: '#000000', color: '#FFFFFF' }}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-6 text-sm" style={{ color: '#6D6D70' }}>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" style={{ color: '#4ADE80' }} />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" style={{ color: '#4ADE80' }} />
                <span>Always free to use</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" style={{ color: '#4ADE80' }} />
                <span>Open source</span>
              </div>
            </div>
          </div>

          {/* Right Column - Workflow Mockup */}
          <div className="relative lg:pl-8">
            <div
              className="absolute inset-0 rounded-3xl blur-3xl transform rotate-3 scale-110"
              style={{
                background:
                  'radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, rgba(147, 51, 234, 0.3) 50%, rgba(147, 51, 234, 0.2) 100%)',
              }}
            />
            <Card
              className="relative backdrop-blur-sm border shadow-2xl rounded-2xl overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500"
              style={{ backgroundColor: '#141419', borderColor: 'rgba(161, 161, 165, 0.4)' }}
            >
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Workflow Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: '#EAEAEA' }}>
                        E-commerce Automation
                      </h3>
                      <p className="text-sm mt-1" style={{ color: '#6D6D70' }}>
                        Customer journey workflow
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#4ADE80' }} />
                        <span className="text-sm font-medium" style={{ color: '#A1A1A5' }}>
                          Live
                        </span>
                      </div>
                      <Button size="sm" className="text-white" style={{ backgroundColor: 'rgba(155, 74, 74, 0.1)' }}>
                        <Play className="w-3 h-3" style={{ color: '#9B4A4A' }} />
                      </Button>
                    </div>
                  </div>

                  {/* Workflow Nodes */}
                  <div className="space-y-4">
                    {/* Trigger Node */}
                    <div className="relative">
                      <div
                        className="flex items-center space-x-4 p-4 rounded-xl text-white shadow-lg"
                        style={{ background: 'linear-gradient(to right, #9B4A4A, rgba(155, 74, 74, 0.9))' }}
                      >
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                          <Zap className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">New Order Received</div>
                          <div className="text-sm opacity-90">Webhook trigger from Shopify</div>
                        </div>
                        <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">Trigger</div>
                      </div>
                      <div
                        className="absolute left-1/2 -bottom-2 w-0.5 h-4 transform -translate-x-0.5"
                        style={{ backgroundColor: 'rgba(155, 74, 74, 0.3)' }}
                      />
                    </div>

                    {/* Action Node 1 */}
                    <div className="relative">
                      <div
                        className="flex items-center space-x-4 p-4 rounded-xl border shadow-md"
                        style={{
                          backgroundColor: 'rgba(161, 161, 165, 0.1)',
                          borderColor: 'rgba(155, 74, 74, 0.2)',
                        }}
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: 'rgba(155, 74, 74, 0.1)' }}
                        >
                          <Database className="w-6 h-6" style={{ color: '#9B4A4A' }} />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold" style={{ color: '#EAEAEA' }}>
                            Update Customer Record
                          </div>
                          <div className="text-sm" style={{ color: '#6D6D70' }}>
                            Add order details to CRM
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4" style={{ color: '#4ADE80' }} />
                          <span className="text-xs font-medium" style={{ color: '#4ADE80' }}>
                            Success
                          </span>
                        </div>
                      </div>
                      <div
                        className="absolute left-1/2 -bottom-2 w-0.5 h-4 transform -translate-x-0.5"
                        style={{ backgroundColor: 'rgba(155, 74, 74, 0.3)' }}
                      />
                    </div>

                    {/* Conditional Node */}
                    <div className="relative">
                      <div
                        className="flex items-center space-x-4 p-4 rounded-xl border shadow-md"
                        style={{
                          background: 'linear-gradient(to right, rgba(109, 109, 112, 0.1), rgba(161, 161, 165, 0.1))',
                          borderColor: 'rgba(155, 74, 74, 0.3)',
                        }}
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: 'rgba(155, 74, 74, 0.15)' }}
                        >
                          <GitBranch className="w-6 h-6" style={{ color: '#9B4A4A' }} />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold" style={{ color: '#EAEAEA' }}>
                            Order Value Check
                          </div>
                          <div className="text-sm" style={{ color: '#6D6D70' }}>
                            If order &gt; $100
                          </div>
                        </div>
                        <div
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: 'rgba(155, 74, 74, 0.1)', color: '#9B4A4A' }}
                        >
                          Condition
                        </div>
                      </div>
                      <div
                        className="absolute left-1/2 -bottom-2 w-0.5 h-4 transform -translate-x-0.5"
                        style={{ backgroundColor: 'rgba(155, 74, 74, 0.3)' }}
                      />
                    </div>

                    {/* Final Action */}
                    <div
                      className="flex items-center space-x-4 p-4 rounded-xl border shadow-md"
                      style={{ backgroundColor: 'rgba(161, 161, 165, 0.1)', borderColor: 'rgba(155, 74, 74, 0.2)' }}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(155, 74, 74, 0.1)' }}
                      >
                        <Bot className="w-6 h-6" style={{ color: '#9B4A4A' }} />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold" style={{ color: '#EAEAEA' }}>
                          Send Thank You Email
                        </div>
                        <div className="text-sm" style={{ color: '#6D6D70' }}>
                          Personalized email with discount
                        </div>
                      </div>
                      <div
                        className="w-4 h-4 border-2 rounded-full animate-spin"
                        style={{ borderColor: 'rgba(155, 74, 74, 0.3)', borderTopColor: '#9B4A4A' }}
                      />
                    </div>
                  </div>

                  {/* Workflow Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t" style={{ borderColor: 'rgba(161, 161, 165, 0.2)' }}>
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{ color: '#9B4A4A' }}>
                        1,247
                      </div>
                      <div className="text-xs font-medium" style={{ color: '#6D6D70' }}>
                        Executions
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{ color: '#4ADE80' }}>
                        99.8%
                      </div>
                      <div className="text-xs font-medium" style={{ color: '#6D6D70' }}>
                        Success Rate
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{ color: '#A1A1A5' }}>
                        2.3s
                      </div>
                      <div className="text-xs font-medium" style={{ color: '#6D6D70' }}>
                        Avg. Runtime
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Integrations Section */}
      <section id="integrations" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#EAEAEA' }}>
              Popular Integrations
            </h2>
            <p className="text-lg mb-2" style={{ color: '#A1A1A5' }}>
              Connect with your favorite tools and services
            </p>
            <p className="text-sm font-semibold" style={{ color: '#9B4A4A' }}>
              All integrations included &mdash; No extra cost
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration, index) => (
              <Card
                key={index}
                className="group backdrop-blur-sm border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl overflow-hidden"
                style={{ backgroundColor: '#141419', borderColor: 'rgba(161, 161, 165, 0.4)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(155, 74, 74, 0.6)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(161, 161, 165, 0.4)')}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                      {integration.icon}
                    </div>

                    <div className="space-y-2">
                      <h3
                        className="font-semibold text-lg group-hover:transition-colors"
                        style={{ color: '#EAEAEA' }}
                      >
                        {integration.name}
                      </h3>
                      <Badge
                        variant="outline"
                        className="text-xs"
                        style={{ borderColor: 'rgba(155, 74, 74, 0.3)', color: '#9B4A4A' }}
                      >
                        {integration.category}
                      </Badge>
                    </div>

                    <p className="text-sm leading-relaxed" style={{ color: '#A1A1A5' }}>
                      {integration.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Integration CTA */}
          <div className="text-center mt-12">
            <p className="mb-6" style={{ color: '#6D6D70' }}>
              Need a specific integration? We&apos;re constantly adding new connections.
            </p>
            <Button
              variant="outline"
              className="border-2 px-8 py-3 rounded-xl font-medium transition-all duration-300"
              style={{
                borderColor: 'rgba(155, 74, 74, 0.3)',
                color: '#9B4A4A',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'rgba(161, 161, 165, 0.2)';
                (e.target as HTMLElement).style.borderColor = '#9B4A4A';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'transparent';
                (e.target as HTMLElement).style.borderColor = 'rgba(155, 74, 74, 0.3)';
              }}
            >
              Request Integration
            </Button>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#EAEAEA' }}>
            Everything you need to automate
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#A1A1A5' }}>
            Build, connect, and collaborate with powerful automation tools &mdash; completely free
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group backdrop-blur-sm border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 rounded-2xl overflow-hidden"
                style={{ backgroundColor: '#141419', borderColor: 'rgba(161, 161, 165, 0.4)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(155, 74, 74, 0.6)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(161, 161, 165, 0.4)')}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:transition-all duration-300"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(155, 74, 74, 0.1) 0%, rgba(161, 161, 165, 0.2) 100%)',
                    }}
                  >
                    <Icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" style={{ color: '#9B4A4A' }} />
                  </div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: '#EAEAEA' }}>
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-sm" style={{ color: '#A1A1A5' }}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#EAEAEA' }}>
            Powerful Features
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#A1A1A5' }}>
            Everything you need to automate your workflows
          </p>
        </div>

        <div className="grid gap-6">
          {detailedFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="backdrop-blur-sm border" style={{ backgroundColor: '#141419', borderColor: 'rgba(161, 161, 165, 0.4)' }}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#1D0210' }}>
                      <Icon className="h-6 w-6" style={{ color: '#FFFFFF' }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-xl font-medium" style={{ color: '#EAEAEA' }}>{feature.title}</h4>
                        {feature.badge && (
                          <Badge variant="secondary" className="text-xs" style={{ backgroundColor: '#1D0210', color: '#FFFFFF' }}>
                            {feature.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="leading-relaxed" style={{ color: '#A1A1A5' }}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold" style={{ color: '#EAEAEA' }}>
                Ready to automate your workflow?
              </h2>
              <p className="text-xl leading-relaxed" style={{ color: '#A1A1A5' }}>
                Join thousands of teams already using OPSYN to streamline their operations.
              </p>
              <p className="text-lg font-semibold" style={{ color: '#9B4A4A' }}>
                Start building for free &mdash; no credit card required.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={gotoSignup}
                className="px-10 py-4 text-white text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                style={{ backgroundColor: '#1D0210' }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.backgroundColor = '#160008')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.backgroundColor = '#1D0210')}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                className="px-10 py-4 border-2 text-lg font-medium rounded-xl transition-all duration-300"
                style={{ backgroundColor: 'transparent', borderColor: 'rgba(155, 74, 74, 0.3)', color: '#9B4A4A' }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'rgba(161, 161, 165, 0.1)';
                  (e.target as HTMLElement).style.borderColor = '#9B4A4A';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'transparent';
                  (e.target as HTMLElement).style.borderColor = 'rgba(155, 74, 74, 0.3)';
                }}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Final Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 pt-8 text-sm" style={{ color: '#6D6D70' }}>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" style={{ color: '#4ADE80' }} />
                <span>Free forever</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" style={{ color: '#4ADE80' }} />
                <span>Enterprise security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" style={{ color: '#4ADE80' }} />
                <span>500+ integrations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" style={{ color: '#4ADE80' }} />
                <span>Team collaboration</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

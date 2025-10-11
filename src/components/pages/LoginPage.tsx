// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft, Mail, Lock, Sparkles } from 'lucide-react';
import opsynLogo from 'figma:asset/c0beb7938dec93ac35f48599799e2f4c1c8641af.png';

// Firebase
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Router
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const nav = useNavigate();
  const location = useLocation();

  // support both ?next=/foo and location.state?.from
  const search = new URLSearchParams(location.search);
  const nextFromQuery = search.get('next');
  const nextFromState =
    (location.state as any)?.from?.pathname ||
    (location.state as any)?.from ||
    null;
  const next = nextFromQuery || nextFromState || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  function friendlyError(e: any) {
    const map: Record<string, string> = {
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/user-not-found': 'No account found for this email.',
      'auth/wrong-password': 'Incorrect password.',
      'auth/too-many-requests': 'Too many attempts. Try again later.',
      'auth/network-request-failed': 'Network error. Check your connection.',
    };
    return map[e?.code] || e?.message || 'Login failed. Please try again.';
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      nav(next, { replace: true });
    } catch (e: any) {
      setErr(friendlyError(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0E0E10' }}>
      {/* Background gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #101624 0%, #1A1F3B 25%, #2E2A55 50%, #3B2F4F 75%, #432C45 100%)' }} />

      {/* Soft blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 rounded-full blur-3xl rotate-12" style={{ background: 'radial-gradient(circle, rgba(155,74,74,0.1) 0%, rgba(161,161,165,0.2) 100%)' }} />
        <div className="absolute top-40 right-10 w-80 h-80 rounded-full blur-2xl" style={{ background: 'radial-gradient(circle, rgba(109,109,112,0.3) 0%, transparent 100%)' }} />
        <div className="absolute bottom-20 left-1/4 w-64 h-64 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(155,74,74,0.15) 0%, transparent 100%)' }} />
        <div className="absolute top-1/3 right-1/3 w-32 h-32 rounded-full blur-xl" style={{ backgroundColor: 'rgba(161,161,165,0.4)' }} />
      </div>

      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-center items-center px-12">
        <div className="max-w-md text-center space-y-8">
          <div className="space-y-6">
            <div className="flex justify-center">
              <img src={opsynLogo} alt="OPSYN" className="h-16 w-auto" />
            </div>
            <div className="space-y-3">
              <h1 className="text-5xl font-bold" style={{ color: '#EAEAEA' }}>OPSYN</h1>
              <p className="text-xl" style={{ color: '#A1A1A5' }}>AI-Powered Workflow Automation</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#1D0210' }}>
                <Sparkles className="h-4 w-4" style={{ color: '#FFFFFF' }} />
              </div>
              <div className="text-left">
                <h3 className="font-medium" style={{ color: '#EAEAEA' }}>Effortless Login</h3>
                <p className="text-sm mt-1" style={{ color: '#A1A1A5' }}>Access your workspace securely in seconds</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel – login form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 lg:px-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Back to previous page */}
          <Button
            variant="ghost"
            onClick={() => nav(-1)}
            className="mb-6 font-medium transition-all duration-200 self-start"
            style={{ color: '#A1A1A5' }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>

          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <div className="flex justify-center mb-4">
              <img src={opsynLogo} alt="OPSYN" className="h-12 w-auto" />
            </div>
            <h1 className="text-3xl font-bold" style={{ color: '#EAEAEA' }}>OPSYN</h1>
          </div>

          <Card className="backdrop-blur-sm border shadow-xl" style={{ backgroundColor: '#141419', borderColor: 'rgba(161,161,165,0.4)' }}>
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-2xl" style={{ color: '#EAEAEA' }}>Welcome back</CardTitle>
              <p style={{ color: '#A1A1A5' }}>Log in to continue</p>
              {err && <p className="text-sm" style={{ color: '#ff6b6b' }}>{err}</p>}
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#EAEAEA' }}>Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#1D0210' }} />
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 border transition-colors"
                      style={{ backgroundColor: '#0E0E10', borderColor: 'rgba(29,2,16,0.3)', color: '#EAEAEA' }}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#EAEAEA' }}>Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#1D0210' }} />
                    <Input
                      type={showPw ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 border transition-colors pr-24"
                      style={{ backgroundColor: '#0E0E10', borderColor: 'rgba(29,2,16,0.3)', color: '#EAEAEA' }}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="absolute right-1 top-1/2 -translate-y-1/2 text-xs"
                      style={{ color: '#A1A1A5' }}
                      onClick={() => setShowPw(v => !v)}
                    >
                      {showPw ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  style={{ backgroundColor: '#1D0210' }}
                  disabled={loading}
                >
                  {loading ? 'Logging in…' : 'Log in'}
                </Button>
              </form>

              <div className="text-center pt-2">
                <p className="text-sm" style={{ color: '#A1A1A5' }}>
                  Don’t have an account?{' '}
                  <Link
                    to={`/signup?next=${encodeURIComponent(next)}`}
                    className="font-medium"
                    style={{ color: '#1D0210' }}
                  >
                    Create one
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

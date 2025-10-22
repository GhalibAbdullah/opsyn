import React, { useEffect, useMemo, useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { ArrowLeft, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { useLocation, useNavigate } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const query = useQuery();
  const [email, setEmail] = useState(query.get('email') ?? '');
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const friendly = (code?: string, fallback?: string) => {
    const map: Record<string, string> = {
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/user-not-found': 'No account found for this email.',
      'auth/network-request-failed': 'Network error. Check your connection.',
      'auth/too-many-requests': 'Too many attempts. Try again later.',
    };
    return (code && map[code]) || fallback || 'Failed to send reset email. Please try again.';
  };

  const onSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setMsg(null); setSending(true);
    try {
      await sendPasswordResetEmail(auth, email.trim()
        // optionally pass an actionCodeSettings if you want a continue URL:
        // , { url: 'https://your-app.vercel.app/login', handleCodeInApp: false }
      );
      setMsg('Password reset link sent! Check your inbox (and spam).');
    } catch (e: any) {
      setErr(friendly(e?.code, e?.message));
    } finally {
      setSending(false);
    }
  };

  // (optional) autofocus
  useEffect(() => {
    // no-op, but you can manage focus here if you like
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative" style={{ backgroundColor: '#0E0E10' }}>
      <header
        className="fixed top-0 left-0 right-0 z-30 px-6 py-4 flex items-center"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0))' }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg"
          style={{ color: '#A1A1A5' }}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back</span>
        </button>
      </header>

      <div className="relative z-10 w-full max-w-md px-6 pt-24">
        <Card className="backdrop-blur-sm border shadow-2xl rounded-2xl overflow-hidden"
              style={{ backgroundColor: '#141419', borderColor: 'rgba(161,161,165,0.4)' }}>
          <CardContent className="p-8">
            <h1 className="text-2xl font-semibold mb-1" style={{ color: '#EAEAEA' }}>
              Forgot your password?
            </h1>
            <p className="mb-6 text-sm" style={{ color: '#A1A1A5' }}>
              Enter your account email and we’ll send you a secure link to reset your password.
            </p>

            {err && <div className="mb-3 rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-sm">{err}</div>}
            {msg && <div className="mb-3 rounded-lg border border-green-500/30 bg-green-500/10 p-2 text-sm">{msg}</div>}

            <form onSubmit={onSend} className="space-y-4">
              <label htmlFor="email" className="text-sm" style={{ color: '#EAEAEA' }}>Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: '#6D6D70' }} />
                <Input
                  id="email"
                  type="email"
                  name="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className="pl-10 border"
                  style={{ backgroundColor:'#0E0E10', borderColor:'rgba(161,161,165,0.3)', color:'#EAEAEA' }}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={sending || !email.includes('@')}
                aria-busy={sending}
                className="w-full py-3 text-white font-semibold rounded-lg shadow-lg transition-all"
                style={{ backgroundColor: '#1D0210' }}
              >
                {sending ? 'Sending…' : 'Send reset link'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm" style={{ color: '#6D6D70' }}>
              Remembered your password?{' '}
              <button className="font-medium" style={{ color: '#9B4A4A' }} onClick={()=>navigate('/login')}>
                Back to Sign In
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

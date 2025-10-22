// src/components/pages/LoginPage.tsx
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
// Removed react-router usage here because App.tsx controls navigation
import opsynLogo from 'figma:asset/c0beb7938dec93ac35f48599799e2f4c1c8641af.png';

import { auth } from '../../lib/firebase';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';

type LoginDoneCb = () => void;

interface LoginPageProps {
  onBack: () => void;
  onLoginSuccess?: LoginDoneCb;
  onLoginComplete?: LoginDoneCb;
  onForgotPassword?: (email: string) => void;
}

export default function LoginPage({
  onBack,
  onLoginSuccess,
  onLoginComplete,
  onForgotPassword,
}: LoginPageProps) {
  const onDone: LoginDoneCb = onLoginSuccess ?? onLoginComplete ?? (() => {});
  // removed useNavigate from here; parent App.tsx handles navigation

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<false | 'email' | 'google' | 'github'>(false);
  const [err, setErr] = useState<string | null>(null);

  function friendlyError(code?: string, fallback?: string) {
    const map: Record<string, string> = {
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/user-not-found': 'No account found for this email.',
      'auth/wrong-password': 'Incorrect password.',
      'auth/too-many-requests': 'Too many attempts. Try again later.',
      'auth/network-request-failed': 'Network error. Check your connection.',
      'auth/popup-closed-by-user': 'Sign-in was cancelled.',
      'auth/cancelled-popup-request': 'Popup cancelled. Try again.',
      'auth/invalid-credential': 'Incorrect email or password.',
      'auth/account-exists-with-different-credential':
        'This email is already linked to another sign-in method.',
    };
    return (code && map[code]) || fallback || 'Sign in failed. Please try again.';
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setErr(null);
    setIsLoading('email');
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      onDone();
    } catch (e: any) {
      setErr(friendlyError(e?.code, e?.message));
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    if (isLoading) return;
    setErr(null);
    setIsLoading('google');
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      onDone();
    } catch (e: any) {
      setErr(friendlyError(e?.code, e?.message));
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGithub = async () => {
    if (isLoading) return;
    setErr(null);
    setIsLoading('github');
    try {
      await signInWithPopup(auth, new GithubAuthProvider());
      onDone();
    } catch (e: any) {
      setErr(friendlyError(e?.code, e?.message));
    } finally {
      setIsLoading(false);
    }
  };

  const emailValid = email.includes('@');
  const canSubmit = emailValid && password.length >= 6 && !isLoading;

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: '#0E0E10' }}
    >
      {/* Background (no pointer events) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(165deg, #070500 0%, #05060A 25%, #050A15 45%, #1B0E1E 70%, #1d0210 100%)',
        }}
      />
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div
          className="absolute top-20 -left-20 w-96 h-96 rounded-full blur-3xl transform rotate-12"
          style={{
            background:
              'radial-gradient(circle, rgba(155, 74, 74, 0.1) 0%, rgba(161,161,165,0.2) 100%)',
          }}
        />
        <div
          className="absolute top-40 right-10 w-80 h-80 rounded-full blur-2xl"
          style={{
            background:
              'radial-gradient(circle, rgba(109,109,112,0.3) 0%, transparent 100%)',
          }}
        />
        <div
          className="absolute bottom-20 left-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(155, 74, 74, 0.15) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Top bar with Back (fixed at the very top) */}
      <header
        className="fixed top-0 left-0 right-0 z-30 px-6 py-4 flex items-center"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0))',
        }}
      >
        <motion.button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors"
          style={{ color: '#A1A1A5' }}
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#EAEAEA')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1A5')}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back</span>
        </motion.button>
      </header>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="relative z-10 w-full max-w-md px-6 pt-24" // pt-24 to clear the fixed header
      >
        <Card
          className="backdrop-blur-sm border shadow-2xl rounded-2xl overflow-hidden"
          style={{ backgroundColor: '#141419', borderColor: 'rgba(161, 161, 165, 0.4)' }}
        >
          <CardContent className="p-8">
            {/* Logo + Title */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <motion.img
                  src={opsynLogo}
                  alt="OPSYN"
                  className="h-12 w-auto"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                />
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-3xl font-bold mb-2"
                style={{ color: '#EAEAEA' }}
              >
                Welcome Back
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                style={{ color: '#A1A1A5' }}
              >
                Sign in to continue to OPSYN
              </motion.p>
              {err && (
                <p className="mt-4 text-sm" style={{ color: '#ff6b6b' }}>
                  {err}
                </p>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="space-y-2"
              >
                <Label htmlFor="email" style={{ color: '#EAEAEA' }}>
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: '#6D6D70' }} />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    autoFocus
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border"
                    style={{
                      backgroundColor: '#0E0E10',
                      borderColor: 'rgba(161, 161, 165, 0.3)',
                      color: '#EAEAEA',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(155, 74, 74, 0.6)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(161, 161, 165, 0.3)')}
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" style={{ color: '#EAEAEA' }}>
                    Password
                  </Label>
                  {/* Forgot password → route */}
                  <button
                    type="button"
                    className="text-sm transition-colors underline underline-offset-4"
                    style={{ color: '#9B4A4A' }}
                    onClick={() => onForgotPassword?.(email)}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#EAEAEA')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#9B4A4A')}
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Password field (no overlap, flex layout) */}
                <div
                  className="rounded-md border px-3 flex items-center"
                  style={{ backgroundColor: '#0E0E10', borderColor: 'rgba(161, 161, 165, 0.3)' }}
                >
                  <Lock className="h-5 w-5 mr-2 shrink-0" style={{ color: '#6D6D70' }} />

                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    // let the wrapper own the border; make the input transparent
                    className="flex-1 bg-transparent border-0 px-0 focus-visible:outline-none focus-visible:ring-0"
                    style={{ color: '#EAEAEA' }}
                    onFocus={(e) => {
                      const box = e.currentTarget.parentElement as HTMLElement;
                      if (box) box.style.borderColor = 'rgba(155, 74, 74, 0.6)';
                    }}
                    onBlur={(e) => {
                      const box = e.currentTarget.parentElement as HTMLElement;
                      if (box) box.style.borderColor = 'rgba(161, 161, 165, 0.3)';
                    }}
                    required
                  />

                  <button
                    type="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 p-1 rounded-md"
                    style={{ color: '#6D6D70' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#A1A1A5')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#6D6D70')}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
              >
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  aria-busy={isLoading === 'email'}
                  className="w-full py-3 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  style={{ backgroundColor: '#1D0210' }}
                  onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#160008')}
                  onMouseLeave={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#1D0210')}
                >
                  {isLoading === 'email' ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="relative my-6"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{ borderColor: 'rgba(161, 161, 165, 0.2)' }} />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2" style={{ backgroundColor: '#141419', color: '#6D6D70' }}>
                  Or continue with
                </span>
              </div>
            </motion.div>

            {/* Social logins */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              <Button
                type="button"
                variant="outline"
                disabled={!!isLoading}
                aria-busy={isLoading === 'google'}
                className="w-full py-2 border transition-all duration-200"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: 'rgba(161, 161, 165, 0.3)',
                  color: '#EAEAEA',
                }}
                onClick={loginWithGoogle}
                onMouseEnter={(e) => {
                  if (isLoading) return;
                  e.currentTarget.style.backgroundColor = 'rgba(161, 161, 165, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(155, 74, 74, 0.6)';
                }}
                onMouseLeave={(e) => {
                  if (isLoading) return;
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(161, 161, 165, 0.3)';
                }}
              >
                {/* Google icon */}
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </Button>

              <Button
                type="button"
                variant="outline"
                disabled={!!isLoading}
                aria-busy={isLoading === 'github'}
                className="w-full py-2 border transition-all duration-200"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: 'rgba(161, 161, 165, 0.3)',
                  color: '#EAEAEA',
                }}
                onClick={loginWithGithub}
                onMouseEnter={(e) => {
                  if (isLoading) return;
                  e.currentTarget.style.backgroundColor = 'rgba(161, 161, 165, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(155, 74, 74, 0.6)';
                }}
                onMouseLeave={(e) => {
                  if (isLoading) return;
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(161, 161, 165, 0.3)';
                }}
              >
                {/* GitHub icon */}
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </Button>
            </motion.div>

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="mt-6 text-center text-sm"
              style={{ color: '#6D6D70' }}
            >
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={onBack}
                className="font-medium transition-colors"
                style={{ color: '#9B4A4A' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#EAEAEA')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9B4A4A')}
              >
                Sign up
              </button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

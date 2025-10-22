import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { ArrowLeft, Mail, Lock, User, Building, Sparkles } from 'lucide-react';
import opsynLogo from 'figma:asset/c0beb7938dec93ac35f48599799e2f4c1c8641af.png';

// 🔐 Firebase
import { auth, db } from '../../lib/firebase';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

interface SignUpPageProps {
  onBack: () => void;
  onSignUpComplete: () => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({ onBack, onSignUpComplete }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  function friendlyError(e: any) {
    const code = e?.code as string | undefined;
    const map: Record<string, string> = {
      'auth/email-already-in-use': 'This email is already in use.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/weak-password': 'Password is too weak (minimum 6 characters).',
      'auth/network-request-failed': 'Network error. Check your connection and try again.',
      'auth/operation-not-allowed': 'Email/password sign-in is not enabled in Firebase.',
    };
    return map[code ?? ''] || e?.message || 'Sign up failed. Please try again.';
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setMsg(null);

    if (!formData.agreeToTerms) {
      setErr('Please accept the Terms of Service and Privacy Policy.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErr('Passwords do not match.');
      return;
    }
    if (formData.password.length < 6) {
      setErr('Password must be at least 6 characters.');
      return;
    }

    try {
      setLoading(true);

      // 1) Create Auth user
      const cred = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      // 2) Set display name
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      if (fullName) {
        await updateProfile(cred.user, { displayName: fullName });
      }

      // 3) Create profile doc
      await setDoc(doc(db, 'profiles', cred.user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company || null,
        email: formData.email,
        createdAt: serverTimestamp()
      });

      // 4) Send verification (optional but recommended)
      try { await sendEmailVerification(cred.user); } catch {}

      setMsg('Account created. Please check your email to verify your address.');
      // 5) Hand off to parent (navigate, etc.)
      onSignUpComplete();
    } catch (e: any) {
      setErr(friendlyError(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0E0E10' }}>
      {/* Abstract Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #101624 0%, #1A1F3B 25%, #2E2A55 50%, #3B2F4F 75%, #432C45 100%)' }}></div>

      {/* Flowing Abstract Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 rounded-full blur-3xl transform rotate-12" style={{ background: 'radial-gradient(circle, rgba(155, 74, 74, 0.1) 0%, rgba(161, 161, 165, 0.2) 100%)' }}></div>
        <div className="absolute top-40 right-10 w-80 h-80 rounded-full blur-2xl" style={{ background: 'radial-gradient(circle, rgba(109, 109, 112, 0.3) 0%, transparent 100%)' }}></div>
        <div className="absolute bottom-20 left-1/4 w-64 h-64 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(155, 74, 74, 0.15) 0%, transparent 100%)' }}></div>
        <div className="absolute top-1/3 right-1/3 w-32 h-32 rounded-full blur-xl" style={{ backgroundColor: 'rgba(161, 161, 165, 0.4)' }}></div>
      </div>

      {/* Left Panel - OPSYN Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-center items-center px-12">
        <div className="max-w-md text-center space-y-8">
          {/* Logo and Brand */}
          <div className="space-y-6">
            <div className="flex justify-center">
              <img
                src={opsynLogo}
                alt="OPSYN"
                className="h-16 w-auto"
              />
            </div>
            <div className="space-y-3">
              <h1 className="text-5xl font-bold" style={{ color: '#EAEAEA' }}>
                OPSYN
              </h1>
              <p className="text-xl" style={{ color: '#A1A1A5' }}>
                AI-Powered Workflow Automation
              </p>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#1D0210' }}>
                <Sparkles className="h-4 w-4" style={{ color: '#FFFFFF' }} />
              </div>
              <div className="text-left">
                <h3 className="font-medium" style={{ color: '#EAEAEA' }}>Intelligent Automation</h3>
                <p className="text-sm mt-1" style={{ color: '#A1A1A5' }}>Build workflows with natural language using our AI-powered builder</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#1D0210' }}>
                <User className="h-4 w-4" style={{ color: '#FFFFFF' }} />
              </div>
              <div className="text-left">
                <h3 className="font-medium" style={{ color: '#EAEAEA' }}>Team Collaboration</h3>
                <p className="text-sm mt-1" style={{ color: '#A1A1A5' }}>Work together in real-time with advanced sharing and permissions</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#1D0210' }}>
                <Building className="h-4 w-4" style={{ color: '#FFFFFF' }} />
              </div>
              <div className="text-left">
                <h3 className="font-medium" style={{ color: '#EAEAEA' }}>Enterprise Ready</h3>
                <p className="text-sm mt-1" style={{ color: '#A1A1A5' }}>Scale with confidence using our robust infrastructure</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 lg:px-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 font-medium transition-all duration-200 self-start"
            style={{ color: '#A1A1A5' }}
            onMouseEnter={(e: any) => {
              e.target.style.color = '#EAEAEA';
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e: any) => {
              e.target.style.color = '#A1A1A5';
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <div className="flex justify-center mb-4">
              <img
                src={opsynLogo}
                alt="OPSYN"
                className="h-12 w-auto"
              />
            </div>
            <h1 className="text-3xl font-bold" style={{ color: '#EAEAEA' }}>
              OPSYN
            </h1>
          </div>

          {/* Sign Up Card */}
          <Card className="backdrop-blur-sm border shadow-xl" style={{ backgroundColor: '#141419', borderColor: 'rgba(161, 161, 165, 0.4)' }}>
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-2xl" style={{ color: '#EAEAEA' }}>
                Create Your Account
              </CardTitle>
              <p style={{ color: '#A1A1A5' }}>
                Join OPSYN and start automating your workflows today
              </p>
              {err && <p className="text-sm" style={{ color: '#ff6b6b' }}>{err}</p>}
              {msg && <p className="text-sm" style={{ color: '#69db7c' }}>{msg}</p>}
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: '#EAEAEA' }}>
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: '#1D0210' }} />
                      <Input
                        type="text"
                        autoComplete="given-name"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="pl-10 border transition-colors"
                        style={{
                          backgroundColor: '#0E0E10',
                          borderColor: 'rgba(29, 2, 16, 0.3)',
                          color: '#EAEAEA'
                        }}
                        onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#1D0210'}
                        onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'rgba(29, 2, 16, 0.3)'}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: '#EAEAEA' }}>
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: '#1D0210' }} />
                      <Input
                        type="text"
                        autoComplete="family-name"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="pl-10 border transition-colors"
                        style={{
                          backgroundColor: '#0E0E10',
                          borderColor: 'rgba(29, 2, 16, 0.3)',
                          color: '#EAEAEA'
                        }}
                        onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#1D0210'}
                        onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'rgba(29, 2, 16, 0.3)'}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#EAEAEA' }}>
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: '#1D0210' }} />
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10 border transition-colors"
                      style={{
                        backgroundColor: '#0E0E10',
                        borderColor: 'rgba(29, 2, 16, 0.3)',
                        color: '#EAEAEA'
                      }}
                      onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#1D0210'}
                      onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'rgba(29, 2, 16, 0.3)'}
                      required
                    />
                  </div>
                </div>

                {/* Company Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#EAEAEA' }}>
                    Company <span style={{ color: '#6D6D70' }} className="font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: '#1D0210' }} />
                    <Input
                      type="text"
                      placeholder="Your Company (Optional)"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="pl-10 border transition-colors"
                      style={{
                        backgroundColor: '#0E0E10',
                        borderColor: 'rgba(29, 2, 16, 0.3)',
                        color: '#EAEAEA'
                      }}
                      onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#1D0210'}
                      onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'rgba(29, 2, 16, 0.3)'}
                    />
                  </div>
                </div>

                {/* Password Fields */}
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#EAEAEA' }}>
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: '#1D0210' }} />
                    <Input
                      type="password"
                      autoComplete="new-password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 border transition-colors"
                      style={{
                        backgroundColor: '#0E0E10',
                        borderColor: 'rgba(29, 2, 16, 0.3)',
                        color: '#EAEAEA'
                      }}
                      onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#1D0210'}
                      onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'rgba(29, 2, 16, 0.3)'}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#EAEAEA' }}>
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: '#1D0210' }} />
                    <Input
                      type="password"
                      autoComplete="new-password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-10 border transition-colors"
                      style={{
                        backgroundColor: '#0E0E10',
                        borderColor: 'rgba(29, 2, 16, 0.3)',
                        color: '#EAEAEA'
                      }}
                      onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#1D0210'}
                      onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'rgba(29, 2, 16, 0.3)'}
                      required
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3 pt-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                    className="mt-1"
                    style={{ borderColor: '#008080' }}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm leading-relaxed cursor-pointer"
                    style={{ color: '#A1A1A5' }}
                  >
                    I agree to the{' '}
                    <a href="#" className="hover:underline" style={{ color: '#008080' }}>
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="hover:underline" style={{ color: '#008080' }}>
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  style={{ backgroundColor: '#1D0210' }}
                  onMouseEnter={(e: any) => e.target.style.backgroundColor = '#160008'}
                  onMouseLeave={(e: any) => e.target.style.backgroundColor = '#1D0210'}
                  disabled={!formData.agreeToTerms || loading}
                >
                  {loading ? 'Creating Account…' : 'Create Account'}
                </Button>
              </form>

              {/* Login Link */}
              <div className="text-center pt-4">
                <p className="text-sm" style={{ color: '#A1A1A5' }}>
                  Already have an account?{' '}
                  <Button
                    variant="ghost"
                    onClick={onBack}
                    className="hover:bg-transparent p-0 h-auto font-medium transition-colors"
                    style={{ color: '#008080' }}
                    onMouseEnter={(e: any) => e.target.style.color = 'rgba(29, 2, 16, 0.8)'}
                    onMouseLeave={(e: any) => e.target.style.color = '#008080'}
                  >
                    Login here
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

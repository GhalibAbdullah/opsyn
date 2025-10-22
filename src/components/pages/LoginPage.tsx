// src/components/pages/LoginPage.tsx
import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import opsynLogo from "figma:asset/c0beb7938dec93ac35f48599799e2f4c1c8641af.png";

import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

import { useNavigate } from "react-router-dom";

/**
 * Simple toast hook local to this file.
 */
function useLocalToast() {
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);
  const show = (message: string, type: "success" | "error" = "success", ms = 1800) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), ms);
  };
  return { toast, show };
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { toast, show } = useLocalToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function friendlyError(code?: string, fallback?: string) {
    const map: Record<string, string> = {
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/user-not-found": "No account found for this email.",
      "auth/wrong-password": "Incorrect password.",
      "auth/too-many-requests": "Too many attempts. Try again later.",
      "auth/network-request-failed": "Network error. Check your connection.",
      "auth/popup-closed-by-user": "Sign-in was cancelled.",
      "auth/cancelled-popup-request": "Popup cancelled. Try again.",
      "auth/account-exists-with-different-credential": "This email is linked to another sign-in method.",
    };
    return (code && map[code]) || fallback || "Sign in failed. Please try again.";
  }

  const onDone = () => {
    show("Welcome back", "success");
    // redirect after a short delay to let user see toast
    setTimeout(() => {
      navigate("/dashboard");
    }, 900);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      onDone();
    } catch (e: any) {
      const friendly = friendlyError(e?.code, e?.message);
      setErr(friendly);
      show(friendly, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setErr(null);
    setIsLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      onDone();
    } catch (e: any) {
      const friendly = friendlyError(e?.code, e?.message);
      setErr(friendly);
      show(friendly, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGithub = async () => {
    setErr(null);
    setIsLoading(true);
    try {
      await signInWithPopup(auth, new GithubAuthProvider());
      onDone();
    } catch (e: any) {
      const friendly = friendlyError(e?.code, e?.message);
      setErr(friendly);
      show(friendly, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#0E0E10' }}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(165deg, #070500 0%, #05060A 25%, #050A15 45%, #1B0E1E 70%, #1d0210 100%)' }} />

      {/* Header back (uses navigate to go home) */}
      <header className="fixed top-0 left-0 right-0 z-30 px-6 py-4 flex items-center" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0))' }}>
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors"
          style={{ color: '#A1A1A5' }}
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back</span>
        </motion.button>
      </header>

      <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5 }} className="relative z-10 w-full max-w-md px-6 pt-24">
        <Card className="backdrop-blur-sm border shadow-2xl rounded-2xl overflow-hidden" style={{ backgroundColor: '#141419', borderColor: 'rgba(161, 161, 165, 0.4)' }}>
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <motion.img src={opsynLogo} alt="OPSYN" className="h-12 w-auto" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.4 }} />
              </div>

              <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }} className="text-3xl font-bold mb-2" style={{ color: '#EAEAEA' }}>
                Welcome Back
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4 }} style={{ color: '#A1A1A5' }}>
                Sign in to continue to OPSYN
              </motion.p>
              {err && <p className="mt-4 text-sm" style={{ color: '#ff6b6b' }}>{err}</p>}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.4 }} className="space-y-2">
                <Label htmlFor="email" style={{ color: '#EAEAEA' }}>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: '#6D6D70' }} />
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 border" style={{ backgroundColor: '#0E0E10', borderColor: 'rgba(161, 161, 165, 0.3)', color: '#EAEAEA' }} required />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.4 }} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" style={{ color: '#EAEAEA' }}>Password</Label>
                  <button type="button" className="text-sm transition-colors" style={{ color: '#9B4A4A' }} onClick={() => {/* future forgot password */}}>
                    Forgot password?
                  </button>
                </div>

                <div className="rounded-md border px-3 flex items-center" style={{ backgroundColor: '#0E0E10', borderColor: 'rgba(161, 161, 165, 0.3)' }}>
                  <Lock className="h-5 w-5 mr-2 shrink-0" style={{ color: '#6D6D70' }} />
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="flex-1 bg-transparent border-0 px-0 focus-visible:outline-none focus-visible:ring-0" style={{ color: '#EAEAEA' }} required />
                  <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)} className="ml-2 p-1 rounded-md" style={{ color: '#6D6D70' }}>
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.4 }}>
                <Button type="submit" disabled={isLoading} className="w-full py-3 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]" style={{ backgroundColor: '#1D0210' }}>
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </motion.div>
            </form>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.4 }} className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t" style={{ borderColor: 'rgba(161, 161, 165, 0.2)' }} /></div>
              <div className="relative flex justify-center text-sm"><span className="px-2" style={{ backgroundColor: '#141419', color: '#6D6D70' }}>Or continue with</span></div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.4 }} className="grid grid-cols-2 gap-4">
              <Button type="button" variant="outline" className="w-full py-2 border transition-all duration-200" style={{ backgroundColor: 'transparent', borderColor: 'rgba(161, 161, 165, 0.3)', color: '#EAEAEA' }} onClick={loginWithGoogle}>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /></svg>
                Google
              </Button>

              <Button type="button" variant="outline" className="w-full py-2 border transition-all duration-200" style={{ backgroundColor: 'transparent', borderColor: 'rgba(161, 161, 165, 0.3)', color: '#EAEAEA' }} onClick={loginWithGithub}>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                GitHub
              </Button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.4 }} className="mt-6 text-center text-sm" style={{ color: '#6D6D70' }}>
              Don't have an account?{' '}
              <button type="button" onClick={() => navigate("/signup")} className="font-medium transition-colors" style={{ color: '#9B4A4A' }}>
                Sign up
              </button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 60 }}>
          <div className={`px-4 py-3 rounded-lg shadow-lg ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
}

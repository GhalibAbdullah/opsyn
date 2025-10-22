// src/components/pages/ResetPasswordPage.tsx
import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { ArrowLeft, Mail } from "lucide-react";

import { auth } from "../../lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

type Props = {
  initialEmail?: string;
  onBack: () => void;
  onSent?: () => void; // optional: called after email is sent
};

export default function ResetPasswordPage({ initialEmail = "", onBack, onSent }: Props) {
  const [email, setEmail] = useState(initialEmail);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const mapErr = (code?: string, fallback?: string) => {
    const m: Record<string, string> = {
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/user-not-found": "No account found with this email.",
      "auth/network-request-failed": "Network error. Check your connection.",
      "auth/too-many-requests": "Too many attempts. Try again later.",
    };
    return (code && m[code]) || fallback || "Failed to send reset email. Please try again.";
  };

  const onSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    setSending(true);
    try {
      await sendPasswordResetEmail(
        auth,
        email.trim()
        // Optional redirect after user finishes resetting on Firebase’s page:
        // , { url: 'https://your-app.vercel.app/login', handleCodeInApp: false }
      );
      setMsg("Password reset link sent! Check your inbox (and spam).");
      onSent?.();
    } catch (e: any) {
      setErr(mapErr(e?.code, e?.message));
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: "#0E0E10" }}
    >
      {/* subtle gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(165deg, #070500 0%, #05060A 25%, #050A15 45%, #1B0E1E 70%, #1d0210 100%)",
        }}
      />

      {/* Top bar with Back */}
      <header
        className="fixed top-0 left-0 right-0 z-30 px-6 py-4 flex items-center"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0))",
        }}
      >
        <motion.button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors"
          style={{ color: "#A1A1A5" }}
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#EAEAEA")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#A1A1A5")}
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
        className="relative z-10 w-full max-w-md px-6 pt-24"
      >
        <Card
          className="backdrop-blur-sm border shadow-2xl rounded-2xl overflow-hidden"
          style={{ backgroundColor: "#141419", borderColor: "rgba(161, 161, 165, 0.4)" }}
        >
          <CardContent className="p-8">
            <h1 className="text-2xl font-semibold mb-1" style={{ color: "#EAEAEA" }}>
              Forgot your password?
            </h1>
            <p className="mb-6 text-sm" style={{ color: "#A1A1A5" }}>
              Enter your account email and we’ll send you a secure link to reset your password.
            </p>

            {err && (
              <div className="mb-3 rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-sm">
                {err}
              </div>
            )}
            {msg && (
              <div className="mb-3 rounded-lg border border-green-500/30 bg-green-500/10 p-2 text-sm">
                {msg}
              </div>
            )}

            <form onSubmit={onSend} className="space-y-4" noValidate>
              <Label htmlFor="email" style={{ color: "#EAEAEA" }}>
                Email
              </Label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5"
                  style={{ color: "#6D6D70" }}
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border"
                  style={{
                    backgroundColor: "#0E0E10",
                    borderColor: "rgba(161, 161, 165, 0.3)",
                    color: "#EAEAEA",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(155, 74, 74, 0.6)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(161, 161, 165, 0.3)")
                  }
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={sending || !email.includes("@")}
                aria-busy={sending}
                className="w-full py-3 text-white font-semibold rounded-lg shadow-lg transition-all"
                style={{ backgroundColor: "#1D0210" }}
              >
                {sending ? "Sending…" : "Send reset link"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm" style={{ color: "#6D6D70" }}>
              Remembered your password?{" "}
              <button
                type="button"
                className="font-medium"
                style={{ color: "#9B4A4A" }}
                onClick={onBack}
              >
                Back to Sign In
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// src/components/pages/Dashboard.tsx
import React from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

/**
 * Minimal Dashboard page. Shows logout and a few placeholders.
 */
export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // go to login after logout
      navigate("/login", { replace: true });
    } catch (e) {
      // ignore for now; you can add toast if desired
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="h-screen" style={{ backgroundColor: "#000000" }}>
      <div className="border-b" style={{ backgroundColor: "#000000", borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <h2 style={{ color: "#EAEAEA", fontSize: 20, fontWeight: 700 }}>OPSYN</h2>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" onClick={handleLogout} style={{ color: "#A1A1A5" }}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <motion.main initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="p-6">
        <div className="max-w-6xl mx-auto text-white">
          <h1 className="text-3xl font-bold mb-4" style={{ color: "#EAEAEA" }}>Dashboard</h1>
          <p style={{ color: "#A1A1A5" }} className="mb-6">Welcome to OPSYN — this is your dashboard. Add analytics, widgets and the builder here.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg p-4" style={{ backgroundColor: "#0F0F11", border: "1px solid rgba(161,161,165,0.06)" }}>
              <h3 className="font-medium" style={{ color: "#EAEAEA" }}>Recent Workflows</h3>
              <p style={{ color: "#9B9B9B" }} className="mt-2">No workflows yet — create one from Builder.</p>
            </div>

            <div className="rounded-lg p-4" style={{ backgroundColor: "#0F0F11", border: "1px solid rgba(161,161,165,0.06)" }}>
              <h3 className="font-medium" style={{ color: "#EAEAEA" }}>Quick Actions</h3>
              <p style={{ color: "#9B9B9B" }} className="mt-2">Start a new workflow or import a template.</p>
            </div>
          </div>
        </div>
      </motion.main>
    </div>
  );
}

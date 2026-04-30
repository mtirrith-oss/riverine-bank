/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import { Toaster } from '@/components/ui/sonner';
import { MessageSquare, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-secondary/30 selection:text-primary relative">
      {isAuthenticated ? (
        <div className="bg-background animate-in fade-in duration-1000">
          <Navbar />
          <main>
            <Dashboard />
          </main>

          {/* Floating Assistant Trigger */}
          <div className="fixed bottom-8 right-8 z-[100]">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAssistant(!showAssistant)}
              className="bg-primary text-primary-foreground p-4 rounded-2xl shadow-2xl shadow-primary/30 flex items-center gap-3 group"
            >
              <div className="bg-white/10 p-1 rounded-lg">
                <Sparkles className="w-5 h-5 text-secondary" />
              </div>
              <span className="font-bold text-sm pr-2">Riverine Assistant</span>
            </motion.button>

            <AnimatePresence>
              {showAssistant && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  className="absolute bottom-20 right-0 w-80 bg-white border border-border/50 shadow-2xl rounded-3xl overflow-hidden"
                >
                  <div className="bg-primary p-6 text-primary-foreground">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-60">Your AI Concierge</p>
                    <h4 className="text-xl font-bold tracking-tight">How can I assist your wealth journey today?</h4>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                       {["What's my monthly burn?", "Analyze my investments", "Schedule a transfer"].map((q) => (
                         <button key={q} className="w-full text-left p-3 rounded-xl bg-muted/50 hover:bg-muted text-xs font-bold text-primary transition-colors border border-border/30">
                           {q}
                         </button>
                       ))}
                    </div>
                    <div className="pt-2 border-t border-border/40">
                      <p className="text-[10px] text-muted-foreground font-medium text-center">Standard messaging rates may apply. AI-generated insights for prototype purposes.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
      <Toaster position="top-center" richColors />
    </div>
  );
}



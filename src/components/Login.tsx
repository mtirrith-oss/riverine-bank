import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Waves, Lock } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLogin();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0c10] relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 w-full max-w-lg px-6"
      >
        <div className="flex flex-col items-center mb-10">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-20 h-20 bg-primary/20 backdrop-blur-md rounded-[2rem] flex items-center justify-center mb-6 border border-white/10 shadow-[0_0_50px_rgba(var(--primary),0.3)]"
          >
            <Waves className="text-secondary w-12 h-12" />
          </motion.div>
          <motion.h1 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-black tracking-tighter text-white"
          >
            Riverine Bank
          </motion.h1>
          <motion.p 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/40 font-bold uppercase tracking-[0.4em] text-[10px] mt-2"
          >
            Boston • Global Wealth Management
          </motion.p>
        </div>

        <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-secondary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          <CardHeader className="space-y-2 p-8 pt-10">
            <CardTitle className="text-3xl font-bold tracking-tight text-white">Secure Portal</CardTitle>
            <CardDescription className="text-white/50 font-medium">Authentication required for core services</CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 px-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Access Identity</label>
                <Input
                  type="text"
                  placeholder="Private ID or Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 bg-white/[0.05] border-white/10 text-white placeholder:text-white/20 focus-visible:ring-secondary/50 rounded-xl transition-all"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Credential</label>
                  <button type="button" className="text-[10px] uppercase font-black text-secondary/60 hover:text-secondary hover:underline transition-colors">Emergency Reset</button>
                </div>
                <div className="relative">
                  <Input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 bg-white/[0.05] border-white/10 text-white focus-visible:ring-secondary/50 rounded-xl transition-all pr-12"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20">
                    <Lock className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-8 pb-10">
              <Button
                type="submit"
                className="w-full h-14 bg-primary text-primary-foreground font-black text-lg tracking-tight hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 rounded-xl disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Waves className="w-6 h-6" />
                  </motion.div>
                ) : "Enter Ecosystem"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 space-y-4"
        >
          <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.2em]">
            ISO 27001 Certified • Advanced Neural Encryption
          </p>
          <div className="flex justify-center gap-6 opacity-30">
             <div className="h-4 w-12 bg-white/20 rounded-sm"></div>
             <div className="h-4 w-12 bg-white/20 rounded-sm"></div>
             <div className="h-4 w-12 bg-white/20 rounded-sm"></div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, ArrowRightLeft, CreditCard, Banknote, Landmark, Check } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

export default function TransferFunds() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [fromAccount, setFromAccount] = useState('checking-4209');
  const [toAccount, setToAccount] = useState('');

  const handleTransfer = () => {
    setStep(3); // Success step
    setTimeout(() => {
      setIsOpen(false);
      setStep(1);
      setAmount('');
      toast.success("Transfer Successful", {
        description: `$${parseFloat(amount).toLocaleString()} has been transferred to ${toAccount}.`,
      });
    }, 3000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-primary/20 hover:bg-primary/5 text-primary font-bold shadow-sm">
          <ArrowRightLeft className="w-4 h-4 mr-2" /> Transfer Funds
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 pt-4"
            >
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-primary tracking-tight">Move Funds</DialogTitle>
                <DialogDescription>
                  Transfer money between your Riverine accounts or to an external bank.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">From Account</label>
                  <Select value={fromAccount} onValueChange={setFromAccount}>
                    <SelectTrigger className="h-14 bg-muted/30 border-none shadow-inner">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                          <CreditCard className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold leading-none">Reserved Checking</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">••4209 • $58,240.12</p>
                        </div>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking-4209">Reserved Checking (••4209)</SelectItem>
                      <SelectItem value="savings-8812">Prestige Savings (••8812)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-center -my-2 relative z-10">
                  <div className="bg-white border-2 border-muted p-2 rounded-full shadow-lg">
                    <RefreshCw className="w-4 h-4 text-primary" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">To Destination</label>
                  <Select value={toAccount} onValueChange={setToAccount}>
                    <SelectTrigger className="h-14 bg-muted/30 border-none shadow-inner">
                      <SelectValue placeholder="Select destination..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Savings ••8812">
                        <div className="flex items-center gap-2">
                          <Banknote className="w-4 h-4" /> prestige Savings (••8812)
                        </div>
                      </SelectItem>
                      <SelectItem value="External - Chase">
                        <div className="flex items-center gap-2">
                          <Landmark className="w-4 h-4" /> Chase Individual (••9012)
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-primary">$</span>
                    <Input 
                      placeholder="0.00" 
                      type="number"
                      className="h-16 pl-10 text-2xl font-bold border-none bg-muted/50 focus-visible:ring-1 focus-visible:ring-primary/20"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button 
                  disabled={!amount || !toAccount}
                  onClick={() => setStep(2)}
                  className="w-full h-12 bg-primary text-primary-foreground font-bold text-base shadow-xl shadow-primary/20"
                >
                  Review Transfer
                </Button>
              </DialogFooter>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 pt-4"
            >
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-primary tracking-tight text-center">Confirm Transfer</DialogTitle>
                <DialogDescription className="text-center">
                  Please review the details below before proceeding.
                </DialogDescription>
              </DialogHeader>

              <div className="bg-muted/30 rounded-3xl p-8 space-y-6 border border-border/50 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <RefreshCw className="w-24 h-24 rotate-12" />
                </div>
                
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Transfer Amount</p>
                  <p className="text-4xl font-bold text-primary tracking-tighter">${parseFloat(amount).toLocaleString()}</p>
                </div>

                <div className="flex items-center justify-between gap-4 py-4 border-y border-border/40">
                  <div className="text-left w-1/2">
                    <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-70">From</p>
                    <p className="text-xs font-bold text-primary truncate">Reserved Checking</p>
                  </div>
                  <ArrowRightLeft className="w-4 h-4 text-secondary shrink-0" />
                  <div className="text-right w-1/2">
                    <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-70">To</p>
                    <p className="text-xs font-bold text-primary truncate">{toAccount}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-muted-foreground font-medium">Processing Fee</span>
                  <span className="text-green-600">$0.00 (Standard)</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleTransfer}
                  className="w-full h-12 bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20"
                >
                  Initialize Secure Transfer
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setStep(1)}
                  className="w-full text-muted-foreground font-bold hover:text-primary"
                >
                  Edit Details
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center text-center space-y-6"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-lg shadow-green-100/50">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                >
                  <Check className="w-10 h-10 stroke-[3px]" />
                </motion.div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-primary tracking-tight">Transfer Initialized</h3>
                <p className="text-sm text-muted-foreground max-w-[260px] mx-auto">
                  Your funds are being routed via Riverine SecureNet. You'll receive a confirmation email shortly.
                </p>
              </div>
              <div className="w-full pt-4">
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2 }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

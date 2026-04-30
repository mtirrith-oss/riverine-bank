import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Balance from './Balance';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  PieChart, 
  ChevronRight,
  Plus,
  ArrowRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'motion/react';
import TransferFunds from './TransferFunds';

const chartData = [
  { name: 'Jan', balance: 42300 },
  { name: 'Feb', balance: 45000 },
  { name: 'Mar', balance: 43200 },
  { name: 'Apr', balance: 48900 },
  { name: 'May', balance: 52100 },
  { name: 'Jun', balance: 55400 },
  { name: 'Jul', balance: 58200 },
];

const transactions = [
  { id: 1, type: 'withdraw', merchant: 'Blue Bottle Coffee', category: 'Dining', amount: -6.50, date: 'Today, 2:45 PM' },
  { id: 2, type: 'deposit', merchant: 'Quarterly Dividend', category: 'Investment', amount: 1240.00, date: 'Yesterday, 10:15 AM' },
  { id: 3, type: 'withdraw', merchant: 'Tesla Supercharger', category: 'Transport', amount: -24.12, date: 'May 24, 2026' },
  { id: 4, type: 'withdraw', merchant: 'Everlane Boston', category: 'Shopping', amount: -145.00, date: 'May 22, 2026' },
  { id: 5, type: 'deposit', merchant: 'Riverine Int. Rebate', category: 'Reward', amount: 15.20, date: 'May 20, 2026' },
];

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(58240.12);
  const creditLimit = 25000.00;
  const creditUsed = 3450.50;

  useEffect(() => {
    // Artificial loading for premium feel
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-8 pb-20 animate-in fade-in duration-500">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Skeleton className="lg:col-span-2 h-[500px] rounded-3xl" />
          <div className="space-y-6">
            <Skeleton className="h-[240px] rounded-3xl" />
            <Skeleton className="h-[240px] rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 max-w-7xl mx-auto space-y-8 pb-20"
    >
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-primary">Good morning, James</h2>
          <p className="text-muted-foreground font-medium">Your portfolio is up <span className="text-green-600 font-bold">+2.4%</span> this month.</p>
        </div>
        <div className="flex items-center gap-3">
          <TransferFunds />
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
            <Plus className="w-4 h-4 mr-2" /> Open Account
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Balance Card */}
        <Card className="lg:col-span-2 overflow-hidden border-border/40 shadow-2xl shadow-primary/5 bg-white/70 backdrop-blur-xl">
          <CardHeader className="bg-primary text-primary-foreground p-8 pb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="flex justify-between items-start relative z-10">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Reserved Checking ••4209</p>
                <div className="flex items-baseline gap-2">
                  <Balance value={balance} className="text-5xl font-bold tracking-tighter" />
                </div>
              </div>
              <Badge variant="outline" className="text-secondary border-secondary/30 bg-secondary/10 px-4 py-1 font-bold tracking-wider rounded-lg">
                ELITE STATUS
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="-mt-8 p-0">
            <div className="mx-8 bg-white rounded-2xl p-6 shadow-lg border border-border/40">
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}}
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="balance" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorBalance)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
          <div className="p-8 pt-4 flex gap-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Available Credit</p>
              <Balance value={creditLimit - creditUsed} className="text-lg font-bold text-primary" />
            </div>
            <div className="h-10 w-px bg-border/60"></div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Monthly Spending</p>
              <Balance value={4821.10} className="text-lg font-bold text-primary" />
            </div>
          </div>
        </Card>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          <Card className="border-border/40 shadow-xl shadow-black/5 bg-white/70 backdrop-blur-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Credit Line Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-end justify-between">
                <div>
                  <Balance value={creditUsed} className="text-2xl font-bold text-primary tracking-tight" />
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Used this month</p>
                </div>
                <Badge variant="secondary" className="bg-primary/5 text-primary border-none hover:bg-primary/10 font-bold">
                  Platinum
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-secondary rounded-full" 
                    style={{width: `${(creditUsed / creditLimit) * 100}%`}}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-muted-foreground tracking-tighter">
                  <span>LIMIT: ${creditLimit.toLocaleString()}</span>
                  <span>14% UTILIZED</span>
                </div>
              </div>

              <Button variant="outline" className="w-full border-border/60 hover:bg-white hover:text-primary transition-all">
                View Billing Statement
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/40 shadow-lg shadow-black/5">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Insights</CardTitle>
              <PieChart className="w-4 h-4 text-secondary" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-xl space-y-1 hover:bg-muted/50 transition-colors cursor-pointer">
                <p className="text-xs font-bold text-primary">Spending Alert</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  You spent <span className="font-bold text-primary">$420</span> more on Dining than last month. Consider our RiverineRewards partners.
                </p>
              </div>
              <div className="bg-secondary/5 p-4 rounded-xl space-y-1 hover:bg-secondary/10 transition-colors cursor-pointer group">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-secondary">Wealth Management</p>
                  <ChevronRight className="w-3 h-3 text-secondary group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Your investment account has 3 new allocation recommendations from your advisor.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        <Card className="border-border/40 shadow-2xl shadow-black/5 bg-white/80 backdrop-blur-md overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 pb-6 p-8">
            <div>
              <CardTitle className="text-xl font-bold text-primary tracking-tight">Recent Activity</CardTitle>
              <CardDescription className="text-xs font-medium">Real-time ledger updates</CardDescription>
            </div>
            <Button variant="outline" className="text-[10px] h-8 px-4 font-black uppercase tracking-widest border-primary/20 hover:bg-primary/5">
              Full Statement <ArrowRight className="w-3 h-3 ml-2" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/40">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-4 px-6 flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      tx.type === 'deposit' ? 'bg-green-100 text-green-700' : 'bg-muted text-primary'
                    }`}>
                      {tx.type === 'deposit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary tracking-wide">{tx.merchant}</p>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{tx.category} • {tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold tracking-tight ${tx.amount > 0 ? 'text-green-600' : 'text-primary'}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </p>
                    <p className="text-[10px] font-medium text-muted-foreground uppercase">Completed</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

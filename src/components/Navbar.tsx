import { Waves, Bell, Search, Settings, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Navbar() {
  return (
    <nav className="h-20 border-b border-border bg-white/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
            <Waves className="text-secondary w-7 h-7" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tighter text-primary leading-none">Riverine</span>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50">Boston</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-2">
          {['Portfolio', 'Wealth', 'Planning', 'Secure Pay', 'Insights'].map((item) => (
            <Button key={item} variant="ghost" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary hover:bg-primary/5 px-4 h-10 rounded-xl transition-all">
              {item}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden xl:flex relative w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
          <Input placeholder="Search accounts, services, help..." className="pl-11 h-11 bg-muted/40 border-none focus-visible:ring-1 focus-visible:ring-primary/10 rounded-2xl placeholder:text-muted-foreground/40 text-xs font-medium" />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-muted/30 p-1.5 rounded-2xl">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary h-10 w-10 hover:bg-white shadow-sm transition-all rounded-xl">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-secondary rounded-full ring-2 ring-white"></span>
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary h-10 w-10 hover:bg-white shadow-sm transition-all rounded-xl">
              <Settings className="w-5 h-5" />
            </Button>
          </div>

          <div className="h-10 w-px bg-border/40 mx-2"></div>

          <div className="flex items-center gap-4 bg-primary text-primary-foreground p-1 px-4 pr-1.5 rounded-2xl hover:shadow-xl hover:shadow-primary/20 cursor-pointer transition-all h-12 shadow-lg shadow-primary/10">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black uppercase tracking-widest leading-none opacity-60 mb-0.5">James Dalton</p>
              <p className="text-[11px] font-bold text-secondary tracking-tight">Private Client</p>
            </div>
            <Avatar className="w-9 h-9 border-2 border-white/20 shadow-md">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
}

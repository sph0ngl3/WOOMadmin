import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Bike,
  Coins,
  Package,
  FileText,
  Settings,
  LogOut
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: Bike, label: 'Couriers', path: '/couriers' },
  { icon: Coins, label: 'W Points', path: '/w-points' },
  { icon: Package, label: 'Deliveries', path: '/deliveries' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'System', path: '/system' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card text-card-foreground">
      <div className="flex h-16 items-center border-b px-6">
        <span className="text-xl font-bold tracking-tight text-primary">WOOM<span className="text-foreground">Admin</span></span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="grid gap-1 px-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive ? "bg-primary/10 text-primary hover:bg-primary/15" : "text-muted-foreground"
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

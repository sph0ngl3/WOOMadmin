import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockData } from "@/lib/data";
import { Users, Bike, Package, Coins, Activity, TrendingUp } from "lucide-react";

export default function Overview() {
  const { users, couriers, deliveries } = mockData;

  const totalW = users.reduce((acc, user) => acc + user.wPoints, 0);
  const successDeliveries = deliveries.filter(d => d.status === 'Completed').length;
  const successRate = ((successDeliveries / deliveries.length) * 100).toFixed(1);

  const stats = [
    {
      title: "Total Users",
      value: users.length.toString(),
      icon: Users,
      trend: "+12% this month",
      color: "text-blue-500"
    },
    {
      title: "Total Couriers",
      value: couriers.length.toString(),
      icon: Bike,
      trend: "+5% this month",
      color: "text-primary"
    },
    {
      title: "Total Deliveries",
      value: deliveries.length.toString(),
      icon: Package,
      trend: "+24% this month",
      color: "text-purple-500"
    },
    {
      title: "Success Rate",
      value: `${successRate}%`,
      icon: Activity,
      trend: "stable",
      color: "text-green-500"
    },
    {
      title: "Active W Points",
      value: totalW.toLocaleString(),
      icon: Coins,
      trend: "In circulation",
      color: "text-gold"
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index} className="border-border/50 bg-card/50 backdrop-blur transition-all hover:bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> {stat.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deliveries.slice(0, 5).map((delivery) => (
                <div key={delivery.id} className="flex items-center justify-between border-b border-border/50 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                      delivery.status === 'Completed' ? 'border-primary/20 bg-primary/10 text-primary' : 
                      delivery.status === 'Failed' ? 'border-destructive/20 bg-destructive/10 text-destructive' : 
                      'border-muted bg-muted text-muted-foreground'
                    }`}>
                      <Package className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{delivery.id}</p>
                      <p className="text-xs text-muted-foreground">{new Date(delivery.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        delivery.status === 'Completed' ? 'bg-primary/10 text-primary' : 
                        delivery.status === 'Failed' ? 'bg-destructive/10 text-destructive' : 
                        'bg-muted text-muted-foreground'
                     }`}>
                        {delivery.status}
                     </span>
                     <span className="text-sm font-bold text-gold">+{delivery.wEarned} W</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Couriers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {couriers.sort((a, b) => b.totalDeliveries - a.totalDeliveries).slice(0, 5).map((courier) => (
                <div key={courier.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary">{courier.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{courier.name}</p>
                      <p className="text-xs text-muted-foreground">{courier.totalDeliveries} deliveries</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-primary">{courier.successRate}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

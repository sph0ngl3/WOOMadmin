import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockData } from "@/lib/data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ReportsPage() {
  const { deliveries, users } = mockData;

  // Simple aggregations
  const totalDeliveries = deliveries.length;
  const totalWDistributed = deliveries.reduce((acc, d) => acc + d.wEarned, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Reports</h2>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDeliveries}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">W Distributed (Monthly)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gold">{totalWDistributed.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Delivery Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24 min</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Users by W Points</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead className="text-right">W Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.sort((a, b) => b.wPoints - a.wPoints).slice(0, 5).map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell className="text-right font-bold text-gold">{user.wPoints.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivery Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Completed', 'Failed', 'Cancelled'].map(status => {
                const count = deliveries.filter(d => d.status === status).length;
                const percentage = Math.round((count / totalDeliveries) * 100);
                return (
                  <div key={status} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{status}</span>
                      <span className="text-muted-foreground">{count} ({percentage}%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                      <div 
                        className={`h-full ${status === 'Completed' ? 'bg-primary' : 'bg-muted-foreground'}`} 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

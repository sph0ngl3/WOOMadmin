import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Coins, ArrowRightLeft, History } from "lucide-react";
import { toast } from "sonner";
import { mockData } from "@/lib/data";

export default function WPointsPage() {
  const { users } = mockData;
  const totalIssued = users.reduce((acc, u) => acc + u.wPoints, 0); // Simplified logic

  const handleTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Transaction processed successfully");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">W Points Management</h2>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-card to-card/50 border-gold/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total W Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gold">{totalIssued.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Redeemed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Exchange Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100 W = $1.00</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRightLeft className="h-5 w-5 text-primary" />
              Manual Transaction
            </CardTitle>
            <CardDescription>Issue or deduct W points manually. Requires reason.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTransaction} className="space-y-4">
              <div className="space-y-2">
                <Label>Target User / Courier ID</Label>
                <Input placeholder="Enter ID..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit">Credit (Add)</SelectItem>
                      <SelectItem value="debit">Debit (Remove)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Amount (W)</Label>
                  <Input type="number" placeholder="0" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Reason</Label>
                <Input placeholder="e.g. Compensation for delay" />
              </div>
              <Button type="submit" className="w-full">Process Transaction</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-muted-foreground" />
              Recent System Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div>
                    <p className="text-sm font-medium">Manual Adjustment</p>
                    <p className="text-xs text-muted-foreground">Admin: John Doe</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gold">+500 W</p>
                    <p className="text-xs text-muted-foreground">2 mins ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

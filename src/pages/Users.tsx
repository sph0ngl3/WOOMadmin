import { useState } from "react";
import { mockData } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { MoreHorizontal, Search, ShieldAlert, Coins } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export default function UsersPage() {
  const [users, setUsers] = useState(mockData.users);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [wAmount, setWAmount] = useState("");

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddW = () => {
    if (!selectedUser || !wAmount) return;
    toast.success(`Added ${wAmount} W to ${selectedUser.username}`);
    setWAmount("");
    setSelectedUser(null);
  };

  const handleSuspend = (userId: string) => {
    toast.warning(`User ${userId} suspended`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-9 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>W Points</TableHead>
              <TableHead>Deliveries</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.username}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === 'Active' ? 'default' : 'destructive'} className={user.status === 'Active' ? 'bg-primary/20 text-primary hover:bg-primary/30' : ''}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-gold">{user.wPoints.toLocaleString()} W</span>
                </TableCell>
                <TableCell>{user.totalDeliveries}</TableCell>
                <TableCell className="text-muted-foreground">{new Date(user.joinedAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                        <Coins className="mr-2 h-4 w-4" /> Manage W Points
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => handleSuspend(user.id)}>
                        <ShieldAlert className="mr-2 h-4 w-4" /> Suspend User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage W Points</DialogTitle>
            <DialogDescription>
              Add or remove W points for {selectedUser?.username}. This action will be logged.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                value={wAmount}
                onChange={(e) => setWAmount(e.target.value)}
                className="col-span-3"
                placeholder="e.g. 500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedUser(null)}>Cancel</Button>
            <Button onClick={handleAddW}>Confirm Transaction</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

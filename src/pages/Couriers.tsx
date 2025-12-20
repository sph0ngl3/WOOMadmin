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
import { Search, MoreHorizontal, Flag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export default function CouriersPage() {
  const [couriers] = useState(mockData.couriers);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCouriers = couriers.filter(courier => 
    courier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFlag = (id: string) => {
    toast.info(`Courier ${id} flagged for review`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Couriers</h2>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search couriers..."
            className="pl-9 w-[250px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Courier Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Success Rate</TableHead>
              <TableHead>Total Deliveries</TableHead>
              <TableHead>W Earned</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCouriers.map((courier) => (
              <TableRow key={courier.id}>
                <TableCell className="font-medium">{courier.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    courier.status === 'Online' ? 'border-primary text-primary' : 
                    courier.status === 'Suspended' ? 'border-destructive text-destructive' : 
                    'text-muted-foreground'
                  }>
                    {courier.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 rounded-full bg-secondary overflow-hidden">
                      <div 
                        className={`h-full ${courier.successRate > 90 ? 'bg-primary' : courier.successRate > 70 ? 'bg-yellow-500' : 'bg-destructive'}`} 
                        style={{ width: `${courier.successRate}%` }}
                      />
                    </div>
                    <span className="text-xs">{courier.successRate}%</span>
                  </div>
                </TableCell>
                <TableCell>{courier.totalDeliveries}</TableCell>
                <TableCell className="text-gold font-medium">{courier.wEarned.toLocaleString()}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleFlag(courier.id)}>
                        <Flag className="mr-2 h-4 w-4" /> Flag Courier
                      </DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

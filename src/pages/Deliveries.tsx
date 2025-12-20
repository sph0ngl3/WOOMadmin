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
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function DeliveriesPage() {
  const [deliveries] = useState(mockData.deliveries);
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredDeliveries = deliveries.filter(d => 
    statusFilter === "all" ? true : d.status.toLowerCase() === statusFilter
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Deliveries</h2>
        <div className="flex gap-2">
           <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Pickup / Dropoff</TableHead>
              <TableHead>W Earned</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDeliveries.slice(0, 20).map((delivery) => (
              <TableRow key={delivery.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-mono text-xs">{delivery.id}</TableCell>
                <TableCell className="text-muted-foreground">{new Date(delivery.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    delivery.status === 'Completed' ? 'bg-primary/10 text-primary border-primary/20' : 
                    delivery.status === 'Failed' ? 'bg-destructive/10 text-destructive border-destructive/20' : 
                    'text-muted-foreground'
                  }>
                    {delivery.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col text-xs max-w-[200px]">
                    <span className="truncate text-muted-foreground">From: {delivery.pickupAddress}</span>
                    <span className="truncate font-medium">To: {delivery.dropoffAddress}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gold font-medium">+{delivery.wEarned}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

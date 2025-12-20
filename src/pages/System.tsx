import { mockData } from "@/lib/data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export default function SystemPage() {
  const { logs } = mockData;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">System Logs</h2>
      
      <div className="rounded-md border bg-card">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Activity Log</h3>
          <p className="text-sm text-muted-foreground">Read-only audit trail of admin actions.</p>
        </div>
        <ScrollArea className="h-[600px]">
          <div className="divide-y">
            {logs.map((log) => (
              <div key={log.id} className="p-4 flex flex-col gap-1 hover:bg-muted/30">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{log.action}</span>
                  <span className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</span>
                </div>
                <p className="text-sm text-muted-foreground">{log.details}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-[10px] h-5">Admin: {log.adminId}</Badge>
                  <span className="text-[10px] font-mono text-muted-foreground">ID: {log.id}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

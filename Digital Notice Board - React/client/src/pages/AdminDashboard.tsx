import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, LogOut } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("campus_notices") || "[]");
    setNotices(saved);
  }, []);

  const deleteNotice = (id: string) => {
    const updated = notices.filter((n: any) => n.id !== id);
    setNotices(updated);
    localStorage.setItem("campus_notices", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 pt-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Notice Management</h1>
          <div className="flex gap-2">
            <Link href="/admin/add-notice"><Button className="gap-2 rounded-full"><Plus size={18}/> New Notice</Button></Link>
            <Button variant="outline" className="rounded-full" onClick={() => { localStorage.clear(); setLocation("/admin"); }}><LogOut size={18}/></Button>
          </div>
        </div>
        <div className="border rounded-xl bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notices.map((n: any) => (
                <TableRow key={n.id}>
                  <TableCell className="font-medium">{n.title}</TableCell>
                  <TableCell>{n.category}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" className="text-destructive" onClick={() => deleteNotice(n.id)}><Trash2 size={18}/></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
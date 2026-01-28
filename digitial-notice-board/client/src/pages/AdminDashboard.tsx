import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, LogOut, Pencil } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("campus_notices");

    if (saved && JSON.parse(saved).length > 0) {
      setNotices(JSON.parse(saved));
    } else {
      // Static Data: 10 sample entries
      const staticNotices = [
        { id: "1", title: "Semester Results Out", category: "Academic", content: "The results for the Fall 2025 semester have been published on the portal." },
        { id: "2", title: "Annual Sports Meet", category: "Events", content: "Register now for the upcoming sports meet scheduled for next week." },
        { id: "3", title: "Library Renovation", category: "Facilities", content: "The central library will be closed for maintenance from Friday to Sunday." },
        { id: "4", title: "Placement Drive", category: "Academic", content: "Top tech companies are visiting the campus on Jan 30th for recruitment." },
        { id: "5", title: "Hostel Fee Deadline", category: "Finance", content: "Please clear your hostel dues by the end of this month to avoid late fees." },
        { id: "6", title: "Hackathon 2026", category: "Events", content: "Join the 24-hour coding challenge. Prizes worth $1000 to be won!" },
        { id: "7", title: "Guest Lecture: AI", category: "Academic", content: "Dr. Smith will be delivering a lecture on the future of AI in the main hall." },
        { id: "8", title: "Canteen Menu Change", category: "Facilities", content: "New healthy breakfast options are now available at the main canteen." },
        { id: "9", title: "Winter Holidays", category: "General", content: "The campus will remain closed from Dec 24th to Jan 2nd for winter break." },
        { id: "10", title: "NSS Blood Donation", category: "Events", content: "NSS unit is organizing a blood donation camp in the medical room." },
      ];

      setNotices(staticNotices);
      localStorage.setItem("campus_notices", JSON.stringify(staticNotices));
    }
  }, []);

  const deleteNotice = (id: string) => {
    const updated = notices.filter((n: any) => n.id !== id);
    setNotices(updated);
    localStorage.setItem("campus_notices", JSON.stringify(updated));
  };

  const handleLogout = () => {
    // Clear only admin specific data if needed, or clear all
    localStorage.removeItem("isAdmin");
    setLocation("/admin");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Notice Management</h1>
            <p className="text-muted-foreground">Create and manage campus-wide announcements</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/add-notice">
              <Button className="gap-2 rounded-full">
                <Plus size={18} /> New Notice
              </Button>
            </Link>
            <Button
              variant="outline"
              className="rounded-full border-destructive text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut size={18} />
            </Button>
          </div>
        </div>

        <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[200px]">Title</TableHead>
                <TableHead className="w-[150px]">Category</TableHead>
                <TableHead>Content</TableHead>
                <TableHead className="text-right w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notices.length > 0 ? (
                notices.map((n: any) => (
                  <TableRow key={n.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-semibold text-primary">{n.title}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
                        {n.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground truncate max-w-md">
                      {n.content}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:bg-primary/10"
                        onClick={() => {/* Navigate to edit page, e.g., setLocation(`/admin/edit-notice/${n.id}`) */ }}
                      >
                        <Pencil size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => deleteNotice(n.id)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                    No notices available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
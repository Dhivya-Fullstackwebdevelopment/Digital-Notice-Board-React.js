import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Trash2, LogOut, Pencil } from "lucide-react";
import Navbar from "@/components/Navbar";

// Define the structure for type safety
interface Complaint {
    id: string;
    fullName: string;
    category: string;
    department: string;
    subject: string;
    description: string;
    status: string;
}

export default function ComplaintDashboard() {
    const [, setLocation] = useLocation();
    const [complaints, setComplaints] = useState<Complaint[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("campus_complaints");

        if (saved) {
            setComplaints(JSON.parse(saved));
        } else {
            // Static Data: 10 sample entries
            const staticData: Complaint[] = Array.from({ length: 10 }).map((_, i) => ({
                id: (i + 1).toString(),
                fullName: `Student Name ${i + 1}`,
                category: ["Anti-Ragging", "Harassment", "Campus Facilities", "Academic Grievance", "Other"][i % 5],
                department: ["Computer Science", "Electronics", "Mechanical", "Civil", "Other"][i % 5],
                subject: `Issue regarding ${["labs", "hostel", "exams", "canteen"][i % 4]}`,
                description: `Detailed description for complaint number ${i + 1}. This is a static test entry.`,
                status: i % 3 === 0 ? "Pending" : i % 3 === 1 ? "In Progress" : "Resolved",
            }));

            setComplaints(staticData);
            localStorage.setItem("campus_complaints", JSON.stringify(staticData));
        }
    }, []);

    const deleteComplaint = (id: string) => {
        const updated = complaints.filter((c) => c.id !== id);
        setComplaints(updated);
        localStorage.setItem("campus_complaints", JSON.stringify(updated));
    };

    const updateStatus = (id: string, status: string) => {
        const updated = complaints.map((c) =>
            c.id === id ? { ...c, status } : c
        );
        setComplaints(updated);
        localStorage.setItem("campus_complaints", JSON.stringify(updated));
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Complaint Management</h1>
                        <p className="text-muted-foreground text-sm">Authorized Personnel Access Only</p>
                    </div>

                    <Button
                        variant="outline"
                        className="rounded-full"
                        onClick={() => {
                            setLocation("/admin");
                        }}
                    >
                        <LogOut size={18} className="mr-2" /> Logout
                    </Button>
                </div>

                <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead>Full Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead className="w-[250px]">Description</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {complaints.map((c) => (
                                <TableRow key={c.id}>
                                    <TableCell className="font-semibold text-primary">
                                        {c.fullName}
                                    </TableCell>
                                    <TableCell>{c.category}</TableCell>
                                    <TableCell>{c.department}</TableCell>
                                    <TableCell className="font-medium">{c.subject}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground italic">
                                        {c.description.substring(0, 50)}...
                                    </TableCell>
                                    <TableCell>
                                        <select
                                            value={c.status}
                                            onChange={(e) => updateStatus(c.id, e.target.value)}
                                            className={`border rounded-md px-2 py-1 text-xs font-bold transition-colors ${c.status === "Resolved"
                                                ? "bg-green-100 text-green-700 border-green-200"
                                                : c.status === "In Progress"
                                                    ? "bg-blue-100 text-blue-700 border-blue-200"
                                                    : "bg-yellow-100 text-yellow-700 border-yellow-200"
                                                }`}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Resolved">Resolved</option>
                                        </select>
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
                                            onClick={() => deleteComplaint(c.id)}
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {complaints.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="text-center text-muted-foreground py-12"
                                    >
                                        No complaints found
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
import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

export default function AddNotice() {
  const [, setLocation] = useLocation();
  const [form, setForm] = useState({ title: "", category: "Academic", content: "" });

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("campus_notices") || "[]");
    const newItem = { ...form, id: Date.now().toString(), date: new Date().toLocaleDateString() };
    localStorage.setItem("campus_notices", JSON.stringify([newItem, ...existing]));
    setLocation("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-background pt-24">
      <Navbar />
      <Card className="max-w-xl mx-auto shadow-xl">
        <CardHeader><CardTitle>Create Announcement</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={save} className="space-y-4">
            <Input placeholder="Notice Title" required onChange={e => setForm({...form, title: e.target.value})} />
            <select className="w-full p-2 border rounded-md bg-background" onChange={e => setForm({...form, category: e.target.value})}>
              <option>Academic</option><option>Event</option><option>Emergency</option>
            </select>
            <Textarea placeholder="Content..." rows={5} required onChange={e => setForm({...form, content: e.target.value})} />
            <Button type="submit" className="w-full rounded-full">Publish Now</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
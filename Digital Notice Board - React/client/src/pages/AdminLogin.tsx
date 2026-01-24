import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, User } from "lucide-react"; // Added User icon
import Navbar from "@/components/Navbar";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState(""); // New state for username
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check both username and password
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("adminUser", username); // Optional: save username
      setLocation("/admin/dashboard");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-primary/20">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold font-heading">Admin Portal</CardTitle>
            <p className="text-sm text-muted-foreground italic">Authorized Personnel Only</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    type="text" 
                    placeholder="Username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="rounded-full pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Input 
                  type="password" 
                  placeholder="Enter Admin Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-full"
                  required
                />
              </div>
              <Button type="submit" className="w-full rounded-full py-6 text-lg shadow-lg shadow-primary/20">
                Secure Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
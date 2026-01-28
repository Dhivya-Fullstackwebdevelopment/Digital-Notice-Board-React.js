import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, User, Lock } from "lucide-react"; // Added Lock icon
import Navbar from "@/components/Navbar";
import Adminlogin from "../images/Adminlogin-BGimg.jpg"; // Your image import

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("adminUser", username);
      setLocation("/admin/dashboard");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${Adminlogin})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="z-10">
        <Navbar />
      </div>

      <div className="flex-1 flex items-center justify-end p-8 md:pr-24 lg:pr-40">
        {/* Right side alignment using justify-end and padding-right */}
        <Card className="w-full max-w-md shadow-2xl border-white/20 bg-white/80 backdrop-blur-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold font-heading">Admin Portal</CardTitle>
            <p className="text-sm text-muted-foreground italic">Authorized Personnel Only</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Username Field */}
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="rounded-full pl-10 bg-white/50"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Enter Admin Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-full pl-10 bg-white/50"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full rounded-full py-6 text-lg shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
                Secure Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
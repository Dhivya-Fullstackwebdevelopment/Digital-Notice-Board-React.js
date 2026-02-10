import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GraduationCap, User, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import clgImage from "../images/clg.jpeg";

// Background Image
const BG_URL = clgImage;

export default function StudentLogin() {
    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useLocation();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate student login logic
        if (studentId.length > 3 && password === "student123") {
            localStorage.setItem("userRole", "student");
            localStorage.setItem("studentId", studentId);
            // navigate("/Home");
            setLocation("/Home");
        } else {
            alert("Invalid Student ID or Password (Try: student123)");
        }
    };

    return (
        <div className="min-h-screen relative flex flex-col overflow-hidden">
            {/* <Navbar /> */}
            <Navbar hideNav={true} />

            {/* Background Layer with Parallax Effect */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                style={{ backgroundImage: `url(${BG_URL})` }}
            >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            </div>

            <div className="flex-1 flex items-center justify-center p-4 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30, rotateX: 15 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ perspective: "1000px" }}
                    className="w-full max-w-md"
                >
                    <Card className="border-white/20 bg-background/60 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-t-white/40 overflow-hidden">
                        {/* Top accent bar */}
                        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-blue-400 to-primary" />

                        <CardHeader className="text-center pb-2">
                            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl rotate-3 hover:rotate-0 transition-transform">
                                <GraduationCap className="w-10 h-10" />
                            </div>
                            <CardTitle className="text-3xl font-bold tracking-tight">Student Portal</CardTitle>
                            <p className="text-muted-foreground text-sm">Access your campus notice board</p>
                        </CardHeader>

                        <CardContent className="pt-6">
                            <form onSubmit={handleLogin} className="space-y-5">
                                <div className="relative group">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                                    <Input
                                        placeholder="Student ID / Roll No"
                                        value={studentId}
                                        onChange={(e) => setStudentId(e.target.value)}
                                        className="pl-10 rounded-xl bg-background/50 border-white/10 focus:bg-background/80 transition-all"
                                        required
                                    />
                                </div>

                                <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 rounded-xl bg-background/50 border-white/10 focus:bg-background/80 transition-all"
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full rounded-xl py-2 text-lg font-bold shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                    {/* Enter Campus */}
                                    Login
                                </Button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-xs text-muted-foreground">
                                    Forgot credentials? Contact your Deparment staff
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
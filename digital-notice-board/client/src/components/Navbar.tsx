import { Link, useLocation } from "wouter";
import { Bell, MessageSquare, LayoutDashboard, Menu, LogOut, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  hideNav?: boolean;
}

export default function Navbar({ hideNav = false }: NavbarProps) {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const notificationCount = 3;
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const navItems = [
    { name: "Home", href: "/Home", icon: LayoutDashboard },
    { name: "Notice Board", href: "/notices", icon: Bell },
    { name: "Complaint Box", href: "/complaint", icon: MessageSquare },
  ];

  // Logout Function
  const handleLogout = () => {
    localStorage.clear(); // Clears student/admin session
    setLocation("/"); // Redirects to login page (adjust path as needed)
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                <GraduationCap className="text-primary-foreground w-6 h-6" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight hidden sm:block">
                Campus<span className="text-primary">Connect</span>
              </span>
            </Link>
          </div>

          {!hideNav && (
            <>
              {/* Desktop Nav Links */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={location === item.href ? "secondary" : "ghost"}
                      className={`flex items-center gap-2 rounded-full px-5 transition-all ${location === item.href ? "bg-primary/10 text-primary" : ""
                        }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-4">
                {isAdmin ? (
                  <>
                    {/* Notice Management Button */}
                    <Link href="/admin/dashboard">
                      <Button
                        variant={location === "/admin/dashboard" ? "secondary" : "ghost"}
                        className={`gap-2 rounded-full transition-all ${location === "/admin/dashboard" ? "bg-primary/10 text-primary" : ""
                          }`}
                      >
                        <Bell size={18} />
                        <span className="hidden md:inline">Notice Management</span>
                      </Button>
                    </Link>

                    {/* Complaint Status Button */}
                    <Link href="/admin/complaints">
                      <Button
                        variant={location === "/admin/complaints" ? "secondary" : "ghost"}
                        className={`gap-2 rounded-full transition-all ${location === "/admin/complaints" ? "bg-primary/10 text-primary" : ""
                          }`}
                      >
                        <MessageSquare size={18} />
                        <span className="hidden md:inline">Complaint Status</span>
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Link href="/admin">
                    <Button variant="outline" className="rounded-full">Admin Login</Button>
                  </Link>
                )}
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-2">
                {/* Notification Bell */}
                <Button variant="ghost" size="icon" className="relative hidden sm:flex">
                  <Bell className="w-6 h-6" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                      {notificationCount}
                    </span>
                  )}
                </Button>

                {/* Logout Button (Desktop) */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="hidden md:flex gap-2 rounded-full border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <LogOut size={16} />
                  Logout
                </Button>



                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <Menu className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {!hideNav && (
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-b border-border overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <div
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 p-3 rounded-xl ${location === item.href ? "bg-primary/10 text-primary" : ""
                        }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </Link>
                ))}

                {/* Logout Button (Mobile) */}
                <Button
                  variant="destructive"
                  className="w-full mt-4 flex gap-2 justify-center rounded-xl"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  Logout
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </nav>
  );
}
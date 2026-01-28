import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import NoticeCard from "@/components/NoticeCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Bell, ArrowRight, Shield, Send } from "lucide-react";

const MOCK_NOTICES = [
  {
    id: "1",
    title: "End Semester Examination Schedule Released",
    category: "Academic",
    date: "Oct 24, 2025",
    content: "The schedule for the upcoming end-semester examinations is now available on the official portal and campus display boards. Please check for any overlaps.",
    isPinned: true,
  },
  {
    id: "2",
    title: "Annual Cultural Fest: 'Utopia' 2025 Registration Open",
    category: "Event",
    date: "Oct 22, 2025",
    content: "Registrations for the annual cultural festival 'Utopia' are now open. Interested students can sign up for various competitions and events.",
  },
  {
    id: "3",
    title: "Emergency Maintenance: Library Closed Today",
    category: "Emergency",
    date: "Oct 21, 2025",
    content: "The central library will be closed for emergency electrical maintenance today from 2:00 PM to 6:00 PM. We apologize for the inconvenience.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* Notices Preview Section */}
      <section className="py-24 bg-secondary/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-heading font-bold mb-4">Latest Announcements</h2>
              <p className="text-muted-foreground text-lg italic">
                Stay updated with the latest happenings, academic alerts, and campus events.
              </p>
            </div>
            <Link href="/notices">
              <Button variant="ghost" className="group">
                View All Notices
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_NOTICES.map((notice) => (
              <NoticeCard key={notice.id} notice={notice as any} />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section with 3D feel */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                <Shield className="w-4 h-4" />
                <span>Secure Feedback System</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold">Your Voice Matters, <br />Your Privacy Guaranteed.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The Digital Complaint Box allows you to report issues ranging from ragging and harassment to facility problems without revealing your identity. Every report is encrypted and handled directly by authorized staff.
              </p>
              <ul className="space-y-4">
                {[
                  "Completely anonymous reporting",
                  "Encrypted data transmission",
                  "Real-time status tracking",
                  "Direct HOD/Staff intervention"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Send className="w-3 h-3 text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/complaint">
                <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">
                  File a Complaint
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-3xl animate-pulse" />
              <div className="relative z-10 w-full h-full bg-card border border-border/50 rounded-3xl shadow-2xl p-8 flex items-center justify-center overflow-hidden group">
                {/* Visual 3D abstract element */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-48 h-48 bg-primary/20 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/20 flex items-center justify-center"
                >
                  <Shield className="w-20 h-20 text-primary drop-shadow-lg" />
                </motion.div>
                <div className="absolute bottom-12 left-12 right-12 p-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">Secure Port</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Active Connection</div>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ x: [-100, 200] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="h-full w-1/3 bg-primary"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Daily Notices", value: "24+" },
              { label: "Secure Reports", value: "150+" },
              { label: "Issues Resolved", value: "98%" },
              { label: "Campus Users", value: "5,000+" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-heading font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/20 py-12 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="font-heading font-bold text-xl mb-4">CampusConnect</div>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8">
            The official digital communication platform for modern educational institutions.
          </p>
          <div className="flex justify-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Usage Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Contact Support</a>
          </div>
          <div className="mt-8 text-xs text-muted-foreground/50">
            © 2026 CampusConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

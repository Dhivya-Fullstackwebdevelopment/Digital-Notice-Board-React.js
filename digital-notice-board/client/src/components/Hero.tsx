import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Bell, ShieldCheck } from "lucide-react";
import heroImage from "@assets/generated_images/modern_abstract_academic_architecture_background.png";

export default function Hero() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background with subtle 3D parallax effect placeholder */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
            <Bell className="w-4 h-4" />
            <span>Digital Notice Board & Secure Feedback</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-6 leading-tight">
            The Digital Heart of <br />
            <span className="text-primary italic">Campus Communication</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-10 leading-relaxed">
            Replace physical notice boards with a smart digital dashboard. Empower students with a secure, anonymous way to report issues and improve campus life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/notices">
              <Button size="lg" className="rounded-full px-8 py-6 text-lg shadow-xl shadow-primary/25 group">
                View Notice Board
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/complaint">
              <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg border-2">
                Submit a Complaint
              </Button>
            </Link>
          </div>

          <div className="mt-16 flex items-center justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm font-medium">100% Anonymous</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full" />
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              <span className="text-sm font-medium">Real-time Alerts</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative 3D-ish Elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
    </div>
  );
}

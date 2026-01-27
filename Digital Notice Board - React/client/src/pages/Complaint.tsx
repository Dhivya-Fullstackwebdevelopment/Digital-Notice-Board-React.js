import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ShieldAlert, Send, CheckCircle2, User, Lock, FileText, EyeOff, Scale } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().optional(),
  category: z.string().min(1, "Please select a category"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  description: z.string().min(20, "Please provide more details (at least 20 characters)"),
  department: z.string().min(1, "Please select your department"),
});

export default function Complaint() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      subject: "",
      description: "",
      department: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitted(true);
    toast({
      title: "Complaint Filed Securely",
      description: "Your report has been submitted. Your reference ID: CC-9821",
    });
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 relative overflow-hidden">
      <Navbar />

      {/* --- BACKGROUND DECORATION START --- */}
      {/* Subtle floating icons related to security and reporting */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.03]">
        <ShieldAlert className="absolute top-20 left-[10%] w-64 h-64 -rotate-12" />
        <Lock className="absolute top-[40%] right-[5%] w-48 h-48 rotate-12" />
        <FileText className="absolute bottom-[10%] left-[5%] w-56 h-56 rotate-45" />
        <EyeOff className="absolute top-[15%] right-[15%] w-40 h-40 -rotate-12" />
        <Scale className="absolute bottom-[20%] right-[10%] w-72 h-72 rotate-6" />
        <ShieldAlert className="absolute bottom-[-5%] left-[40%] w-40 h-40" />
      </div>
      {/* --- BACKGROUND DECORATION END --- */}
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium border border-destructive/20 mb-4"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Anonymous & Secure</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-slate-900">Secure Complaint Box</h1>
          <p className="text-muted-foreground text-lg italic max-w-2xl mx-auto">
            Report ragging, harassment, or facility issues without fear. Your identity remains protected.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="border-border/50 shadow-2xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>File a New Report</CardTitle>
                  <CardDescription>
                    Provide as much detail as possible to help us address the issue effectively.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input 
                                  placeholder="Leave blank to remain anonymous" 
                                  className="pl-10"
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormDescription>
                              Only authorized personnel will see this if provided.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Issue Category</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="ragging">Anti-Ragging</SelectItem>
                                  <SelectItem value="harassment">Harassment</SelectItem>
                                  <SelectItem value="facilities">Campus Facilities</SelectItem>
                                  <SelectItem value="academic">Academic Grievance</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="department"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your Department</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select department" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="cse">Computer Science</SelectItem>
                                  <SelectItem value="ece">Electronics</SelectItem>
                                  <SelectItem value="mech">Mechanical</SelectItem>
                                  <SelectItem value="civil">Civil</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="Brief summary of the issue" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Detailed Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe the incident, location, and people involved"
                                className="min-h-[150px] resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full rounded-full shadow-lg shadow-primary/20 gap-2 transition-transform hover:scale-[1.01]"
                      >
                        Submit Report
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-card rounded-3xl border border-border/50 shadow-xl"
            >
              <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-heading font-bold mb-4">Report Submitted</h2>
              <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                Your report has been successfully filed. 
                Reference ID: <span className="font-mono font-bold text-primary">CC-9821</span>
              </p>
              <Button 
                variant="outline" 
                onClick={() => setIsSubmitted(false)}
                className="rounded-full px-8"
              >
                File Another Report
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
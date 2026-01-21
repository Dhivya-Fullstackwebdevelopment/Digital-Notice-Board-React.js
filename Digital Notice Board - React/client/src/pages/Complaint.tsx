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
import { ShieldAlert, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
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
      category: "",
      subject: "",
      description: "",
      department: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsSubmitted(true);
    toast({
      title: "Complaint Filed Securely",
      description: "Your report has been submitted anonymously. Your reference ID: CC-9821",
    });
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium border border-destructive/20 mb-4"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Anonymous & Secure</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Secure Complaint Box</h1>
          <p className="text-muted-foreground text-lg italic max-w-2xl mx-auto">
            Report ragging, harassment, or facility issues without fear. Your identity remains 100% hidden.
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
              <Card className="border-border/50 shadow-2xl">
                <CardHeader>
                  <CardTitle>File a New Report</CardTitle>
                  <CardDescription>
                    Provide as much detail as possible to help us address the issue effectively.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Issue Category</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-category">
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
                                  <SelectTrigger data-testid="select-department">
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
                              <Input 
                                placeholder="Brief summary of the issue" 
                                {...field} 
                                data-testid="input-subject"
                              />
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
                                placeholder="Describe the incident, location, and people involved (if any)"
                                className="min-h-[150px] resize-none"
                                {...field}
                                data-testid="textarea-description"
                              />
                            </FormControl>
                            <FormDescription>
                              Your description will be shared with the relevant authorities anonymously.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full rounded-full shadow-lg shadow-primary/20 gap-2"
                        data-testid="button-submit-complaint"
                      >
                        Submit Anonymously
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
                Thank you for speaking up. Your report has been successfully filed. 
                Keep your reference ID for tracking: <span className="font-mono font-bold text-primary">CC-9821</span>
              </p>
              <Button 
                variant="outline" 
                onClick={() => setIsSubmitted(false)}
                className="rounded-full"
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

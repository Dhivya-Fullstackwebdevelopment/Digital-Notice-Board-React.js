import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Bell, Calendar, Pin } from "lucide-react";

interface Notice {
  id: string;
  title: string;
  category: "Academic" | "Event" | "Holiday" | "Emergency";
  date: string;
  content: string;
  isPinned?: boolean;
}

export default function NoticeCard({ notice }: { notice: Notice }) {
  const categoryColors = {
    Academic: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Event: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    Holiday: "bg-green-500/10 text-green-500 border-green-500/20",
    Emergency: "bg-red-500/10 text-red-500 border-red-500/20 animate-pulse",
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="relative overflow-hidden border-border/50 hover:border-primary/50 transition-colors shadow-sm hover:shadow-xl group">
        {notice.isPinned && (
          <div className="absolute top-0 right-0 p-3 text-primary">
            <Pin className="w-4 h-4 rotate-45" />
          </div>
        )}
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className={`${categoryColors[notice.category]} font-medium`}>
              {notice.category}
            </Badge>
            <div className="flex items-center text-[10px] text-muted-foreground gap-1">
              <Calendar className="w-3 h-3" />
              {notice.date}
            </div>
          </div>
          <h3 className="font-heading font-bold text-xl line-clamp-2 group-hover:text-primary transition-colors">
            {notice.title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
            {notice.content}
          </p>
        </CardContent>
        <CardFooter className="pt-0 flex justify-end">
          <button className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline">
            Read More
            <Bell className="w-3 h-3" />
          </button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// import Navbar from "@/components/Navbar";
// import NoticeCard from "@/components/NoticeCard";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Bell, Search, Filter } from "lucide-react";
// import { useState } from "react";
// import { motion } from "framer-motion";

// const ALL_NOTICES = [
//   {
//     id: "1",
//     title: "End Semester Examination Schedule Released",
//     category: "Academic",
//     date: "Oct 24, 2025",
//     content: "The schedule for the upcoming end-semester examinations is now available on the official portal and campus display boards. Please check for any overlaps and report issues to the registrar's office.",
//     isPinned: true,
//   },
//   {
//     id: "2",
//     title: "Annual Cultural Fest: 'Utopia' 2025 Registration Open",
//     category: "Event",
//     date: "Oct 22, 2025",
//     content: "Registrations for the annual cultural festival 'Utopia' are now open. Interested students can sign up for various competitions and events at the student council office.",
//   },
//   {
//     id: "3",
//     title: "Emergency Maintenance: Library Closed Today",
//     category: "Emergency",
//     date: "Oct 21, 2025",
//     content: "The central library will be closed for emergency electrical maintenance today from 2:00 PM to 6:00 PM. We apologize for the inconvenience and recommend using department libraries.",
//   },
//   {
//     id: "4",
//     title: "Diwali Holidays Announcement",
//     category: "Holiday",
//     date: "Oct 15, 2025",
//     content: "The college will remain closed from October 30 to November 3 for Diwali celebrations. Normal classes will resume on November 4, 2025.",
//   },
//   {
//     id: "5",
//     title: "Guest Lecture on AI & Ethics by Dr. Sarah Chen",
//     category: "Academic",
//     date: "Oct 12, 2025",
//     content: "Join us for an enlightening guest lecture on the ethics of Artificial Intelligence by renowned researcher Dr. Sarah Chen in the Main Auditorium at 10:00 AM.",
//   },
//   {
//     id: "6",
//     title: "Sports Meet 2025: Team Trials",
//     category: "Event",
//     date: "Oct 10, 2025",
//     content: "Trials for the inter-college sports meet will be held next week. All athletes are requested to report to the sports complex at 4:00 PM on Monday.",
//   },
// ];

// export default function Notices() {
//   const [activeTab, setActiveTab] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredNotices = ALL_NOTICES.filter(notice => {
//     const matchesTab = activeTab === "all" || notice.category.toLowerCase() === activeTab.toLowerCase();
//     const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                           notice.content.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesTab && matchesSearch;
//   });

//   return (
//     <div className="min-h-screen bg-background pt-24 pb-12">
//       <Navbar />
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
//           <div>
//             <h1 className="text-4xl font-heading font-bold mb-2">Digital Notice Board</h1>
//             <p className="text-muted-foreground italic">Official announcements and campus news in real-time.</p>
//           </div>
          
//           <div className="flex w-full md:w-auto items-center gap-4">
//             <div className="relative flex-1 md:w-64">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//               <Input 
//                 placeholder="Search notices..." 
//                 className="pl-10 rounded-full"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 data-testid="input-search-notices"
//               />
//             </div>
//             <button className="p-2 rounded-full border border-border hover:bg-muted transition-colors">
//               <Filter className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
//           <TabsList className="bg-transparent border-b border-border w-full justify-start rounded-none h-auto p-0 gap-8">
//             {["all", "academic", "event", "holiday", "emergency"].map((tab) => (
//               <TabsTrigger 
//                 key={tab} 
//                 value={tab}
//                 className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 pb-4 pt-2 capitalize font-semibold"
//                 data-testid={`tab-notice-${tab}`}
//               >
//                 {tab}
//               </TabsTrigger>
//             ))}
//           </TabsList>
//         </Tabs>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredNotices.length > 0 ? (
//             filteredNotices.map((notice, index) => (
//               <motion.div
//                 key={notice.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//               >
//                 <NoticeCard notice={notice as any} />
//               </motion.div>
//             ))
//           ) : (
//             <div className="col-span-full py-20 text-center text-muted-foreground italic">
//               No notices found matching your criteria.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import NoticeCard from "@/components/NoticeCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

// Your original static data
const ALL_NOTICES = [
  { id: "1", title: "End Semester Examination Schedule", category: "Academic", date: "Oct 24, 2025", content: "Schedule is out now." },
  { id: "2", title: "Annual Cultural Fest", category: "Event", date: "Oct 22, 2025", content: "Registrations open." },
];

export default function Notices() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayNotices, setDisplayNotices] = useState(ALL_NOTICES);

  useEffect(() => {
    const adminNotices = JSON.parse(localStorage.getItem("campus_notices") || "[]");
    setDisplayNotices([...adminNotices, ...ALL_NOTICES]);
  }, []);

  const filteredNotices = displayNotices.filter(notice => {
    const matchesTab = activeTab === "all" || notice.category.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <h1 className="text-4xl font-bold">Digital Notice Board</h1>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input className="pl-10 rounded-full" placeholder="Search..." onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-auto p-0 gap-8">
            {["all", "academic", "event", "emergency"].map((tab) => (
              <TabsTrigger key={tab} value={tab} className="capitalize font-semibold border-b-2 border-transparent data-[state=active]:border-primary">{tab}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNotices.map((notice, index) => (
            <motion.div key={notice.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <NoticeCard notice={notice as any} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

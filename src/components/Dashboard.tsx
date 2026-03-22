import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search } from "lucide-react";
import { Law, Category } from "../types";
import { LawCard } from "./LawCard";
import { CATEGORIES } from "../constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DashboardProps {
  laws: Law[];
  onLawClick: (law: Law) => void;
}

export function Dashboard({ laws, onLawClick }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All");

  const filteredLaws = laws.filter(law => {
    const matchesSearch = law.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         law.summary.oneLiner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || law.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section - Editorial Recipe */}
      <section className="mb-24 text-center mt-12">
        <motion.h2 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-[12vw] md:text-[8vw] font-bold tracking-tighter mb-4 italic font-serif leading-[0.85] uppercase"
        >
          Legislative <br />
          <span className="text-[#1A1A1A]/20">Intelligence.</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-[#1A1A1A]/60 max-w-3xl mx-auto leading-relaxed font-light"
        >
          Demystifying complex Indian legislation through high-density token compression and citizen-friendly AI analysis.
        </motion.p>
      </section>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-6 mb-16 sticky top-24 z-40 bg-[#FDFCFB]/80 backdrop-blur-sm py-4">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/30" size={24} />
          <input 
            type="text" 
            placeholder="Search laws, keywords, or provisions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-5 bg-white border border-[#1A1A1A]/10 rounded-3xl focus:outline-none focus:ring-4 focus:ring-[#1A1A1A]/5 transition-all text-xl shadow-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as any)}
              className={cn(
                "px-8 py-5 rounded-3xl text-sm font-bold whitespace-nowrap transition-all border uppercase tracking-widest",
                selectedCategory === cat 
                  ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-lg shadow-[#1A1A1A]/20" 
                  : "bg-white text-[#1A1A1A]/60 border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Law Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {filteredLaws.map((law) => (
            <LawCard 
              key={law.id} 
              law={law} 
              onClick={() => onLawClick(law)} 
            />
          ))}
        </AnimatePresence>
        {filteredLaws.length === 0 && (
          <div className="col-span-full py-24 text-center">
            <p className="text-2xl text-[#1A1A1A]/30 font-serif italic">No legislation matches your search criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
}

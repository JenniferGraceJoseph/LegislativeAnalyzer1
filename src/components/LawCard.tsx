import React from "react";
import { motion } from "motion/react";
import { ArrowRight, FileText, Calendar } from "lucide-react";
import { Law } from "../types";

interface LawCardProps {
  law: Law;
  onClick: () => void;
}

export function LawCard({ law, onClick }: LawCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={onClick}
      className="group bg-white border border-[#1A1A1A]/10 rounded-3xl p-8 cursor-pointer hover:shadow-2xl hover:shadow-[#1A1A1A]/5 transition-all relative overflow-hidden flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <span className="px-3 py-1 bg-[#1A1A1A]/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/60">
          {law.category}
        </span>
        <span className="text-xs text-[#1A1A1A]/40 font-mono flex items-center gap-1">
          <Calendar size={12} />
          {law.date}
        </span>
      </div>
      <h3 className="text-2xl font-bold leading-tight mb-4 group-hover:text-[#1A1A1A] transition-colors">
        {law.title}
      </h3>
      <p className="text-[#1A1A1A]/60 line-clamp-3 mb-8 text-sm leading-relaxed flex-grow">
        {law.summary.oneLiner}
      </p>
      <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-4 transition-all mt-auto">
        Analyze Details <ArrowRight size={16} />
      </div>
      
      {/* Decorative background element */}
      <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
        <FileText size={120} strokeWidth={1} />
      </div>
    </motion.div>
  );
}

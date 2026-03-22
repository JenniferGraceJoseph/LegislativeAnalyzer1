import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Calendar, Zap, FileText, MessageSquare, Users, Info } from "lucide-react";
import Markdown from "react-markdown";
import { Law } from "../types";
import { queryLaw } from "../services/ai";

interface LawDetailModalProps {
  law: Law;
  onClose: () => void;
}

export function LawDetailModal({ law, onClose }: LawDetailModalProps) {
  const [chatQuery, setChatQuery] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [isChatting, setIsChatting] = useState(false);

  const handleChat = async () => {
    if (!chatQuery) return;
    setIsChatting(true);
    try {
      const response = await queryLaw(chatQuery, law.compressedChunks);
      setChatResponse(response);
    } catch (error) {
      console.error("Chat failed:", error);
      setChatResponse("Sorry, I couldn't answer that right now.");
    } finally {
      setIsChatting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        className="relative w-full max-w-5xl max-h-[90vh] bg-[#FDFCFB] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Modal Header */}
        <div className="p-8 border-b border-[#1A1A1A]/5 flex items-start justify-between bg-white">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-[#1A1A1A] text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
                {law.category}
              </span>
              <span className="text-xs text-[#1A1A1A]/40 font-mono flex items-center gap-1">
                <Calendar size={12} /> {law.date}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{law.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-full border border-[#1A1A1A]/10 flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white transition-all"
          >
            <Plus size={24} className="rotate-45" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Summaries */}
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/40 mb-6 flex items-center gap-2">
                  <Zap size={14} className="text-amber-500" /> Executive Summary
                </h4>
                <div className="bg-[#1A1A1A] text-white p-8 rounded-3xl mb-8">
                  <p className="text-2xl font-medium leading-relaxed italic font-serif">
                    "{law.summary.oneLiner}"
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {law.summary.shortPoints.map((point, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-white border border-[#1A1A1A]/5 rounded-2xl">
                      <div className="w-6 h-6 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/40 mb-6 flex items-center gap-2">
                  <FileText size={14} /> Detailed Analysis
                </h4>
                <div className="prose prose-sm max-w-none text-[#1A1A1A]/80 leading-relaxed">
                  <Markdown>{law.summary.detailed}</Markdown>
                </div>
              </section>

              <section>
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/40 mb-6 flex items-center gap-2">
                  <MessageSquare size={14} /> Frequently Asked Questions
                </h4>
                <div className="space-y-4">
                  {law.summary.faqs.map((faq, i) => (
                    <div key={i} className="bg-white border border-[#1A1A1A]/5 rounded-2xl overflow-hidden">
                      <div className="p-5 font-bold text-sm flex items-center justify-between">
                        {faq.q}
                      </div>
                      <div className="px-5 pb-5 text-sm text-[#1A1A1A]/60 leading-relaxed">
                        {faq.a}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Impact & Chat */}
            <div className="space-y-8">
              <div className="bg-[#F3F4F6] p-8 rounded-[2rem] border border-[#1A1A1A]/5">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/40 mb-6 flex items-center gap-2">
                  <Users size={14} /> Citizen Impact
                </h4>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#1A1A1A]/30 mb-1">Who is affected?</p>
                    <p className="text-sm font-medium">{law.summary.impact.who}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#1A1A1A]/30 mb-1">What changes?</p>
                    <p className="text-sm font-medium">{law.summary.impact.whatChanges}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#1A1A1A]/30 mb-1">When does it apply?</p>
                    <p className="text-sm font-medium">{law.summary.impact.whenApplies}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2rem] border border-[#1A1A1A]/5 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/40 mb-6 flex items-center gap-2">
                  <Info size={14} /> Ask the Analyzer
                </h4>
                <div className="space-y-4">
                  <textarea 
                    placeholder="Ask a specific question about this law..."
                    value={chatQuery}
                    onChange={(e) => setChatQuery(e.target.value)}
                    className="w-full p-4 bg-[#FDFCFB] border border-[#1A1A1A]/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/5 h-24 resize-none"
                  />
                  <button 
                    onClick={handleChat}
                    disabled={isChatting || !chatQuery}
                    className="w-full py-3 bg-[#1A1A1A] text-white rounded-xl text-sm font-bold hover:bg-[#333] transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isChatting ? "Analyzing..." : "Query Law"}
                  </button>
                  <AnimatePresence>
                    {chatResponse && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-[#FDFCFB] border border-[#1A1A1A]/5 rounded-2xl text-xs text-[#1A1A1A]/70 leading-relaxed"
                      >
                        <p className="font-bold text-[#1A1A1A] mb-2">AI Response:</p>
                        {chatResponse}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

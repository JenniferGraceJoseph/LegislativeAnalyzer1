import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, Plus } from "lucide-react";
import { IngestionStep } from "../types";

interface IngestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onIngest: (text: string) => Promise<void>;
  step: IngestionStep;
}

export function IngestionModal({ isOpen, onClose, onIngest, step }: IngestionModalProps) {
  const [text, setText] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => step === "idle" && onClose()}
        className="absolute inset-0 bg-[#1A1A1A]/60 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-2xl bg-white rounded-[3rem] p-12 shadow-2xl"
      >
        {step === "idle" ? (
          <>
            <h2 className="text-4xl font-bold tracking-tight mb-2">Ingest New Legislation</h2>
            <p className="text-[#1A1A1A]/50 mb-8">Paste the legal text below. Our AI will automatically extract metadata, compress, and summarize it for citizens.</p>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/40 mb-2 block">Legal Text (Full Document)</label>
                <textarea 
                  placeholder="Paste the 100k+ token document here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full p-6 bg-[#FDFCFB] border border-[#1A1A1A]/10 rounded-3xl h-80 focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/5 resize-none"
                />
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={onClose}
                  className="flex-1 py-4 border border-[#1A1A1A]/10 rounded-2xl font-bold hover:bg-[#1A1A1A]/5 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => onIngest(text)}
                  disabled={!text}
                  className="flex-[2] py-4 bg-[#1A1A1A] text-white rounded-2xl font-bold hover:bg-[#333] transition-all disabled:opacity-50 active:scale-95"
                >
                  Start Compression Pipeline
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="relative w-24 h-24 mx-auto mb-8">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-[#1A1A1A]/5 border-t-[#1A1A1A] rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap size={32} className="text-[#1A1A1A]" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4 capitalize">{step}...</h2>
            <p className="text-[#1A1A1A]/60 max-w-sm mx-auto">
              {step === "extracting" && "Identifying title, category, and enactment date from the document."}
              {step === "chunking" && "Dividing document into semantic chunks for parallel processing."}
              {step === "compressing" && "Extracting key provisions and removing legal boilerplate."}
              {step === "summarizing" && "Generating multi-level citizen-friendly summaries."}
              {step === "done" && "Legislation successfully analyzed and added to dashboard."}
            </p>
            
            {/* Progress Bar */}
            <div className="mt-12 w-full bg-[#1A1A1A]/5 h-2 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ 
                  width: step === "extracting" ? "15%" :
                         step === "chunking" ? "35%" : 
                         step === "compressing" ? "65%" : 
                         step === "summarizing" ? "90%" : "100%" 
                }}
                className="h-full bg-[#1A1A1A]"
              />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

import React from "react";
import { ShieldCheck, Plus } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  onIngestClick: () => void;
}

export function Layout({ children, onIngestClick }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans selection:bg-[#E6E6E6]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#1A1A1A]/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1A1A1A] rounded-xl flex items-center justify-center text-white">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">AI Legislative Analyzer</h1>
              <p className="text-xs text-[#1A1A1A]/50 uppercase tracking-widest font-medium">Citizen's Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={onIngestClick}
              className="flex items-center gap-2 bg-[#1A1A1A] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#333] transition-all active:scale-95 shadow-lg shadow-[#1A1A1A]/10"
            >
              <Plus size={18} />
              Ingest New Law
            </button>
          </div>
        </div>
      </header>

      {children}

      {/* Footer */}
      <footer className="border-t border-[#1A1A1A]/5 py-12 px-6 mt-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1A1A1A] rounded-lg flex items-center justify-center text-white">
              <ShieldCheck size={18} />
            </div>
            <span className="font-bold tracking-tight">AI Legislative Analyzer</span>
          </div>
          <div className="flex gap-8 text-sm text-[#1A1A1A]/40 font-medium">
            <a href="#" className="hover:text-[#1A1A1A] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#1A1A1A] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#1A1A1A] transition-colors">Government Sources</a>
            <a href="#" className="hover:text-[#1A1A1A] transition-colors">API Documentation</a>
          </div>
          <div className="text-xs text-[#1A1A1A]/30 font-mono">
            v1.1.0-stable • Built for Indian Citizens
          </div>
        </div>
      </footer>
    </div>
  );
}

import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import { useLaws } from "./hooks/useLaws";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { LawDetailModal } from "./components/LawDetailModal";
import { IngestionModal } from "./components/IngestionModal";
import { Law } from "./types";

export default function App() {
  const { laws, ingestLaw, isIngesting, ingestionStep, setIsIngesting } = useLaws();
  const [selectedLaw, setSelectedLaw] = useState<Law | null>(null);

  return (
    <Layout onIngestClick={() => setIsIngesting(true)}>
      <Dashboard laws={laws} onLawClick={setSelectedLaw} />

      {/* Law Detail Modal */}
      <AnimatePresence>
        {selectedLaw && (
          <LawDetailModal 
            law={selectedLaw} 
            onClose={() => setSelectedLaw(null)} 
          />
        )}
      </AnimatePresence>

      {/* Ingestion Modal */}
      <AnimatePresence>
        {isIngesting && (
          <IngestionModal 
            isOpen={isIngesting}
            onClose={() => setIsIngesting(false)}
            onIngest={async (text) => { await ingestLaw(text); }}
            step={ingestionStep}
          />
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(26, 26, 26, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(26, 26, 26, 0.2); }
      `}</style>
    </Layout>
  );
}

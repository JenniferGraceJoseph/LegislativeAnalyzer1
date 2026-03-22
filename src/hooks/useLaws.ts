import { useState, useEffect } from "react";
import { Law, IngestionStep } from "../types";
import { INITIAL_LAWS } from "../constants";
import { extractMetadata, compressChunk, generateFinalSummary } from "../services/ai";

const STORAGE_KEY = "legislative_analyzer_laws";

export function useLaws() {
  const [laws, setLaws] = useState<Law[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_LAWS;
  });
  const [ingestionStep, setIngestionStep] = useState<IngestionStep>("idle");
  const [isIngesting, setIsIngesting] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(laws));
  }, [laws]);

  const ingestLaw = async (text: string) => {
    if (!text) return;
    
    setIsIngesting(true);
    setIngestionStep("extracting");
    
    try {
      const metadata = await extractMetadata(text);
      
      setIngestionStep("chunking");
      // Semantic chunking: In a production app, we'd use a more sophisticated tokenizer
      // Here we split by paragraphs or fixed length for simplicity
      const chunks = text.split(/\n\n+/).filter(c => c.trim().length > 0);
      // Group small chunks together to optimize API calls
      const groupedChunks: string[] = [];
      let currentChunk = "";
      for (const chunk of chunks) {
        if ((currentChunk + chunk).length < 8000) {
          currentChunk += "\n\n" + chunk;
        } else {
          groupedChunks.push(currentChunk);
          currentChunk = chunk;
        }
      }
      if (currentChunk) groupedChunks.push(currentChunk);

      setIngestionStep("compressing");
      const compressedChunks = await Promise.all(groupedChunks.map(c => compressChunk(c)));
      
      setIngestionStep("summarizing");
      const finalSummary = await generateFinalSummary(compressedChunks);
      
      const newLaw: Law = {
        id: Date.now().toString(),
        title: metadata.title,
        category: metadata.category,
        date: metadata.date,
        compressedChunks,
        summary: finalSummary
      };
      
      setLaws(prev => [newLaw, ...prev]);
      setIngestionStep("done");
      
      setTimeout(() => {
        setIsIngesting(false);
        setIngestionStep("idle");
      }, 2000);
      
      return newLaw;
    } catch (error) {
      console.error("Ingestion failed:", error);
      setIngestionStep("idle");
      setIsIngesting(false);
      throw error;
    }
  };

  const deleteLaw = (id: string) => {
    setLaws(prev => prev.filter(l => l.id !== id));
  };

  return {
    laws,
    ingestLaw,
    deleteLaw,
    isIngesting,
    ingestionStep,
    setIsIngesting
  };
}

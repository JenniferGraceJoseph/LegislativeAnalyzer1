export interface CompressedChunk {
  provisions: string[];
  definitions: Record<string, string>;
  obligations: string[];
  penalties: string[];
  stakeholders: string[];
}

export interface LawSummary {
  oneLiner: string;
  shortPoints: string[];
  detailed: string;
  impact: {
    who: string;
    whatChanges: string;
    whenApplies: string;
  };
  faqs: { q: string; a: string }[];
}

export interface Law {
  id: string;
  title: string;
  category: Category;
  date: string;
  compressedChunks: CompressedChunk[];
  summary: LawSummary;
}

export type Category = "Tax" | "Education" | "Digital Law" | "Environment" | "Labor" | "Other";

export type IngestionStep = "idle" | "extracting" | "chunking" | "compressing" | "summarizing" | "done";

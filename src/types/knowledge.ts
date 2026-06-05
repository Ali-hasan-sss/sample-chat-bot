export interface KnowledgeEntry {
  id: string;
  category: string;
  title: string;
  content: string;
  keywords: string[];
}

export interface KnowledgeChunk {
  id: string;
  entryId: string;
  category: string;
  title: string;
  content: string;
  keywords: string[];
}

export interface RetrievedChunk extends KnowledgeChunk {
  score: number;
}

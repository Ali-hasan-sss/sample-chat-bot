import { chunkKnowledgeBase } from "./chunking";
import { buildVocabulary, cosineSimilarity, textToVector } from "./embeddings";
import type { KnowledgeChunk, RetrievedChunk } from "@/types/knowledge";

const TOP_K = 4;
const MIN_SCORE = 0.05;
const MAX_CONTEXT_CHARS = 3000;

let cachedChunks: KnowledgeChunk[] | null = null;
let cachedVocabulary: string[] | null = null;
let cachedVectors: Map<string, number[]> | null = null;

function getIndexedChunks(): {
  chunks: KnowledgeChunk[];
  vocabulary: string[];
  vectors: Map<string, number[]>;
} {
  if (!cachedChunks || !cachedVocabulary || !cachedVectors) {
    cachedChunks = chunkKnowledgeBase();
    const allTexts = cachedChunks.map(
      (c) => `${c.title} ${c.category} ${c.content} ${c.keywords.join(" ")}`
    );
    cachedVocabulary = buildVocabulary(allTexts);
    cachedVectors = new Map();

    for (const chunk of cachedChunks) {
      const text = `${chunk.title} ${chunk.category} ${chunk.content} ${chunk.keywords.join(" ")}`;
      cachedVectors.set(chunk.id, textToVector(text, cachedVocabulary));
    }
  }

  return {
    chunks: cachedChunks,
    vocabulary: cachedVocabulary,
    vectors: cachedVectors,
  };
}

export function retrieveRelevantChunks(query: string): RetrievedChunk[] {
  const { chunks, vocabulary, vectors } = getIndexedChunks();
  const queryVector = textToVector(query, vocabulary);

  const scored = chunks
    .map((chunk) => ({
      ...chunk,
      score: cosineSimilarity(queryVector, vectors.get(chunk.id) ?? []),
    }))
    .filter((chunk) => chunk.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_K);

  return scored;
}

export function buildContextFromChunks(chunks: RetrievedChunk[]): string {
  let context = "";
  for (const chunk of chunks) {
    const section = `[${chunk.category}] ${chunk.title}:\n${chunk.content}\n\n`;
    if (context.length + section.length > MAX_CONTEXT_CHARS) break;
    context += section;
  }
  return context.trim();
}

export function hasRelevantContext(chunks: RetrievedChunk[]): boolean {
  return chunks.length > 0 && chunks[0].score >= MIN_SCORE;
}

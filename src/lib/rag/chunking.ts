import type { KnowledgeChunk, KnowledgeEntry } from "@/types/knowledge";
import knowledgeBase from "@/data/knowledge-base.json";

const MAX_CHUNK_LENGTH = 500;
const CHUNK_OVERLAP = 50;

function splitIntoSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function chunkEntry(entry: KnowledgeEntry): KnowledgeChunk[] {
  const sentences = splitIntoSentences(entry.content);
  const chunks: KnowledgeChunk[] = [];
  let currentText = "";
  let chunkIndex = 0;

  for (const sentence of sentences) {
    if (currentText.length + sentence.length > MAX_CHUNK_LENGTH && currentText.length > 0) {
      chunks.push({
        id: `${entry.id}-chunk-${chunkIndex}`,
        entryId: entry.id,
        category: entry.category,
        title: entry.title,
        content: currentText.trim(),
        keywords: entry.keywords,
      });
      chunkIndex++;

      const words = currentText.split(/\s+/);
      const overlapWords = words.slice(-Math.ceil(CHUNK_OVERLAP / 5));
      currentText = overlapWords.join(" ") + " " + sentence;
    } else {
      currentText += (currentText ? " " : "") + sentence;
    }
  }

  if (currentText.trim()) {
    chunks.push({
      id: `${entry.id}-chunk-${chunkIndex}`,
      entryId: entry.id,
      category: entry.category,
      title: entry.title,
      content: currentText.trim(),
      keywords: entry.keywords,
    });
  }

  return chunks.length > 0
    ? chunks
    : [
        {
          id: `${entry.id}-chunk-0`,
          entryId: entry.id,
          category: entry.category,
          title: entry.title,
          content: entry.content,
          keywords: entry.keywords,
        },
      ];
}

export function chunkKnowledgeBase(): KnowledgeChunk[] {
  const entries = knowledgeBase.entries as KnowledgeEntry[];
  return entries.flatMap(chunkEntry);
}

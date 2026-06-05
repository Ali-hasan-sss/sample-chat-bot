const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "shall", "can", "to", "of", "in", "for",
  "on", "with", "at", "by", "from", "as", "into", "through", "during",
  "before", "after", "above", "below", "between", "out", "off", "over",
  "under", "again", "further", "then", "once", "here", "there", "when",
  "where", "why", "how", "all", "each", "every", "both", "few", "more",
  "most", "other", "some", "such", "no", "nor", "not", "only", "own",
  "same", "so", "than", "too", "very", "just", "and", "but", "or", "if",
  "while", "about", "up", "it", "its", "this", "that", "these", "those",
  "i", "me", "my", "we", "our", "you", "your", "he", "she", "they", "them",
  "what", "which", "who", "whom",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word));
}

export function buildTermFrequencyVector(
  text: string,
  vocabulary: string[]
): number[] {
  const tokens = tokenize(text);
  const termFreq = new Map<string, number>();

  for (const token of tokens) {
    termFreq.set(token, (termFreq.get(token) ?? 0) + 1);
  }

  const maxFreq = Math.max(...termFreq.values(), 1);

  return vocabulary.map((term) => (termFreq.get(term) ?? 0) / maxFreq);
}

export function buildVocabulary(texts: string[]): string[] {
  const terms = new Set<string>();
  for (const text of texts) {
    for (const token of tokenize(text)) {
      terms.add(token);
    }
  }
  return Array.from(terms).sort();
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  return denominator === 0 ? 0 : dotProduct / denominator;
}

export function textToVector(text: string, vocabulary: string[]): number[] {
  return buildTermFrequencyVector(text, vocabulary);
}

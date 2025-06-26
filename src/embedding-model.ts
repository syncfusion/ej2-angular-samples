import { pipeline, env } from "@xenova/transformers";

// env.allowLocalModels = false;

// env.localModelPath = './assets/';
env.localModelPath = './embedding-model/';

// Disable the loading of remote models from the Hugging Face Hub:
env.allowRemoteModels = false;

let pipe: any = null;

export async function initializePipeline() {
  pipe = await pipeline("feature-extraction", "Supabase/gte-small");
  return pipe;
}

export async function embeddingModel(description: string) {
  if (!pipe) {
    pipe = await initializePipeline();
  }
  // Generate the embedding from text
  const output = await pipe(description, {
    pooling: "mean",
    normalize: true,
  });
  // Extract the embedding output
  const embedding = Array.from(output.data);
  return embedding;
}

export function cosineSimilarity(vector1: number[], vector2: number[]): number {
  let dotProduct = 0.0;
  let magnitude1 = 0.0;
  let magnitude2 = 0.0;
  for (let i = 0; i < vector1.length; i++) {
      dotProduct += vector1[i] * vector2[i];
      magnitude1 += Math.pow(vector1[i], 2);
      magnitude2 += Math.pow(vector2[i], 2);
  }
  magnitude1 = Math.sqrt(magnitude1);
  magnitude2 = Math.sqrt(magnitude2);
  if (magnitude1 === 0 || magnitude2 === 0) {
      return 0.0;
  }
  return dotProduct / (magnitude1 * magnitude2);
}
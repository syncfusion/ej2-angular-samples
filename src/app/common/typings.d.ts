declare module "*.json" {
    const value: any;
	
    export default value;
}

declare module "@xenova/transformers/dist/transformers.min.js" {
  export interface TransformerEnv {
    allowLocalModels?: boolean;
    localModelPath?: string;
    allowRemoteModels?: boolean;
  }
  
  export const env: TransformerEnv;
  export function pipeline(task: string, model: string): Promise<any>;
}
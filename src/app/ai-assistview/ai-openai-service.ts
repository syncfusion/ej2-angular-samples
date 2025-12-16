export interface AzureOpenAIRequest {
  apiKey: string;       // Azure OpenAI Key (Key 1/Key 2)
  endpoint: string;     // e.g., https://your-resource.openai.azure.com
  deployment: string;   // Azure deployment name (not base model id)
  prompt: string;       // user prompt
  apiVersion?: string;  // default: '2024-07-01-preview'
}

export const getAzureOpenAIAssist = async (req: AzureOpenAIRequest): Promise<string> => {
  const {
    apiKey,
    endpoint,
    deployment,
    prompt,
    apiVersion = '2024-07-01-preview'
  } = req;

  try {
    if (!apiKey) throw new Error('Azure OpenAI API key is required.');
    if (!endpoint) throw new Error('Azure OpenAI endpoint is required.');
    if (!deployment) throw new Error('Azure OpenAI deployment name is required.');
    const url =
      endpoint.replace(/\/$/, '') +
      `/openai/deployments/${encodeURIComponent(deployment)}/chat/completions` +
      `?api-version=${encodeURIComponent(apiVersion)}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 200
      })
    });
    if (!response.ok) throw new Error('API request failed');
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error: any) {
    throw new Error('⚠️ Something went wrong while connecting to the OpenAI service. Please check your API key.');
  }
};
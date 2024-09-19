import { AzureOpenAI } from "openai";

//Warning: Do not expose your API key in the client-side code. This is only for demonstration purposes.

// Replace your Azure OpenAI endpoint, apiVersion, deployment and API key here
const endpoint = "AZURE_OPENAI_ENDPOINT";
const apiKey = "AZURE_OPENAI_API_KEY";
const deployment = "DEPLOYMENT_NAME";
const apiVersion = "API_VERSION";

const client = new AzureOpenAI({
    endpoint,
    apiKey,
    apiVersion,
    deployment,
    dangerouslyAllowBrowser: true
});

export async function getAzureChatAIRequest(options: any) {
    try {
        const result = await client.chat.completions.create({
            messages: options.messages,
            model: "",
            top_p: options.topP,
            temperature: options.temperature,
            max_tokens: options.maxTokens,
            frequency_penalty: options.frequencyPenalty,
            presence_penalty: options.presencePenalty,
            stop: options.stopSequences
        });
        return result.choices[0].message.content;
    } catch (err) {
        console.error("Error occurred:", err);
    }
}

export async function getAzureTextAIRequest(prompt: string): Promise<string | undefined> {
    try {
        const result = await client.completions.create({ prompt, model: deployment });
        return result.choices[0]?.text;
    } catch (err) {
        console.error("Error occurred:", err);
        return undefined;
    }
}

export async function OpenAiModelRTE(subQuery: string, promptQuery: string) {
    const chatCompletion = await client.chat.completions.create({
        messages: [
            { role: "system", content: subQuery.includes("emoji followed by the sentiment in the format") ? "You are a helpful assistant. Please respond in string format." : "NOTE: Return same html format just do changes content only. don't change html formats."},
            { 
                role: "user", 
                content: `${subQuery} ${promptQuery}`
            }
        ],
        model: ''
    });
    return chatCompletion.choices[0].message.content;
}
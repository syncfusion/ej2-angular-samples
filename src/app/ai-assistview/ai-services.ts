export const getAzureOpenAIAssist = async (settings: any): Promise<any> => {
  try {
    let response = await fetch('https://ai-samples-server-f5hta2h9g5aqhcfg.southindia-01.azurewebsites.net/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            messages: settings
        })
    })
    let result = await response.json();
    if (!response.ok) {
        throw new Error(result.error || 'Network response was not ok');
    }
    result.response = result.response.replace('END_INSERTION', '');
    return result.response;
} catch (error) {
    if (error.message.includes('token limit')) {
        document.querySelector('.banner-message').innerHTML = error.message;
        document.querySelector('.sb-header1').classList.remove('sb-hide');
    }
    else {
        throw new Error('⚠️ Something went wrong while connecting to the OpenAI service. Please check your API key.');
    }
}
};

export const getGeminiAIAssit = async (apiKey: string, model: string, prompt: string): Promise<string> => {
  try {
    if (!apiKey) throw new Error('Gemini API key is required.');
    if (!model) throw new Error('Gemini model is required.');
    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}` +
      `:generateContent?key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt || 'Hi' }] }]
      })
    });
        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
  } catch (error: any) {
    throw new Error('⚠️ Something went wrong while connecting to the Gemini service. Please check your API key.');
  }
};

export const getdeepSeekAIAssit = async (deepseekApiKey: string, prompt: string): Promise<string> => {
  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${deepseekApiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat', 
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 200,
        stream: false,
      })
    });
        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();
        return data.choices[0].message.content;
  } catch (error: any) {
    throw new Error('⚠️ Something went wrong while connecting to the DeepSeek service. Please check your API key.');
  }
};
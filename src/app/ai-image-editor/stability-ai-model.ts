import FormData from 'form-data';

// Search and Replace
export async function StabilityAiModel(file: File, prompt: string, searchPrompt: string) {
    const response = await getStabilityAiModel(file, prompt, searchPrompt);
    if (!response.ok) {
        throw new Error(`${response.status}: ${await response.text()}`);
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    return url;
}

export async function getStabilityAiModel(file: File, prompt: string, searchPrompt: string) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('prompt', prompt);
    formData.append('search_prompt', searchPrompt);

    return await fetch('https://api.stability.ai/v2beta/stable-image/edit/search-and-replace', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer YOUR_API_KEY`,
            'Accept': 'image/*'
        },
        body: formData as any
    });
}

// Remove Background

export async function StabilityAiModelBGRemover(file: File) {
    const response = await getStabilityAiModelBGRemover(file);
    if (!response.ok) {
        throw new Error(`${response.status}: ${await response.text()}`);
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    return url;
}

export async function getStabilityAiModelBGRemover(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    return await fetch('https://api.stability.ai/v2beta/stable-image/edit/remove-background', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer YOUR_API_KEY`,
            'Accept': 'image/*'
        },
        body: formData as any
    });
}

// Magic eraser

export async function StabilityAiModelMagicEraser(file: File, maskFile: File) {
    const response = await getStabilityAiModelMagicEraser(file, maskFile);
    if (!response.ok) {
        throw new Error(`${response.status}: ${await response.text()}`);
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    return url;
}

export async function getStabilityAiModelMagicEraser(file: File, maskFile: File) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('mask', maskFile);

    return await fetch('https://api.stability.ai/v2beta/stable-image/edit/erase', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer YOUR_API_KEY`,
            'Accept': 'image/*'
        },
        body: formData as any
    });
}
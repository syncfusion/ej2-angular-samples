import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { AIAssistDefaultComponent } from './ai-default.component';
import { AIAssistCustomViewsComponent } from './ai-custom-views.component';
import { AIAssistStreamComponent } from './ai-streaming.component';
import { AIAssistAttachmentComponent } from './ai-attachments.component';
import { AIAssistDialogComponent } from './ai-dialog.component';
import { AIAssistTemplateComponent } from './ai-template.component';
import { AIAsssitAISample } from './ai-integrations.component';
import { SpeechToTextAssistComponent } from './ai-speech-to-text.component';
import { TextToSpeechAssistComponent } from './ai-text-to-speech.component';
import { AIAssistOverviewComponent } from './ai-overview.component';
import { AIAssistGenerativeUIComponent } from './ai-generative-ui.component';
import { NotionAICloneAssistComponent } from './ai-notion-ai-like.component';
import { AIAssistClaudeCloneComponent } from './ai-claude-like.component';
import { AIAssistGeminiCloneComponent } from './ai-gemini-like.component';
import { AIAssistThinkingComponent } from './ai-thinking.component';

export const aiassistviewAppRoutes: Object[] = [
    { path: ':theme/ai-assistview/ai-overview', type :"new", component: AIAssistOverviewComponent, name: 'Overview', description: 'Combines streaming, attachments, speech-to-text, text-to-speech and regenerate functionality in one overview UI.', category: 'AI AssistView', order: '01', sourceFiles: [
        {displayName: 'ai-overview.component.ts', path: './src/ai-assistview/ai-overview.component.ts'},
        {displayName: 'ai-overview.html', path: './src/ai-assistview/ai-overview.html'},
        {displayName: 'ai-overview.component.css', path: './src/ai-assistview/ai-overview.component.css'},
        {displayName: 'promptResponseData.ts', path: './src/ai-assistview/promptResponseData.ts'}
    ] },
    { path: ':theme/ai-assistview/ai-default', component: AIAssistDefaultComponent, name: 'Default Functionalities', description: 'Showcases the default combinations of the AiAssistView component.', category: 'AI AssistView', order: '01', sourceFiles: [
        {displayName: 'ai-default.component.ts', path: './src/ai-assistview/ai-default.component.ts'},
        {displayName: 'ai-default.html', path: './src/ai-assistview/ai-default.html'},
        {displayName: 'ai-default.component.css', path: './src/ai-assistview/ai-default.component.css'},
        {displayName: 'promptResponseData.ts', path: './src/ai-assistview/promptResponseData.ts'}
    ] },
    { path: ':theme/ai-assistview/ai-custom-views', component: AIAssistCustomViewsComponent, name: 'Custom Views', description: 'Showcases the views combinations of the AiAssistView component.', category: 'AI AssistView', order: '01', sourceFiles: [
        {displayName: 'ai-custom-views.component.ts', path: './src/ai-assistview/ai-custom-views.component.ts'},
        {displayName: 'ai-custom-views.html', path: './src/ai-assistview/ai-custom-views.html'},
        {displayName: 'ai-custom-views.component.css', path: './src/ai-assistview/ai-custom-views.component.css'},
        {displayName: 'promptResponseData.ts', path: './src/ai-assistview/promptResponseData.ts'}
    ] },
    { path: ':theme/ai-assistview/ai-streaming', component: AIAssistStreamComponent, name: 'Streaming Response', description: 'Showcases the AiAssistView component with its streaming support.', category: 'AI AssistView', order: '01', sourceFiles: [
        {displayName: 'ai-streaming.component.ts', path: './src/ai-assistview/ai-streaming.component.ts'},
        {displayName: 'ai-streaming.html', path: './src/ai-assistview/ai-streaming.html'},
        {displayName: 'ai-streaming.component.css', path: './src/ai-assistview/ai-streaming.component.css'},
        {displayName: 'promptResponseData.ts', path: './src/ai-assistview/promptResponseData.ts'}
    ] },
    { path: ':theme/ai-assistview/ai-attachments', component: AIAssistAttachmentComponent, name: 'File Attachments', description: 'Showcases the AiAssistView control with its attachment support.', category: 'AI AssistView', order: '01', sourceFiles: [
        {displayName: 'ai-attachments.component.ts', path: './src/ai-assistview/ai-attachments.component.ts'},
        {displayName: 'ai-attachments.html', path: './src/ai-assistview/ai-attachments.html'},
        {displayName: 'ai-attachments.component.css', path: './src/ai-assistview/ai-attachments.component.css'},
        {displayName: 'promptResponseData.ts', path: './src/ai-assistview/promptResponseData.ts'}
    ] },
    { path: ':theme/ai-assistview/ai-generative-ui', type :"new", component: AIAssistGenerativeUIComponent, name: 'Generative UI Responses', description: 'Demonstrates the AI generated UI responses in the AiAssistView component', category: 'AI AssistView', order: '01', sourceFiles: [
        {displayName: 'ai-generative-ui.component.ts', path: './src/ai-assistview/ai-generative-ui.component.ts'},
        {displayName: 'ai-generative-ui.html', path: './src/ai-assistview/ai-generative-ui.html'},
        {displayName: 'ai-generative-ui.component.css', path: './src/ai-assistview/ai-generative-ui.component.css'},
        {displayName: 'promptResponseData.ts', path: './src/ai-assistview/promptResponseData.ts'}
    ] },
    { path: ':theme/ai-assistview/ai-thinking', type :"new", component: AIAssistThinkingComponent, name: 'Chain of Thoughts', description: 'Demonstrates the AI generated thinking UI in the AiAssistView component', category: 'AI AssistView', order: '01', sourceFiles: [
        {displayName: 'ai-thinking.component.ts', path: './src/ai-assistview/ai-thinking.component.ts'},
        {displayName: 'ai-thinking.html', path: './src/ai-assistview/ai-thinking.html'},
        {displayName: 'ai-thinking.component.css', path: './src/ai-assistview/ai-thinking.component.css'},
        {displayName: 'promptResponseData.ts', path: './src/ai-assistview/promptResponseData.ts'}
    ] },
    { path: ':theme/ai-assistview/ai-template', component: AIAssistTemplateComponent, name: 'Template', description: 'Showcases the template properties of the AiAssistView component.', category: 'AI AssistView', order: '01', sourceFiles: [
        {displayName: 'ai-template.component.ts', path: './src/ai-assistview/ai-template.component.ts'},
        {displayName: 'ai-template.html', path: './src/ai-assistview/ai-template.html'},
        {displayName: 'ai-template.component.css', path: './src/ai-assistview/ai-template.component.css'},
        {displayName: 'promptResponseData.ts', path: './src/ai-assistview/promptResponseData.ts'}
    ] },
    { path: ':theme/ai-assistview/ai-speech-to-text', component: SpeechToTextAssistComponent, name: 'Speech To Text', description: 'Demonstrates the AI AssistView component integrated  the built-in Speech-to-Text functionality, enabling users to interact using voice input transcribed into text.', category: 'Speech', order: '02', sourceFiles: [
        {displayName: 'ai-speech-to-text.component.ts', path: './src/ai-assistview/ai-speech-to-text.component.ts'},
        {displayName: 'ai-speech-to-text.html', path: './src/ai-assistview/ai-speech-to-text.html'},
        {displayName: 'ai-speech-to-text.component.css', path: './src/ai-assistview/ai-speech-to-text.component.css'},
        {displayName: 'ai-services.ts', path: './src/ai-assistview/ai-openai-service.ts'}
    ] },
    { path: ':theme/ai-assistview/ai-text-to-speech', type :"update", component: TextToSpeechAssistComponent, name: 'Text To Speech', description: 'Demonstrates the AiAssistView component integrated with Text-to-Speech functionality, allowing AI-generated responses to be vocalized for voice-based interaction.', category: 'Speech', order: '02', sourceFiles: [
        {displayName: 'ai-text-to-speech.component.ts', path: './src/ai-assistview/ai-text-to-speech.component.ts'},
        {displayName: 'ai-text-to-speech.html', path: './src/ai-assistview/ai-text-to-speech.html'},
        {displayName: 'ai-text-to-speech.component.css', path: './src/ai-assistview/ai-text-to-speech.component.css'},
        {displayName: 'ai-services.ts', path: './src/ai-assistview/ai-openai-service.ts'}
    ] },
    { path: ':theme/ai-assistview/ai-notion-ai-like', type :"new", component: NotionAICloneAssistComponent, name: 'Notion AI-like', description: 'Notion-like AI Assist UI with multi-mode chat (floating, sidebar, fullscreen), model selection, chat history, streaming responses, attachments, speech-to-text, text-to-speech, and session management.', category: 'UI Customization', order: '03', sourceFiles: [
        {displayName: 'ai-notion-ai-like.component.ts', path: './src/ai-assistview/ai-notion-ai-like.component.ts'},
        {displayName: 'ai-notion-ai-like.html', path: './src/ai-assistview/ai-notion-ai-like.html'},
        {displayName: 'ai-notion-ai-like.component.css', path: './src/ai-assistview/ai-notion-ai-like.component.css'},
        {displayName: 'promptResponseData.ts', path: './src/ai-assistview/promptResponseData.ts'}
    ] },
    { path: ':theme/ai-assistview/ai-claude-like', type :"new", component: AIAssistClaudeCloneComponent, name: 'Claude AI-like', description: 'Claude line UI appearance with ai assistview supported features with footer toolbar and banner template', category: 'UI Customization', order: '03', sourceFiles: [
        {displayName: 'ai-claude-like.component.ts', path: './src/ai-assistview/ai-claude-like.component.ts'},
        {displayName: 'ai-claude-like.html', path: './src/ai-assistview/ai-claude-like.html'},
        {displayName: 'ai-claude-like.component.css', path: './src/ai-assistview/ai-claude-like.component.css'},
        {displayName: 'promptResponseData.ts', path: './src/ai-assistview/promptResponseData.ts'}
    ] },
    { path: ':theme/ai-assistview/ai-gemini-like', type :"new", component: AIAssistGeminiCloneComponent, name: 'Gemini AI-like', description: 'Gemini-inspired UI appearance with ai assistview supported features with footer toolbar and banner template', category: 'UI Customization', order: '03', sourceFiles: [
        {displayName: 'ai-gemini-like.component.ts', path: './src/ai-assistview/ai-gemini-like.component.ts'},
        {displayName: 'ai-gemini-like.html', path: './src/ai-assistview/ai-gemini-like.html'},
        {displayName: 'ai-gemini-like.component.css', path: './src/ai-assistview/ai-gemini-like.component.css'},
        {displayName: 'promptResponseData.ts', path: './src/ai-assistview/promptResponseData.ts'}
    ] },
    { path: ':theme/ai-assistview/ai-dialog', component: AIAssistDialogComponent, name: 'Notes Assistant', description: 'Showcases the default combinations of the AiAssistView component views.', category: 'Use Cases', order: '04', sourceFiles: [
        {displayName: 'ai-dialog.component.ts', path: './src/ai-assistview/ai-dialog.component.ts'},
        {displayName: 'ai-dialog.html', path: './src/ai-assistview/ai-dialog.html'},
        {displayName: 'ai-dialog.component.css', path: './src/ai-assistview/ai-dialog.component.css'},
        {displayName: 'promptResponseData.ts', path: './src/ai-assistview/promptResponseData.ts'}
    ] },
    { path: ':theme/ai-assistview/ai-integrations', component: AIAsssitAISample, name: 'Multiple AI Conversation', description: 'Showcases the AiAssistView control to integrate with Gemini, OpenAI Sample', category: 'Use Cases', order: '04', sourceFiles: [
        {displayName: 'ai-integrations.component.ts', path: './src/ai-assistview/ai-integrations.component.ts'},
        {displayName: 'ai-integrations.html', path: './src/ai-assistview/ai-integrations.html'},
        {displayName: 'ai-integrations.component.css', path: './src/ai-assistview/ai-integrations.component.css'},
    ] }
];

export const AIAssistSampleModule: ModuleWithProviders<any> = RouterModule.forChild(aiassistviewAppRoutes);


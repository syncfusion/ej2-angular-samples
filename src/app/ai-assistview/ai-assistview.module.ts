import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { AIAssistDefaultComponent } from './default.component';
import { AIAssistCustomViewsComponent } from './custom-views.component';
import { AIAssistStreamComponent } from './streaming.component';
import { AIAssistAttachmentComponent } from './attachments.component';
import { AIAssistDialogComponent } from './dialog.component';
import { AIAssistTemplateComponent } from './template.component';
import { AIAsssitAISample } from './ai-integrations.component';
import { SpeechToTextAssistComponent } from './ai-speech-to-text.component';
import { TextToSpeechAssistComponent } from './ai-text-to-speech.component';

export const aiassistviewAppRoutes: Object[] = [
    { path: ':theme/ai-assistview/default', component: AIAssistDefaultComponent, name: 'Default Functionalities', description: 'Showcases the default combinations of the AiAssistView component.', category: 'AI AssistView', order: '01', sourceFiles: [
        {displayName: 'default.component.ts', path: './src/ai-assistview/default.component.ts'},
        {displayName: 'default.html', path: './src/ai-assistview/default.html'},
        {displayName: 'default.component.css', path: './src/ai-assistview/default.component.css'},
        {displayName: 'promptResponseData.ts', path: './src/ai-assistview/promptResponseData.ts'}
    ] },
    { path: ':theme/ai-assistview/custom-views', component: AIAssistCustomViewsComponent, name: 'Custom Views', description: 'Showcases the views combinations of the AiAssistView component.', category: 'AI AssistView', order: '01', sourceFiles: [
        {displayName: 'custom-views.component.ts', path: './src/ai-assistview/custom-views.component.ts'},
        {displayName: 'custom-views.html', path: './src/ai-assistview/custom-views.html'},
        {displayName: 'custom-views.component.css', path: './src/ai-assistview/custom-views.component.css'},
        {displayName: 'promptResponseData.ts', path: './src/ai-assistview/promptResponseData.ts'}
    ] },
    { path: ':theme/ai-assistview/streaming', component: AIAssistStreamComponent, name: 'Streaming Response', description: 'Showcases the AiAssistView component with its streaming support.', category: 'AI AssistView', order: '01', sourceFiles: [
        {displayName: 'streaming.component.ts', path: './src/ai-assistview/streaming.component.ts'},
        {displayName: 'streaming.html', path: './src/ai-assistview/streaming.html'},
        {displayName: 'streaming.component.css', path: './src/ai-assistview/streaming.component.css'},
        {displayName: 'promptResponseData.ts', path: './src/ai-assistview/promptResponseData.ts'}
    ] },
    { path: ':theme/ai-assistview/attachments', component: AIAssistAttachmentComponent, name: 'File Attachments', description: 'Showcases the AiAssistView control with its attachment support.', category: 'AI AssistView', order: '01', sourceFiles: [
        {displayName: 'attachments.component.ts', path: './src/ai-assistview/attachments.component.ts'},
        {displayName: 'attachments.html', path: './src/ai-assistview/attachments.html'},
        {displayName: 'attachments.component.css', path: './src/ai-assistview/attachments.component.css'},
        {displayName: 'promptResponseData.ts', path: './src/ai-assistview/promptResponseData.ts'}
    ] },
    { path: ':theme/ai-assistview/template', component: AIAssistTemplateComponent, name: 'Template', description: 'Showcases the template properties of the AiAssistView component.', category: 'AI AssistView', order: '01', sourceFiles: [
        {displayName: 'template.component.ts', path: './src/ai-assistview/template.component.ts'},
        {displayName: 'template.html', path: './src/ai-assistview/template.html'},
        {displayName: 'template.component.css', path: './src/ai-assistview/template.component.css'},
        {displayName: 'promptResponseData.ts', path: './src/ai-assistview/promptResponseData.ts'}
    ] },
    { path: ':theme/ai-assistview/dialog', component: AIAssistDialogComponent, name: 'Notes Assistant', description: 'Showcases the default combinations of the AiAssistView component views.', category: 'Use Cases', order: '02', sourceFiles: [
        {displayName: 'dialog.component.ts', path: './src/ai-assistview/dialog.component.ts'},
        {displayName: 'dialog.html', path: './src/ai-assistview/dialog.html'},
        {displayName: 'dialog.component.css', path: './src/ai-assistview/dialog.component.css'},
        {displayName: 'promptResponseData.ts', path: './src/ai-assistview/promptResponseData.ts'}
    ] },
    { path: ':theme/ai-assistview/ai-integrations', component: AIAsssitAISample, name: 'Multiple AI Models', description: 'Showcases the AiAssistView control to integrate with Gemini, OpenAI Sample', category: 'Use Cases', order: '02', type: 'new', sourceFiles: [
        {displayName: 'ai-integrations.component.ts', path: './src/ai-assistview/ai-integrations.component.ts'},
        {displayName: 'ai-integrations.html', path: './src/ai-assistview/ai-integrations.html'},
        {displayName: 'ai-integrations.component.css', path: './src/ai-assistview/ai-integrations.component.css'},
        {displayName: 'ai-services.ts', path: './src/ai-assistview/ai-services.ts'}
    ] },
    { path: ':theme/ai-assistview/ai-speech-to-text', component: SpeechToTextAssistComponent, name: 'Speech To Text', description: 'Demonstrates the AI AssistView component integrated with Speech-to-Text functionality, enabling users to interact using voice input transcribed into text.', category: 'Speech', order: '03', type: 'new', sourceFiles: [
        {displayName: 'ai-speech-to-text.component.ts', path: './src/ai-assistview/ai-speech-to-text.component.ts'},
        {displayName: 'ai-speech-to-text.html', path: './src/ai-assistview/ai-speech-to-text.html'},
        {displayName: 'ai-speech-to-text.component.css', path: './src/ai-assistview/ai-speech-to-text.component.css'},
        {displayName: 'ai-services.ts', path: './src/ai-assistview/ai-openai-service.ts'}
    ] },
        { path: ':theme/ai-assistview/ai-text-to-speech', component: TextToSpeechAssistComponent, name: 'Text To Speech', description: 'Demonstrates the AiAssistView component integrated with Text-to-Speech functionality, allowing AI-generated responses to be vocalized for voice-based interaction.', category: 'Speech', order: '03', type: 'new', sourceFiles: [
        {displayName: 'ai-text-to-speech.component.ts', path: './src/ai-assistview/ai-text-to-speech.component.ts'},
        {displayName: 'ai-text-to-speech.html', path: './src/ai-assistview/ai-text-to-speech.html'},
        {displayName: 'ai-text-to-speech.component.css', path: './src/ai-assistview/ai-text-to-speech.component.css'},
        {displayName: 'ai-services.ts', path: './src/ai-assistview/ai-openai-service.ts'}
    ] }
];

export const AIAssistSampleModule: ModuleWithProviders<any> = RouterModule.forChild(aiassistviewAppRoutes);


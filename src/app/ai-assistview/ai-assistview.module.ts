import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { AIAssistDefaultComponent } from './default.component';
import { AIAssistCustomViewsComponent } from './custom-views.component';
import { AIAssistStreamComponent } from './streaming.component';
import { AIAssistDialogComponent } from './dialog.component';
import { AIAssistTemplateComponent } from './template.component';

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
    { path: ':theme/ai-assistview/streaming', component: AIAssistStreamComponent, name: 'Streaming Response', description: 'Showcases the AiAssistView component with its streaming support.', category: 'AI AssistView', order: '01', type: 'new', sourceFiles: [
        {displayName: 'streaming.component.ts', path: './src/ai-assistview/streaming.component.ts'},
        {displayName: 'streaming.html', path: './src/ai-assistview/streaming.html'},
        {displayName: 'streaming.component.css', path: './src/ai-assistview/streaming.component.css'},
        {displayName: 'promptResponseData.ts', path: './src/ai-assistview/promptResponseData.ts'}
    ] },
    { path: ':theme/ai-assistview/template', component: AIAssistTemplateComponent, name: 'Template', description: 'Showcases the template properties of the AiAssistView component.', category: 'AI AssistView', order: '01', sourceFiles: [
        {displayName: 'template.component.ts', path: './src/ai-assistview/template.component.ts'},
        {displayName: 'template.html', path: './src/ai-assistview/template.html'},
        {displayName: 'template.component.css', path: './src/ai-assistview/template.component.css'},
        {displayName: 'promptResponseData.ts', path: './src/ai-assistview/promptResponseData.ts'}
    ] },
    { path: ':theme/ai-assistview/dialog', component: AIAssistDialogComponent, name: 'Dialog', description: 'Showcases the default combinations of the AiAssistView component views.', category: 'Integration', order: '02', sourceFiles: [
        {displayName: 'dialog.component.ts', path: './src/ai-assistview/dialog.component.ts'},
        {displayName: 'dialog.html', path: './src/ai-assistview/dialog.html'},
        {displayName: 'dialog.component.css', path: './src/ai-assistview/dialog.component.css'},
        {displayName: 'promptResponseData.ts', path: './src/ai-assistview/promptResponseData.ts'}
    ] }
];

export const AIAssistSampleModule: ModuleWithProviders<any> = RouterModule.forChild(aiassistviewAppRoutes);


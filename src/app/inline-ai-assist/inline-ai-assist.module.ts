import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { InlineAIAssistOverviewComponent } from './ai-overview.component';
import { InlineAIAssistRTEComponent } from './ai-rich-text-editor.component';

export const inlineaiassistAppRoutes: Object[] = [
    { path: ':theme/inline-ai-assist/ai-overview', component: InlineAIAssistOverviewComponent, name: 'Overview', description: 'Showcases the default combinations of the InlineAIAssist component.', category: 'Inline AI Assist', order: '01', sourceFiles: [
        {displayName: 'ai-overview.component.ts', path: './src/inline-ai-assist/ai-overview.component.ts'},
        {displayName: 'ai-overview.html', path: './src/inline-ai-assist/ai-overview.html'},
        {displayName: 'ai-overview.component.css', path: './src/inline-ai-assist/ai-overview.component.css'}
    ] },
    { path: ':theme/inline-ai-assist/ai-rich-text-editor', ignoreOnBuild: true, component: InlineAIAssistRTEComponent, name: 'Rich Text Editor', description: 'Showcases the usecase of the InlineAIAssist component.', category: 'Integration', order: '02', sourceFiles: [
        {displayName: 'ai-rich-text-editor.component.ts', path: './src/inline-ai-assist/ai-rich-text-editor.component.ts'},
        {displayName: 'ai-rich-text-editor.html', path: './src/inline-ai-assist/ai-rich-text-editor.html'},
        {displayName: 'service.ts', path: './src/inline-ai-assist/service.ts'}
    ] }
];

export const InlineAIAssistSampleModule: ModuleWithProviders<any> = RouterModule.forChild(inlineaiassistAppRoutes);


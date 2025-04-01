import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DefaultSpeechToTextComponent } from './default.component';
import { IntegrationSpeechToTextComponent } from './integration.component';
import { UseCaseSpeechToTextComponent } from './use-case.component';

export const speechToTextAppRoutes: Object[] = [
    { path: ':theme/speech-to-text/default', component: DefaultSpeechToTextComponent, name: 'Default Functionalities', description: 'This example demonstrates the default features of the Syncfusion JavaScript SpeechToText component, including speech recognition, and customization.', category: 'Speech To Text', order: '01', sourceFiles: [
        {displayName: 'default.component.ts', path: './src/speech-to-text/default.component.ts'},
        {displayName: 'default.html', path: './src/speech-to-text/default.html'},
        {displayName: 'default.css', path: './src/speech-to-text/default.css'}
    ]},
    { path: ':theme/speech-to-text/use-case', component: UseCaseSpeechToTextComponent, name: 'Use Case', description: 'Explore how to integrate the SpeechToText component into real-world applications for seamless voice-to-text conversion and enhanced usability.', category: 'Integration', order: '02', sourceFiles: [
        {displayName: 'use-case.component.ts', path: './src/speech-to-text/use-case.component.ts'},
        {displayName: 'use-case.html', path: './src/speech-to-text/use-case.html'},
        {displayName: 'use-case.css', path: './src/speech-to-text/use-case.css'}
    ]},
    { path: ':theme/speech-to-text/integration', component: IntegrationSpeechToTextComponent, name: 'AI AssistView', description: 'Demonstrates to integrate the SpeechToText component with AI AssistView to enable real-time voice-to-text interaction for AI-powered chat experiences.', category: 'Integration', order: '02', sourceFiles: [
        {displayName: 'integration.component.ts', path: './src/speech-to-text/integration.component.ts'},
        {displayName: 'integration.html', path: './src/speech-to-text/integration.html'},
        {displayName: 'integration.css', path: './src/speech-to-text/integration.css'}
    ]}
];

export const SpeechToTextSampleModule: ModuleWithProviders<any> = RouterModule.forChild(speechToTextAppRoutes);

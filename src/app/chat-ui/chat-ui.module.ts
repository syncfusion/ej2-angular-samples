import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { ChatUIDefaultComponent } from './default.component';
import { ChatUIApiComponent } from './api.component';
import { ChatUITemplateComponent } from './template.component';
import { ChatIntegrationComponent } from './chat-integration.component';
import {ChatUILoadOnDemandComponent} from './loadOn-demand.component';

export const chatUIAppRoutes: Object[] = [
    { path: ':theme/chat-ui/default', component: ChatUIDefaultComponent, name: 'Default Functionalities', description: 'This sample showcases the basic features of the Chat UI component, which is designed to create a chat interface for multiple users.', category: 'Chat UI', order: '01', sourceFiles: [
        {displayName: 'default.component.ts', path: './src/chat-ui/default.component.ts'},
        {displayName: 'default.html', path: './src/chat-ui/default.html'},
        {displayName: 'default.component.css', path: './src/chat-ui/default.component.css'},
        {displayName: 'messageData.ts', path: './src/chat-ui/messageData.ts'}
    ] },
    { path: ':theme/chat-ui/loadOn-demand', component: ChatUILoadOnDemandComponent, name: 'Load On-demand', description: 'This sample demonstrates the features of the Chat UI component.', category: 'Chat UI', order: '01', type: 'new', sourceFiles: [
        {displayName: 'loadOn-demand.component.ts', path: './src/chat-ui/loadOn-demand.component.ts'},
        {displayName: 'loadOn-demand.html', path: './src/chat-ui/loadOn-demand.html'},
        {displayName: 'loadOn-demand.component.css', path: './src/chat-ui/loadOndemand.component.css'},
    ] },
    { path: ':theme/chat-ui/template', component: ChatUITemplateComponent, name: 'Template', description: 'This sample demonstrates the template functionality of the Chat UI component.', category: 'Chat UI', order: '01', sourceFiles: [
        {displayName: 'template.component.ts', path: './src/chat-ui/template.component.ts'},
        {displayName: 'template.html', path: './src/chat-ui/template.html'},
        {displayName: 'template.component.css', path: './src/chat-ui/template.component.css'},
        {displayName: 'messageData.ts', path: './src/chat-ui/messageData.ts'}
    ] },
    { path: ':theme/chat-ui/api', component: ChatUIApiComponent, name: 'API', description: 'This sample demonstrates the properties available in the Chat UI component.', category: 'Chat UI', order: '01', sourceFiles: [
        {displayName: 'api.component.ts', path: './src/chat-ui/api.component.ts'},
        {displayName: 'api.html', path: './src/chat-ui/api.html'},
        {displayName: 'api.component.css', path: './src/chat-ui/api.component.css'},
        {displayName: 'messageData.ts', path: './src/chat-ui/messageData.ts'}
    ] },
    { path: ':theme/chat-ui/chat-integration', component: ChatIntegrationComponent, name: 'Use Case', description: 'This example showcases how to design a chat application using Chat UI. You can load the chat messages based on the user being selected.', category: 'Integration', order: '02', sourceFiles: [
        {displayName: 'chat-integration.component.ts', path: './src/chat-ui/chat-integration.component.ts'},
        {displayName: 'chat-integration.html', path: './src/chat-ui/chat-integration.html'},
        {displayName: 'chat-integration.component.css', path: './src/chat-ui/chat-integration.component.css'},
        {displayName: 'messageData.ts', path: './src/chat-ui/messageData.ts'}
    ] }
];

export const ChatUISampleModule: ModuleWithProviders<any> = RouterModule.forChild(chatUIAppRoutes);

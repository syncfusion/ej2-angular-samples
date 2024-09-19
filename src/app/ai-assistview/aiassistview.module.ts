import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { AIAssistDefaultComponent } from './default.component';
import { AIAssistCustomViewsComponent } from './custom-views.component';
import { AIAssistDialogComponent } from './dialog.component';
import { AIAssistTemplateComponent } from './template.component';

export const aiassistviewAppRoutes: Object[] = [
    { path: ':theme/ai-assistview/default', component: AIAssistDefaultComponent, name: 'Default Functionalities', description: 'Showcases the default combinations of the AiAssistView component.', category: 'AI AssistView', order: '01' },
    { path: ':theme/ai-assistview/custom-views', component: AIAssistCustomViewsComponent, name: 'Custom Views', description: 'Showcases the views combinations of the AiAssistView component.', category: 'AI AssistView', order: '01' },
    { path: ':theme/ai-assistview/template', component: AIAssistTemplateComponent, name: 'Template', description: 'Showcases the template properties of the AiAssistView component.', category: 'AI AssistView', order: '01' },
    { path: ':theme/ai-assistview/dialog', component: AIAssistDialogComponent, name: 'Dialog', description: 'Showcases the default combinations of the AiAssistView component views.', category: 'Integration', order: '02' }
];

export const AIAssistSampleModule: ModuleWithProviders<any> = RouterModule.forChild(aiassistviewAppRoutes);


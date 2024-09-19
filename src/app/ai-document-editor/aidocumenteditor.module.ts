import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SmartEditorComponent } from './smart-editor.component';

export const AIDocumentEditorAppRoutes: Object[] = [
    { path: ':theme/ai-document-editor/smart-editor', component: SmartEditorComponent, name: 'Smart Editor', description: 'This demo shows the smart AI feature in document editor component.', category: 'Document Editor' }
];

export const AIDocumentEditorSampleModule: ModuleWithProviders<any> = RouterModule.forChild(AIDocumentEditorAppRoutes);
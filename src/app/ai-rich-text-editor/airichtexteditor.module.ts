import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SmartRichTextEditor } from './rich-text-editor.component';

export const AIRichTextEditorAppRoutes: Object[] = [
    { path: ':theme/ai-rich-text-editor/rich-text-editor', component: SmartRichTextEditor, name: 'AI Assistant', description: 'This demo showcases the Rich Text Editor AI feature.', category: 'Rich Text Editor' }
];

export const AIRichTextEditorSampleModule: ModuleWithProviders<any> = RouterModule.forChild(AIRichTextEditorAppRoutes);
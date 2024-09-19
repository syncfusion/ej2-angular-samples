import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SmartEditorComponent } from './smart-editor.component';

export const AIImageEditorAppRoutes: Object[] = [
    { path: ':theme/ai-image-editor/smart-editor', component: SmartEditorComponent, name: 'Smart Image Editor', description: 'This demo highlights the advanced features of the Syncfusion Angular Image Editor.', category: 'Image Editor' }
];

export const AIImageEditorSampleModule: ModuleWithProviders<any> = RouterModule.forChild(AIImageEditorAppRoutes);
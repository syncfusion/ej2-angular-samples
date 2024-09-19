import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { LocalEmbeddingComponent } from './local-embedding.component';

export const AIComboBoxAppRoutes: Object[] = [
    { path: ':theme/ai-combo-box/local-embedding', component: LocalEmbeddingComponent, name: 'Semantic Searching (Embedding)', description: 'This demo shows the semantic search AI feature in Combo Box.', category: 'ComboBox' }
];

export const AIComboBoxSampleModule: ModuleWithProviders<any> = RouterModule.forChild(AIComboBoxAppRoutes);
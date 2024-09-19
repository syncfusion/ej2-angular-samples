import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NlQueryComponent } from './natural-language-query.component';

export const AIQueryBuilderAppRoutes: Object[] = [
    { path: ':theme/ai-querybuilder/natural-language-query', component: NlQueryComponent, name: 'Natural Language Query', description: 'This demo shows the natural language query AI feature in query builder.', category: 'Query Builder' }
];

export const AIQueryBuilderSampleModule: ModuleWithProviders<any> = RouterModule.forChild(AIQueryBuilderAppRoutes);
import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SmartPasteDefaultComponent } from './default.component';

export const smartPasteAppRoutes: Object[] = [
    { path: ':theme/ai-smart-paste/default', component: SmartPasteDefaultComponent, name: 'Default Functionalities', description: 'Showcases the default combinations of the Smart Paste component.', category: 'Smart Paste' }
];

export const SmartPasteSampleModule: ModuleWithProviders<any> = RouterModule.forChild(smartPasteAppRoutes);


import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SmartTextAreaDefaultComponent } from './default.component';

export const smartTextAreaAppRoutes: Object[] = [
    { path: ':theme/ai-smart-textarea/default', component: SmartTextAreaDefaultComponent, name: 'Smart TextArea', description: 'Showcases the default combinations of the Smart TextArea component.', category: 'Smart TextArea' }
];

export const SmartTextAreaSampleModule: ModuleWithProviders<any> = RouterModule.forChild(smartTextAreaAppRoutes);
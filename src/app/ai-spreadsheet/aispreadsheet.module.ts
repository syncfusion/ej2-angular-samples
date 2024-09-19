import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SmartSpreadsheetComponent } from './smart-spreadsheet.component';

export const AISpreadsheetAppRoutes: Object[] = [
    { path: ':theme/ai-spreadsheet/smart-spreadsheet', component: SmartSpreadsheetComponent, name: 'Smart Spreadsheet', description: 'This demo showcases the Spreadsheet AI feature.', category: 'Spreadsheet' }
];

export const AISpreadsheetSampleModule: ModuleWithProviders<any> = RouterModule.forChild(AISpreadsheetAppRoutes);
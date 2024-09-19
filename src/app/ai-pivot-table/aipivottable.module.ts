import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SmartPivotTableComponent } from './smart-pivottable.component';

export const AIPivotTableAppRoutes: Object[] = [
    { path: ':theme/ai-pivot-table/smart-pivottable', component: SmartPivotTableComponent, name: 'Smart Pivot', description: 'This demo showcases the Pivot Table AI feature.', category: 'Pivot Table' }
];

export const AIPivotTableSampleModule: ModuleWithProviders<any> = RouterModule.forChild(AIPivotTableAppRoutes);
import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SmartSchedulerComponent } from './smart-scheduler.component';

export const AISchedulerAppRoutes: Object[] = [
    { path: ':theme/ai-schedule/smart-scheduler', component: SmartSchedulerComponent, name: 'Smart Event Window', description: 'This demo demonstrates how AI can be utilized to convert natural language context into scheduler events.', category: 'Scheduler' }
];

export const AISchedulerSampleModule: ModuleWithProviders<any> = RouterModule.forChild(AISchedulerAppRoutes);
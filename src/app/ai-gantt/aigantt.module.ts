import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { PrioritizeTaskComponent } from './prioritize-task.component';
import { ProgressComponent } from './progress.component';
import { ResourceOptimizationComponent } from './resource-optimization.component';

export const AIGanttAppRoutes: Object[] = [
    { path: ':theme/ai-gantt/prioritize-task', component: PrioritizeTaskComponent, name: 'Smart Task Prioritizer', description: 'This demo showcases the Gantt Chart AI feature.', category: 'Gantt Chart' },
    { path: ':theme/ai-gantt/progress', component: ProgressComponent, name: 'Smart Progress Predictor', description: 'This demo showcases the Gantt Chart AI feature.', category: 'Gantt Chart' },
    { path: ':theme/ai-gantt/resource-optimization', component: ResourceOptimizationComponent, name: 'Smart Resource Allocation', description: 'This demo showcases the Gantt Chart AI feature.', category: 'Gantt Chart' }
];

export const AIGanttSampleModule: ModuleWithProviders<any> = RouterModule.forChild(AIGanttAppRoutes);


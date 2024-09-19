import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AnomalyDetectionComponent } from './anomaly-detection.component';
import { PredictiveDataentryComponent } from './predictive-dataentry.component';
import { SemanticSearchComponent } from './semantic-search.component';

export const AIGridAppRoutes: Object[] = [
    { path: ':theme/ai-grid/predictive-dataentry', component: PredictiveDataentryComponent, name: 'Predictive Data Entry', description: 'This demo shows the Predictive Data Entry AI feature in Data Grid.', category: 'Data Grid' },
    { path: ':theme/ai-grid/anomaly-detection', component: AnomalyDetectionComponent, name: 'Anomaly Detection', description: 'This demo shows the Anomaly Detection AI feature in Data Grid.', category: 'Data Grid' },
    { path: ':theme/ai-grid/semantic-search', component: SemanticSearchComponent, name: 'Semantic Filtering (Embedding)', description: 'This demo shows the Semantic Filtering AI feature in Data Grid.', category: 'Data Grid' },
];

export const AIGridSampleModule: ModuleWithProviders<any> = RouterModule.forChild(AIGridAppRoutes);
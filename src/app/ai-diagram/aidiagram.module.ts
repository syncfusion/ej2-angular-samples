import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SmartFlowchartComponent } from './smart-flowchart.component';
import { SmartMindmapComponent } from './smart-mindmap.component';

export const AIDiagramAppRoutes: Object[] = [
    { path: ':theme/ai-diagram/smart-flowchart', component: SmartFlowchartComponent, name: 'Text to Flowchart', description: 'This demo showcases the Diagram AI feature.', category: 'Diagram' },
    { path: ':theme/ai-diagram/smart-mindmap', component: SmartMindmapComponent, name: 'Text to MindMap', description: 'This demo showcases the Diagram AI feature.', category: 'Diagram' }
];

export const AIDiagramSampleModule: ModuleWithProviders<any> = RouterModule.forChild(AIDiagramAppRoutes);
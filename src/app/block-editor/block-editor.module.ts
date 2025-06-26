import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { BlockEditorOverviewComponent } from './overview.component';
import { BlockEditorAPIComponent } from './api.component';
import { BlockEditorEventsComponent } from './events.component';

export const blockEditorAppRoutes: Object[] = [
    { path: ':theme/block-editor/overview', component: BlockEditorOverviewComponent, name: 'Overview', description: 'This demo describes basic and advanced features of the Block Editor control with all its tools and functionalities.', category: 'Block Editor', order: '01', sourceFiles: [
        {displayName: 'overview.component.ts', path: './src/block-editor/overview.component.ts'},
        {displayName: 'overview.html', path: './src/block-editor/overview.html'},
        {displayName: 'overview.component.css', path: './src/block-editor/overview.component.css'},
        {displayName: 'blockData.ts', path: './src/block-editor/blockData.ts'}
    ] },
    { path: ':theme/block-editor/api', component: BlockEditorAPIComponent, name: 'API', description: 'This demo covers important APIs of the JS Block Editor such as HTML encoding, read-only, Drag and Drop, and more.', category: 'Block Editor', order: '01', sourceFiles: [
        {displayName: 'api.component.ts', path: './src/block-editor/api.component.ts'},
        {displayName: 'api.html', path: './src/block-editor/api.html'},
        {displayName: 'api.component.css', path: './src/block-editor/api.component.css'},
        {displayName: 'blockData.ts', path: './src/block-editor/blockData.ts'}
    ] },
    { path: ':theme/block-editor/events', component: BlockEditorEventsComponent, name: 'Events', description: 'This demo showcases how to handle and interact with various event actions provided by the Block Editor component.', category: 'Block Editor', order: '01', sourceFiles: [
        {displayName: 'events.component.ts', path: './src/block-editor/events.component.ts'},
        {displayName: 'events.html', path: './src/block-editor/events.html'},
        {displayName: 'events.component.css', path: './src/block-editor/events.component.css'},
        {displayName: 'blockData.ts', path: './src/block-editor/blockData.ts'}
    ] },
];

export const BlockEditorSampleModule: ModuleWithProviders<any> = RouterModule.forChild(blockEditorAppRoutes);
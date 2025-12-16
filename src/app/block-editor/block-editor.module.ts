import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { BlockEditorOverviewComponent } from './overview.component';
import { BlockEditorAPIComponent } from './api.component';
import { BlockEditorEventsComponent } from './events.component';
import { BlockEditorPasteSettingsComponent } from './pasteSettings.component';
import { MarkdownBlocksEditor } from "./MarkdownBlocks.component";
import { TemplateGalleryblock } from "./template-gallery.component";

export const blockEditorAppRoutes: Object[] = [
    { path: ':theme/block-editor/overview', component: BlockEditorOverviewComponent, name: 'Overview', description: 'This demo describes basic and advanced features of the Block Editor control with all its tools and functionalities.', category: 'Block Editor', order: '01', sourceFiles: [
        {displayName: 'overview.component.ts', path: './src/block-editor/overview.component.ts'},
        {displayName: 'overview.html', path: './src/block-editor/overview.html'},
        {displayName: 'overview.component.css', path: './src/block-editor/overview.component.css'},
        {displayName: 'blockData.json', path: './src/block-editor/blockData.json'}
    ] },
    { path: ':theme/block-editor/pasteSettings', component: BlockEditorPasteSettingsComponent, name: 'Paste Cleanup', description: 'This demo covers important Paste Settings of the JS Block control.', category: 'Block Editor', type: 'new', order: '01', sourceFiles: [
        {displayName: 'pasteSettings.component.ts', path: './src/block-editor/pasteSettings.component.ts'},
        {displayName: 'pasteSettings.html', path: './src/block-editor/pasteSettings.html'},
        {displayName: 'pasteSettings.component.css', path: './src/block-editor/pasteSettings.component.css'},
        {displayName: 'blockData.json', path: './src/block-editor/blockData.json'}
    ] },
    { path: ':theme/block-editor/api', component: BlockEditorAPIComponent, name: 'API', description: 'This demo covers important APIs of the JS Block Editor such as HTML encoding, read-only, Drag and Drop, and more.', category: 'Block Editor', order: '01', sourceFiles: [
        {displayName: 'api.component.ts', path: './src/block-editor/api.component.ts'},
        {displayName: 'api.html', path: './src/block-editor/api.html'},
        {displayName: 'api.component.css', path: './src/block-editor/api.component.css'},
        {displayName: 'blockData.json', path: './src/block-editor/blockData.json'}
    ] },
    { path: ':theme/block-editor/events', component: BlockEditorEventsComponent, name: 'Events', description: 'This demo showcases how to handle and interact with various event actions provided by the Block Editor component.', category: 'Block Editor', order: '01', sourceFiles: [
        {displayName: 'events.component.ts', path: './src/block-editor/events.component.ts'},
        {displayName: 'events.html', path: './src/block-editor/events.html'},
        {displayName: 'events.component.css', path: './src/block-editor/events.component.css'},
        {displayName: 'blockData.json', path: './src/block-editor/blockData.json'}
    ] },
        { path: ':theme/block-editor/template-gallery', component: TemplateGalleryblock, name: 'Template Gallery', description: 'This demo covers fully-featured Template Gallery built with the Block Editor', category: 'Use Cases', type: 'new', order: '02', sourceFiles: [
        {displayName: 'template-gallery.component.ts', path: './src/block-editor/template-gallery.component.ts'},
        {displayName: 'template-gallery.html', path: './src/block-editor/template-gallery.html'},
        {displayName: 'template-gallery.component.css', path: './src/block-editor/template-gallery.component.css'},
        {displayName: 'blockData.json', path: './src/block-editor/blockData.json'}
    ] },
    { path: ':theme/block-editor/MarkdownBlocks', component: MarkdownBlocksEditor, name: 'Markdown Blocks', description: 'This demo covers fully-featured documentation viewer built with the Block Editor', category: 'Use Cases', type: 'new', order: '02', sourceFiles: [
        {displayName: 'MarkdownBlocks.component.ts', path: './src/block-editor/MarkdownBlocks.component.ts'},
        {displayName: 'MarkdownBlocks.html', path: './src/block-editor/MarkdownBlocks.html'},
        {displayName: 'MarkdownBlocks.component.css', path: './src/block-editor/MarkdownBlocks.component.css'},
        {displayName: 'blockData.json', path: './src/block-editor/blockData.json'}
    ] }
];

export const BlockEditorSampleModule: ModuleWithProviders<any> = RouterModule.forChild(blockEditorAppRoutes);
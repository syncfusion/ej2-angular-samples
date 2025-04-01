import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarkdownDefaultComponent } from './default-functionalities.component';
import { MarkdownOverviewComponent } from './overview.component';
import { MarkdownCustomComponent } from './custom-format.component';
import { MarkdownMentionComponent } from'./mention-integration.component';
export const mdeAppRoutes: Object[] = [
    { path: ':theme/mark-down-editor/overview', component: MarkdownOverviewComponent, name: 'Overview', description: 'This demo shows how to render a angular Markdown editor with LIVE preview for markdown content editing using a third-party library, "marked js".', order: '01', category: 'Markdown Editor' },
    { path: ':theme/mark-down-editor/default-functionalities', component: MarkdownDefaultComponent, name: 'Default Functionalities', description: 'This demo covers all supported features and functionalities of the JavaScript Markdown editor, which  is another mode of the angular Rich Text Editor.', order: '01', category: 'Markdown Editor'},   
    { path: ':theme/mark-down-editor/custom-format', component: MarkdownCustomComponent, name: 'Custom Format', description: 'This demo explains how to convert markdown content (with the custom format) to valid HTML markup using Markdown-to-HTML of the markdown parser in angular', order: '01', category: 'Markdown Editor' },
    { path: ':theme/mark-down-editor/mention-integration', component: MarkdownMentionComponent, name: '@ Mention', description: 'This demo covers all supported features and functionalities of the JavaScript Markdown editor along with mention-integration, which  is another mode of the angular Rich Text Editor', order: '01', category: 'Markdown Editor' }
]

export const MDESampleModule: ModuleWithProviders<any> = RouterModule.forChild(mdeAppRoutes);
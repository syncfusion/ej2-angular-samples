import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ListViewAllModule } from '@syncfusion/ej2-angular-lists';
import { AccordionAllModule } from '@syncfusion/ej2-angular-navigations';
import { DefaultSplitterComponent } from './default.component';
import { DetailsViewComponent } from './details-view.component';
import { AccordionNavigationMenuComponent } from './accordion-navigation-menu.component';
import { OutlookSplitterComponent } from './outlook-style-layout.component';
import { CodeEditorLayoutComponent } from './code-editor-layout.component';
import { ExpandCollapseComponent } from './expand-and-collapse.component';

import { SharedModule } from '../common/shared.module';
export const splitterAppRoutes: Object[] = [
    { path: ':theme/splitter/default', component: DefaultSplitterComponent, name: 'Default Functionalities', order: '01', category: 'Splitter', description: 'The example explains the default functionalities of the Angular splitter with resizable panes, separator, and orientation (horizontal and vertical).' },
	{ path: ':theme/splitter/expand-and-collapse', 'type': 'new', component: ExpandCollapseComponent, name: 'Expand and Collapse', order: '01', category: 'Splitter', description: 'The example presents collapsible JavaScript Splitter that exposes expand and collapse action of panes with a different orientation and resizable panes.' },
    { path: ':theme/splitter/accordion-navigation-menu', component: AccordionNavigationMenuComponent, name: 'Accordion Navigation Menu', order: '02', category: 'Use Case', description: 'The example shows how to integrate Accordion and load the content from external sources using the Ajax library inside panes of Angular Splitter.' },
    { path: ':theme/splitter/details-view', component: DetailsViewComponent, name: 'Details View', order: '02', category: 'Use Case', description: 'The example demonstrates how to create employee details view layout using panes of Angular Splitter and ListView with navigation.' },
    { path: ':theme/splitter/outlook-style-layout', component: OutlookSplitterComponent, name: 'Outlook-style Layout', order: '02', category: 'Use Case', description: 'The example explains how to construct an outlook style layout using Angular Splitter, TreeView, ListView, and Rich Text Editor with multiple panes.' },
    { path: ':theme/splitter/code-editor-layout', component: CodeEditorLayoutComponent, name: 'Code Editor Layout', order: '02', category: 'Use Case', description: 'The example shows how to construct code editor layout (UI) using Angular Splitter with multiple, nested, different oriented, and resizable panes.' }
];

export const splitterRouter: ModuleWithProviders = RouterModule.forChild(splitterAppRoutes);

@NgModule({
    imports: [splitterRouter, SplitterModule, SharedModule,CommonModule, TextBoxModule, ListViewAllModule, AccordionAllModule],
    declarations: [
        DefaultSplitterComponent,
        DetailsViewComponent,
        OutlookSplitterComponent,
        CodeEditorLayoutComponent,
        AccordionNavigationMenuComponent,
		ExpandCollapseComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class splitterSampleModule {
}
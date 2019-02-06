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

import { SharedModule } from '../common/shared.module';
export const splitterAppRoutes: Object[] = [
    { path: ':theme/splitter/default', component: DefaultSplitterComponent, name: 'Default Functionalities', order: '01', category: 'Splitter' },
    { path: ':theme/splitter/accordion-navigation-menu', component: AccordionNavigationMenuComponent, name: 'Accordion Navigation Menu', order: '02', category: 'Use Case' },
    { path: ':theme/splitter/details-view', component: DetailsViewComponent, name: 'Details View', order: '02', category: 'Use Case' },
    { path: ':theme/splitter/outlook-style-layout', component: OutlookSplitterComponent, name: 'Outlook-style Layout', order: '02', category: 'Use Case' },
    { path: ':theme/splitter/code-editor-layout', component: CodeEditorLayoutComponent, name: 'Code Editor Layout', order: '02', category: 'Use Case' }
];

export const splitterRouter: ModuleWithProviders = RouterModule.forChild(splitterAppRoutes);

@NgModule({
    imports: [splitterRouter, SplitterModule, SharedModule,CommonModule, TextBoxModule, ListViewAllModule, AccordionAllModule],
    declarations: [
        DefaultSplitterComponent,
        DetailsViewComponent,
        OutlookSplitterComponent,
        CodeEditorLayoutComponent,
        AccordionNavigationMenuComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class splitterSampleModule {
}
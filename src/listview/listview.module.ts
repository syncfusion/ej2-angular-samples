import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DefaultListViewComponent } from './default.component';
import { RemoteListViewComponent } from './remote-list.component';
import { NestedListViewComponent } from './nested-list.component';
import { GroupTemplateListViewComponent } from './group-template.component';
import { ChecklistListViewComponent } from './checklist.component';
import { TemplateListViewComponent } from './template.component';
import { CallHistoryListViewComponent } from './call-history.component';
import { VirtualizationListViewComponent } from './virtualization.component';
import { SharedModule } from '../common/shared.module';
import { CommonModule } from '@angular/common';
import { VirtualizationService } from '@syncfusion/ej2-angular-lists';

export const listAppRoutes: Object[] = [
    {
        path: ':theme/listview/default',
        component: DefaultListViewComponent,
        order: '01',
        name: 'Default Functionalities',
        category: 'ListView',
        description: 'Demo of Essential JS 2 ListView control default renderings of flat and group list views. Click any list item to select and highlight it.'
    }, {
        path: ':theme/listview/remote-list',
        component: RemoteListViewComponent,
        order: '01',
        name: 'Remote List',
        category: 'ListView',
       description: 'Demo of Essential JS 2 ListView control rendering the list view with remote data, which uses DataManager and query properties to fetch data.'
    }, {
        path: ':theme/listview/checklist',
        component: ChecklistListViewComponent,
        order: '01',
        name: 'Checklist',
        category: 'ListView',
       description: 'Essential JS 2 ListView control demo of the checked list view, which supports selecting more than one list item.'
    }, {
        path: ':theme/listview/nested-list',
        component: NestedListViewComponent,
        order: '01',
        name: 'Nested List',
        category: 'ListView',
       description: 'Demo of Essential JS 2 ListView control showing the visual representation of nested data using the child property.'
    }, {
        path: ':theme/listview/virtualization',
        component: VirtualizationListViewComponent,
        order: '01',
        name: 'Virtualization',
        category: 'ListView',
       description: 'Demo of Essential JS 2 ListView control loading items in the view port with virtualization, which improves performance when loading large amounts of data.'
    }, {
        path: ':theme/listview/group-template',
        component: GroupTemplateListViewComponent,
        order: '02',
        name: 'Group Template',
        category: 'Customization',
       description: 'Essential JS 2 ListView control demo of list item and header customization using a template. The mobile settings showcase built-in CSS.'
    }, {
        path: ':theme/listview/template',
        component: TemplateListViewComponent,
        name: 'Template',
        order: '02',
        category: 'Customization',
       description: 'Demo of Essential JS 2 ListView control rendering customized elements inside list items. This sample is a news feed application built using a list view.'
    }, {
        path: ':theme/listview/call-history',
        component: CallHistoryListViewComponent,
        name: 'Call History',
        order: '03',
        category: 'Use Case',
       description: 'Demo of Essential JS 2 ListView control in a real-world use case as a call history app, featuring mobile contacts, mail inbox, and more.'
    }
]

export const ListviewRouter: ModuleWithProviders = RouterModule.forChild(listAppRoutes);

@NgModule({
    imports: [ListviewRouter, SharedModule, CommonModule],
    declarations: [
        DefaultListViewComponent,
        GroupTemplateListViewComponent,
        CallHistoryListViewComponent,
        TemplateListViewComponent,
        ChecklistListViewComponent,
        RemoteListViewComponent,
        NestedListViewComponent,
        VirtualizationListViewComponent
    ],
    exports: [DefaultListViewComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [VirtualizationService]
})
export class ListViewSampleModule {
}

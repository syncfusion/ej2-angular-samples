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
        category: 'ListView'
    }, {
        path: ':theme/listview/remote-list',
        component: RemoteListViewComponent,
        order: '01',
        name: 'Remote List',
        category: 'ListView'
    }, {
        path: ':theme/listview/checklist',
        component: ChecklistListViewComponent,
        order: '01',
        name: 'Checklist',
        category: 'ListView'
    }, {
        path: ':theme/listview/nested-list',
        component: NestedListViewComponent,
        order: '01',
        name: 'Nested List',
        category: 'ListView'
    }, {
        path: ':theme/listview/virtualization',
        component: VirtualizationListViewComponent,
        order: '01',
        name: 'Virtualization',
        category: 'ListView',
        type: 'update'
    }, {
        path: ':theme/listview/group-template',
        component: GroupTemplateListViewComponent,
        order: '02',
        name: 'Group Template',
        category: 'Customization',
        type: 'update'
    }, {
        path: ':theme/listview/template',
        component: TemplateListViewComponent,
        name: 'Template',
        order: '02',
        category: 'Customization',
        type: 'update'
    }, {
        path: ':theme/listview/call-history',
        component: CallHistoryListViewComponent,
        name: 'Call History',
        order: '03',
        category: 'Use Case',
        type: 'update'
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

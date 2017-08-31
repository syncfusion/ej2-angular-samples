import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DefaultListViewComponent } from './default.component';
import { RTLListViewComponent } from './rtl.component';
import { RemoteListViewComponent } from './remote-list.component';
import { NestedListViewComponent } from './nested-list.component';
import { SharedModule } from '../common/shared.module';
export const listAppRoutes: Object[] = [
    { path: 'listview/default', component: DefaultListViewComponent, name: 'Default Functionalities', category: 'ListView' },
    { path: 'listview/remote-list', component: RemoteListViewComponent, name: 'Remote List', category: 'ListView' },
    { path: 'listview/nested-list', component: NestedListViewComponent, name: 'Nested List', category: 'ListView' },
    { path: 'listview/rtl', component: RTLListViewComponent, name: 'RTL', category: 'ListView' }
];

export const ListviewRouter: ModuleWithProviders = RouterModule.forChild(listAppRoutes);

@NgModule({
    imports: [ListviewRouter, SharedModule],
    declarations: [
        DefaultListViewComponent,
        RTLListViewComponent,
        RemoteListViewComponent,
        NestedListViewComponent
    ],
    exports:[DefaultListViewComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListViewSampleModule {
}
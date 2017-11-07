import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TreeViewModule } from '@syncfusion/ej2-ng-navigations';

import { DefaultTreeViewComponent } from './default.component';
import { IconsTreeViewComponent } from './icons.component';
import { EditTreeViewComponent } from './editing.component';
import { MultiselectTreeViewComponent } from './multiselect.component';
import { DragdropTreeViewComponent } from './dragdrop.component';
import { TemplateTreeViewComponent } from './template.component';
import { PlainTreeViewComponent } from './plaindata.component';
import { RemoteTreeViewComponent } from './remotedata.component';
import { RTLTreeViewComponent } from './rtl.component';
import { CheckboxTreeViewComponent } from './checkbox.component';


import { SharedModule } from '../common/shared.module';

export const treeAppRoutes: Object[] = [
    { path: ':theme/treeview/default', component: DefaultTreeViewComponent, name: 'Default Functionalities', order: '01', category: 'TreeView' },
    { path: ':theme/treeview/icons', component: IconsTreeViewComponent, name: 'Icons and Images', order: '01',category: 'TreeView' },
    { path: ':theme/treeview/checkbox', component: CheckboxTreeViewComponent, name: 'Checkbox', order: '01', category: 'TreeView' },
    { path: ':theme/treeview/editing', component: EditTreeViewComponent, name: 'Node Editing', order: '01', category: 'TreeView' },
    { path: ':theme/treeview/multiselect', component: MultiselectTreeViewComponent, name: 'Multiple Selection', order: '01', category: 'TreeView', hideOnDevice: true },
    { path: ':theme/treeview/dragdrop', component: DragdropTreeViewComponent, name: 'Drag and Drop', order: '01', category: 'TreeView' },
    { path: ':theme/treeview/template', component: TemplateTreeViewComponent, name: 'Template', order: '01', category: 'TreeView' },
    { path: ':theme/treeview/rtl', component: RTLTreeViewComponent, name: 'RTL', order: '01', category: 'TreeView' },
    { path: ':theme/treeview/plaindata', component: PlainTreeViewComponent, name: 'Local Data', order: '02', category: 'Data Binding' },
    { path: ':theme/treeview/remotedata', component: RemoteTreeViewComponent, name: 'Remote Data', order: '02', category: 'Data Binding' },
];

export const TreeviewRouter: ModuleWithProviders = RouterModule.forChild(treeAppRoutes);

@NgModule({
    imports: [TreeviewRouter, TreeViewModule, SharedModule],
    declarations: [
        DefaultTreeViewComponent,
        IconsTreeViewComponent,
        EditTreeViewComponent,
        MultiselectTreeViewComponent,
        DragdropTreeViewComponent,
        TemplateTreeViewComponent,
        PlainTreeViewComponent,
        RemoteTreeViewComponent,
        RTLTreeViewComponent,
        CheckboxTreeViewComponent
    ],
    exports:[DefaultTreeViewComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TreeViewSampleModule {
}
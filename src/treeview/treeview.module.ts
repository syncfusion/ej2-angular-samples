import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';

import { DefaultTreeViewComponent } from './default.component';
import { IconsTreeViewComponent } from './icons.component';
import { EditTreeViewComponent } from './node-editing.component';
import { MultiselectTreeViewComponent } from './multiple-selection.component';
import { DragdropTreeViewComponent } from './drag-and-drop.component';
import { TemplateTreeViewComponent } from './template.component';
import { PlainTreeViewComponent } from './plain-data.component';
import { RemoteTreeViewComponent } from './remote-data.component';
import { RTLTreeViewComponent } from './right-to-left.component';
import { CheckboxTreeViewComponent } from './check-box.component';


import { SharedModule } from '../common/shared.module';

export const treeAppRoutes: Object[] = [
    { path: ':theme/treeview/default', component: DefaultTreeViewComponent, name: 'Default Functionalities', order: '01', category: 'TreeView', description: "This demo for Essential JS2 TreeView control shows the default functionalities of the TreeView." },
    { path: ':theme/treeview/icons', component: IconsTreeViewComponent, name: 'Icons and Images', order: '01',category: 'TreeView', description: "This demo for Essential JS2 TreeView control shows that the node can be configured by icons/images in TreeView" },
    { path: ':theme/treeview/check-box', component: CheckboxTreeViewComponent, name: 'Checkbox', order: '01', category: 'TreeView',  description: "This demo for Essential JS2 TreeView control shows the checkBox functionalities of the TreeView"},
    { path: ':theme/treeview/node-editing', component: EditTreeViewComponent, name: 'Node Editing', order: '01', category: 'TreeView', description: "This demo for Essential JS2 TreeView control shows the node editing functionalities of the TreeView" },
    { path: ':theme/treeview/multiple-selection', component: MultiselectTreeViewComponent, name: 'Multiple Selection', order: '01', category: 'TreeView', hideOnDevice: true , description: "This demo for Essential JS2 TreeView control shows the multiple node selection functionalities of the TreeView"},
    { path: ':theme/treeview/drag-and-drop', component: DragdropTreeViewComponent, name: 'Drag and Drop', order: '01', category: 'TreeView', hideOnDevice: true, type: 'update',  description: "This demo for Essential JS2 TreeView control shows the drag and drop functionalities of TreeView" },
    { path: ':theme/treeview/template', component: TemplateTreeViewComponent, name: 'Template', order: '01', category: 'TreeView', type: 'update',  description: "This demo for Essential JS2 TreeView control shows the template functionalities of TreeView" },
    { path: ':theme/treeview/right-to-left', component: RTLTreeViewComponent, name: 'RTL', order: '01', category: 'TreeView', description: "This demo for Essential JS2 TreeView control shows the RTL mode of TreeView" },
    { path: ':theme/treeview/plain-data', component: PlainTreeViewComponent, name: 'Local Data', order: '02', category: 'Data Binding', description: "This demo for Essential JS2 TreeView control shows the binding of local data to the TreeView" },
    { path: ':theme/treeview/remote-data', component: RemoteTreeViewComponent, name: 'Remote Data', order: '02', category: 'Data Binding', description: "This demo for Essential JS2 TreeView control shows binding data to the TreeView from remote data source" },
];

export const TreeviewRouter: ModuleWithProviders = RouterModule.forChild(treeAppRoutes);

@NgModule({
    imports: [TreeviewRouter, SharedModule , CommonModule, BrowserModule],
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
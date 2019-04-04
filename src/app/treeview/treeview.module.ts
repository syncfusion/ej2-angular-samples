import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { DefaultTreeViewComponent } from './default.component';
import { IconsTreeViewComponent } from './icons.component';
import { EditTreeViewComponent } from './node-editing.component';
import { MultiselectTreeViewComponent } from './multiple-selection.component';
import { DragdropTreeViewComponent } from './drag-and-drop.component';
import { TemplateTreeViewComponent } from './template.component';
import { PlainTreeViewComponent } from './plain-data.component';
import { RemoteTreeViewComponent } from './remote-data.component';
import { CheckboxTreeViewComponent } from './check-box.component';
import { CheckBoxModule  } from '@syncfusion/ej2-angular-buttons';


import { SharedModule } from '../common/shared.module';

export const treeAppRoutes: Object[] = [
    { path: ':theme/treeview/default', component: DefaultTreeViewComponent, name: 'Default Functionalities', order: '01', category: 'TreeView', description: "This demo demonstrates the basic tree view component that display the data in a hierarchical structure with the configuration options." },
    { path: ':theme/treeview/icons', component: IconsTreeViewComponent, name: 'Icons and Images', order: '01',category: 'TreeView', description: "The tree view nodes can be rendered with any custom icons. This sample demonstrated like a file system with custom icons and images." },
    { path: ':theme/treeview/check-box', component: CheckboxTreeViewComponent, name: 'Checkbox', order: '01', category: 'TreeView',  description: "This demo demonstrates the tree view with checkbox functionality, this allows the user to check more than one tree nodes.", type: 'update' },
    { path: ':theme/treeview/node-editing', component: EditTreeViewComponent, name: 'Node Editing', order: '01', category: 'TreeView', description: "This demo showcases the node editing functionality of tree view, you can edit any node text by double click on it or pressing F2." },
    { path: ':theme/treeview/multiple-selection', component: MultiselectTreeViewComponent, name: 'Multiple Selection', order: '01', category: 'TreeView', hideOnDevice: true , description: "The TreeView component allows to select multiple nodes by pressing CTRL key, also can select the range of nodes by pressing SHIFT key."},
    { path: ':theme/treeview/drag-and-drop', component: DragdropTreeViewComponent, name: 'Drag and Drop', order: '01', category: 'TreeView', hideOnDevice: true, description: "The tree view nodes can be drag and drop from one position to another, also the drop can be done to another tree view or other external container." },
    { path: ':theme/treeview/template', component: TemplateTreeViewComponent, name: 'Template', order: '01', category: 'TreeView', description: "The tree view node can be customized through the template option. In this demo the tree view nodes are templated like an mail system." },
    { path: ':theme/treeview/plain-data', component: PlainTreeViewComponent, name: 'Local Data', order: '02', category: 'Data Binding', description: "This demo demonstrates the binding of local data to the tree view. The local data structure can be hierarchical data or list data." },
    { path: ':theme/treeview/remote-data', component: RemoteTreeViewComponent, name: 'Remote Data', order: '02', category: 'Data Binding', description: "This demo demonstrates the binding of data to the tree view from remote data source." },
];

export const TreeviewRouter: ModuleWithProviders = RouterModule.forChild(treeAppRoutes);

@NgModule({
    imports: [TreeviewRouter, SharedModule , CommonModule, BrowserModule, CheckBoxModule],
    declarations: [
        DefaultTreeViewComponent,
        IconsTreeViewComponent,
        EditTreeViewComponent,
        MultiselectTreeViewComponent,
        DragdropTreeViewComponent,
        TemplateTreeViewComponent,
        PlainTreeViewComponent,
        RemoteTreeViewComponent,
        CheckboxTreeViewComponent
    ],
    exports: [DefaultTreeViewComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TreeViewSampleModule {
}

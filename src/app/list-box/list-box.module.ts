import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultListBoxComponent } from './default.component';
import { DualListBoxComponent } from './dual-list-box.component';
import { DragAndDropListBoxComponent } from './drag-and-drop.component';
import { CheckboxListBoxComponent } from './checkbox.component';
import { ApiListBoxComponent } from './api.component';
import { ListBoxAllModule, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SharedModule } from '../common/shared.module';

export const listBoxAppRoutes: Object[] = [
    { path: ':theme/list-box/default', component: DefaultListBoxComponent, name: 'Default Functionalities', category: 'List Box', order: '01', description: 'This example demonstrates the default functionalities of Syncfusion TypeScript ListBox component with minimum configuration.' },
    { path: ':theme/list-box/dual-list-box', component: DualListBoxComponent, name: 'Dual List Box', category: 'List Box', order: '01', description: 'This example demonstrates how to move items between the two list boxes using dual list box functionality.' },
    { path: ':theme/list-box/drag-and-drop', component: DragAndDropListBoxComponent, name: 'Drag And Drop', category: 'List Box', order: '01', description: 'This example demonstrates how to drag and drop within the Syncfusion TypeScript ListBox and between two list boxes.' },
    { path: ':theme/list-box/checkbox', component: CheckboxListBoxComponent, name: 'Checkbox', category: 'List Box', order: '01', description: 'This example demonstrates how to select multiple items from the Syncfusion TypeScript ListBox using checkbox functionality.' },
    { path: ':theme/list-box/api', component: ApiListBoxComponent, name: 'API', category: 'List Box', order: '01', description: 'This example how to customize the Syncfusion Typescript ListBox component using the available set of APIs.' }
];

export const listBoxRouter: ModuleWithProviders = RouterModule.forChild(listBoxAppRoutes);

@NgModule({
    imports: [listBoxRouter, ListBoxAllModule, DropDownListModule, SharedModule],
    declarations: [
        DefaultListBoxComponent,
        DualListBoxComponent,
        DragAndDropListBoxComponent,
        CheckboxListBoxComponent,
        ApiListBoxComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListBoxSampleModule { }

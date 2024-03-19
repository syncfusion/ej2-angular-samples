import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { DefaultDropDownTreeComponent } from './default.component';
import { IconsDropDownTreeComponent } from './icons.component';
import { CheckBoxDropDownTreeComponent } from './checkbox.component';
import { CustomTemplateDropDownTreeComponent } from './custom-template.component';
import { MultiSelectDropDownTreeComponent } from './multiple-selection.component';
import { TemplateDropDownTreeComponent } from './template.component';
import { FilteringDropDownTreeComponent } from './filtering.component';
import { LocalDropDownTreeComponent } from './local-data.component';
import { RemoteDropDownTreeComponent } from './remote-data.component';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
export const dropdowntreeAppRoutes: Object[] = [
    { path: ':theme/drop-down-tree/default', component: DefaultDropDownTreeComponent, name: 'Default Functionalities',category: 'DropDown Tree', description: 'This example demonstrates the default functionalities of the Angular drop-down tree component with minimum configuration.', order: '01'},
    { path: ':theme/drop-down-tree/icons', component: IconsDropDownTreeComponent, name: 'Icons and Images',category: 'DropDown Tree', description: 'The drop-down tree can be rendered with any custom icons. This sample demonstrated like a file system with custom icons and images.', order: '01'},
    { path: ':theme/drop-down-tree/checkbox', component: CheckBoxDropDownTreeComponent, name: 'Checkbox',category: 'DropDown Tree', description: 'This demo demonstrates the drop-down tree with checkbox functionality, this allows the user to check more than one item.', order: '01'},
    { path: ':theme/drop-down-tree/multiple-selection', component: MultiSelectDropDownTreeComponent, name: 'Multiple Selection',category: 'DropDown Tree', description: 'The drop-down tree component allows to select multiple item by pressing CTRL key, also can select the range of items by pressing SHIFT key.', order: '01'},
    { path: ':theme/drop-down-tree/template', component: TemplateDropDownTreeComponent, name: 'Template',category: 'DropDown Tree', description: 'This example demonstrates how to customize the appearance of each item in the Angular drop-down tree component pop-up item using the template.', order: '01'},
    { path: ':theme/drop-down-tree/custom-template', component: CustomTemplateDropDownTreeComponent, name: 'Custom Template',category: 'DropDown Tree', description: 'This example demonstrates how to customize the display text of the selected items in the Angular drop-down tree component using the customTemplate', order: '01'},
    { path: ':theme/drop-down-tree/filtering', component: FilteringDropDownTreeComponent, name: 'Filtering',category: 'DropDown Tree', description: 'This example demonstrates how the filtering functionalities works based on the typed characters in the Angular drop-down tree component.', order: '01'},
    { path: ':theme/drop-down-tree/local-data', component: LocalDropDownTreeComponent, name: 'Local Data',category: 'Data Binding', description: 'This demo demonstrates the binding of local data to the Angular drop-down tree component. The local data structure can be hierarchical data or list data.', order: '02'},
    { path: ':theme/drop-down-tree/remote-data', component: RemoteDropDownTreeComponent, name: 'Remote Data',category: 'Data Binding', description: 'This demo demonstrates the binding of data to the Angular drop-down tree component from remote data source.', order: '02'},
];

export const DropDownTreeSampleModule: ModuleWithProviders<any> = RouterModule.forChild(dropdowntreeAppRoutes);


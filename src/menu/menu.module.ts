import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../common/shared.module';

import { DefaultMenuController } from './default.component';
import { TemplateMenuController } from './template.component';
import { DataBindingMenuController } from './data-binding.component';
import { ApiMenuController } from './api.component';
import { ToolbarMenuController } from './toolbar-integration.component';
import { ScrollableMenuController } from './scrollable.component';
import { CommonModule } from '@angular/common';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { MenuModule, ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';

export const menuAppRoutes: Object[] = [
    { path: ':theme/menu/default', component: DefaultMenuController, name: 'Default Functionalities', category: 'Menu Bar', description: 'This demo for Syncfusion Essential JS2 Menu control demonstrates the default functionalities. It shows menu items with icon, text, separator and its sub menu.' },
    { path: ':theme/menu/data-binding', component: DataBindingMenuController, name: 'Data Binding', category: 'Menu Bar', description: 'This demo for Essential JS2 Menu control shows data binding of the local data source. It can either be hierarchical or self-referential data.' },
    { path: ':theme/menu/scrollable', component: ScrollableMenuController, name: 'Scrollable', category: 'Menu Bar', description: 'This demo for Essential JS2 Menu control shows the horizontal / vertical scrollable menu. It allows to load menu and sub menus with large number of menu items.', type: 'new' },
    { path: ':theme/menu/template', component: TemplateMenuController, name: 'Template', category: 'Menu Bar', description: 'This demo for Essential JS2 Menu control shows the template functionalities. It supports customization of menu items using data source with fields.' },
    { path: ':theme/menu/api', component: ApiMenuController, name: 'API', category: 'Menu Bar', description: 'This demo for Essential JS2 Menu control shows the supported APIs and its functionalities. It includes enable/disable item, show item on click and orientation.' },
    { path: ':theme/menu/toolbar-integration', component: ToolbarMenuController, name: 'Toolbar Integration', category: 'Menu Bar', description: 'This demo for Essential JS2 Menu control shows integration of Menu in the toolbar control and its customization using button, drop-down button, and text box.' },
];

export const menuRouter: ModuleWithProviders = RouterModule.forChild(menuAppRoutes);

@NgModule({
    imports: [menuRouter, MenuModule, SharedModule, CommonModule, CheckBoxModule, ToolbarModule, DropDownButtonModule, MultiSelectAllModule],
    declarations: [
        DefaultMenuController,
        DataBindingMenuController,
        ScrollableMenuController,
        TemplateMenuController,
        ApiMenuController,
        ToolbarMenuController
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MenuSampleModule { }
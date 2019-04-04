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
    { path: ':theme/menu/default', component: DefaultMenuController, name: 'Default Functionalities', category: 'Menu Bar', description: 'This example demonstrates the Syncfusion Angular Menu items with icons, text, separator and items submenu.' },
    { path: ':theme/menu/data-binding', component: DataBindingMenuController, name: 'Data Binding', category: 'Menu Bar', description: 'This example demonstrates how to bind local data source with Syncfusion Angular Menu component.' },
    { path: ':theme/menu/scrollable', component: ScrollableMenuController, name: 'Scrollable', category: 'Menu Bar', description: 'This example demonstrates how to load menu and sub menus with large number of menu items in horizontal / vertical scrollable Syncfusion Angular menu.' },
    { path: ':theme/menu/template', component: TemplateMenuController, name: 'Template', category: 'Menu Bar', description: 'This example demonstrates how to customize Syncfusion Angular Menu popup items by using templates.' },
    { path: ':theme/menu/api', component: ApiMenuController, name: 'API', category: 'Menu Bar', description: 'This example demonstrates the supported APIs and its functionalities of the Syncfusion Angular Menu.' },
    { path: ':theme/menu/toolbar-integration', component: ToolbarMenuController, name: 'Toolbar Integration', category: 'Menu Bar', description: 'This example demonstrates the real use case of the Syncfusion Angular Menu in web application. It is integrated with toolbar component.' },
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
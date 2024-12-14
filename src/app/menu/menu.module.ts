import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';


import { DefaultMenuController } from './default.component';
import { TemplateMenuController } from './template.component';
import { DataBindingMenuController } from './data-binding.component';
import { ApiMenuController } from './api.component';
import { ToolbarMenuController } from './toolbar-integration.component';
import { ScrollableMenuController } from './scrollable.component';
import { HamburgerMenuController } from './hamburger-mode.component';
import { CommonModule } from '@angular/common';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { MenuModule, ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';

export const menuAppRoutes: Object[] = [
    { path: ':theme/menu/default', component: DefaultMenuController, name: 'Default Functionalities', order: '01', category: 'Menu Bar', description: 'This example demonstrates the Syncfusion<sup>®</sup> Angular Menu items with icons, text, separator and items submenu.' },
    { path: ':theme/menu/data-binding', component: DataBindingMenuController, name: 'Data Binding', order: '01', category: 'Menu Bar', description: 'This example demonstrates how to bind local data source with Syncfusion<sup>®</sup> Angular Menu component.' },
    { path: ':theme/menu/scrollable', component: ScrollableMenuController, name: 'Scrollable', order: '01', category: 'Menu Bar', description: 'This example demonstrates how to load menu and sub menus with large number of menu items in horizontal / vertical scrollable Syncfusion<sup>®</sup> Angular menu.' },
    { path: ':theme/menu/template', component: TemplateMenuController, name: 'Template', order: '01', category: 'Menu Bar', description: 'This example demonstrates how to customize Syncfusion<sup>®</sup> Angular Menu popup items by using templates.' },
    { path: ':theme/menu/hamburger-mode', component: HamburgerMenuController, name: 'Hamburger Mode', order: '01', category: 'Menu Bar', description: 'This example demonstrates the hamburger mode of the Syncfusion<sup>®</sup> Angular Menu that enables the adaptive view.' },
    { path: ':theme/menu/api', component: ApiMenuController, name: 'API', order: '01', category: 'Menu Bar', description: 'This example demonstrates the supported APIs and its functionalities of the Syncfusion<sup>®</sup> Angular Menu.' },
    { path: ':theme/menu/toolbar-integration', component: ToolbarMenuController, name: 'Toolbar Integration', order: '02', category: 'Use Case', description: 'This example demonstrates the real use case of the Syncfusion<sup>®</sup> Angular Menu in web application. It is integrated with toolbar component.' },
];

export const MenuSampleModule: ModuleWithProviders<any> = RouterModule.forChild(menuAppRoutes);


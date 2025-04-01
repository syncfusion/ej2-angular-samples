import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultContextMenuController } from './default.component';
import { ContextMenuModule  } from '@syncfusion/ej2-angular-navigations';
import { TemplateContextMenuController } from './template.component';


export const contextMenuAppRoutes: Object[] = [
    { path: ':theme/context-menu/default', component: DefaultContextMenuController, name: 'Default Functionalities', category: 'Context Menu', description: 'This example demonstrates the Syncfusion<sup>®</sup> Angular ContextMenu items with icons, text and separator.' },
    { path: ':theme/context-menu/template', component: TemplateContextMenuController, name: 'Template', category: 'Context Menu', description: 'This sample demonstrates the template support functionalities of the ContextMenu. You can customize the menu items using templates to enhance flexibility and integrate custom content.' }
];

export const MenuModule: ModuleWithProviders<any> = RouterModule.forChild(contextMenuAppRoutes);


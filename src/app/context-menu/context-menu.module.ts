import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultContextMenuController } from './default.component';
import { ContextMenuModule  } from '@syncfusion/ej2-angular-navigations';


export const contextMenuAppRoutes: Object[] = [
    { path: ':theme/context-menu/default', component: DefaultContextMenuController, name: 'Default Functionalities', category: 'Context Menu', description: 'This example demonstrates the Syncfusion Angular ContextMenu items with icons, text and separator.' }
];

export const MenuModule: ModuleWithProviders<any> = RouterModule.forChild(contextMenuAppRoutes);


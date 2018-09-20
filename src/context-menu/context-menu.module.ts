import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultContextMenuController } from './default.component';
import { ContextMenuModule  } from '@syncfusion/ej2-angular-navigations';
import { SharedModule } from '../common/shared.module';

export const contextMenuAppRoutes: Object[] = [
    { path: ':theme/context-menu/default', component: DefaultContextMenuController, name: 'Default Functionalities', category: 'ContextMenu', description: 'This demo for Essential JS2 ContextMenu control shows the context menu items with icons, text and separator. It supports multiple levels of submenus.' }
];

export const contextMenuRouter: ModuleWithProviders = RouterModule.forChild(contextMenuAppRoutes);

@NgModule({
    imports: [contextMenuRouter, ContextMenuModule, SharedModule],
    declarations: [
        DefaultContextMenuController
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MenuModule { }
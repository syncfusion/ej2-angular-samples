import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultContextMenuController } from './default.component';
import { ContextMenuModule  } from '@syncfusion/ej2-ng-navigations';
import { SharedModule } from '../common/shared.module';

export const contextMenuAppRoutes: Object[] = [
    { path: ':theme/contextmenu/default', component: DefaultContextMenuController, name: 'Default Functionalities', category: 'ContextMenu' }
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
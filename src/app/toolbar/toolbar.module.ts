import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';

import { DefaultToolbarComponent } from './default.component';
import { PopupToolbarComponent } from './popup.component';
import { AlignToolbarComponent } from './alignment.component';
import { SharedModule } from '../common/shared.module';
export const toolbarAppRoutes: Object[] = [
    { path: ':theme/toolbar/default', component: DefaultToolbarComponent, name: 'Default Functionalities', description: 'The sample demonstrates the default functionalities of the Toolbar component which place commands with the scrollable mode in Angular platform.', category: 'Toolbar' },
    { path: ':theme/toolbar/popup', component: PopupToolbarComponent, name: 'Popup', description: 'The sample exposes popup mode of Toolbar component which configures overflowing toolbar commands inside a popup based on priority in Angular platform.', category: 'Toolbar' },
    { path: ':theme/toolbar/alignment', component: AlignToolbarComponent, name: 'Alignment', description: 'This sample demonstrates how to align commands in left, right and center position in Toolbar component in Angular platform.', category: 'Toolbar' }

];

export const toolbarRouter: ModuleWithProviders = RouterModule.forChild(toolbarAppRoutes);

@NgModule({
    imports: [toolbarRouter, ToolbarModule, SharedModule],
    declarations: [
        DefaultToolbarComponent,
        PopupToolbarComponent,
        AlignToolbarComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ToolbarSampleModule {
}
import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';

import { DefaultToolbarComponent } from './default.component';
import { PopupToolbarComponent } from './popup.component';
import { RtlToolbarComponent } from './right-to-left.component';
import { AlignToolbarComponent } from './alignment.component';
import { SharedModule } from '../common/shared.module';
export const toolbarAppRoutes: Object[] = [
    { path: ':theme/toolbar/default', component: DefaultToolbarComponent, name: 'Default Functionalities', description: 'This demo for Essential JS2 Toolbar control shows the default functionalities of the Toolbar.', category: 'Toolbar' },
    { path: ':theme/toolbar/popup', component: PopupToolbarComponent, name: 'Popup', description: 'This demo for Essential JS2 Toolbar control shows Popup mode in the Toolbar.', category: 'Toolbar' },
    { path: ':theme/toolbar/alignment', component: AlignToolbarComponent, name: 'Alignment', description: 'This demo for Essential JS2 Toolbar control shows aligning the Toolbar commands in left, right and center position.', category: 'Toolbar' },
    { path: ':theme/toolbar/right-to-left', component: RtlToolbarComponent, name: 'RTL', description: 'This demo for Essential JS2 Toolbar control shows RTL mode of the Toolbar.', category: 'Toolbar' }

];

export const toolbarRouter: ModuleWithProviders = RouterModule.forChild(toolbarAppRoutes);

@NgModule({
    imports: [toolbarRouter, ToolbarModule, SharedModule],
    declarations: [
        DefaultToolbarComponent,
        PopupToolbarComponent,
        RtlToolbarComponent,
        AlignToolbarComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ToolbarSampleModule {
}
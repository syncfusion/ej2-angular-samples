import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ToolbarModule } from '@syncfusion/ej2-ng-navigations';

import { DefaultToolbarComponent } from './default.component';
import { PopupToolbarComponent } from './popup.component';
import { RtlToolbarComponent } from './rtl.component';
import { AlignToolbarComponent } from './alignment.component';
import { SharedModule } from '../common/shared.module';
export const toolbarAppRoutes: Object[] = [
    { path: 'toolbar/default', component: DefaultToolbarComponent, name: 'Default Functionalities', category: 'Toolbar', 'type': 'update' },
    { path: 'toolbar/popup', component: PopupToolbarComponent, name: 'Popup', category: 'Toolbar' },
    { path: 'toolbar/alignment', component: AlignToolbarComponent, name: 'Alignment', category: 'Toolbar' },
    { path: 'toolbar/rtl', component: RtlToolbarComponent, name: 'RTL', category: 'Toolbar' }

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
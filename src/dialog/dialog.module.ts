import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@syncfusion/ej2-ng-popups';
import { DefaultDialogComponent } from './basic.component';
import { ModalDialogComponent } from './modal.component';
import { RTLDialogComponent } from './rtl.component';
import { AjaxDialogComponent } from './ajax.component';
import { SharedModule } from '../common/shared.module';

export const dialogAppRoutes: Object[] = [
    { path: ':theme/dialog/basic', component: DefaultDialogComponent, name: 'Basic Usage', category: 'Dialog' },
    { path: ':theme/dialog/modal', component: ModalDialogComponent, name: 'Modal', category: 'Dialog' },
    { path: ':theme/dialog/ajax', component: AjaxDialogComponent, name: 'Ajax Content', category: 'Dialog' },
    { path: ':theme/dialog/rtl', component: RTLDialogComponent, name: 'RTL', category: 'Dialog' }
];

export const DialogRouter: ModuleWithProviders = RouterModule.forChild(dialogAppRoutes);

@NgModule({
    imports: [DialogRouter, SharedModule, DialogModule],
    declarations: [
        DefaultDialogComponent,
        ModalDialogComponent,
        RTLDialogComponent,
        AjaxDialogComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DialogSampleModule {
}

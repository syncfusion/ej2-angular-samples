import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@syncfusion/ej2-ng-popups';
import { BasicDialogComponent } from './default.component';
import { DefaultDialogComponent } from './basic.component';
import { ModalDialogComponent } from './modal.component';
import { AjaxDialogComponent } from './ajax.component';
import { TemplateDialogComponent } from './template.component';
import { SharedModule } from '../common/shared.module';

export const dialogAppRoutes: Object[] = [
    { path: ':theme/dialog/default', component: BasicDialogComponent, name: 'Default Functionalities', category: 'Dialog' },
    { path: ':theme/dialog/basic', component: DefaultDialogComponent, name: 'Custom Dialogs', category: 'Dialog' },
    { path: ':theme/dialog/modal', component: ModalDialogComponent, name: 'Modal', category: 'Dialog' },
    { path: ':theme/dialog/ajax', component: AjaxDialogComponent, name: 'Ajax Content', category: 'Dialog' },
    { path: ':theme/dialog/template', component: TemplateDialogComponent, name: 'Template', category: 'Dialog' }
];

export const DialogRouter: ModuleWithProviders = RouterModule.forChild(dialogAppRoutes);

@NgModule({
    imports: [DialogRouter, SharedModule, DialogModule],
    declarations: [
        BasicDialogComponent,
        DefaultDialogComponent,
        ModalDialogComponent,
        TemplateDialogComponent,
        AjaxDialogComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DialogSampleModule {
}

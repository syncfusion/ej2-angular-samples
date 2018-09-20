import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { BasicDialogComponent } from './default.component';
import { DefaultDialogComponent } from './custom-dialog.component';
import { ModalDialogComponent } from './modal-dialog.component';
import { AjaxDialogComponent } from './dialog-contents-via-ajax.component';
import { AnimationDialogComponent } from './animation.component';
import { DraggableDialogComponent } from './draggable.component';
import { PositioningDialogComponent } from './position.component';
import { MultipleDialogsDialogComponent } from './multiple-dialogs.component';
import { TemplateDialogComponent } from './template.component';
import { SharedModule } from '../common/shared.module';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';

export const dialogAppRoutes: Object[] = [
    { path: ':theme/dialog/default', component: BasicDialogComponent, name: 'Default Functionalities', category: 'Dialog' },
    { path: ':theme/dialog/custom-dialog', component: DefaultDialogComponent, name: 'Custom Dialogs', category: 'Dialog' },
    { path: ':theme/dialog/modal-dialog', component: ModalDialogComponent, name: 'Modal', category: 'Dialog' },
    { path: ':theme/dialog/template', component: TemplateDialogComponent, name: 'Template', category: 'Dialog' },
    { path: ':theme/dialog/dialog-contents-via-ajax', component: AjaxDialogComponent, name: 'Ajax Content', category: 'Dialog' },
    { path: ':theme/dialog/draggable', component: DraggableDialogComponent, name: 'Draggable', category: 'Dialog', type: 'new' },
    { path: ':theme/dialog/position', component: PositioningDialogComponent, name: 'Positioning', category: 'Dialog', type: 'new' },
    { path: ':theme/dialog/animation', component: AnimationDialogComponent, name: 'Animation', category: 'Dialog', type: 'new' },
    { path: ':theme/dialog/multiple-dialogs', component: MultipleDialogsDialogComponent, name: 'Multiple Dialogs', category: 'Dialog', type: 'new' }
];

export const DialogRouter: ModuleWithProviders = RouterModule.forChild(dialogAppRoutes);

@NgModule({
    imports: [DialogRouter, RadioButtonModule, CheckBoxModule, SharedModule, DialogModule],
    declarations: [
        BasicDialogComponent,
        DefaultDialogComponent,
        ModalDialogComponent,
        TemplateDialogComponent,
        AjaxDialogComponent,
        DraggableDialogComponent,
        PositioningDialogComponent,
        AnimationDialogComponent,
        MultipleDialogsDialogComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DialogSampleModule {
}

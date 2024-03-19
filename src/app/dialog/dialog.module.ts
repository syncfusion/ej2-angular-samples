import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { BasicDialogComponent } from './default.component';
import { ModalDialogComponent } from './modal-dialog.component';
import { AjaxDialogComponent } from './dialog-contents-via-ajax.component';
import { ResizableDialogComponent } from './resizable.component';
import { AnimationDialogComponent } from './animation.component';
import { DraggableDialogComponent } from './draggable.component';
import { PositioningDialogComponent } from './position.component';
import { MultipleDialogsDialogComponent } from './multiple-dialogs.component';
import { TemplateDialogComponent } from './template.component';

import { DialogMultipleComponent } from './multiple-components.component';
import { CheckBoxModule , ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';

import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { TabAllModule } from '@syncfusion/ej2-angular-navigations';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { ChartAllModule, AccumulationChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { ScheduleAllModule, RecurrenceEditorAllModule } from '@syncfusion/ej2-angular-schedule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

export const dialogAppRoutes: Object[] = [
    { path: ':theme/dialog/default', component: BasicDialogComponent, name: 'Default Functionalities', category: 'Dialog', description: 'The example demonstrates the default rendering of the Angular dialog, which supports modal and non-modal (modeless), built-in buttons, and more.' },
    { path: ':theme/dialog/modal-dialog', component: ModalDialogComponent, name: 'Modal', category: 'Dialog', description: 'This example demonstrates the modal pop-up behavior of the Angular dialog component, which helps display critical information such as errors and warnings.' },
    { path: ':theme/dialog/template', component: TemplateDialogComponent, name: 'Template', category: 'Dialog', description: 'This example demonstrates how to customize user interface elements like the header, footer, and content of the Angular dialog component using a template.' },
    { path: ':theme/dialog/dialog-contents-via-ajax', component: AjaxDialogComponent, name: 'Ajax Content', category: 'Dialog', description: 'The example demonstrates how to load the content of the Angular dialog component from external sources such as a file or website using Ajax library.' },
    { path: ':theme/dialog/draggable', component: DraggableDialogComponent, name: 'Draggable', category: 'Dialog', description: 'This example shows how to enable drag-and-drop actions in the Angular dialog component to help reposition the dialog efficiently.' },
    { path: ':theme/dialog/resizable', component: ResizableDialogComponent, name: 'Resizable', category: 'Dialog', description: 'This example shows how to create resizable modal in the Angular dialog to change the size of a dialog efficiently and view its content more comfortably.' },
    { path: ':theme/dialog/position', component: PositioningDialogComponent, name: 'Positioning', category: 'Dialog', description: 'This example demonstrates how to display the Angular dialog component at various built-in and custom positions.' },
    { path: ':theme/dialog/animation', component: AnimationDialogComponent, name: 'Animation', category: 'Dialog', description: 'This example demonstrates how to open or close the Angular dialog with various animation effects, and how to customize the animation duration and delay.' },
    { path: ':theme/dialog/multiple-dialogs', component: MultipleDialogsDialogComponent, name: 'Multiple Dialogs', category: 'Dialog', description: 'This example shows how to display multiple dialogs sequentially and open multiple dialogs simultaneously for both modal and modeless Angular dialogs.' },
    { path: ':theme/dialog/multiple-components', component: DialogMultipleComponent, name: 'Components inside Dialog', category: 'Dialog', description: 'This example demonstrates how to render other Javascript Syncfusion components inside the dialog component.' }
];

export const DialogSampleModule: ModuleWithProviders<any> = RouterModule.forChild(dialogAppRoutes);



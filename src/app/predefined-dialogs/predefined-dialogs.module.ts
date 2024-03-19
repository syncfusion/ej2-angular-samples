import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DefaultDialogComponent } from './default.component';
import { CustomizationDialogComponent } from './customization.component';
import { AnimationDialogComponent } from './animation.component';

import { CheckBoxModule , ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { TabAllModule } from '@syncfusion/ej2-angular-navigations';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { ChartAllModule, AccumulationChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { ScheduleAllModule, RecurrenceEditorAllModule } from '@syncfusion/ej2-angular-schedule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

export const predefinedDialogsAppRoutes: Object[] = [
    { path: ':theme/predefined-dialogs/default', component: DefaultDialogComponent, name: 'Default Functionalities', category: 'Predefined Dialogs', description: 'The example demonstrates the default rendering of the angular Predifined dialogs' },
    { path: ':theme/predefined-dialogs/customization', component: CustomizationDialogComponent, name: 'Customization', category: 'Predefined Dialogs', description: 'This example demonstrates how to create custom predefined dialogs such as alert, confirmation, and prompt dialog using the angular predefined dialog component.' },
    { path: ':theme/predefined-dialogs/animation', component: AnimationDialogComponent, name: 'Animation', category: 'Predefined Dialogs', description: 'This example demonstrates how to open or close the angular Predefined dialog with various animation effects and how to customize the animation duration and delay.' },
   ];

export const PredefinedDialogsSampleModule: ModuleWithProviders<any> = RouterModule.forChild(predefinedDialogsAppRoutes);



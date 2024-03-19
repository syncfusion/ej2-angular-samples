import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultTabComponent } from './default.component';
import { OrientationTabComponent } from './orientation.component';
import { ResponsiveTabComponent } from './responsive-modes.component';
import { WizardTabComponent } from './wizard.component';
import { DragAndDropComponent } from './drag-and-drop.component';
import { KeyboardTabComponent } from './keyboard-interaction.component';


import { TabAllModule } from '@syncfusion/ej2-angular-navigations';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { DialogAllModule } from '@syncfusion/ej2-angular-popups';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { NumericTextBoxAllModule, UploaderAllModule } from '@syncfusion/ej2-angular-inputs';
import { AutoCompleteAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { ScheduleAllModule } from '@syncfusion/ej2-angular-schedule';
import { CalendarAllModule, DateRangePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { TreeViewModule  } from '@syncfusion/ej2-angular-navigations';

export const tabAppRoutes: Object[] = [
    { path: ':theme/tab/default', component: DefaultTabComponent, name: 'Default Functionalities', description: 'The sample demonstrates about default functionalities of the Tab component (also known as Tabbed UI) which is navigation component in Angular platform.', category: 'Tab' },
    { path: ':theme/tab/orientation', component: OrientationTabComponent, name: 'Orientation', description: 'The sample demonstrates how to customize the orientation of Tab component along with feasibility to customize the Tab header styles in Angular platform.', category: 'Tab' },
    { path: ':theme/tab/responsive-modes', component: ResponsiveTabComponent, name: 'Responsive Modes', description: 'The sample illustrates that responsive mode of Tab component that aligns tab items in a  scrollable or popup mode in Angular platform.', category: 'Tab' },
    { path: ':theme/tab/wizard', component: WizardTabComponent, name: 'Wizard', description: 'This sample demonstrates how to design a wizard-like application with the sequential action using the Tab component in Angular platform.', category: 'Tab' },
    { path: ':theme/tab/drag-and-drop', component: DragAndDropComponent, name: 'Drag And Drop', description: 'This example demonstrates how to reorder the loaded tabs and how to add a new tab from the external source.', category: 'Tab' },
    { path: ':theme/tab/keyboard-interaction', component: KeyboardTabComponent, name: 'Keyboard Interaction', description: 'This example showcases the keyboard shortcuts applicable on Tab component in Angular platform', category: 'Tab' }
];

export const TabSampleModule: ModuleWithProviders<any> = RouterModule.forChild(tabAppRoutes);


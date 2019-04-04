import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultTabComponent } from './default.component';
import { OrientationTabComponent } from './orientation.component';
import { ResponsiveTabComponent } from './responsive-modes.component';
import { WizardTabComponent } from './wizard.component';
import { SharedModule } from '../common/shared.module';

import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { DialogAllModule } from '@syncfusion/ej2-angular-popups';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { AutoCompleteAllModule } from '@syncfusion/ej2-angular-dropdowns';

export const tabAppRoutes: Object[] = [
    { path: ':theme/tab/default', component: DefaultTabComponent, name: 'Default Functionalities', description: 'The sample demonstrates about default functionalities of the Tab component (also known as Tabbed UI) which is navigation component in Angular platform.', category: 'Tab' },
    { path: ':theme/tab/orientation', component: OrientationTabComponent, name: 'Orientation', description: 'The sample demonstrates how to customize the orientation of Tab component along with feasibility to customize the Tab header styles in Angular platform.', category: 'Tab' },
    { path: ':theme/tab/responsive-modes', component: ResponsiveTabComponent, name: 'Responsive Modes', description: 'The sample illustrates that responsive mode of Tab component that aligns tab items in a  scrollable or popup mode in Angular platform.', category: 'Tab' },
    { path: ':theme/tab/wizard', component: WizardTabComponent, name: 'Wizard', description: 'This sample demonstrates how to design a wizard-like application with the sequential action using the Tab component in Angular platform.', category: 'Tab' }
];

export const tabRouter: ModuleWithProviders = RouterModule.forChild(tabAppRoutes);

@NgModule({
    imports: [tabRouter, SharedModule, NumericTextBoxAllModule, GridAllModule, DialogAllModule, DatePickerAllModule, AutoCompleteAllModule],
    declarations: [
        DefaultTabComponent,
        OrientationTabComponent,
        ResponsiveTabComponent,
        WizardTabComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabSampleModule {
}
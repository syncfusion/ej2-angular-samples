import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultTabComponent } from './default.component';
import { OrientationTabComponent } from './orientation.component';
import { ResponsiveTabComponent } from './responsivemodes.component';
import { RTLTabComponent } from './rtl.component';
import { WizardTabComponent } from './wizard.component';
import { SharedModule } from '../common/shared.module';

import { GridAllModule } from '@syncfusion/ej2-ng-grids';
import { DialogAllModule } from '@syncfusion/ej2-ng-popups';
import { DatePickerAllModule } from '@syncfusion/ej2-ng-calendars';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-ng-inputs';
import { AutoCompleteAllModule } from '@syncfusion/ej2-ng-dropdowns';

export const tabAppRoutes: Object[] = [
    { path: ':theme/tab/default', component: DefaultTabComponent, name: 'Default Functionalities', category: 'Tab' },
    { path: ':theme/tab/orientation', component: OrientationTabComponent, name: 'Orientation', category: 'Tab' },
    { path: ':theme/tab/responsivemodes', component: ResponsiveTabComponent, name: 'Responsive Modes', category: 'Tab' },
    { path: ':theme/tab/rtl', component: RTLTabComponent, name: 'RTL', category: 'Tab' },
    { path: ':theme/tab/wizard', component: WizardTabComponent, name: 'Wizard', category: 'Tab', type: 'new' }
];

export const tabRouter: ModuleWithProviders = RouterModule.forChild(tabAppRoutes);

@NgModule({
    imports: [tabRouter, SharedModule, NumericTextBoxAllModule, GridAllModule, DialogAllModule, DatePickerAllModule, AutoCompleteAllModule],
    declarations: [
        DefaultTabComponent,
        OrientationTabComponent,
        ResponsiveTabComponent,
        RTLTabComponent,
        WizardTabComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabSampleModule {
}
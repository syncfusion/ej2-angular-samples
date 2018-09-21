import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultTabComponent } from './default.component';
import { OrientationTabComponent } from './orientation.component';
import { ResponsiveTabComponent } from './responsive-modes.component';
import { RTLTabComponent } from './right-to-left.component';
import { WizardTabComponent } from './wizard.component';
import { SharedModule } from '../common/shared.module';

import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { DialogAllModule } from '@syncfusion/ej2-angular-popups';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { AutoCompleteAllModule } from '@syncfusion/ej2-angular-dropdowns';

export const tabAppRoutes: Object[] = [
    { path: ':theme/tab/default', component: DefaultTabComponent, name: 'Default Functionalities', description: 'This demo for Essential JS2 Tab control shows the default functionalities of the Tab.', category: 'Tab' },
    { path: ':theme/tab/orientation', component: OrientationTabComponent, name: 'Orientation', description: 'This demo for Essential JS2 Tab control shows header orientation of the Tab.', category: 'Tab' },
    { path: ':theme/tab/responsive-modes', component: ResponsiveTabComponent, name: 'Responsive Modes', description: 'This demo for Essential JS2 Tab control shows responsive modes of the Tab.', category: 'Tab' },
    { path: ':theme/tab/right-to-left', component: RTLTabComponent, name: 'RTL', description: 'This demo for Essential JS2 Tab control shows RTL mode of the Tab.', category: 'Tab' },
     { path: ':theme/tab/wizard', component: WizardTabComponent, name: 'Wizard', description: 'This demo for Essential JS2 Tab control shows simple train reservation wizard that enable/disable Tab items based on sequential validation of each Tab content.', category: 'Tab' },
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
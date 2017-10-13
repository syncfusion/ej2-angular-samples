import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabModule } from '@syncfusion/ej2-ng-navigations';
import { DefaultTabComponent } from './default.component';
import { OrientationTabComponent } from './orientation.component';
import { ResponsiveTabComponent } from './responsivemodes.component';
import { RTLTabComponent } from './rtl.component';
import { SharedModule } from '../common/shared.module';

export const tabAppRoutes: Object[] = [
    { path: ':theme/tab/default', component: DefaultTabComponent, name: 'Default Functionalities', category: 'Tab' },
    { path: ':theme/tab/orientation', component: OrientationTabComponent, name: 'Orientation', category: 'Tab' },
    { path: ':theme/tab/responsivemodes', component: ResponsiveTabComponent, name: 'Responsive Modes', category: 'Tab' },
    { path: ':theme/tab/rtl', component: RTLTabComponent, name: 'RTL', category: 'Tab' },
];

export const tabRouter: ModuleWithProviders = RouterModule.forChild(tabAppRoutes);

@NgModule({
    imports: [tabRouter, TabModule, SharedModule],
    declarations: [
        DefaultTabComponent,
        OrientationTabComponent,
        ResponsiveTabComponent,
        RTLTabComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabSampleModule {
}
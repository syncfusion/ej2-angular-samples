import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';
import { CheckBoxModule, ButtonAllModule} from '@syncfusion/ej2-angular-buttons';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { TextBoxModule, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ChartAllModule, AccumulationChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { DefaultCalendarComponent } from './default.component';
import { PredefinedLayoutsComponent } from './predefined-layouts.component';
import { PropertiesComponent } from './properties.component';
import { AnalyticsDashboardComponent } from './analytics-dashboard.component';
import { MapsAllModule } from '@syncfusion/ej2-angular-maps';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';

export const dashboardlayoutAppRoutes: Object[] = [
    { path: ':theme/dashboard-layout/default', component: DefaultCalendarComponent, name: 'Default Functionalities', order: '01', category: 'Dashboard Layout' },
    { path: ':theme/dashboard-layout/predefined-layouts', component: PredefinedLayoutsComponent, name: 'Predefined Layouts', order: '01', category: 'Dashboard Layout' },
    { path: ':theme/dashboard-layout/properties', component: PropertiesComponent, name: 'API', order: '01', category: 'Dashboard Layout' },
    { path: ':theme/dashboard-layout/analytics-dashboard', component: AnalyticsDashboardComponent, name: 'SEO Analytics Dashboard', order: '02', category: 'Use Case' }
];

export const DashboardLayoutRouter: ModuleWithProviders = RouterModule.forChild(dashboardlayoutAppRoutes);

@NgModule({
    imports: [DashboardLayoutRouter,NumericTextBoxModule, MapsAllModule,AutoCompleteModule, DashboardLayoutModule, CheckBoxModule,SidebarModule, ButtonAllModule, TextBoxModule, ChartAllModule, AccumulationChartAllModule, RangeNavigatorAllModule],
    declarations: [
        DefaultCalendarComponent,
        PredefinedLayoutsComponent,
        PropertiesComponent,
        AnalyticsDashboardComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: []
})
export class DashboardLayoutSampleModule {
}

import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultSidebarComponent } from './default.component';
import { DockSidebarComponent } from './docking-sidebar.component';
import { ApiSidebarComponent } from './api.component';
import { SidebarListComponent } from './sidebar-list.component';
import { SidebarMenuComponent } from './sidebar-menu.component';
import { ResponsivePanelComponent } from './responsive-panel.component';
import { RadioButtonModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SidebarModule, MenuAllModule, TreeViewAllModule} from '@syncfusion/ej2-angular-navigations';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ListViewAllModule } from '@syncfusion/ej2-angular-lists';
import { SharedModule } from '../common/shared.module';

export const sidebarAppRoutes: Object[] = [
    { path: ':theme/sidebar/default', component: DefaultSidebarComponent, name: 'Default Functionalities', category: 'Sidebar' },
    { path: ':theme/sidebar/docking-sidebar', component: DockSidebarComponent, name: 'Dock', category: 'Sidebar' },
    { path: ':theme/sidebar/api', component: ApiSidebarComponent, name: "API", category: 'Sidebar' },
    { path: ':theme/sidebar/sidebar-menu', component: SidebarMenuComponent, name: 'Sidebar Menu', category: 'Sidebar','type':'new'},
    { path: ':theme/sidebar/responsive-panel', component: ResponsivePanelComponent, name: 'Responsive Panel', category: 'Sidebar','type':'new' },
    { path: ':theme/sidebar/sidebar-list', component: SidebarListComponent, name: 'Sidebar With ListView', category: 'Sidebar' },
    
];
export const SidebarRouter: ModuleWithProviders = RouterModule.forChild(sidebarAppRoutes);
@NgModule({
    imports: [SidebarRouter, SidebarModule, SharedModule, RadioButtonModule, MenuAllModule, DropDownListModule, ButtonModule, TreeViewAllModule, ListViewAllModule],
    declarations: [
        DefaultSidebarComponent,
        DockSidebarComponent,
        ApiSidebarComponent,
        SidebarListComponent,
        SidebarMenuComponent,
        ResponsivePanelComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SidebarSampleModule {
}
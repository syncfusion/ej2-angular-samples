import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultController } from './default.component';
import { TypesController } from './types.component';
import { NotificationController } from './notification.component';
import { ListviewController } from './list-view.component';
import { accordionController } from './accordion.component';
import { ToolbarController } from './toolbar.component';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { SharedModule } from '../common/shared.module';

export const badgeAppRoutes: Object[] = [
    { path: ':theme/badge/default', component: DefaultController, order: '01', name: 'Default', category: 'Badge' },
    { path: ':theme/badge/types', component: TypesController, order: '01', name: 'Types', category: 'Badge' },
    { path: ':theme/badge/notification', component: NotificationController, order: '01', name: 'Notification', category: 'Badge' },
    { path: ':theme/badge/listview', component: ListviewController, order: '02', name: 'ListView', category: 'Integration' },
    { path: ':theme/badge/accordion', component: accordionController, order: '02', name: 'Accordion', category: 'Integration' },
    { path: ':theme/badge/toolbar', component: ToolbarController, order: '02', name: 'Toolbar', category: 'Integration' }
];

export const badgeRouter: ModuleWithProviders = RouterModule.forChild(badgeAppRoutes);

@NgModule({
    imports: [badgeRouter, SharedModule, ToolbarModule, AccordionModule, ListViewModule],
    declarations: [
        DefaultController, TypesController, NotificationController, ListviewController, accordionController, ToolbarController
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BadgeModule { }

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
    { path: ':theme/badge/default', component: DefaultController, order: '01', name: 'Default', category: 'Badge', description: 'This example demonstrates to create Syncfusion notification badge to display notification count in Angular group button.' },
    { path: ':theme/badge/types', component: TypesController, order: '01', name: 'Types', category: 'Badge', description: 'This example demonstrates types of Syncfusion badges in Angular application, those are primary, secondary, success, danger, warning, info, light & dark.' },
    { path: ':theme/badge/notification', component: NotificationController, order: '01', name: 'Notification', category: 'Badge', description: 'This example demonstrates how to display Syncfusion notification badge on popular social media logos such as facebook, whatsapp & twitter in Angular application.' },
    { path: ':theme/badge/listview', component: ListviewController, order: '02', name: 'ListView', category: 'Integration', description: 'This example demonstrates how to add Syncfusion badge with Angular listview to display notification count in list item like in Gmail application.' },
    { path: ':theme/badge/accordion', component: accordionController, order: '02', name: 'Accordion', category: 'Integration', description: 'This example demonstrates how to add Syncfusion badge with Angular accordion to display unread notification count in header to achieve outlook user interface.' },
    { path: ':theme/badge/toolbar', component: ToolbarController, order: '02', name: 'Toolbar', category: 'Integration', description: 'This example demonstrates how to display important/useful information in mobile application header (toolbar) using Syncfusion badge with Angular toolbar.' }
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

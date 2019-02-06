import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultController } from './default.component';
import { TypesController } from './types.component';
import { NotificationController } from './notification.component';
import { ListviewController } from './listview.component';
import { accordionController } from './accordion.component';
import { ToolbarController } from './toolbar.component';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { SharedModule } from '../common/shared.module';

export const badgeAppRoutes: Object[] = [
    { path: ':theme/badge/default', component: DefaultController, description: 'Demo of the pure CSS Essential JS 2 Badge component displaying a notification count in a group button.',order: '01', name: 'Default', category: 'Badge' },
    { path: ':theme/badge/types', component: TypesController, description: 'Demo of the pure CSS Essential JS 2 Badge components badge types: primary, secondary, success, danger, warning, info, light, and dark.', order: '01', name: 'Types', category: 'Badge' },
    { path: ':theme/badge/notification', component: NotificationController, description: 'Demo of the pure CSS Essential JS 2 Badge component displaying notifications on popular social media logos such as Facebook, WhatsApp, Twitter, and others.', order: '01', name: 'Notification', category: 'Badge' },
    { path: ':theme/badge/listview', component: ListviewController, description: 'Demo integrating the Essential JS 2 Badge and ListView components to display a notification count in a list item to achieve a Gmail-like user interface.', order: '02', name: 'ListView', category: 'Integration' },
    { path: ':theme/badge/accordion', component: accordionController, description: 'Demo integrating the Essential JS 2 Badge and Accordion components to display an unread notification count in a header to achieve an Outlook-like user interface', order: '02', name: 'Accordion', category: 'Integration' },
    { path: ':theme/badge/toolbar', component: ToolbarController, description: 'Demo integrating the Essential JS 2 Badge and ToolBar components to display important information in a mobile application header.', order: '02', name: 'Toolbar', category: 'Integration' }
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

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


export const badgeAppRoutes: Object[] = [
    { path: ':theme/badge/default', component: DefaultController, order: '01', name: 'Default', category: 'Badge', description: 'This example demonstrates to create Syncfusion notification badge to display notification count in Angular group button.',sourceFiles: [
        {displayName: 'default.component.ts', path: './src/badge/default.component.ts'},
        {displayName: 'default.html', path: './src/badge/default.html'},
        {displayName: 'default.css', path: './src/badge/default.css'}
    ] },
    { path: ':theme/badge/types', component: TypesController, order: '01', name: 'Types', category: 'Badge', description: 'This example demonstrates types of Syncfusion badges in Angular application, those are primary, secondary, success, danger, warning, info, light & dark.',sourceFiles: [
        {displayName: 'types.component.ts', path: './src/badge/types.component.ts'},
        {displayName: 'types.html', path: './src/badge/types.html'},
        {displayName: 'types.css', path: './src/badge/types.css'}
    ] },
    { path: ':theme/badge/notification', component: NotificationController, order: '01', name: 'Notification', category: 'Badge', description: 'This example demonstrates how to display Syncfusion notification badge on popular social media logos such as facebook, whatsapp & twitter in Angular application.',sourceFiles: [
        {displayName: 'notification.component.ts', path: './src/badge/notification.component.ts'},
        {displayName: 'notification.html', path: './src/badge/notification.html'},
        {displayName: 'notification.css', path: './src/badge/notification.css'}
    ] },
    { path: ':theme/badge/list-view', component: ListviewController, order: '02', name: 'ListView', category: 'Integration', description: 'This example demonstrates how to add Syncfusion badge with Angular listview to display notification count in list item like in Gmail application.',sourceFiles: [
        {displayName: 'list-view.component.ts', path: './src/badge/list-view.component.ts'},
        {displayName: 'list-view.html', path: './src/badge/list-view.html'},
        {displayName: 'list-view.css', path: './src/badge/list-view.css'}
    ] },
    { path: ':theme/badge/accordion', component: accordionController, order: '02', name: 'Accordion', category: 'Integration', description: 'This example demonstrates how to add Syncfusion badge with Angular accordion to display unread notification count in header to achieve outlook user interface.',sourceFiles: [
        {displayName: 'accordion.component.ts', path: './src/badge/accordion.component.ts'},
        {displayName: 'accordion.html', path: './src/badge/accordion.html'},
        {displayName: 'accordion.css', path: './src/badge/accordion.css'}
    ] },
    { path: ':theme/badge/toolbar', component: ToolbarController, order: '02', name: 'Toolbar', category: 'Integration', description: 'This example demonstrates how to display important/useful information in mobile application header (toolbar) using Syncfusion badge with Angular toolbar.',sourceFiles: [
        {displayName: 'toolbar.component.ts', path: './src/badge/toolbar.component.ts'},
        {displayName: 'toolbar.html', path: './src/badge/toolbar.html'},
        {displayName: 'toolbar.css', path: './src/badge/toolbar.css'}
    ] }
];

export const BadgeModule: ModuleWithProviders<any> = RouterModule.forChild(badgeAppRoutes);



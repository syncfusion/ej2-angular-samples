import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { DefaultBreadcrumbController } from './default.component';
import { BindToLocationController } from './bind-to-location.component';
import { KeyboardNavigationController } from './keyboard-navigation.component';
import { TemplateAndCustomizationController } from './template-and-customization.component';
import { BreadcrumbAllModule, MenuModule } from '@syncfusion/ej2-angular-navigations';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { AddressBarController } from './address-bar.component';
import { EventsController } from './events.component';
import { OverFlowModesController } from './overflow-modes.component';

export const breadcrumbAppRoutes: Object[] = [
    { path: ':theme/breadcrumb/default', component: DefaultBreadcrumbController, name: 'Default Functionalities', order: '01', category: 'Breadcrumb', description: 'This example demonstrates the Syncfusion<sup>®</sup> Angular Breadcrumb items with icons, text and url along with overflow mode when exceeds maximum items count.' },
    { path: ':theme/breadcrumb/bind-to-location', component: BindToLocationController, name: 'Bind to Location', order: '01', category: 'Breadcrumb', description: 'This example demonstrates the binding of current url location to the items and items based on static url of Syncfusion<sup>®</sup> Angular Breadcrumb component.' },
    { path: ':theme/breadcrumb/template-and-customization', component: TemplateAndCustomizationController, name: 'Template and Customization', order: '01', category: 'Breadcrumb', description: 'This example demonstrates how to customize item and separator by using templates, disable, add icon for item, with the Syncfusion<sup>®</sup> Angular Breadcrumb component.' },
    { path: ':theme/breadcrumb/overflow-modes', component: OverFlowModesController, name: 'Overflow Modes', order: '01', category: 'Breadcrumb', description: 'This sample demonstrates the different types of overflow mode such as Hidden, Menu, Wrap, Collapsed, and Scroll in the Breadcrumb component.' },
    { path: ':theme/breadcrumb/events', component: EventsController, name: 'Events', order: '01', category: 'Breadcrumb', description: 'This example demonstrates Syncfusion<sup>®</sup> Angular Breadcrumb component shows the events that have been triggered during the breadcrumb actions.' },
    { path: ':theme/breadcrumb/keyboard-navigation', component: KeyboardNavigationController, name: 'Keyboard Navigation', order: '01', category: 'Breadcrumb', description: 'This example explains the key combinations used to perform various actions in Syncfusion<sup>®</sup> Angular Breadcrumb component.' },
    { path: ':theme/breadcrumb/address-bar', component: AddressBarController, name: 'Address Bar', order: '02', category: 'Use Case', description: 'This example demonstrates the use case of the Syncfusion<sup>®</sup> Angular Breadcrumb by integrating with Menu component using templates.' }
]

export const BreadcrumbSampleModule: ModuleWithProviders<any> = RouterModule.forChild(breadcrumbAppRoutes);


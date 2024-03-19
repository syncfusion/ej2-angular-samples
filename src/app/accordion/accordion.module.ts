import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

import { DefaultAccordionComponent } from './default.component';
import { TemplatesAccordionComponent } from './templates.component';
import { IconAccordionComponent } from './icon.component';
import { KeyboardAccordionComponent } from './keyboard-interaction.component';



export const accordionAppRoutes: Object[] = [
    { path: ':theme/accordion/default', component: DefaultAccordionComponent, name: 'Default Functionalities', description: 'The sample demonstrates that default functionalities of the Accordion component which works by expand and collapse action in Angular platform.', category: 'Accordion' },
    { path: ':theme/accordion/templates', component: TemplatesAccordionComponent, name: 'Templates', description: 'This sample demonstrates the template functionalities of the Accordion with an example of loading an Accordion content using ngTemplate in Angular platform.', category: 'Accordion' },
    { path: ':theme/accordion/icon', component: IconAccordionComponent, name: 'Icons', description: 'The sample demonstrates how to represent pane headers with an icon in Accordion component which populates from items collection in Angular platform.', category: 'Accordion' },
    { path: ':theme/accordion/keyboard-interaction', component: KeyboardAccordionComponent, name: 'Keyboard Interaction', description: 'The sample showcases the keyboard shortcuts applicable on Accordion component in Angular platform.', category: 'Accordion' }
];

export const AccordionSampleModule: ModuleWithProviders<any> = RouterModule.forChild(accordionAppRoutes);


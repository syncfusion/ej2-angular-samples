import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

import { DefaultAccordionComponent } from './default.component';
import { AjaxAccordionComponent } from './ajax.component';
import { IconAccordionComponent } from './icon.component';


import { SharedModule } from '../common/shared.module';
export const accordionAppRoutes: Object[] = [
    { path: ':theme/accordion/default', component: DefaultAccordionComponent, name: 'Default Functionalities', description: 'The sample demonstrates that default functionalities of the Accordion component which works by expand and collapse action in Angular platform.', category: 'Accordion' },
    { path: ':theme/accordion/ajax', component: AjaxAccordionComponent, name: 'Ajax Content', description: 'The sample demonstrates how to load the content to the Accordion component from external sources using Ajax library in Angular platform.', category: 'Accordion' },
    { path: ':theme/accordion/icon', component: IconAccordionComponent, name: 'Icons', description: 'The sample demonstrates how to represent pane headers with an icon in Accordion component which populates from items collection in Angular platform.', category: 'Accordion' },
];

export const accordionRouter: ModuleWithProviders = RouterModule.forChild(accordionAppRoutes);

@NgModule({
    imports: [accordionRouter, AccordionModule, SharedModule],
    declarations: [
        DefaultAccordionComponent,
        AjaxAccordionComponent,
        IconAccordionComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccordionSampleModule {
}
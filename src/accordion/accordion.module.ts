import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

import { DefaultAccordionComponent } from './default.component';
import { AjaxAccordionComponent } from './ajax.component';
import { IconAccordionComponent } from './icon.component';
import { RtlAccordionComponent } from './right-to-left.component';


import { SharedModule } from '../common/shared.module';
export const accordionAppRoutes: Object[] = [
    { path: ':theme/accordion/default', component: DefaultAccordionComponent, name: 'Default Functionalities', description: 'This demo for Essential JS2 Accordion control shows the default functionalities of the Accordion.', category: 'Accordion' },
    { path: ':theme/accordion/ajax', component: AjaxAccordionComponent, name: 'Ajax Content', description: 'This demo for Essential JS2 Accordion control shows rendering accordion content from external source using ajax library.', category: 'Accordion' },
    { path: ':theme/accordion/icon', component: IconAccordionComponent, name: 'Icons', description: 'This demo for Essential JS2 Accordion control shows the icon representation of the Accordion.', category: 'Accordion' },
    { path: ':theme/accordion/right-to-left', component: RtlAccordionComponent, name: 'RTL', description: 'This demo for Essential JS2 Accordion control shows RTL mode of the Accordion.', category: 'Accordion' },
];

export const accordionRouter: ModuleWithProviders = RouterModule.forChild(accordionAppRoutes);

@NgModule({
    imports: [accordionRouter, AccordionModule, SharedModule],
    declarations: [
        DefaultAccordionComponent,
        AjaxAccordionComponent,
        IconAccordionComponent,
        RtlAccordionComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccordionSampleModule {
}
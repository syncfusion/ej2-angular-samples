import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AccordionModule } from '@syncfusion/ej2-ng-navigations';

import { DefaultAccordionComponent } from './default.component';
import { AjaxAccordionComponent } from './ajax.component';
import { IconAccordionComponent } from './icon.component';
import { RtlAccordionComponent } from './rtl.component';


import { SharedModule } from '../common/shared.module';
export const accordionAppRoutes: Object[] = [
    { path: ':theme/accordion/default', component: DefaultAccordionComponent, name: 'Default Functionalities', category: 'Accordion' },
    { path: ':theme/accordion/ajax', component: AjaxAccordionComponent, name: 'Ajax Content', category: 'Accordion' },
    { path: ':theme/accordion/icon', component: IconAccordionComponent, name: 'Icons', category: 'Accordion' },
    { path: ':theme/accordion/rtl', component: RtlAccordionComponent, name: 'RTL', category: 'Accordion' },
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
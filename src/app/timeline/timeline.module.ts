import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DefaultTimelineComponent } from './default.component';
import { APITimelineComponent } from './api.component';
import { TemplateTimelineComponent } from './template.component';

export const timelineAppRoutes: Object[] = [
    { path: ':theme/timeline/default', component: DefaultTimelineComponent, order: '01', name: 'Default Functionalities', category: 'Timeline', description: 'This sample demonstrates the basic features of the JavaScript Timeline Control, including item configuration.', },
    { path: ':theme/timeline/api', component: APITimelineComponent, order: '01', name: 'API', category: 'Timeline', description: 'This sample illustrates the different API available in the Timeline Control such as Orientation, Alignment, etc.', },
    { path: ':theme/timeline/template', component: TemplateTimelineComponent, order: '01', name: 'Template', category: 'Timeline', description: 'This sample showcases how to customize the timeline using the template feature of the Timeline Control.', }
]

export const TimelineSampleModule: ModuleWithProviders<any> = RouterModule.forChild(timelineAppRoutes);



import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { RatingModule } from '@syncfusion/ej2-angular-inputs';
import { DefaultRatingComponent } from './default.component';
import { PrecisionRatingComponent } from './precision.component';
import { LabelRatingComponent } from './label.component';
import { TooltipRatingComponent } from './tooltip.component';
import { TemplateRatingComponent } from './template.component';
import { KeyboardNavigationRatingComponent } from './keyboard-navigation.component';

export const ratingAppRoutes: Object[] = [
    { path: ':theme/rating/default', component: DefaultRatingComponent, name: 'Default Functionalities', order: '01', category: 'Rating', description: 'This example demonstrates the default functionalities of the Syncfusion Angular Rating component.' },
    { path: ':theme/rating/precision', component: PrecisionRatingComponent, name: 'Precision', order: '01', category: 'Rating', description: 'This example demonstrates the functionalities of the precision(Full, Half and Exact) in Syncfusion Angular Rating control.' },
    { path: ':theme/rating/tooltip', component: TooltipRatingComponent, name: 'Tooltip', order: '01', category: 'Rating', description: 'This example demonstrates the functionalities of tooltip and its template in Syncfusion Angular Rating control.' },
    { path: ':theme/rating/label', component: LabelRatingComponent, name: 'Label', order: '01', category: 'Rating', description: 'This example demonstrates the functionalities of label positions and its template in Syncfusion Angular Rating control.' },
    { path: ':theme/rating/template', component: TemplateRatingComponent, name: 'Template', order: '01', category: 'Rating', description: 'This example demonstrates the functionalities of different types of template in Syncfusion Angular Rating control.' },
    { path: ':theme/rating/keyboard-navigation', component: KeyboardNavigationRatingComponent, name: 'Keyboard Navigations', order: '01', category: 'Rating', description: 'This example demonstrates the keyboard navigations of Syncfusion Angular Rating control.' }
];

export const RatingSampleModule: ModuleWithProviders<any> = RouterModule.forChild(ratingAppRoutes);



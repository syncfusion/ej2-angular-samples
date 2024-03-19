import { NgModule, Type, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PagerAllModule } from '@syncfusion/ej2-angular-grids';
import { DefaultPagerComponent } from './default.component';
import { LocalizationComponent } from './localization.component';
import { ApiComponent } from './api.component';
import { ModuleWithProviders } from '@angular/core';

export const pagerRouteConfig: Object[] = [
    { 'path': ':theme/pager/default', component: DefaultPagerComponent, 'name': 'Default Functionalities', order: '01', category: 'Pager' },
    { 'path': ':theme/pager/localization', component: LocalizationComponent, 'name': 'Localization', order: '01', category: 'Pager' },
    { 'path': ':theme/pager/api', component: ApiComponent, 'name': 'API', order: '01', category: 'Pager' }
    ];

export const PagerSampleModule: ModuleWithProviders<any> = RouterModule.forChild(pagerRouteConfig);
    

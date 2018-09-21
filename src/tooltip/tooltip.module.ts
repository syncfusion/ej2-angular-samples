import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TooltipModule } from '@syncfusion/ej2-angular-popups';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { CommonModule } from '@angular/common';

import { DefaultTooltipComponent } from './default.component';
import { TemplateTooltipComponent } from './template.component';
import { AjaxContentTooltipComponent } from './ajax-content.component';
import { DraggableTooltipComponent } from './smart-position.component';
import { SharedModule } from '../common/shared.module';
export const tooltipAppRoutes: Object[] = [
    { path: ':theme/tooltip/default', component: DefaultTooltipComponent, name: 'Default Functionalities', category: 'Tooltip' },
    { path: ':theme/tooltip/template', component: TemplateTooltipComponent, name: 'Template', category: 'Tooltip' },
    { path: ':theme/tooltip/ajaxcontent', component: AjaxContentTooltipComponent, name: 'Ajax Content', category: 'Tooltip' },
    { path: ':theme/tooltip/smartposition', component: DraggableTooltipComponent, name: 'Smart Positioning', category: 'Tooltip' }
];

export const tooltipRouter: ModuleWithProviders = RouterModule.forChild(tooltipAppRoutes);

@NgModule({
    imports: [tooltipRouter, TooltipModule, ToolbarModule, ListViewModule, SharedModule, CommonModule],
    declarations: [
        DefaultTooltipComponent,
        TemplateTooltipComponent,
        AjaxContentTooltipComponent,
        DraggableTooltipComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TooltipSampleModule {
}

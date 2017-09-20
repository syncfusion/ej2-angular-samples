import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TooltipModule } from '@syncfusion/ej2-ng-popups';
import { ToolbarModule } from '@syncfusion/ej2-ng-navigations';
import { ListViewModule } from '@syncfusion/ej2-ng-lists';

import { DefaultTooltipComponent } from './default.component';
import { TemplateTooltipComponent } from './template.component';
import { AjaxContentTooltipComponent } from './ajaxcontent.component';
import { DraggableTooltipComponent } from './smartposition.component';
import { SharedModule } from '../common/shared.module';
export const tooltipAppRoutes: Object[] = [
    { path: ':theme/tooltip/default', component: DefaultTooltipComponent, name: 'Default Functionalities', category: 'Tooltip' },
    { path: ':theme/tooltip/template', component: TemplateTooltipComponent, name: 'Template', category: 'Tooltip' },
    { path: ':theme/tooltip/ajaxcontent', component: AjaxContentTooltipComponent, name: 'Ajax Content', category: 'Tooltip' },
    { path: ':theme/tooltip/smartposition', component: DraggableTooltipComponent, name: 'Smart Positioning', category: 'Tooltip' }
];

export const tooltipRouter: ModuleWithProviders = RouterModule.forChild(tooltipAppRoutes);

@NgModule({
    imports: [tooltipRouter, TooltipModule, ToolbarModule, ListViewModule, SharedModule],
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
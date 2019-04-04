import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';
import { SharedModule } from '../common/shared.module';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

import { AjaxContentTooltipComponent } from './ajax-content.component';
import { DefaultTooltipComponent } from './default.component';
import { DraggableTooltipComponent } from './smart-position.component';
import { TemplateTooltipComponent } from './template.component';
import { HtmlContentComponent } from './html-content.component';
import { ApiTooltipComponent } from './api.component';
import { TooltipMenuComponent } from './tooltip-menu.component';

export const tooltipAppRoutes: Object[] = [{
    path: ':theme/tooltip/default',
    component: DefaultTooltipComponent,
    name: 'Default Functionalities',
    category: 'Tooltip',
    description: 'Default rendering of the Essential JS 2 Tooltip control, which will open when hovering or tapping and holding, and can be displayed in 12 different positions.'
},
{
    path: ':theme/tooltip/template',
    component: TemplateTooltipComponent,
    name: 'Template',
    category: 'Tooltip',
    description: 'Demo of the Essential JS 2 Tooltip control template functionality, which allows HTML content to be rendered in tooltips.'
},
{
    path: ':theme/tooltip/ajax-content',
    component: AjaxContentTooltipComponent,
    name: 'Ajax Content',
    category: 'Tooltip',
    description: 'Demo of the Essential JS 2 Tooltip control loading dynamic content in tooltips through Ajax from JSON files.'
},
{
    path: ':theme/tooltip/smart-position',
    component: DraggableTooltipComponent,
    name: 'Smart Positioning',
    category: 'Tooltip',
    description: 'Demo of the Essential JS 2 Tooltip control\'s smart (flexible) positioning based on the view port\'s dimensions.'
},
{
    path: ':theme/tooltip/tooltip-menu',
    component: TooltipMenuComponent,
    name: 'Tooltip Menu',
    category: 'Tooltip',
    description: 'Demo of Essential JS 2 Tooltip control customization to look like a menu.'
},
{
    path: ':theme/tooltip/html-content',
    component: HtmlContentComponent,
    name: 'HTML Content',
    category: 'Tooltip',
    description: 'Demo of Essential JS 2 Tooltip control customization as an HTML page using HTML tags and CSS.'    
},
{
    path: ':theme/tooltip/api',
    component: ApiTooltipComponent,
    name: 'API',
    category: 'Tooltip',
    description: 'Essential JS 2 Tooltip control demo showcasing the most frequently used API combinations, like content, height, width, open, sticky mode, and more.'    
}];

export const tooltipRouter: ModuleWithProviders = RouterModule.forChild(tooltipAppRoutes);

@NgModule({
    imports: [tooltipRouter, TooltipModule, ToolbarModule, ListViewModule, DropDownListModule, CheckBoxModule,
        NumericTextBoxModule, SharedModule, CommonModule],
    declarations: [
        DefaultTooltipComponent,
        TemplateTooltipComponent,
        AjaxContentTooltipComponent,
        DraggableTooltipComponent,
        HtmlContentComponent,
        TooltipMenuComponent,
        ApiTooltipComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TooltipSampleModule { }

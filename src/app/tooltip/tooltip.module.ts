import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';

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
    description: 'Demo of the Essential JS 2 Tooltip control template functionality, which allows HTML content to be rendered in tooltips.',
    sourceFiles: [
        {displayName: 'template.component.ts', path: './src/tooltip/template.component.ts'},
        {displayName: 'template.html', path: './src/tooltip/template.html'},
        {displayName: 'tooltip.component.css', path: './src/tooltip/tooltip.component.css'}
    ]
},
{
    path: ':theme/tooltip/ajax-content',
    component: AjaxContentTooltipComponent,
    name: 'Ajax Content',
    category: 'Tooltip',
    description: 'Demo of the Essential JS 2 Tooltip control loading dynamic content in tooltips through Ajax from JSON files.',
    sourceFiles: [
        {displayName: 'ajax-content.component.ts', path: './src/tooltip/ajax-content.component.ts'},
        {displayName: 'ajax-content.html', path: './src/tooltip/ajax-content.html'},
        {displayName: 'tooltipdata.json', path: './src/tooltip/tooltipdata.json'},
        {displayName: 'tooltip.component.css', path: './src/tooltip/tooltip.component.css'}
    ]
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
    description: 'Demo of Essential JS 2 Tooltip control customization to look like a menu.',
    sourceFiles: [
        {displayName: 'tooltip-menu.component.ts', path: './src/tooltip/tooltip-menu.component.ts'},
        {displayName: 'tooltip-menu.html', path: './src/tooltip/tooltip-menu.html'},
        {displayName: 'tooltip-menu.css', path: './src/tooltip/tooltip-menu.css'}
    ]
},
{
    path: ':theme/tooltip/html-content',
    component: HtmlContentComponent,
    name: 'HTML Content',
    category: 'Tooltip',
    description: 'Demo of Essential JS 2 Tooltip control customization as an HTML page using HTML tags and CSS.' ,
    sourceFiles: [
        {displayName: 'html-content.component.ts', path: './src/tooltip/html-content.component.ts'},
        {displayName: 'html-content.html', path: './src/tooltip/html-content.html'},
        {displayName: 'html-content.css', path: './src/tooltip/html-content.css'}
    ]  
},
{
    path: ':theme/tooltip/api',
    component: ApiTooltipComponent,
    name: 'API',
    category: 'Tooltip',
    description: 'Essential JS 2 Tooltip control demo showcasing the most frequently used API combinations, like content, height, width, open, sticky mode, and more.',
    sourceFiles: [
        {displayName: 'api.component.ts', path: './src/tooltip/api.component.ts'},
        {displayName: 'api.html', path: './src/tooltip/api.html'},
        {displayName: 'api.css', path: './src/tooltip/api.css'}
    ]   
}];

export const TooltipSampleModule: ModuleWithProviders<any> = RouterModule.forChild(tooltipAppRoutes);



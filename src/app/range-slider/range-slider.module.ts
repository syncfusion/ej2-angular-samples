import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { CheckBoxModule, ButtonModule  } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxModule, TextBoxModule} from '@syncfusion/ej2-angular-inputs';
import { DefaultSliderComponent } from './default.component';
import { OrientationSliderComponent } from './orientation.component';

import { TicksSliderComponent } from './ticks.component';
import { TooltipSliderComponent } from './tooltip.component';
import { FormatSliderComponent } from './format.component';
import { TooltipCustomizationComponent } from './tooltip-customization.component';
import { APIComponent } from './api.component';
import { EventComponent } from './events.component';
import { SelectionBarComponent } from './selection-bar-customization.component';
import { ThumbCustomizationComponent } from './thumb-customization.component';
import { TicksCustomizationComponent } from './ticks-customization.component';
import { AzureComponent } from './azure-pricing.component';
import { LimitsSliderComponent } from './limits.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

export const sliderAppRoutes: Object[] = [
    { path: ':theme/range-slider/default', component: DefaultSliderComponent, name: 'Default Functionalities', order: '01', category: 'Range Slider', description: 'This example demonstrates the default rendering of default, min range and range Syncfusion Angular sliders. Drag the thumb to interact with slider.' },
    { path: ':theme/range-slider/ticks', component: TicksSliderComponent, name: 'Ticks', order: '01', category: 'Range Slider', description: 'This example demonstrates how to visually represents Syncfusion Angular slider values using ticks, which can be placed before, after or both mode of thumb.',sourceFiles: [
        {displayName: 'ticks.component.ts', path: './src/range-slider/ticks.component.ts'},
        {displayName: 'ticks.html', path: './src/range-slider/ticks.html'},
        {displayName: 'slider.css', path: './src/range-slider/slider.css'}
    ] },
    { path: ':theme/range-slider/tooltip', component: TooltipSliderComponent, name: 'Tooltip', order: '01', category: 'Range Slider', description: 'This example demonstrates how to visually represents Syncfusion Angular slider values using tooltips, which can be displayed before/after of slider thumb.', sourceFiles: [
        {displayName: 'tooltip.component.ts', path: './src/range-slider/tooltip.component.ts'},
        {displayName: 'tooltip.html', path: './src/range-slider/tooltip.html'},
        {displayName: 'slider.css', path: './src/range-slider/slider.css'}
    ] },
    { path: ':theme/range-slider/orientation', component: OrientationSliderComponent, name: 'Vertical Orientation', order: '01', category: 'Range Slider', description: 'This example demonstrates the vertical and horizontal orientation of Syncfusion Angular slider control along with ticks and tooltip.', sourceFiles: [
        {displayName: 'orientation.component.ts', path: './src/range-slider/orientation.component.ts'},
        {displayName: 'orientation.html', path: './src/range-slider/orientation.html'},
        {displayName: 'orientation.css', path: './src/range-slider/orientation.css'}
    ] },
    { path: ':theme/range-slider/format', component: FormatSliderComponent, name: 'Formatting', order: '01', category: 'Range Slider', description: 'This example demonstrates the formatting feature of Syncfusion Angular slider values like time, currency & km, values also displayed in ticks & tooltip.', sourceFiles: [
        {displayName: 'format.component.ts', path: './src/range-slider/format.component.ts'},
        {displayName: 'format.html', path: './src/range-slider/format.html'},
        {displayName: 'format.css', path: './src/range-slider/format.css'}
    ] },
    { path: ':theme/range-slider/limits', component: LimitsSliderComponent, name: 'Limits', order: '01', category: 'Range Slider', description: 'This example demonstrates how to restricts handle movements of Syncfusion Angular slider min, max, start and end of min & max values using limits feature.', sourceFiles: [
        {displayName: 'limits.component.ts', path: './src/range-slider/limits.component.ts'},
        {displayName: 'limits.html', path: './src/range-slider/limits.html'},
        {displayName: 'slider.css', path: './src/range-slider/slider.css'}
    ] },
    { path: ':theme/range-slider/api', component: APIComponent, name: 'API', order: '01', category: 'Range Slider', description: 'This example demonstrates the most frequently used API combination of Syncfusion Angular slider like orientation, min, max, value, step and many more.', sourceFiles: [
        {displayName: 'api.component.ts', path: './src/range-slider/api.component.ts'},
        {displayName: 'api.html', path: './src/range-slider/api.html'},
        {displayName: 'api.css', path: './src/range-slider/api.css'}
    ] },
    { path: ':theme/range-slider/events', component: EventComponent, name: 'Events', order: '01', category: 'Range Slider', description: 'This example demonstrates the events of Syncfusion Angular slider those are create, change and changed and traced the actions in property panel.', sourceFiles: [
        {displayName: 'events.component.ts', path: './src/range-slider/events.component.ts'},
        {displayName: 'events.html', path: './src/range-slider/events.html'},
        {displayName: 'events.css', path: './src/range-slider/events.css'}
    ] },
    { path: ':theme/range-slider/thumb-customization', component: ThumbCustomizationComponent, name: 'Thumb', order: '02', category: 'Customization', description: 'This example demonstrates how to customize Syncfusion Angular slider control thumbs with circle, oval and desired image shapes.', sourceFiles: [
        {displayName: 'thumb-customization.component.ts', path: './src/range-slider/thumb-customization.component.ts'},
        {displayName: 'thumb-customization.html', path: './src/range-slider/thumb-customization.html'},
        {displayName: 'thumb-customization.css', path: './src/range-slider/thumb-customization.css'}
    ] },
    { path: ':theme/range-slider/selection-bar-customization', component: SelectionBarComponent, name: 'Bar', order: '02', category: 'Customization', description: 'This example demonstrates how to highly customize Syncfusion Angular slider bar with colors and height.', sourceFiles: [
        {displayName: 'selection-bar-customization.component.ts', path: './src/range-slider/selection-bar-customization.component.ts'},
        {displayName: 'selection-bar-customization.html', path: './src/range-slider/selection-bar-customization.html'},
        {displayName: 'selection-bar.css', path: './src/range-slider/selection-bar.css'}
    ] },
    { path: ':theme/range-slider/ticks-customization', component: TicksCustomizationComponent, name: 'Ticks', order: '02', category: 'Customization', description: 'This example demonstrates how to customize Syncfusion Angular slider values using ticks with legend.', sourceFiles: [
        {displayName: 'ticks-customization.ts', path: './src/range-slider/ticks-customization.component.ts'},
        {displayName: 'ticks-customization.html', path: './src/range-slider/ticks-customization.html'},
        {displayName: 'ticks-customization.css', path: './src/range-slider/ticks-customization.css'}
    ] },
    { path: ':theme/range-slider/tooltip-customization', component: TooltipCustomizationComponent, name: 'Tooltip', order: '02', category: 'Customization', description: 'This example demonstrates how to customize Syncfusion Angular slider tooltip\'s text and background color with formatted text values.', sourceFiles: [
        {displayName: 'tooltip-customization.component.ts', path: './src/range-slider/tooltip-customization.component.ts'},
        {displayName: 'tooltip-customization.html', path: './src/range-slider/tooltip-customization.html'},
        {displayName: 'tooltip-customization.css', path: './src/range-slider/tooltip-customization.css'}
    ] },
    { path: ':theme/range-slider/azure-pricing', component: AzureComponent, name: 'Cloud Pricing', order: '03', category: 'Use Case', description: 'This example demonstrates the usage of Syncfusion Angular slider control in real world use case sample azure cloud pricing.', sourceFiles: [
        {displayName: 'azure-pricing.component.ts', path: './src/range-slider/azure-pricing.component.ts'},
        {displayName: 'azure-pricing.html', path: './src/range-slider/azure-pricing.html'},
        {displayName: 'azure-pricing.css', path: './src/range-slider/azure-pricing.css'}
    ] }
];

export const SliderSampleModule: ModuleWithProviders<any> = RouterModule.forChild(sliderAppRoutes);



import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { CheckBoxModule, ButtonModule  } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxModule, TextBoxModule} from '@syncfusion/ej2-angular-inputs';
import { DefaultSliderComponent } from './default.component';
import { OrientationSliderComponent } from './orientation.component';
import { SharedModule } from '../common/shared.module';
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
    { path: ':theme/slider/default', component: DefaultSliderComponent, name: 'Default Functionalities', order: '01', category: 'Range Slider', description: 'This example demonstrates the default rendering of default, min range and range Syncfusion Angular sliders. Drag the thumb to interact with slider.' },
    { path: ':theme/slider/ticks', component: TicksSliderComponent, name: 'Ticks', order: '01', category: 'Range Slider', description: 'This example demonstrates how to visually represents Syncfusion Angular slider values using ticks, which can be placed before, after or both mode of thumb.',sourceFiles: [
        {displayName: 'ticks.component.ts', path: './src/slider/ticks.component.ts'},
        {displayName: 'ticks.html', path: './src/slider/ticks.html'},
        {displayName: 'slider.css', path: './src/slider/slider.css'}
    ] },
    { path: ':theme/slider/tooltip', component: TooltipSliderComponent, name: 'Tooltip', order: '01', category: 'Range Slider', description: 'This example demonstrates how to visually represents Syncfusion Angular slider values using tooltips, which can be displayed before/after of slider thumb.', sourceFiles: [
        {displayName: 'tooltip.component.ts', path: './src/slider/tooltip.component.ts'},
        {displayName: 'tooltip.html', path: './src/slider/tooltip.html'},
        {displayName: 'slider.css', path: './src/slider/slider.css'}
    ] },
    { path: ':theme/slider/orientation', component: OrientationSliderComponent, name: 'Vertical Orientation', order: '01', category: 'Range Slider', description: 'This example demonstrates the vertical and horizontal orientation of Syncfusion Angular slider control along with ticks and tooltip.', sourceFiles: [
        {displayName: 'orientation.component.ts', path: './src/slider/orientation.component.ts'},
        {displayName: 'orientation.html', path: './src/slider/orientation.html'},
        {displayName: 'orientation.css', path: './src/slider/orientation.css'}
    ] },
    { path: ':theme/slider/format', component: FormatSliderComponent, name: 'Formatting', order: '01', category: 'Range Slider', description: 'This example demonstrates the formatting feature of Syncfusion Angular slider values like time, currency & km, values also displayed in ticks & tooltip.', sourceFiles: [
        {displayName: 'format.component.ts', path: './src/slider/format.component.ts'},
        {displayName: 'format.html', path: './src/slider/format.html'},
        {displayName: 'format.css', path: './src/slider/format.css'}
    ] },
    { path: ':theme/slider/limits', component: LimitsSliderComponent, name: 'Limits', order: '01', category: 'Range Slider', description: 'This example demonstrates how to restricts handle movements of Syncfusion Angular slider min, max, start and end of min & max values using limits feature.', sourceFiles: [
        {displayName: 'limits.component.ts', path: './src/slider/limits.component.ts'},
        {displayName: 'limits.html', path: './src/slider/limits.html'},
        {displayName: 'slider.css', path: './src/slider/slider.css'}
    ] },
    { path: ':theme/slider/api', component: APIComponent, name: 'API', order: '01', category: 'Range Slider', description: 'This example demonstrates the most frequently used API combination of Syncfusion Angular slider like orientation, min, max, value, step and many more.', sourceFiles: [
        {displayName: 'api.component.ts', path: './src/slider/api.component.ts'},
        {displayName: 'api.html', path: './src/slider/api.html'},
        {displayName: 'api.css', path: './src/slider/api.css'}
    ] },
    { path: ':theme/slider/events', component: EventComponent, name: 'Events', order: '01', category: 'Range Slider', description: 'This example demonstrates the events of Syncfusion Angular slider those are create, change and changed and traced the actions in property panel.', sourceFiles: [
        {displayName: 'events.component.ts', path: './src/slider/events.component.ts'},
        {displayName: 'events.html', path: './src/slider/events.html'},
        {displayName: 'events.css', path: './src/slider/events.css'}
    ] },
    { path: ':theme/slider/thumb-customization', component: ThumbCustomizationComponent, name: 'Thumb', order: '02', category: 'Customization', description: 'This example demonstrates how to customize Syncfusion Angular slider control thumbs with circle, oval and desired image shapes.', sourceFiles: [
        {displayName: 'thumb-customization.component.ts', path: './src/slider/thumb-customization.component.ts'},
        {displayName: 'thumb-customization.html', path: './src/slider/thumb-customization.html'},
        {displayName: 'thumb-customization.css', path: './src/slider/thumb-customization.css'}
    ] },
    { path: ':theme/slider/selection-bar-customization', component: SelectionBarComponent, name: 'Bar', order: '02', category: 'Customization', description: 'This example demonstrates how to highly customize Syncfusion Angular slider bar with colors and height.', sourceFiles: [
        {displayName: 'selection-bar-customization.component.ts', path: './src/slider/selection-bar-customization.component.ts'},
        {displayName: 'selection-bar-customization.html', path: './src/slider/selection-bar-customization.html'},
        {displayName: 'selection-bar.css', path: './src/slider/selection-bar.css'}
    ] },
    { path: ':theme/slider/ticks-customization', component: TicksCustomizationComponent, name: 'Ticks', order: '02', category: 'Customization', description: 'This example demonstrates how to customize Syncfusion Angular slider values using ticks with legend.', sourceFiles: [
        {displayName: 'ticks-customization.ts', path: './src/slider/ticks-customization.component.ts'},
        {displayName: 'ticks-customization.html', path: './src/slider/ticks-customization.html'},
        {displayName: 'ticks-customization.css', path: './src/slider/ticks-customization.css'}
    ] },
    { path: ':theme/slider/tooltip-customization', component: TooltipCustomizationComponent, name: 'Tooltip', order: '02', category: 'Customization', description: 'This example demonstrates how to customize Syncfusion Angular slider tooltip\'s text and background color with formatted text values.', sourceFiles: [
        {displayName: 'tooltip-customization.component.ts', path: './src/slider/tooltip-customization.component.ts'},
        {displayName: 'tooltip-customization.html', path: './src/slider/tooltip-customization.html'},
        {displayName: 'tooltip-customization.css', path: './src/slider/tooltip-customization.css'}
    ] },
    { path: ':theme/slider/azure-pricing', component: AzureComponent, name: 'Cloud Pricing', order: '03', category: 'Use Case', description: 'This example demonstrates the usage of Syncfusion Angular slider control in real world use case sample azure cloud pricing.', sourceFiles: [
        {displayName: 'azure-pricing.component.ts', path: './src/slider/azure-pricing.component.ts'},
        {displayName: 'azure-pricing.html', path: './src/slider/azure-pricing.html'},
        {displayName: 'azure-pricing.css', path: './src/slider/azure-pricing.css'}
    ] }
];

export const SliderRouter: ModuleWithProviders = RouterModule.forChild(sliderAppRoutes);

@NgModule({
    imports: [SliderRouter, SharedModule, DialogModule, SliderModule, BrowserModule, CheckBoxModule, NumericTextBoxModule, TextBoxModule, DropDownListModule, ButtonModule],
    declarations: [
        DefaultSliderComponent,
        OrientationSliderComponent,
        TicksSliderComponent,
        TooltipSliderComponent,
        FormatSliderComponent,
        AzureComponent,
        TooltipCustomizationComponent,
        EventComponent, APIComponent, TicksCustomizationComponent,
        ThumbCustomizationComponent, SelectionBarComponent,
        LimitsSliderComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SliderSampleModule {
}

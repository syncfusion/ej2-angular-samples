import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
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

export const sliderAppRoutes: Object[] = [
    { path: ':theme/slider/default', component: DefaultSliderComponent, name: 'Default Functionalities', order: '01', category: 'Range Slider', description: 'This example demonstrates the default rendering of default, min range and range Syncfusion Angular sliders. Drag the thumb to interact with slider.' },
    { path: ':theme/slider/ticks', component: TicksSliderComponent, name: 'Ticks', order: '01', category: 'Range Slider', description: 'This example demonstrates how to visually represents Syncfusion Angular slider values using ticks, which can be placed before, after or both mode of thumb.' },
    { path: ':theme/slider/tooltip', component: TooltipSliderComponent, name: 'Tooltip', order: '01', category: 'Range Slider', description: 'This example demonstrates how to visually represents Syncfusion Angular slider values using tooltips, which can be displayed before/after of slider thumb.' },
    { path: ':theme/slider/orientation', component: OrientationSliderComponent, name: 'Vertical Orientation', order: '01', category: 'Range Slider', description: 'This example demonstrates the vertical and horizontal orientation of Syncfusion Angular slider control along with ticks and tooltip.' },
    { path: ':theme/slider/format', component: FormatSliderComponent, name: 'Formatting', order: '01', category: 'Range Slider', description: 'This example demonstrates the formatting feature of Syncfusion Angular slider values like time, currency & km, values also displayed in ticks & tooltip.' },
    { path: ':theme/slider/limits', component: LimitsSliderComponent, name: 'Limits', order: '01', category: 'Range Slider', description: 'This example demonstrates how to restricts handle movements of Syncfusion Angular slider min, max, start and end of min & max values using limits feature.' },
    { path: ':theme/slider/api', component: APIComponent, name: 'API', order: '01', category: 'Range Slider', description: 'This example demonstrates the most frequently used API combination of Syncfusion Angular slider like orientation, min, max, value, step and many more.' },
    { path: ':theme/slider/events', component: EventComponent, name: 'Events', order: '01', category: 'Range Slider', description: 'This example demonstrates the events of Syncfusion Angular slider those are create, change and changed and traced the actions in property panel.' },
    { path: ':theme/slider/thumb-customization', component: ThumbCustomizationComponent, name: 'Thumb', order: '02', category: 'Customization', description: 'This example demonstrates how to customize Syncfusion Angular slider control thumbs with circle, oval and desired image shapes.' },
    { path: ':theme/slider/selection-bar-customization', component: SelectionBarComponent, name: 'Bar', order: '02', category: 'Customization', description: 'This example demonstrates how to highly customize Syncfusion Angular slider bar with colors and height.' },
    { path: ':theme/slider/ticks-customization', component: TicksCustomizationComponent, name: 'Ticks', order: '02', category: 'Customization', description: 'This example demonstrates how to customize Syncfusion Angular slider values using ticks with legend.' },
    { path: ':theme/slider/tooltip-customization', component: TooltipCustomizationComponent, name: 'Tooltip', order: '02', category: 'Customization', type: 'update', description: 'This example demonstrates how to customize Syncfusion Angular slider tooltip\'s text and background color with formatted text values.' },
    { path: ':theme/slider/azure-pricing', component: AzureComponent, name: 'Cloud Pricing', order: '03', category: 'Use Case', description: 'This example demonstrates the usage of Syncfusion Angular slider control in real world use case sample azure cloud pricing.' }
];

export const SliderRouter: ModuleWithProviders = RouterModule.forChild(sliderAppRoutes);

@NgModule({
    imports: [SliderRouter, SharedModule, DialogModule, SliderModule, BrowserModule, CheckBoxModule, NumericTextBoxModule],
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

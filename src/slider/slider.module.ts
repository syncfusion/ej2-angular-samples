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
    { path: ':theme/slider/default', component: DefaultSliderComponent, name: 'Default Functionalities', description: 'Essential JS 2 slider control demo showing the default rendering of default, minimum range, and range sliders. Drag the thumb to interact with the slider.', order: '01', category: 'Range Slider' },
    { path: ':theme/slider/ticks', component: TicksSliderComponent, name: 'Ticks', description: 'Essential JS 2 slider control demo of the visual representation of slider values using ticks, which can be placed before, after, or on both sides of the thumbs.', order: '01', category: 'Range Slider' },
    { path: ':theme/slider/tooltip', component: TooltipSliderComponent, name: 'Tooltip', description: 'Essential JS 2 slider control demo of the visual representation of slider values using tooltips, which can be displayed before or after slider thumbs.', order: '01', category: 'Range Slider' },
    { path: ':theme/slider/orientation', component: OrientationSliderComponent, name: 'Vertical Orientation', description: 'Essential JS 2 slider control demo showing the vertical and horizontal orientation properties along with ticks and tooltips.', order: '01', category: 'Range Slider' },
    { path: ':theme/slider/format', component: FormatSliderComponent, name: 'Formatting', description: 'Demo of Essential JS 2 slider control value formatting with time, currency, and distance values that are also displayed in ticks and tooltips.', order: '01', category: 'Range Slider' },
    { path: ':theme/slider/limits', component: LimitsSliderComponent, name: 'Limits', description: 'Essential JS 2 slider control demo of limiting the minimum, maximum, start, and end values. Also supports restricting handle movements.', order: '01', category: 'Range Slider' },
    { path: ':theme/slider/api', component: APIComponent, name: 'API', description: 'Essential JS 2 slider control demo showcasing the most frequently used API combinations, like orientation, minimum, maximum, value, step, and more.', order: '01', category: 'Range Slider' },
    { path: ':theme/slider/events', component: EventComponent, name: 'Events', description: 'Demo of the Essential JS 2 slider control created, changing, and changed events. The events are traced in real time in a property panel.', order: '01', category: 'Range Slider' },
    { path: ':theme/slider/thumb-customization', component: ThumbCustomizationComponent, name: 'Thumb', description: 'Demo of the Essential JS 2 slider control slider thumb customization with circle, oval, and custom image shapes.', order: '02', category: 'Customization' },
    { path: ':theme/slider/selection-bar-customization', component: SelectionBarComponent, name: 'Bar', description: 'Demo of Essential JS 2 slider control slider bar customization with colors and height.', order: '02', category: 'Customization' },
    { path: ':theme/slider/ticks-customization', component: TicksCustomizationComponent, name: 'Ticks', description: 'Demo of Essential JS 2 slider controls highly customizable slider values using ticks and a legend.', order: '02', category: 'Customization' },
    { path: ':theme/slider/tooltip-customization', component: TooltipCustomizationComponent, name: 'Tooltip', description: 'Demo of Essential JS 2 slider control customization of slider tooltip text and background color with formatted text values.', order: '02', category: 'Customization' },
    { path: ':theme/slider/azure-pricing', component: AzureComponent, name: 'Cloud Pricing', description: 'Essential JS 2 slider control demo of real-world scenario using sample Azure cloud pricing.', order: '03', category: 'Use Case' }
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

import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@syncfusion/ej2-ng-popups';
import { SliderModule } from '@syncfusion/ej2-ng-inputs';
import { CheckBoxModule } from '@syncfusion/ej2-ng-buttons';
import { NumericTextBoxModule } from '@syncfusion/ej2-ng-inputs';
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

export const sliderAppRoutes: Object[] = [
    { path: ':theme/slider/default', component: DefaultSliderComponent, name: 'Default Functionalities', order: '01', category: 'Slider' },
    { path: ':theme/slider/ticks', component: TicksSliderComponent, name: 'Ticks', order: '01', category: 'Slider' },
    { path: ':theme/slider/tooltip', component: TooltipSliderComponent, name: 'Tooltip', order: '01', category: 'Slider' },
    { path: ':theme/slider/orientation', component: OrientationSliderComponent, name: 'Vertical Orientation', order: '01', category: 'Slider' },
    { path: ':theme/slider/format', component: FormatSliderComponent, name: 'Formatting', order: '01', category: 'Slider' },
    { path: ':theme/slider/api', component: APIComponent, name: 'API', order: '01', category: 'Slider' },
    { path: ':theme/slider/events', component: EventComponent, name: 'Events', order: '01', category: 'Slider' },
    { path: ':theme/slider/thumb-customization', component: ThumbCustomizationComponent, name: 'Thumb', order: '02', category: 'Customization' },
    { path: ':theme/slider/selection-bar-customization', component: SelectionBarComponent, name: 'Bar', order: '02', category: 'Customization' },
    { path: ':theme/slider/ticks-customization', component: TicksCustomizationComponent, name: 'Ticks', order: '02', category: 'Customization' },
    { path: ':theme/slider/tooltip-customization', component: TooltipCustomizationComponent, name: 'Tooltip', order: '02', category: 'Customization' },
    { path: ':theme/slider/azure-pricing', component: AzureComponent, name: 'Cloud Pricing', order: '03', category: 'Use Case' }
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
        ThumbCustomizationComponent, SelectionBarComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SliderSampleModule {
}

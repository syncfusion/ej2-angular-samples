import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../common/shared.module';
import { ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DefaultColorPickerComponent } from './default.component';
import { InlineColorPickerComponent } from './inline.component';
import { CustomColorPickerComponent } from './custom.component';
import { ApiColorPickerComponent } from './api.component';

export const colorPickerAppRoutes: Object[] = [
    { path: ':theme/color-picker/default', component: DefaultColorPickerComponent, name: 'Default Functionalities', order: '01', category: 'Color Picker', description: 'This example demonstrates the default functionalities of the Syncfusion Angular ColorPicker with RGB, HSV and Hex codes(three, six and eight digit).' },
    { path: ':theme/color-picker/inline', component: InlineColorPickerComponent, name: 'Inline Mode', order: '01', category: 'Color Picker', description: 'This example demonstrates the inline / flat mode rendering of the Syncfusion Angular ColorPicker with hue and opacity color options.' },
    { path: ':theme/color-picker/custom', component: CustomColorPickerComponent, name: 'Custom Palettes', order: '01', category: 'Color Picker', description: 'This example demonstrates the Syncfusion Angular ColorPicker, custom UI of the color palette with different structures and its state.' },
    { path: ':theme/color-picker/api', component: ApiColorPickerComponent, name: 'API', order: '01', category: 'Color Picker', description: 'This example demonstrates the supported APIs and its functionalities of the Syncfusion Angular ColorPicker.' }
];

export const colorPickerRouter: ModuleWithProviders = RouterModule.forChild(colorPickerAppRoutes);

@NgModule({
    imports: [colorPickerRouter, SharedModule, ColorPickerModule, BrowserModule, CheckBoxModule],
    declarations: [
        DefaultColorPickerComponent,
        InlineColorPickerComponent,
        CustomColorPickerComponent,
        ApiColorPickerComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ColorPickerSampleModule {
}

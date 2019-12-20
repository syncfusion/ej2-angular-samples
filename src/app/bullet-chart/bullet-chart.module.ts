/**
 * Bullet Chart Control
 */
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BulletChartAllModule } from '@syncfusion/ej2-angular-charts';
import { ColorPickerModule, SliderModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { BulletChartMultipleDataComponent } from './multiple-data.component';
import { BulletChartDefaultComponent } from './default.component';
import { BulletChartRtlComponent } from './right-to-left.component';
import { BulletChartCustomizationComponent } from './customization.component';
import { BulletChartBarCustomizationComponent} from './bar-customization.component';
import { BulletChartTooltipComponent } from './tooltip.component';

export const bulletChartAppRoutes: Object[] = [
    {
        path: ':theme/bullet-chart/default',
        component: BulletChartDefaultComponent,
        name: 'Default',
        order: '01',
        category: 'Bullet Chart'
    },
    {
        path: ':theme/bullet-chart/multiple-data',
        component: BulletChartMultipleDataComponent,
        name: 'Multiple Data',
        order: '01',
        category: 'Bullet Chart'
    },
    {
        path: ':theme/bullet-chart/rtl',
        component: BulletChartRtlComponent,
        name: 'RTL',
        order: '01',
        category: 'Bullet Chart'
    },
    {
        path: ':theme/bullet-chart/bar-customization',
        component: BulletChartBarCustomizationComponent,
        name: 'Feature and Target Bar',
        order: '01',
        category: 'Bullet Chart'
    },
    {
        path: ':theme/bullet-chart/customization',
        component: BulletChartCustomizationComponent,
        name: 'Range and Label Settings',
        order: '01',
        category: 'Bullet Chart'
    },
    {
        path: ':theme/bullet-chart/tooltip',
        component: BulletChartTooltipComponent,
        name: 'Tooltip Template',
        order: '01',
        category: 'Bullet Chart'
    }
];

export const bulletChartRouter: ModuleWithProviders = RouterModule.forChild(bulletChartAppRoutes);

// tslint:disable-next-line:max-line-length
let declarations: Type<Object>[ ] = [BulletChartDefaultComponent, BulletChartMultipleDataComponent, BulletChartRtlComponent, BulletChartCustomizationComponent, BulletChartBarCustomizationComponent, BulletChartTooltipComponent];
@NgModule({
    imports: [bulletChartRouter, BulletChartAllModule, ColorPickerModule, DropDownListModule, SliderModule, CheckBoxModule],
    exports: [],
    declarations: declarations,
    providers: []
})
export class BulletChartSampleModule {
}

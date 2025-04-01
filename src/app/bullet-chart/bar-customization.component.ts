import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Browser } from '@syncfusion/ej2-base';
import { AnimationModel, BulletChartComponent, TextPosition, BulletChartAllModule } from '@syncfusion/ej2-angular-charts';
import { ChangeEventArgs, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { BulletTooltipSettingsModel, FeatureType, IBulletLoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { ColorPickerEventArgs, SliderChangeEventArgs, TooltipDataModel  } from '@syncfusion/ej2-inputs';
import { SliderModule, ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
import { loadBulletChartTheme } from './theme-color';
/**
 * RTl sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'bar-customization.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [BulletChartAllModule, SliderModule, DropDownListModule, ColorPickerModule]
})

export class BulletChartBarCustomizationComponent {
    @ViewChild('bullet')
    public bulletChart: BulletChartComponent;

    public bulletTitle: string = 'New Customers';
    public width: string = Browser.isDevice ? '100%' : '80%';
    public tooltip: BulletTooltipSettingsModel = { enable: true };
    public animation: AnimationModel = { enable: false };
    public sliderTooltip: TooltipDataModel = { isVisible: true };

    public minimum1: number = 0;
    public maximum1: number = 300;
    public interval1: number = 50;
    public data1: Object[] =  [{ value: 270, target: 250 }];

    public dropdata: string[] = ['Rect', 'Dot'];

    public featureType = (args: ChangeEventArgs) => {
        this.bulletChart.type = args.value as FeatureType;
        this.bulletChart.refresh();
    }

    public valueColor = (args: ColorPickerEventArgs) => {
        this.bulletChart.valueFill = args.currentValue.hex;
        this.bulletChart.refresh();
    }

    public targetColor = (args: ColorPickerEventArgs) => {
        this.bulletChart.targetColor = args.currentValue.hex;
        this.bulletChart.refresh();
    }

    public valueChange = (args: SliderChangeEventArgs) => {
        this.bulletChart.dataSource[0].value = args.value;
        this.bulletChart.refresh();
    }

    public targetChange = (args: SliderChangeEventArgs) => {
        this.bulletChart.dataSource[0].target = args.value;
        this.bulletChart.refresh();
    }

    public load =  (args: IBulletLoadedEventArgs) => {
        loadBulletChartTheme(args);
    }

    public positionTitle: TextPosition = Browser.isDevice ? 'Top' : 'Left';
}
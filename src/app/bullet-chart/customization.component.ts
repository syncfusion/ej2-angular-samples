import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Browser } from '@syncfusion/ej2-base';
import { BulletTooltipSettingsModel, AnimationModel, BulletChartComponent, FontModel } from '@syncfusion/ej2-angular-charts';
import { ColorPickerEventArgs } from '@syncfusion/ej2-inputs';
import { ChangeEventArgs } from '@syncfusion/ej2-angular-buttons';
import { IBulletLoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
/**
 * RTl sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'customization.html',
    encapsulation: ViewEncapsulation.None
})

export class BulletChartCustomizationComponent {
    @ViewChild('bullet')
    public bulletChart: BulletChartComponent;
    public chartTitle: string = 'Package Downloads';

    public width: string = Browser.isDevice ? '100%' : '80%';
    public tooltip: BulletTooltipSettingsModel = { enable: true };
    public animation: AnimationModel = { enable: false };

    public minimum1: number = 0;
    public maximum1: number = 3;
    public interval1: number = 0.5;
    public data1: Object[] =  [{ value: 1.7, target: 2.5 }];
    public titleStyle: FontModel = { textAlignment: 'Center'}



    public startColor = (args: ColorPickerEventArgs) => {
        this.bulletChart.ranges[0].color = args.currentValue.hex;
        this.bulletChart.refresh();
    }

    public middleColor = (args: ColorPickerEventArgs) => {
        this.bulletChart.ranges[1].color = args.currentValue.hex;
        this.bulletChart.refresh();
    }

    public endColor = (args: ColorPickerEventArgs) => {
        this.bulletChart.ranges[2].color = args.currentValue.hex;
        this.bulletChart.refresh();
    }

    public useRangeColor = (args: ChangeEventArgs) => {
        this.bulletChart.majorTickLines.useRangeColor = args.checked;
        this.bulletChart.minorTickLines.useRangeColor = args.checked;
        this.bulletChart.labelStyle.useRangeColor = args.checked;
        this.bulletChart.refresh();
    }

    public opposedPosition = (args: ChangeEventArgs) => {
        this.bulletChart.opposedPosition = args.checked;
        this.bulletChart.refresh();
    }

    public load =  (args: IBulletLoadedEventArgs) => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.bulletChart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/dark/i, 'Dark').replace(/light/i, 'Light').replace(/contrast/i, 'Contrast');
    }
}
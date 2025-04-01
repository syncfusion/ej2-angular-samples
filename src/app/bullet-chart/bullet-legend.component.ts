import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Browser } from '@syncfusion/ej2-base';
// tslint:disable-next-line:max-line-length
import { BulletTooltipSettingsModel, AnimationModel, BulletChartComponent, FontModel, BulletChartLegendSettingsModel, BulletChartAllModule } from '@syncfusion/ej2-angular-charts';
import { IBulletLoadedEventArgs, ChartTheme, IBulletLegendRenderEventArgs } from '@syncfusion/ej2-charts';
import { loadBulletChartTheme } from './theme-color';
/**
 * RTl sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'bullet-legend.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [BulletChartAllModule]
})

export class BulletChartLegendComponent {
    @ViewChild('bullet')
    public bulletChart: BulletChartComponent;
    public chartTitle: string = 'Package Downloads';

    public width: string = Browser.isDevice ? '100%' : '80%';
    public tooltip: BulletTooltipSettingsModel = { enable: true };
    public animation: AnimationModel = { enable: false };

    public minimum1: number = 0;
    public maximum1: number = 30;
    public interval1: number = 5;
    public data1: Object[] =  [{ value: 25, target: [20, 26, 28] }];
    public titleStyle: FontModel = { textAlignment: 'Center'};
    public legendSettings: BulletChartLegendSettingsModel = {visible: true};

    public load =  (args: IBulletLoadedEventArgs) => {
        loadBulletChartTheme(args);
    }
    public legendRender = (args: IBulletLegendRenderEventArgs) => {
        if (args.text === 'Target_0') {
            args.text = 'Previous Target';
        }
        if (args.text === 'Target_1') {
            args.text = 'Current Target';
        }
        if (args.text === 'Target_2') {
            args.text = 'Future Target';
        }
    }
}

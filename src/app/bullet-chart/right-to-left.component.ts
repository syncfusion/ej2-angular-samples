import { Component, ViewEncapsulation } from '@angular/core';
import { Browser } from '@syncfusion/ej2-base';
import { BulletTooltipSettingsModel, AnimationModel, FontModel, BulletChartAllModule } from '@syncfusion/ej2-angular-charts';
import { IBulletLoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { loadBulletChartTheme } from './theme-color';
/**
 * RTl sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'right-to-left.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [BulletChartAllModule]
})

export class BulletChartRtlComponent {
    public width: string = Browser.isDevice ? '100%' : '80%';
    public tooltip: BulletTooltipSettingsModel = { enable: true };
    public animation: AnimationModel = { enable: false };
    public title: string  = 'Revenue YTD';
    public titleStyle: FontModel = { textAlignment: 'Center' };
    public minimum1: number = 0;
    public maximum1: number = 300;
    public interval1: number = 50;
    public data1: Object[] =  [{ value: 270, target: 250 }];

    public load =  (args: IBulletLoadedEventArgs) => {
        loadBulletChartTheme(args);
    }
}
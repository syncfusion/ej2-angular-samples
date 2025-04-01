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
    templateUrl: 'tooltip.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [BulletChartAllModule]
})

export class BulletChartTooltipComponent {
    public width: string = Browser.isDevice ? '100%' : '80%';
    public chartTitle: string = 'Revenue YTD';
    public tooltip: BulletTooltipSettingsModel = {
        enable: true,
        template:  '<div id="wrap"><table style="width:100%; background-color: #ffffff;' +
        // tslint:disable-next-line:max-line-length
        'border-spacing: 0px; border-collapse:separate; border: 1px solid grey; border-radius:10px; padding-top: 5px; padding-bottom:5px">' +
        '<tr><td style="font-weight:bold; color:black; padding-left: 5px;padding-top: 2px;padding-bottom: 2px;">Sales</td></tr>'
        + '<tr><td style="padding-left: 5px; color:black; padding-right: 5px; padding-bottom: 2px;">Target : ${target}K </td></tr>' +
        '<tr><td style="padding-left: 5px; color:black; padding-right: 5px">Current : ${value} </td></tr></table></div>' };
    public animation: AnimationModel = { enable: false };
    public titleStyle: FontModel = { textAlignment: 'Center' };
    public min: number = 0;
    public max: number = 100;
    public interval: number = 10;
    public data1: Object[] =  [{ value: 70, target: 50 }];

    public load =  (args: IBulletLoadedEventArgs) => {
        loadBulletChartTheme(args);
    }
}
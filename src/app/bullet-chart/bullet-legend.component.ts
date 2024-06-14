import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Browser } from '@syncfusion/ej2-base';
// tslint:disable-next-line:max-line-length
import { BulletTooltipSettingsModel, AnimationModel, BulletChartComponent, FontModel, BulletChartLegendSettingsModel, BulletChartAllModule } from '@syncfusion/ej2-angular-charts';
import { IBulletLoadedEventArgs, ChartTheme, IBulletLegendRenderEventArgs } from '@syncfusion/ej2-charts';
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
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.bulletChart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/light/i, 'Light').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
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

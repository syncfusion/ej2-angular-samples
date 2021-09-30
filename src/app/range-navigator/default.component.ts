import { Component, ViewEncapsulation } from '@angular/core';
import { ChartTheme, IRangeLoadedEventArgs, DateTime, AreaSeries, RangeTooltip } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { bitCoinData } from './default_data';

/**
 * Default appearance of the range navigator
 */

let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
let defaultthemes: string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast'];
let borderColor: string[] = ['#262E0B', '#5ECB9B', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4'];
let regionColor: string[] = ['rgba(38, 46, 11, 0.3)', 'rgba(94, 203, 155, 0.3)', 'rgba(90, 97, 246, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(0, 189, 174, 0.3)',
'rgba(158, 203, 8, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(68, 114, 196, 0.3)',
'rgba(68, 114, 196, 0.3)', 'rgba(121, 236, 228, 0.3)'];
 
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    encapsulation: ViewEncapsulation.None
})

export class DefaultComponent {

    public valueType: string = 'DateTime';

    public labelFormat: string = 'MMM-yy';

    public value: Date[] = [new Date('2017-09-01'), new Date('2018-02-01')];

    public dataSource: Object[] = bitCoinData;

    public width: string = Browser.isDevice ? '100%' : '80%';

    public theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");

    public navigatorStyleSettings: Object = {
        unselectedRegionColor: 'transparent',
        selectedRegionColor: regionColor[defaultthemes.indexOf(theme.toLowerCase())]
    };

    public load(args: IRangeLoadedEventArgs) {
    args.rangeNavigator.rangeTooltipModule = new RangeTooltip(args.rangeNavigator);
    };

    public tooltip: Object = { enable: true, format: 'MM/dd/yyyy' , displayMode: 'Always' };

    public fill: string = 'url(#' + theme.toLowerCase() + '-gradient-chart)';

    public border: Object = { width: 2, color: borderColor[defaultthemes.indexOf(theme.toLowerCase())] };
}

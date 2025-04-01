import { Component, ViewEncapsulation } from '@angular/core';
import { ChartTheme, IRangeLoadedEventArgs, DateTime, AreaSeries, RangeTooltip } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { bitCoinData } from './default_data';
import { RangeNavigatorAllModule, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { loadRangeNavigatorTheme, regionColor, themes, borderColor } from './theme-colors';

/**
 * Default appearance of the range navigator
 */

let theme: ChartTheme = loadRangeNavigatorTheme();
 
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [RangeNavigatorAllModule, ChartAllModule]
})

export class DefaultComponent {

    public valueType: string = 'DateTime';

    public labelFormat: string = 'MMM-yy';

    public value: Date[] = [new Date('2017-09-01'), new Date('2018-02-01')];

    public dataSource: Object[] = bitCoinData;

    public width: string = Browser.isDevice ? '100%' : '80%';

    public theme: ChartTheme = theme;

    public navigatorStyleSettings: Object = {
        unselectedRegionColor: 'transparent',
        selectedRegionColor: regionColor[themes.indexOf(theme.toLowerCase())]
    };

    public load(args: IRangeLoadedEventArgs) {
    args.rangeNavigator.rangeTooltipModule = new RangeTooltip(args.rangeNavigator);
    };

    public tooltip: Object = { enable: true, format: 'MM/dd/yyyy' , displayMode: 'Always' };

    public fill: string = 'url(#' + theme.toLowerCase() + '-gradient-chart)';

    public border: Object = { width: 2, color: borderColor[themes.indexOf(theme.toLowerCase())] };
}

import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import {
    ChartTheme, IRangeLoadedEventArgs, DateTime, AreaSeries, IChangedEventArgs,
    RangeTooltip, Chart, ITooltipRenderEventArgs, withInBounds, IAxisLabelRenderEventArgs
} from '@syncfusion/ej2-charts';
import { Browser, remove } from '@syncfusion/ej2-base';
import { getElement } from '@syncfusion/ej2-svg-base/src/tooltip/helper';
import { stockData } from './stock-data';
import { RangeNavigatorAllModule, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { loadRangeNavigatorTheme, borderColor, themes } from './theme-colors';

/**
 * Sample for range navigator with datetime axis
 */


let theme: ChartTheme = loadRangeNavigatorTheme();

@Component({
    selector: 'control-content',
    templateUrl: 'date-time.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [RangeNavigatorAllModule, ChartAllModule]
})

export class DateTimeComponent {
    @ViewChild('chart')
    public Chart: Chart;
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 },
    };

    public dataSource: Object[] = stockData;

    public chartArea: Object = { border: { width: 0 } };

    public primaryYAxis: Object = { labelFormat: 'n1', minimum: 0.6,
           maximum: 1, interval: 0.1, majorTickLines: { width: 0 }, lineStyle: { width: 0 } };

    public crosshair: Object = { enable: false, lineType: 'None'};

    public chartTooltip: Object = { enable: true, shared: true };

    public chartHeight: string = '350';

    public width: string = Browser.isDevice ? '100%' : '80%';

    public load(args: IRangeLoadedEventArgs) {
    args.rangeNavigator.rangeTooltipModule = new RangeTooltip(args.rangeNavigator);
    };
    public theme: ChartTheme = theme;

    public rangeMajorTickLines: Object = { width: 0 };

    public value: Object = [new Date('2011-01-01'), new Date('2013-12-31')];

    public tooltip: Object = { enable: true, format: 'yyyy/MM/dd' , displayMode: 'Always' };

    public fill: string = 'url(#' + theme.toLowerCase() + '-gradient-chart)';

    public border: Object = { width: 2, color: borderColor[themes.indexOf(theme.toLowerCase())] };

    public legendSettings: Object = { visible: false };

    public changed(args: IChangedEventArgs): void {
        this.Chart.primaryXAxis.zoomFactor = args.zoomFactor;
        this.Chart.primaryXAxis.zoomPosition = args.zoomPosition;
        this.Chart.dataBind();
    }
}
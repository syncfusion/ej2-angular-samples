import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ChartTheme, IRangeLoadedEventArgs, DateTime, AreaSeries, IChangedEventArgs,
    RangeTooltip, Chart } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { axesData } from './stock-data';
import { RangeNavigatorAllModule, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { borderColor, loadRangeNavigatorTheme, themes } from './theme-colors';

/**
 * Sample for range navigator with RTL support
 */

let theme: ChartTheme = loadRangeNavigatorTheme();;

@Component({
    selector: 'control-content',
    templateUrl: 'rtl.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [RangeNavigatorAllModule, ChartAllModule]
})

export class RTLComponent {
    @ViewChild('chartRtl')
    public Chart: Chart;
    public primaryXAxis: Object = {
        valueType: 'DateTime', crosshairTooltip: { enable: true }, edgeLabelPlacement: 'Shift',
                majorGridLines: { width: 0 }
    };

    public dataSource: Object = axesData;

    public chartArea: Object = { border: { width: 0 } };

    public tooltip:Object= { enable: true, displayMode: 'Always' };

    public fill: string = 'url(#' + theme.toLowerCase() + '-gradient-chart)';

    public border: Object = { width: 2, color: borderColor[themes.indexOf(theme.toLowerCase())] };

    public primaryYAxis: Object = { majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelFormat: '{value}%',
    minimum: 82, maximum: 87, interval: 1, };

    public crosshair: Object = { enable: false, lineType: 'None'};

    public chartTooltip: Object = { enable: true, shared: true, header: '<b>England</b>' , format: '${point.x} : <b>${point.y}</b>' };

    public width: string = Browser.isDevice ? '100%' : '80%';

    public legendSettings: Object = { visible: false };

    public theme: ChartTheme = theme;

    public value: Object = [new Date(2014, 0, 1), new Date(2015, 11, 31)];

    public load(args: IRangeLoadedEventArgs) {
        args.rangeNavigator.rangeTooltipModule = new RangeTooltip(args.rangeNavigator);
    };

    public changed(args: IChangedEventArgs): void {
        this.Chart.primaryXAxis.zoomFactor = args.zoomFactor;
        this.Chart.primaryXAxis.zoomPosition = args.zoomPosition;
        this.Chart.dataBind();
    }

}
import { Component, ViewEncapsulation } from '@angular/core';
import { IStockChartEventArgs, ChartTheme, ITooltipRenderEventArgs, StockChartModule, ChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { aapl } from './stock-data';
import { loadStockChartTheme } from './theme-color';
/**
 * Sample for Stock Events
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stock-events.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ StockChartModule, ChartAllModule, RangeNavigatorAllModule]
})
export class StockEventsComponent {

    public data1: Object[] = aapl;

    public primaryXAxis: Object = {
        valueType: 'DateTime', majorGridLines: { color: 'transparent' }, crosshairTooltip: { enable: true }
    };

    public primaryYAxis: Object = {
        lineStyle: { color: 'transparent' },
        majorTickLines: { color: 'transparent', height: 0 },
        crosshairTooltip: { enable: true }
    };
    public tooltip: object = { enable: true };
    public crosshair: object = { enable: true, lineType: 'Both' };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public onSeries: Boolean  = false;
    public seriesType: string[] = [];
    public indicatorType: string[] = [];
    // custom code start
    public load(args: IStockChartEventArgs): void {
        loadStockChartTheme(args);
    };
    public tooltipRender(args: ITooltipRenderEventArgs): void {
        if (args.text.split('<br/>')[4]) {
        let target: number = parseInt(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], 10);
        let value: string = (target / 100000000).toFixed(1) + 'B';
        args.text = args.text.replace(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], value);
        }
    };
    // custom code end
    public date1:  Date = new Date(2012, 3, 1);
    public date2:  Date = new Date(2012, 3, 20);
    public date3:  Date = new Date(2012, 6, 1);
    public date4:  Date = new Date(2012, 9, 1);
    public date5:  Date = new Date(2012, 7, 30);
    public date6:  Date = new Date(2012, 10, 1);
    public date7:  Date = new Date(2012, 12, 0);
    public date8:  Date = new Date(2013, 3, 1);
    public date9:  Date = new Date(2013, 3, 20);
    public date10: Date =  new Date(2013, 6, 1);
    public date11: Date =  new Date(2013, 9, 1);
    public date12: Date =  new Date(2013, 12, 0);
    public date13: Date =  new Date(2014, 3, 1);
    public date14: Date =  new Date(2014, 6, 1);
    public date15: Date =  new Date(2014, 9, 1);
    public date16: Date =  new Date(2014, 12, 0);
    public date17: Date =  new Date(2014, 2, 2);
    public date18: Date =  new Date(2015, 1, 7);
    public date19: Date =  new Date(2015, 1, 2);
    public date20: Date =  new Date(2015, 2, 12);
    public border1: object = { color: '#6c6d6d' };
    public textStyle: object = { color: 'white' };
    public border2: object = { color: '#f48a21' };
    public border3: object = { color: '#6c6d6d' };
    public border4: object = { color: '#3ab0f9' };
    public border5: object = { color: '#841391' };
    public border6: object = { color: '#6322e0' };
    public border7: object = { color: '#dd3c9f' };
    public title: string = 'AAPL Stock Price';
    public enable: boolean = true;
    constructor() {
        //code
    }
}

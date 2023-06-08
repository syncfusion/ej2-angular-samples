import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, IAxisLabelRenderEventArgs, ChartTheme,  ISharedTooltipRenderEventArgs, IRangeLoadedEventArgs,
 IChangedEventArgs, ChartComponent, IPointRenderEventArgs} from '@syncfusion/ej2-angular-charts';
import { chartValue } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Candle Series
 */
let pointColors: string[] = [];
@Component({
    selector: 'control-content',
    templateUrl: 'candle-stick.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class CandleStickChartComponent {
    @ViewChild('chartcontainer')
    public chart: ChartComponent;
    public data1: Object[] = chartValue;
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        crosshairTooltip: { enable: true },
        majorGridLines: { width: 0 },
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Volume',
        labelFormat: '{value}M',
        opposedPosition: true,
        majorGridLines: { width: 1 },
        lineStyle: { width: 0 },
    };
    public rows: Object = [
        {
            height: '30%'
        }, {
            height: '70%'
        }
    ];

    public axes: Object = [{
        name: 'secondary', opposedPosition: true, rowIndex: 1, majorGridLines: { width: 1 },
        labelFormat: 'n0',  plotOffset: 30, lineStyle: { width: 0 }, rangePadding: 'None', maximum: 150, minimum: 55, title: 'Price'

    }];
    public tooltip: Object = {
        enable: true,
        header: "",format: "<b>Apple Inc.(AAPL)</b> <br> High : <b>${point.high}</b> <br> Low : <b>${point.low}</b> <br> Open : <b>${point.open}</b> <br> Close : <b>${point.close}</b> <br> Volume : <b>${point.volume}</b>"
    };
    
   
    public chartArea: Object = {
        border: { width: 0 }
    };
    public marker: Object = {
        visible: false
    };
    public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
                args.text = args.text.replace("0000000M", "M"); 
    };
   
    public width: string = Browser.isDevice ? '100%' : '75%';
    public legendSettings: Object = {
        visible: false
    };
   
   
     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
     // custom code end
    constructor() {
        //code
    };

}
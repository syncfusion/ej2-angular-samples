import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts'
import { Browser } from '@syncfusion/ej2-base';
/**
 * Sample for Stacked Column Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'stacked-column-percent.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class PercentStackedColumnChartComponent {

    public data: Object[] = [
        { x: '2006', y: 900, y1: 190, y2: 250, y3: 150 },
        { x: '2007', y: 544, y1: 226, y2: 145, y3: 120 },
        { x: '2008', y: 880, y1: 194, y2: 190, y3: 115 },
        { x: '2009', y: 675, y1: 250, y2: 220, y3: 125 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        labelIntersectAction: 'Rotate45',
        majorGridLines: { width: 0 },
        minorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'GDP (%) per Annum',
        rangePadding: 'None',
        interval: 20,
        majorTickLines: { width: 0 },
        majorGridLines: { width: 1 },
        minorGridLines: { width: 1 },
        minorTickLines: { width: 0 },
        lineStyle: {
            width: 0
        }
    };
    public tooltip: Object = {
        enable: true,
        format: '${point.x} : <b>${point.y} (${point.percentage}%)</b>'
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
     // custom code start
    public width: string = Browser.isDevice ? '100%' : '60%';

    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
     // custom code end
    public title: string = 'Gross Domestic Product Growth';
    constructor() {
        //code
    };

}
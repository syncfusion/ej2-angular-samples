import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { ChartSeriesType } from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Polar series with drawType rangecolumn
 */
@Component({
    selector: 'control-content',
    templateUrl: 'polar-range-column.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class PolarRangeColumnChartComponent {

    public data: Object[] = [
        { x: 'Jan', low: 2.7, high: 7.1 }, { x: 'Feb', low: 3.9, high: 7.7 },
        { x: 'Mar', low: 3.2, high: 7.5 }, { x: 'Apr', low: 4.5, high: 9.8 },
        { x: 'May', low: 6.7, high: 11.4 }, { x: 'June', low: 8.4, high: 14.4 },
        { x: 'July', low: 11.6, high: 17.2 }, { x: 'Aug', low: 12.7, high: 17.9 },
        { x: 'Sep', low: 9.5, high: 15.1 }, { x: 'Oct', low: 5.0, high: 10.5 },
        { x: 'Nov', low: 3.2, high: 7.9 }, { x: 'Dec', low: 6.1, high: 9.1 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        title: 'Months',
        labelPlacement: 'OnTicks',
        startAngle: 90,
        interval: 1,
        coefficient: Browser.isDevice ? 80 : 100
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '{value}˚C',
        minimum: 0, maximum: 20, interval: 5
    };
      // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");

    };
      // custom code end
    public border: Object = {
        width: 3, color: 'white'
    };
    public tooltip: Object = {
        enable: true
    };
    public legendSettings: Object = {
        visible: false
    };
    public title: string = 'Maximum and Minimum Temperature';
    @ViewChild('chart')
    public chart: ChartComponent;
    public seriesType: DropDownList;
    ngOnInit(): void {
        this.seriesType = new DropDownList({
            index: 0,
            width: 80,
            change: () => {
                let type: string = this.seriesType.value.toString();
                this.chart.series[0].type = <ChartSeriesType>type;
                this.chart.refresh();
            }
        });
        this.seriesType.appendTo('#selmode');
    }
    constructor() {
        // code
     };
}
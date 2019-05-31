import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { ChartSeriesType } from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Polar series with drawType Area
 */
@Component({
    selector: 'control-content',
    templateUrl: 'polar-area.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class PolarAreaChartComponent {

    public data: Object[] = [
        { x: '2000', y: 4 }, { x: '2001', y: 3.0 },
        { x: '2002', y: 3.8 }, { x: '2003', y: 3.4 },
        { x: '2004', y: 3.2 }, { x: '2005', y: 3.9 }
    ];
    public data1: Object[] = [
        { x: '2000', y: 2.6 }, { x: '2001', y: 2.8 },
        { x: '2002', y: 2.6 }, { x: '2003', y: 3 },
        { x: '2004', y: 3.6 }, { x: '2005', y: 3 }
    ];
    public data2: Object[] = [
        { x: '2000', y: 2.8 }, { x: '2001', y: 2.5 },
        { x: '2002', y: 2.8 }, { x: '2003', y: 3.2 },
        { x: '2004', y: 2.9 }, { x: '2005', y: 2 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        labelPlacement: 'OnTicks',
        interval: 1,
        coefficient: Browser.isDevice ? 80 : 100
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        title: 'Revenue in Millions',
        labelFormat: '{value}M'
    };
    public marker: Object = {
        visible: false
    };
      // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
      // custom code end
    public title: string = 'Average Sales Comparison';
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
                this.chart.series[1].type = <ChartSeriesType>type;
                this.chart.series[2].type = <ChartSeriesType>type;
                this.chart.refresh();
            }
        });
        this.seriesType.appendTo('#selmode');
    }
    constructor() {
        // code
     };
}
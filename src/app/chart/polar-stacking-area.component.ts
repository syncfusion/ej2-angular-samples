import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { ChartSeriesType } from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Polar series with drawType Stacking Area
 */
@Component({
    selector: 'control-content',
    templateUrl: 'polar-stacking-area.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class PolarStackedAreaChartComponent {

    public data: Object[] = [
        { x: 'JPN', text: 'Japan', y: 5156, y1: 4849, y2: 4382, y3: 4939 },
        { x: 'DEU', text: 'Germany', y: 3754, y1: 3885, y2: 3365, y3: 3467 },
        { x: 'FRA', text: 'France', y: 2809, y1: 2844, y2: 2420, y3: 2463 },
        { x: 'GBR', text: 'UK', y: 2721, y1: 3002, y2: 2863, y3: 2629 },
        { x: 'BRA', text: 'Brazil', y: 2472, y1: 2456, y2: 1801, y3: 1799 },
        { x: 'RUS', text: 'Russia', y: 2231, y1: 2064, y2: 1366, y3: 1281 },
        { x: 'ITA', text: 'Italy', y: 2131, y1: 2155, y2: 1826, y3: 1851 },
        { x: 'IND', text: 'India', y: 1857, y1: 2034, y2: 2088, y3: 2256 },
        { x: 'CAN', text: 'Canada', y: 1843, y1: 1793, y2: 1553, y3: 1529 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        labelPlacement: 'OnTicks',
        interval: 1,
        coefficient: Browser.isDevice ? 80 : 100
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
    public title: string = 'GDP, Current Prices (in Billions)';
    @ViewChild('chart')
    public chart: ChartComponent;
    public onChange(e: Event): void {
        let element: HTMLSelectElement = <HTMLSelectElement>e.target;
        this.chart.series[0].type = <ChartSeriesType>element.value;
        this.chart.series[1].type = <ChartSeriesType>element.value;
        this.chart.series[2].type = <ChartSeriesType>element.value;
        this.chart.series[3].type = <ChartSeriesType>element.value;
        this.chart.refresh();

    }
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
                this.chart.series[3].type = <ChartSeriesType>type;
                this.chart.refresh();
            }
        });
        this.seriesType.appendTo('#selmode');
    }
    constructor() {
        // code
     };
}
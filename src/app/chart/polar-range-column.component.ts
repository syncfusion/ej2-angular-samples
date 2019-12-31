import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { ChartSeriesType, MarkerSettingsModel, ITextRenderEventArgs } from '@syncfusion/ej2-charts';
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
        { x: 'Jan', low: 2, high: 7 }, { x: 'Feb', low: 3, high: 7 },
        { x: 'Mar', low: 3, high: 7 }, { x: 'Apr', low: 4, high: 9 },
        { x: 'May', low: 6, high: 11 }, { x: 'June', low: 8, high: 14 }
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
        minimum: 0, maximum: 15, interval: 5
    };
      // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");

    };

    public text(args: ITextRenderEventArgs): void {
        args.text = args.text.replace('˚C', '');
    }

    public marker: MarkerSettingsModel =  {
        dataLabel: {
            visible: true,
            position: 'Top',
            font: { color: '#ffffff', fontWeight: '600'},
            enableRotation: true
        }
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
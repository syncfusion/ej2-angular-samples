import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { ChartSeriesType, MarkerSettingsModel, ITextRenderEventArgs } from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Polar series with drawType rangecolumn
 */
@Component({
    selector: 'control-content',
    templateUrl: 'polar-range-column.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
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
        interval: 1,
        coefficient: Browser.isDevice ? 80 : 100
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        
        minimum: 0, maximum: 15, interval: 5
    };
      // custom code start
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    };

   

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
        enable: true, header: '', format: '<b>${point.x}</b> <br> Low : <b>${point.low}°C</b> <br> High : <b>${point.high}°C'
    };
    public legendSettings: Object = {
        visible: false
    };
    public title: string = 'Temperatures of Germany';
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
                this.chart.series[0].animation.enable = false;
                this.chart.refresh();
            }
        });
        this.seriesType.appendTo('#selmode');
    }
    constructor() {
        // code
     };
}
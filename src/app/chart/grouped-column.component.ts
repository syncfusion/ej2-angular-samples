import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, IAxisLabelRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Area Series empty points
 */
@Component({
    selector: 'control-content',
    templateUrl: 'grouped-column.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class GroupedColumnChartComponent {
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    //Initializing Width
    public width: string = Browser.isDevice ? '100%' : '60%';
    public data1: Object[] = [{ x: '2012', y: 104 }, { x: '2016', y: 121 }, { x: '2020', y: 113 }];
    public data2: Object[] = [{ x: '2012', y: 46 }, { x: '2016', y: 46 }, { x: '2020', y: 39 }];
    public data3: Object[] = [{ x: '2012', y: 65 }, { x: '2016', y: 67 }, { x: '2020', y: 65 }];
    public data4: Object[] = [{ x: '2012', y: 29 }, { x: '2016', y: 27 }, { x: '2020', y: 22 }];
    public data5: Object[] = [{ x: '2012', y: 91 }, { x: '2016', y: 70 }, { x: '2020', y: 88 }];
    public data6: Object[] = [{ x: '2012', y: 38 }, { x: '2016', y: 26 }, { x: '2020', y: 38 }];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category', interval: 1, majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        majorGridLines: { width: 0 }, majorTickLines: { width: 0 },
        lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
    };
    public tooltip: Object = {
        enable: true
    };
    //Initializing Marker
    public marker: Object = {
        dataLabel: {
            visible: true,
            position: 'Top',
            font: {
                fontWeight: '600',
                color: '#ffffff'
            }
        }
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    // custom code end
    //Initializing Chart Title
    public title: string = 'Olympics Tally';
    constructor() {
        // code
    };
}